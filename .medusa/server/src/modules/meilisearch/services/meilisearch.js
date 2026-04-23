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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tZWlsaXNlYXJjaC9zZXJ2aWNlcy9tZWlsaXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBK0U7QUFFL0UsMkNBQTZDO0FBQzdDLG9DQUEwRTtBQUMxRSxnREFBdUQ7QUFDdkQsc0RBQTRGO0FBRTVGLE1BQWEsa0JBQW1CLFNBQVEsbUJBQVcsQ0FBQyxxQkFBcUI7SUFTdkUsWUFBWSxTQUFjLEVBQUUsT0FBaUM7UUFDM0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQVBwQixjQUFTLEdBQUcsS0FBSyxDQUFBO1FBU3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQzVCLE1BQU0sS0FBSyxDQUNULDRHQUE0RyxDQUM3RyxDQUFBO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFCLE1BQU0sS0FBSyxDQUNULHlHQUF5RyxDQUMxRyxDQUFBO1FBQ0gsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksOEJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRVMsbUJBQW1CLENBQUMsT0FBZSxFQUFFLFFBQWlCO1FBQzlELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBRTdCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEs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