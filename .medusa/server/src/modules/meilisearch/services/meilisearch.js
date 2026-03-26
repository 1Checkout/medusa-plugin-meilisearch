"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeiliSearchService = void 0;
const meilisearch_1 = require("meilisearch");
const utils_1 = require("@medusajs/utils");
const types_1 = require("../types");
const embedder_1 = require("../utils/embedder");
const transformer_1 = require("../utils/transformer");
class MeiliSearchService extends utils_1.SearchUtils.AbstractSearchService {
    constructor(container, options) {
        super(container, options);
        this.isDefault = false;
        this.paused_ = false;
        this.config_ = options;
        if (!options.config?.apiKey) {
            throw Error('Meilisearch API key is missing in plugin config. See https://github.com/rokmohar/medusa-plugin-meilisearch');
        }
        if (!options.config?.host) {
            throw Error('Meilisearch host is missing in plugin config. See https://github.com/rokmohar/medusa-plugin-meilisearch');
        }
        this.client_ = new meilisearch_1.MeiliSearch(options.config);
        this.embedder_ = new embedder_1.MeiliSearchEmbedder(options, this.client_);
    }
    getLanguageIndexKey(baseKey, language) {
        const { i18n } = this.config_;
        if (!i18n || i18n.strategy !== 'separate-index' || !language) {
            return baseKey;
        }
        return `${baseKey}_${language}`;
    }
    isSubscriptionEnabledForType(type) {
        if (this.paused_) {
            return false;
        }
        const settings = this.config_.settings || {};
        for (const config of Object.values(settings)) {
            if (config.type === type && config.enabled !== false) {
                if (config.subscribeToEvents === false) {
                    return false;
                }
            }
        }
        return true;
    }
    pauseIndexing() {
        this.paused_ = true;
    }
    resumeIndexing() {
        this.paused_ = false;
    }
    isIndexingPaused() {
        return this.paused_;
    }
    async getFieldsForType(type) {
        const fields = new Set();
        Object.values(this.config_.settings || {})
            .filter((config) => config.type === type && config.enabled !== false)
            .forEach((config) => {
            if (Array.isArray(config.fields)) {
                config.fields.forEach((field) => fields.add(field));
            }
        });
        if (!fields.size) {
            fields.add('*');
        }
        return Array.from(fields);
    }
    async getIndexesByType(type) {
        const { i18n } = this.config_;
        const baseIndexes = Object.entries(this.config_.settings || {})
            .filter(([, config]) => config.type === type && config.enabled !== false)
            .map(([key]) => key);
        if (i18n?.strategy === 'separate-index') {
            const { languages } = i18n;
            return baseIndexes.flatMap((baseIndex) => languages.map((lang) => this.getLanguageIndexKey(baseIndex, lang)));
        }
        return baseIndexes;
    }
    async createIndex(indexKey, options = { primaryKey: 'id' }) {
        return this.client_.createIndex(indexKey, options);
    }
    getIndex(indexKey) {
        return this.client_.index(indexKey);
    }
    async addDocuments(indexKey, documents, language) {
        const { i18n } = this.config_;
        const i18nOptions = {
            i18n,
            language,
        };
        if (i18n?.strategy === 'separate-index') {
            const langIndexKey = this.getLanguageIndexKey(indexKey, language || i18n.defaultLanguage);
            const transformedDocuments = await this.getTransformedDocuments(indexKey, documents, i18nOptions);
            return this.client_.index(langIndexKey).addDocuments(transformedDocuments, { primaryKey: 'id' });
        }
        else {
            const transformedDocuments = await this.getTransformedDocuments(indexKey, documents, i18nOptions);
            return this.client_.index(indexKey).addDocuments(transformedDocuments, { primaryKey: 'id' });
        }
    }
    async replaceDocuments(indexKey, documents, language) {
        return this.addDocuments(indexKey, documents, language);
    }
    async deleteDocument(indexKey, documentId, language) {
        const actualIndexKey = this.getLanguageIndexKey(indexKey, language);
        return this.client_.index(actualIndexKey).deleteDocument(documentId);
    }
    async deleteDocuments(indexKey, documents, language) {
        const actualIndexKey = this.getLanguageIndexKey(indexKey, language);
        return this.client_.index(actualIndexKey).deleteDocuments(documents);
    }
    async deleteAllDocuments(indexKey, language) {
        const actualIndexKey = this.getLanguageIndexKey(indexKey, language);
        return this.client_.index(actualIndexKey).deleteAllDocuments();
    }
    async search(indexKey, query, options) {
        const { language, paginationOptions, filter, additionalOptions, semanticSearch = false, semanticRatio = 0.5, } = options;
        const actualIndexKey = this.getLanguageIndexKey(indexKey, language);
        // Build base search options
        let searchOptions = {
            filter,
            ...paginationOptions,
            ...additionalOptions,
        };
        // Enhance with vector search if needed
        searchOptions = this.embedder_.enhanceSearchOptions(searchOptions, semanticSearch, semanticRatio);
        // Perform search
        return this.client_.index(actualIndexKey).search(query, searchOptions);
    }
    async updateSettings(indexKey, settings) {
        const indexConfig = this.config_.settings?.[indexKey];
        if (indexConfig?.enabled === false) {
            return;
        }
        const { i18n } = this.config_;
        if (i18n?.strategy === 'separate-index') {
            const { languages } = i18n;
            return Promise.all(languages.map(async (lang) => {
                const langIndexKey = this.getLanguageIndexKey(indexKey, lang);
                await this.upsertIndex(langIndexKey, settings);
                await this.updateIndexSettings(langIndexKey, settings.indexSettings ?? {});
                // Configure embedders for vector search
                if (this.embedder_.isVectorSearchEnabled()) {
                    await this.embedder_.configureEmbedders(langIndexKey);
                }
            }));
        }
        else {
            await this.upsertIndex(indexKey, settings);
            await this.updateIndexSettings(indexKey, settings.indexSettings ?? {});
            // Configure embedders for vector search
            if (this.embedder_.isVectorSearchEnabled()) {
                await this.embedder_.configureEmbedders(indexKey);
            }
            return;
        }
    }
    async updateIndexSettings(indexKey, indexSettings) {
        return this.client_.index(indexKey).updateSettings(indexSettings);
    }
    async upsertIndex(indexKey, settings) {
        const indexConfig = this.config_.settings?.[indexKey];
        if (indexConfig?.enabled === false) {
            return;
        }
        try {
            await this.client_.getIndex(indexKey);
        }
        catch (error) {
            if (error.code === types_1.meilisearchErrorCodes.INDEX_NOT_FOUND) {
                await this.createIndex(indexKey, {
                    primaryKey: settings.primaryKey ?? 'id',
                });
            }
        }
    }
    async getTransformedDocuments(indexKey, documents, options) {
        if (!documents?.length) {
            return [];
        }
        const indexConfig = (this.config_.settings || {})[indexKey];
        switch (indexConfig?.type) {
            case utils_1.SearchUtils.indexTypes.PRODUCTS:
                return Promise.all(documents.map((doc) => indexConfig.transformer?.(doc, transformer_1.transformProduct, { ...options }) ?? (0, transformer_1.transformProduct)(doc, options)));
            case 'categories':
                return Promise.all(documents.map((doc) => indexConfig.transformer?.(doc, transformer_1.transformCategory, { ...options }) ?? (0, transformer_1.transformCategory)(doc, options)));
            default:
                return documents;
        }
    }
    /**
     * Get embedder configuration status for admin panel
     * Delegates to the embedder service
     */
    async getVectorSearchStatus() {
        return this.embedder_.getVectorSearchStatus();
    }
}
exports.MeiliSearchService = MeiliSearchService;
MeiliSearchService.identifier = 'index-meilisearch';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tZWlsaXNlYXJjaC9zZXJ2aWNlcy9tZWlsaXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBK0U7QUFFL0UsMkNBQTZDO0FBQzdDLG9DQUEwRTtBQUMxRSxnREFBdUQ7QUFDdkQsc0RBQTRGO0FBRTVGLE1BQWEsa0JBQW1CLFNBQVEsbUJBQVcsQ0FBQyxxQkFBcUI7SUFVdkUsWUFBWSxTQUFjLEVBQUUsT0FBaUM7UUFDM0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQVJwQixjQUFTLEdBQUcsS0FBSyxDQUFBO1FBS2QsWUFBTyxHQUFZLEtBQUssQ0FBQTtRQUtoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUM1QixNQUFNLEtBQUssQ0FDVCw0R0FBNEcsQ0FDN0csQ0FBQTtRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQixNQUFNLEtBQUssQ0FDVCx5R0FBeUcsQ0FDMUcsQ0FBQTtRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkseUJBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDhCQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVTLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxRQUFpQjtRQUM5RCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUU3QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtB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