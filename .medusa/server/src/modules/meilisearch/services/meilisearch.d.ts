import { DocumentsDeletionQuery, DocumentsIds, MeiliSearch } from 'meilisearch';
import { SearchTypes } from '@medusajs/types';
import { SearchUtils } from '@medusajs/utils';
import { MeilisearchPluginOptions } from '../types';
import { MeiliSearchEmbedder } from '../utils/embedder';
export declare class MeiliSearchService extends SearchUtils.AbstractSearchService {
    static identifier: string;
    isDefault: boolean;
    protected readonly config_: MeilisearchPluginOptions;
    protected readonly client_: MeiliSearch;
    protected readonly embedder_: MeiliSearchEmbedder;
    constructor(container: any, options: MeilisearchPluginOptions);
    protected getLanguageIndexKey(baseKey: string, language?: string): string;
    getFieldsForType(type: string): Promise<string[]>;
    getIndexesByType(type: string): Promise<string[]>;
    createIndex(indexKey: string, options?: Record<string, any>): Promise<import("meilisearch").EnqueuedTask>;
    getIndex(indexKey: string): import("meilisearch").Index<import("meilisearch").RecordAny>;
    addDocuments(indexKey: string, documents: any[], language?: string): Promise<import("meilisearch").EnqueuedTask>;
    replaceDocuments(indexKey: string, documents: any[], language?: string): Promise<import("meilisearch").EnqueuedTask>;
    deleteDocument(indexKey: string, documentId: string | number, language?: string): Promise<import("meilisearch").EnqueuedTask>;
    deleteDocuments(indexKey: string, documents: DocumentsDeletionQuery | DocumentsIds, language?: string): Promise<import("meilisearch").EnqueuedTask>;
    deleteAllDocuments(indexKey: string, language?: string): Promise<import("meilisearch").EnqueuedTask>;
    search(indexKey: string, query: string, options: Record<string, any> & {
        language?: string;
        semanticSearch?: boolean;
        semanticRatio?: number;
    }): Promise<import("meilisearch").SearchResponse<import("meilisearch").RecordAny, any>>;
    updateSettings(indexKey: string, settings: Pick<SearchTypes.IndexSettings, 'indexSettings' | 'primaryKey'>): Promise<void[] | undefined>;
    private updateIndexSettings;
    upsertIndex(indexKey: string, settings: Pick<SearchTypes.IndexSettings, 'primaryKey'>): Promise<void>;
    private getTransformedDocuments;
    /**
     * Get embedder configuration status for admin panel
     * Delegates to the embedder service
     */
    getVectorSearchStatus(): Promise<{
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
    }>;
}
//# sourceMappingURL=meilisearch.d.ts.map