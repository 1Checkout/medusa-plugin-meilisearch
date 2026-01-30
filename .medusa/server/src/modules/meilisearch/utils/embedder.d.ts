import { MeiliSearch } from 'meilisearch';
import { MeilisearchPluginOptions } from '../types';
/**
 * MeiliSearch Embedder Service for AI-powered semantic search
 * Handles vector search configuration and embedding management
 */
export declare class MeiliSearchEmbedder {
    protected readonly config_: MeilisearchPluginOptions;
    protected readonly client_: MeiliSearch;
    constructor(config: MeilisearchPluginOptions, client: MeiliSearch);
    /**
     * Check if vector search is enabled and properly configured
     */
    isVectorSearchEnabled(): boolean;
    /**
     * Configure embedders for an index based on vectorSearch configuration
     */
    configureEmbedders(indexKey: string): Promise<void>;
    /**
     * Create embedder configuration based on provider settings
     */
    private createEmbedderConfig;
    /**
     * Get default dimensions for common embedding models
     */
    private getDefaultDimensions;
    /**
     * Create document template for embedding generation
     */
    private createDocumentTemplate;
    /**
     * Enhance search options with vector search parameters
     */
    enhanceSearchOptions(searchOptions: Record<string, any>, semanticSearch: boolean, semanticRatio: number): Record<string, any>;
    /**
     * Get embedder configuration status for admin panel
     */
    getVectorSearchStatus(): {
        enabled: boolean;
        embeddingFields: never[];
        semanticRatio: number;
        provider?: undefined;
        model?: undefined;
        dimensions?: undefined;
    } | {
        enabled: boolean;
        provider: "ollama" | "openai";
        model: string;
        dimensions: number;
        embeddingFields: string[];
        semanticRatio: number;
    };
}
//# sourceMappingURL=embedder.d.ts.map