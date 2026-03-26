"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeiliSearchEmbedder = void 0;
/**
 * MeiliSearch Embedder Service for AI-powered semantic search
 * Handles vector search configuration and embedding management
 */
class MeiliSearchEmbedder {
    constructor(config, client) {
        this.config_ = config;
        this.client_ = client;
    }
    /**
     * Check if vector search is enabled and properly configured
     */
    isVectorSearchEnabled() {
        return !!(this.config_.vectorSearch?.enabled && this.config_.vectorSearch.embedding);
    }
    /**
     * Configure embedders for an index based on vectorSearch configuration
     */
    async configureEmbedders(indexKey) {
        const { vectorSearch } = this.config_;
        if (!vectorSearch?.enabled || !vectorSearch.embedding) {
            return;
        }
        try {
            const embedderConfig = this.createEmbedderConfig(vectorSearch.embedding);
            const embedders = {
                default: embedderConfig,
            };
            await this.client_.index(indexKey).updateEmbedders(embedders);
            // Successfully configured embedders
        }
        catch {
            // Failed to configure embedders - continue without vector search
            // Don't throw - let the system continue without vector search
        }
    }
    /**
     * Create embedder configuration based on provider settings
     */
    createEmbedderConfig(embeddingConfig) {
        const baseConfig = {
            dimensions: embeddingConfig.dimensions || this.getDefaultDimensions(embeddingConfig.model),
            distribution: {
                mean: 0.7,
                sigma: 0.3,
            },
            binaryQuantized: false,
        };
        switch (embeddingConfig.provider) {
            case 'ollama':
                return {
                    source: 'ollama',
                    url: embeddingConfig.ngrokUrl
                        ? `${embeddingConfig.ngrokUrl}/api/embed`
                        : `${embeddingConfig.baseUrl}/api/embed`,
                    model: embeddingConfig.model,
                    documentTemplate: this.createDocumentTemplate(),
                    ...baseConfig,
                };
            case 'openai':
                return {
                    source: 'openAi',
                    apiKey: embeddingConfig.apiKey,
                    model: embeddingConfig.model,
                    url: embeddingConfig.baseUrl
                        ? `${embeddingConfig.baseUrl}/embeddings`
                        : 'https://api.openai.com/v1/embeddings',
                    documentTemplate: this.createDocumentTemplate(),
                    documentTemplateMaxBytes: 500,
                    ...baseConfig,
                };
            default:
                throw new Error(`Unsupported embedding provider: ${embeddingConfig.provider}`);
        }
    }
    /**
     * Get default dimensions for common embedding models
     */
    getDefaultDimensions(model) {
        const modelDimensions = {
            'nomic-embed-text': 768,
            'text-embedding-3-small': 1536,
        };
        return modelDimensions[model] || 768;
    }
    /**
     * Create document template for embedding generation
     */
    createDocumentTemplate() {
        const { embeddingFields = ['title', 'description'] } = this.config_.vectorSearch || {};
        // Create a template that combines the specified fields
        const fieldTemplates = embeddingFields.map((field) => `{{doc.${field}}}`);
        return fieldTemplates.join(' ');
    }
    /**
     * Enhance search options with vector search parameters
     */
    enhanceSearchOptions(searchOptions, semanticSearch, semanticRatio) {
        if (!semanticSearch || !this.isVectorSearchEnabled()) {
            return searchOptions;
        }
        if (semanticRatio >= 1.0) {
            // Pure semantic search
            return {
                ...searchOptions,
                hybrid: {
                    embedder: 'default',
                    semanticRatio: 1.0,
                },
            };
        }
        else if (semanticRatio > 0.0) {
            // Hybrid search
            return {
                ...searchOptions,
                hybrid: {
                    embedder: 'default',
                    semanticRatio,
                },
            };
        }
        // semanticRatio = 0.0 means pure keyword search (no hybrid options)
        return searchOptions;
    }
    /**
     * Get embedder configuration status for admin panel
     */
    getVectorSearchStatus() {
        const { vectorSearch } = this.config_;
        if (!vectorSearch?.enabled) {
            return {
                enabled: false,
                embeddingFields: [],
                semanticRatio: 0.5,
            };
        }
        return {
            enabled: true,
            provider: vectorSearch.embedding.provider,
            model: vectorSearch.embedding.model,
            dimensions: vectorSearch.dimensions || this.getDefaultDimensions(vectorSearch.embedding.model),
            embeddingFields: vectorSearch.embeddingFields || ['title', 'description'],
            semanticRatio: vectorSearch.semanticRatio || 0.5,
        };
    }
}
exports.MeiliSearchEmbedder = MeiliSearchEmbedder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tZWlsaXNlYXJjaC91dGlscy9lbWJlZGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTs7O0dBR0c7QUFDSCxNQUFhLG1CQUFtQjtJQUk5QixZQUFZLE1BQWdDLEVBQUUsTUFBbUI7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3RGLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFnQjtRQUN2QyxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNyQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxPQUFNO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEUsTUFBTSxTQUFTLEdBQWM7Z0JBQzNCLE9BQU8sRUFBRSxjQUFjO2FBQ3hCLENBQUE7WUFFRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM3RCxvQ0FBb0M7UUFDdEMsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLGlFQUFpRTtZQUNqRSw4REFBOEQ7UUFD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