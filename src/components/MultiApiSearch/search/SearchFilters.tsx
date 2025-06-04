import React from 'react';
import { SearchFilters as ISearchFilters } from '../types/searchTypes';

interface SearchFiltersProps {
  filters: ISearchFilters;
  onFiltersChange: (filters: ISearchFilters) => void;
  categories: string[];
  modalities: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  modalities
}) => {
  const handleFilterChange = (key: keyof ISearchFilters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value
    });
  };

  return (
    <div className="search-filters">
      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="modality-filter">Modality:</label>
        <select
          id="modality-filter"
          value={filters.modality || ''}
          onChange={(e) => handleFilterChange('modality', e.target.value)}
        >
          <option value="">All Modalities</option>
          {modalities.map((modality) => (
            <option key={modality} value={modality}>
              {modality}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="limit-filter">Results:</label>
        <select
          id="limit-filter"
          value={filters.k}
          onChange={(e) => handleFilterChange('k', parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      
      <style jsx>{`
        .search-filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .filter-group label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9em;
        }
        
        .filter-group select {
          padding: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          font-size: 0.95em;
          transition: all 0.3s ease;
        }
        
        .filter-group select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        
        .filter-group select option {
          background: #2c3e50;
          color: white;
        }
        
        @media (max-width: 768px) {
          .search-filters {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchFilters;