// API Configuration
export const SERVER_URL = 'http://127.0.0.1:8000';

// Search Types
export type SearchModality = 'text' | 'image' | 'audio';

export interface SearchFilters {
  category?: string;
  modality?: string;
  k: number;
}

export interface TextSearchParams extends SearchFilters {
  query: string;
}

export interface FileSearchParams extends SearchFilters {
  file: File;
}

// Result Types
export interface SearchResultMetadata {
  id: string;
  title: string;
  description?: string;
  modality: string;
  category?: string;
  tags?: string[];
  created_at: string;
  source_path: string;
}

export interface SearchResult {
  metadata: SearchResultMetadata;
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query_time?: number;
}

// Filter Options
export interface FilterOptions {
  categories: string[];
  modalities: string[];
}

// Tab Types
export interface SearchTab {
  id: SearchModality;
  label: string;
  icon: string;
}