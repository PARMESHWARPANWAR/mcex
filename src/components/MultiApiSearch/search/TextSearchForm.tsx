import React, { useState } from 'react';
import SearchFilters from './SearchFilters';
import {  SearchFilters as ISearchFilters , TextSearchParams } from '../types/searchTypes';

interface TextSearchFormProps {
    onSearch: (params: TextSearchParams) => void;
    isLoading: boolean;
    categories: string[];
    modalities: string[];
}

const TextSearchForm: React.FC<TextSearchFormProps> = ({
    onSearch,
    isLoading,
    categories,
    modalities
}) => {
    const [query, setQuery] = useState('');

    // Replace the filters state type (around line 18-22)
    const [filters, setFilters] = useState<ISearchFilters>({
        category: undefined,
        modality: undefined,
        k: 10
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        onSearch({
            query: query.trim(),
            ...filters
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-group">
                <label htmlFor="text-query">🔍 Search Query:</label>
                <input
                    type="text"
                    id="text-query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your search query..."
                    required
                    disabled={isLoading}
                />
            </div>

            <SearchFilters
                filters={filters}
                onFiltersChange={(newFilters) => setFilters(newFilters)}
                categories={categories}
                modalities={modalities}
            />

            <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="search-button"
            >
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        Searching...
                    </>
                ) : (
                    <>
                        <span>🚀</span>
                        Search
                    </>
                )}
            </button>

            <style jsx>{`
        .search-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .search-input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .search-input-group label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1em;
        }
        
        .search-input-group input {
          padding: 15px 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          font-size: 1em;
          transition: all 0.3s ease;
        }
        
        .search-input-group input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .search-input-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 30px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        
        .search-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </form>
    );
};

export default TextSearchForm;