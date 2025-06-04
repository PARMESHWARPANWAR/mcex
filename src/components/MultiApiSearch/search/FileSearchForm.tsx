import React, { useState, useRef } from 'react';
import SearchFilters from './SearchFilters';
import { FileSearchParams, SearchFilters as ISearchFilters , SearchModality } from '../types/searchTypes';

interface FileSearchFormProps {
    onSearch: (params: FileSearchParams) => void;
    isLoading: boolean;
    categories: string[];
    modalities: string[];
    searchType: 'image' | 'audio';
}

const FileSearchForm: React.FC<FileSearchFormProps> = ({
    onSearch,
    isLoading,
    categories,
    modalities,
    searchType
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    // Replace the filters state type (around line 18-22)
    const [filters, setFilters] = useState<ISearchFilters>({
        category: undefined,
        modality: undefined,
        k: 10
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const acceptedTypes = searchType === 'image' ? 'image/*' : 'audio/*';
    const icon = searchType === 'image' ? '🖼️' : '🎵';
    const label = searchType === 'image' ? 'Upload Image' : 'Upload Audio';

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith(searchType === 'image' ? 'image/' : 'audio/')) {
                handleFileSelect(file);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        onSearch({
            file: selectedFile,
            ...filters
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="file-input-group">
                <label>{icon} {label}:</label>
                <div
                    className={`file-drop-zone ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes}
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        style={{ display: 'none' }}
                    />

                    {selectedFile ? (
                        <div className="file-selected">
                            <div className="file-icon">{icon}</div>
                            <div className="file-info">
                                <div className="file-name">{selectedFile.name}</div>
                                <div className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                            </div>
                            <button
                                type="button"
                                className="file-remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="file-placeholder">
                            <div className="upload-icon">{icon}</div>
                            <div className="upload-text">
                                <div>Click to upload or drag and drop</div>
                                <div className="upload-subtitle">
                                    {searchType === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP3, WAV, M4A up to 50MB'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
                modalities={modalities}
            />

            <button
                type="submit"
                disabled={isLoading || !selectedFile}
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
        
        .file-input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .file-input-group label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1em;
        }
        
        .file-drop-zone {
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .file-drop-zone:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .file-drop-zone.drag-active {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }
        
        .file-drop-zone.has-file {
          border-style: solid;
          border-color: #2ecc71;
          background: rgba(46, 204, 113, 0.1);
        }
        
        .file-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .upload-icon {
          font-size: 3em;
          opacity: 0.6;
        }
        
        .upload-text {
          text-align: center;
        }
        
        .upload-subtitle {
          font-size: 0.85em;
          opacity: 0.7;
          margin-top: 5px;
        }
        
        .file-selected {
          display: flex;
          align-items: center;
          gap: 15px;
          width: 100%;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        
        .file-icon {
          font-size: 2em;
        }
        
        .file-info {
          flex: 1;
          text-align: left;
        }
        
        .file-name {
          font-weight: 600;
          color: white;
        }
        
        .file-size {
          font-size: 0.85em;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }
        
        .file-remove {
          background: rgba(231, 76, 60, 0.8);
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8em;
          transition: all 0.2s ease;
        }
        
        .file-remove:hover {
          background: #e74c3c;
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

export default FileSearchForm;