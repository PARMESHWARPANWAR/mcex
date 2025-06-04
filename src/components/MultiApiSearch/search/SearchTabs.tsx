import React from 'react';
import { SearchModality, SearchTab } from '../types/searchTypes';

interface SearchTabsProps {
  activeTab: SearchModality;
  onTabChange: (tab: SearchModality) => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: SearchTab[] = [
    { id: 'text', label: 'Text Search', icon: '📝' },
    { id: 'image', label: 'Image Search', icon: '🖼️' },
    { id: 'audio', label: 'Audio Search', icon: '🎵' }
  ];

  return (
    <div className="search-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`search-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-selected={activeTab === tab.id}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
      
      <style jsx>{`
        .search-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 25px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        
        .search-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95em;
          font-weight: 500;
          flex: 1;
          justify-content: center;
        }
        
        .search-tab:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          transform: translateY(-2px);
        }
        
        .search-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .tab-icon {
          font-size: 1.2em;
        }
        
        .tab-label {
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .search-tabs {
            flex-direction: column;
            gap: 8px;
          }
          
          .search-tab {
            padding: 15px;
          }
          
          .tab-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchTabs;