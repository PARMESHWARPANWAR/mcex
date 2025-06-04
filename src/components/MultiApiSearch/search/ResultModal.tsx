import React, { useEffect } from 'react';
import { SearchResult } from '../types/searchTypes';
import { SERVER_URL } from '../types/searchTypes';

interface ResultModalProps {
  result: SearchResult | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !result) return null;

  const { metadata, score } = result;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${SERVER_URL}/${metadata.source_path.replace(/\\/g, '/')}`;
    link.download = metadata.title || `file.${metadata.modality}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatImagePath = (path: string) => {
    return `${SERVER_URL}/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">{metadata.title}</h2>
          <div className="similarity-badge">
            Similarity: {(score * 100).toFixed(2)}%
          </div>
        </div>
        
        <div className="modal-body">
          {metadata.modality === 'image' && (
            <div className="media-content">
              <img
                src={formatImagePath(metadata.source_path)}
                alt={metadata.title}
                className="modal-image"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder.jpg';
                }}
              />
            </div>
          )}
          
          {metadata.modality === 'audio' && (
            <div className="media-content">
              <audio controls className="modal-audio">
                <source src={formatImagePath(metadata.source_path)} type="audio/wav" />
                <source src={formatImagePath(metadata.source_path)} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {metadata.modality === 'text' && (
            <div className="media-content">
              <div className="text-content">
                <div className="text-placeholder">📝 Text content preview</div>
              </div>
            </div>
          )}
          
          <div className="metadata-section">
            <div className="metadata-grid">
              <div className="metadata-item">
                <label>ID:</label>
                <span>{metadata.id}</span>
              </div>
              
              <div className="metadata-item">
                <label>Modality:</label>
                <span className="modality-value">{metadata.modality}</span>
              </div>
              
              {metadata.category && (
                <div className="metadata-item">
                  <label>Category:</label>
                  <span>{metadata.category}</span>
                </div>
              )}
              
              <div className="metadata-item">
                <label>Created:</label>
                <span>{new Date(metadata.created_at).toLocaleString()}</span>
              </div>
            </div>
            
            {metadata.description && (
              <div className="description-section">
                <label>Description:</label>
                <p>{metadata.description}</p>
              </div>
            )}
            
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="tags-section">
                <label>Tags:</label>
                <div className="tags-container">
                  {metadata.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-actions">
            <button onClick={handleDownload} className="download-button">
              📥 Download
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          max-width: 800px;
          max-height: 90vh;
          width: 100%;
          overflow-y: auto;
          position: relative;
          animation: modalIn 0.3s ease-out;
        }
        
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: rgba(231, 76, 60, 0.8);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          color: white;
          cursor: pointer;
          font-size: 1.2em;
          z-index: 10;
          transition: all 0.2s ease;
        }
        
        .modal-close:hover {
          background: #e74c3c;
          transform: scale(1.1);
        }
        
        .modal-header {
          padding: 25px 25px 20px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }
        
        .modal-title {
          margin: 0;
          color: white;
          font-size: 1.5em;
          font-weight: 700;
          flex: 1;
          line-height: 1.3;
        }
        
        .similarity-badge {
          background: rgba(46, 204, 113, 0.8);
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.9em;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .modal-body {
          padding: 25px;
        }
        
        .media-content {
          margin-bottom: 25px;
          text-align: center;
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 400px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .modal-audio {
          width: 100%;
          max-width: 500px;
          margin: 20px 0;
        }
        
        .text-content {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .text-placeholder {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1em;
        }
        
        .metadata-section {
          margin-bottom: 25px;
        }
        
        .metadata-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .metadata-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .metadata-item label {
          font-weight: 600;
          color: #4ecdc4;
          font-size: 0.9em;
        }
        
        .metadata-item span {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95em;
        }
        
        .modality-value {
          background: rgba(102, 126, 234, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.8em;
          font-weight: 600;
          display: inline-block;
        }
        
        .description-section {
          margin-bottom: 20px;
        }
        
        .description-section label {
          font-weight: 600;
          color: #4ecdc4;
          font-size: 0.9em;
          display: block;
          margin-bottom: 8px;
        }
        
        .description-section p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin: 0;
        }
        
        .tags-section {
          margin-bottom: 20px;
        }
        
        .tags-section label {
          font-weight: 600;
          color: #4ecdc4;
          font-size: 0.9em;
          display: block;
          margin-bottom: 10px;
        }
        
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tag {
          background: rgba(52, 152, 219, 0.8);
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.85em;
          font-weight: 500;
        }
        
        .modal-actions {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          justify-content: center;
        }
        
        .download-button {
          background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .download-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(243, 156, 18, 0.3);
        }
        
        @media (max-width: 768px) {
          .modal-content {
            margin: 10px;
            max-height: 95vh;
          }
          
          .modal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .metadata-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultModal;