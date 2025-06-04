import React from 'react';
import { SearchResult, SearchModality } from '../types/searchTypes';
import { SERVER_URL } from '../types/searchTypes';

interface SearchResultsProps {
  results: SearchResult[];
  searchType: SearchModality;
  onResultClick: (result: SearchResult) => void;
  onExport: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchType,
  onResultClick,
  onExport
}) => {
  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No results found</h3>
        <p>Try modifying your search criteria or filters</p>
        
        <style jsx>{`
          .no-results {
            text-align: center;
            padding: 60px 20px;
            color: rgba(255, 255, 255, 0.7);
          }
          
          .no-results-icon {
            font-size: 4em;
            margin-bottom: 20px;
            opacity: 0.5;
          }
          
          .no-results h3 {
            margin: 0 0 10px 0;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .no-results p {
            margin: 0;
            font-size: 0.95em;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <div className="result-count">
          <span className="count-number">{results.length}</span> results found
        </div>
        <button onClick={onExport} className="export-button">
          📊 Export CSV
        </button>
      </div>
      
      <div className="results-grid">
        {results.map((result, index) => (
          <ResultCard
            key={`${result.metadata.id}-${index}`}
            result={result}
            searchType={searchType}
            onClick={() => onResultClick(result)}
          />
        ))}
      </div>
      
      <style jsx>{`
        .search-results {
          margin-top: 30px;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .result-count {
          font-size: 1.1em;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .count-number {
          font-weight: 700;
          color: #4ecdc4;
          font-size: 1.2em;
        }
        
        .export-button {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background: rgba(46, 204, 113, 0.8);
          color: white;
          font-size: 0.9em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .export-button:hover {
          background: #2ecc71;
          transform: translateY(-2px);
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .results-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

interface ResultCardProps {
  result: SearchResult;
  searchType: SearchModality;
  onClick: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, searchType, onClick }) => {
  const { metadata, score } = result;
  
  const getModalityIcon = (modality: string) => {
    switch (modality.toLowerCase()) {
      case 'image': return '🖼️';
      case 'audio': return '🎵';
      case 'text': return '📝';
      default: return '📄';
    }
  };

  const formatImagePath = (path: string) => {
    return `${SERVER_URL}/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="result-card" onClick={onClick}>
      <div className="card-header">
        <div className="modality-badge">
          {getModalityIcon(metadata.modality)} {metadata.modality}
        </div>
        <div className="similarity-score">
          {(score * 100).toFixed(1)}%
        </div>
      </div>
      
      <div className="card-content">
        {metadata.modality === 'image' && (
          <div className="image-preview">
            <img
              src={formatImagePath(metadata.source_path)}
              alt={metadata.title}
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder.jpg';
              }}
            />
          </div>
        )}
        
        <h3 className="result-title">{metadata.title}</h3>
        <p className="result-description">
          {metadata.description || 'No description available'}
        </p>
        
        <div className="result-details">
          {metadata.category && (
            <div className="detail-item">
              🏷️ {metadata.category}
            </div>
          )}
          <div className="detail-item">
            📅 {new Date(metadata.created_at).toLocaleDateString()}
          </div>
        </div>
        
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="result-tags">
            {metadata.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {metadata.tags.length > 3 && (
              <span className="tag-more">+{metadata.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .result-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .modality-badge {
          background: rgba(102, 126, 234, 0.8);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8em;
          font-weight: 600;
        }
        
        .similarity-score {
          background: rgba(46, 204, 113, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.85em;
          font-weight: 700;
        }
        
        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .image-preview {
          width: 100%;
          height: 180px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 15px;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .result-card:hover .image-preview img {
          transform: scale(1.05);
        }
        
        .result-title {
          font-size: 1.1em;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: white;
          line-height: 1.3;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .result-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9em;
          line-height: 1.4;
          margin: 0 0 15px 0;
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .result-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        
        .detail-item {
          font-size: 0.8em;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 8px;
          border-radius: 6px;
        }
        
        .result-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        
        .tag {
          background: rgba(52, 152, 219, 0.8);
          color: white;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 0.75em;
          font-weight: 500;
        }
        
        .tag-more {
          background: rgba(149, 165, 166, 0.8);
          color: white;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 0.75em;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default SearchResults;