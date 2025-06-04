'use client'
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import SectionWrapper from '../SectionWrapper';
import PageHeader from '../PageHeader';
import SearchTabs from './SearchTabs';
import TextSearchForm from './TextSearchForm';
import FileSearchForm from './FileSearchForm';
import SearchResults from './SearchResults';
import ResultModal from './ResultModal';
import searchApi from '../services/searchApi';
import { 
  SearchModality, 
  SearchResult, 
  TextSearchParams, 
  FileSearchParams 
} from '../types/searchTypes';

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SearchModality>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalities, setModalities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isServerHealthy, setIsServerHealthy] = useState<boolean | null>(null);

  // Load filter options on component mount
  useEffect(() => {
    loadFilterOptions();
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    const healthy = await searchApi.healthCheck();
    setIsServerHealthy(healthy);
  };

  const loadFilterOptions = async () => {
    try {
      const [categoriesData, modalitiesData] = await Promise.all([
        searchApi.getCategories(),
        searchApi.getModalities()
      ]);
      setCategories(categoriesData);
      setModalities(modalitiesData);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  const handleTextSearch = async (params: TextSearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchApi.searchText(params);
      setResults(response.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSearch = async (params: FileSearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchApi.searchImage(params);
      setResults(response.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Image search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioSearch = async (params: FileSearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchApi.searchAudio(params);
      setResults(response.results);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Audio search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    try {
      searchApi.exportResultsToCSV(results);
    } catch (error) {
      setError('Failed to export results');
    }
  };

  const handleTabChange = (tab: SearchModality) => {
    setActiveTab(tab);
    setResults([]);
    setError(null);
  };

  return (
    <Layout
      title="Multi-Modal Search"
      description="Search across text, images, and audio with state-of-the-art embeddings"
    >
      <SectionWrapper maxWidth="1200px">
        <PageHeader
          title="Multi-Modal Search"
          subtitle="Search across text, images, and audio with state-of-the-art embeddings"
          icon="🔍"
        />

        {isServerHealthy === false && (
          <div className="server-warning">
            ⚠️ Cannot connect to search server at {process.env.NEXT_PUBLIC_SERVER_URL || 'http://127.0.0.1:8000'}. 
            Please ensure the server is running.
          </div>
        )}

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <div className="search-container">
          <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="search-forms">
            {activeTab === 'text' && (
              <TextSearchForm
                onSearch={handleTextSearch}
                isLoading={isLoading}
                categories={categories}
                modalities={modalities}
              />
            )}
            
            {activeTab === 'image' && (
              <FileSearchForm
                onSearch={handleImageSearch}
                isLoading={isLoading}
                categories={categories}
                modalities={modalities}
                searchType="image"
              />
            )}
            
            {activeTab === 'audio' && (
              <FileSearchForm
                onSearch={handleAudioSearch}
                isLoading={isLoading}
                categories={categories}
                modalities={modalities}
                searchType="audio"
              />
            )}
          </div>

          {isLoading && (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Searching across all modalities...</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <SearchResults
              results={results}
              searchType={activeTab}
              onResultClick={handleResultClick}
              onExport={handleExport}
            />
          )}
        </div>

        <ResultModal
          result={selectedResult}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedResult(null);
          }}
        />
      </SectionWrapper>
      
      <style jsx>{`
        .server-warning {
          background: rgba(255, 193, 7, 0.2);
          border: 2px solid rgba(255, 193, 7, 0.5);
          color: #ffc107;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 500;
        }

        .error-message {
          background: rgba(231, 76, 60, 0.2);
          border: 2px solid rgba(231, 76, 60, 0.5);
          color: #e74c3c;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 500;
        }
        
        .search-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          padding: 30px;
          margin-top: 20px;
        }
        
        .search-forms {
          margin-bottom: 30px;
        }
        
        .loading-section {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          border-top-color: #667eea;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px auto;
        }
        
        .loading-section p {
          font-size: 1.1em;
          margin: 0;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default SearchPage;