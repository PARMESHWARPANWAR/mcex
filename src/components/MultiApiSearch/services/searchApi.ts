import { 
  SERVER_URL, 
  TextSearchParams, 
  FileSearchParams, 
  SearchResponse,
  FilterOptions 
} from '../types/searchTypes';

class SearchApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = SERVER_URL;
  }

  // Get available categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Get available modalities
  async getModalities(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/modalities`);
      if (!response.ok) {
        throw new Error(`Failed to fetch modalities: ${response.status}`);
      }
      const data = await response.json();
      return data.modalities || [];
    } catch (error) {
      console.error('Error fetching modalities:', error);
      return [];
    }
  }

  // Text search
  async searchText(params: TextSearchParams): Promise<SearchResponse> {
    try {
      const url = new URL(`${this.baseUrl}/api/search/text`);
      url.searchParams.append('query', params.query);
      url.searchParams.append('k', params.k.toString());
      
      if (params.category) {
        url.searchParams.append('category', params.category);
      }
      if (params.modality) {
        url.searchParams.append('modality', params.modality);
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in text search:', error);
      throw new Error('Failed to perform text search. Please try again.');
    }
  }

  // Image search
  async searchImage(params: FileSearchParams): Promise<SearchResponse> {
    try {
      const url = new URL(`${this.baseUrl}/api/search/image`);
      url.searchParams.append('k', params.k.toString());
      
      if (params.category) {
        url.searchParams.append('category', params.category);
      }
      if (params.modality) {
        url.searchParams.append('modality', params.modality);
      }

      const formData = new FormData();
      formData.append('file', params.file);

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Image search failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in image search:', error);
      throw new Error('Failed to perform image search. Please try again.');
    }
  }

  // Audio search
  async searchAudio(params: FileSearchParams): Promise<SearchResponse> {
    try {
      const url = new URL(`${this.baseUrl}/api/search/audio`);
      url.searchParams.append('k', params.k.toString());
      
      if (params.category) {
        url.searchParams.append('category', params.category);
      }
      if (params.modality) {
        url.searchParams.append('modality', params.modality);
      }

      const formData = new FormData();
      formData.append('file', params.file);

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Audio search failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in audio search:', error);
      throw new Error('Failed to perform audio search. Please try again.');
    }
  }

  // Export results to CSV
  exportResultsToCSV(results: any[], filename: string = 'search_results.csv') {
    if (!results || results.length === 0) {
      throw new Error('No results to export');
    }

    const exportData = results.map((result) => {
      const { metadata, score } = result;
      return {
        id: metadata.id,
        title: metadata.title,
        modality: metadata.modality,
        category: metadata.category || 'N/A',
        tags: metadata.tags ? metadata.tags.join(', ') : '',
        similarity: (score * 100).toFixed(2) + '%',
        created_at: new Date(metadata.created_at).toLocaleString(),
        source_path: metadata.source_path,
      };
    });

    const headers = Object.keys(exportData[0]);
    const csvContent = [
      headers.join(','),
      ...exportData.map((row) =>
        headers
          .map(
            (field) => `"${String(row[field as keyof typeof row] || '').replace(/"/g, '""')}"`
          )
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const searchApi = new SearchApiService();
export default searchApi;