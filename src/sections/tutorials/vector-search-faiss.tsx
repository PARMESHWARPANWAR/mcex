'use client'
import React, { useState } from 'react';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Search, Zap, Shield, Code, ArrowRight, Database, Layers, Cpu, BarChart3, Gauge } from 'lucide-react';

export default function Tutorial3VectorSearch() {
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [copiedCode, setCopiedCode] = useState('');

    const copyToClipboard = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(''), 2000);
    };

    const markStepComplete = (stepIndex) => {
        setCompletedSteps(prev => new Set([...prev, stepIndex]));
    };

    const steps = [
        {
            title: "FAISS Setup & Configuration",
            icon: <Database className="w-5 h-5" />,
            content: "Install FAISS and configure vector storage"
        },
        {
            title: "Vector Index Management",
            icon: <Layers className="w-5 h-5" />,
            content: "Build efficient indexing strategies"
        },
        {
            title: "Search Implementation",
            icon: <Search className="w-5 h-5" />,
            content: "Create similarity search functionality"
        },
        {
            title: "Performance Optimization",
            icon: <Gauge className="w-5 h-5" />,
            content: "Optimize for speed and accuracy"
        },
        {
            title: "API Integration",
            icon: <BarChart3 className="w-5 h-5" />,
            content: "Add search endpoints to your API"
        }
    ];

    const CodeBlock = ({ code, language, id }) => (
        <div className="code-block-container">
            <div className="code-header">
                <span className="code-language">{language}</span>
                <button
                    className="copy-button"
                    onClick={() => copyToClipboard(code, id)}
                >
                    <Copy className="w-4 h-4" />
                    {copiedCode === id ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="code-example">
                <pre><code>{code}</code></pre>
            </div>

            <style jsx>{`
        .code-block-container {
          margin-bottom: 25px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .code-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .code-language {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9em;
          font-weight: 500;
        }
        
        .copy-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8em;
          transition: all 0.3s ease;
        }
        
        .copy-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .code-example {
          background: #1e1e1e;
          color: #f8f8f2;
          padding: 20px;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
          font-size: 0.9em;
          overflow-x: auto;
          line-height: 1.5;
        }
        
        .code-example pre {
          margin: 0;
          white-space: pre-wrap;
        }
        
        .code-example code {
          font-family: inherit;
        }
      `}</style>
        </div>
    );

    return (
        <>
            <div className="tutorial-container">
                <div className="tutorial-content">
                    {/* Header */}
                    <div className="tutorial-header">
                        <button className="back-button">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Challenges
                        </button>

                        <div className="hero-section">
                            <h1 className="page-title">Vector Search</h1>

                            <div className="tutorial-badge">
                                <Zap className="w-4 h-4" />
                                <span>Tutorial 3 of 8</span>
                            </div>

                            <h2 className="main-title">Implementing Vector Search with FAISS</h2>

                            <p className="main-description">
                                Build a high-performance similarity search system using FAISS. Learn to index embeddings,
                                perform fast nearest neighbor searches, and optimize for production workloads with
                                millions of vectors.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="feature-cards-grid">
                            <div className="feature-card">
                                <Database className="w-8 h-8" />
                                <h3>FAISS Indexing</h3>
                                <p>Facebook's library for efficient similarity search and clustering</p>
                            </div>
                            <div className="feature-card">
                                <Search className="w-8 h-8" />
                                <h3>Fast Search</h3>
                                <p>Millisecond-level search across millions of high-dimensional vectors</p>
                            </div>
                            <div className="feature-card">
                                <Gauge className="w-8 h-8" />
                                <h3>Production Scale</h3>
                                <p>Optimized for memory efficiency and search performance</p>
                            </div>
                        </div>
                    </div>

                    {/* Tutorial Progress */}
                    <div className="progress-section">
                        <div className="progress-header">
                            <Terminal className="w-6 h-6" />
                            <h2>Tutorial Progress</h2>
                        </div>

                        <div className="progress-steps">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`progress-step ${activeStep === index ? 'active' : ''
                                        } ${completedSteps.has(index) ? 'completed' : ''}`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div className="step-icon">
                                        {step.icon}
                                    </div>
                                    <div className="step-content">
                                        <h4>{step.title}</h4>
                                        <p>{step.content}</p>
                                    </div>
                                    <div className="step-status">
                                        {completedSteps.has(index) && <CheckCircle className="w-5 h-5" />}
                                        {activeStep === index && <div className="active-indicator" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="main-content-section">
                        {activeStep === 0 && (
                            <div className="step-content-container">
                                <div className="step-header">
                                    <Database className="w-8 h-8" />
                                    <h2>FAISS Setup & Configuration</h2>
                                </div>

                                <p className="step-description">
                                    FAISS (Facebook AI Similarity Search) is a library for efficient similarity search and clustering of dense vectors.
                                    Let's install and configure it for our multimodal search system.
                                </p>

                                <div className="architecture-overview">
                                    <h3>🏗️ FAISS vs Alternatives Comparison</h3>
                                    <div className="comparison-grid">
                                        <div className="comparison-card faiss">
                                            <h4>🔍 FAISS</h4>
                                            <div className="pros">
                                                <h5>✅ Advantages</h5>
                                                <ul>
                                                    <li>Extremely fast (sub-millisecond search)</li>
                                                    <li>Free and open source</li>
                                                    <li>Runs locally - full data control</li>
                                                    <li>Multiple index types for different needs</li>
                                                    <li>GPU acceleration support</li>
                                                </ul>
                                            </div>
                                            <div className="cons">
                                                <h5>❌ Trade-offs</h5>
                                                <ul>
                                                    <li>Requires more setup and configuration</li>
                                                    <li>Manual scaling and management</li>
                                                    <li>Need to handle persistence yourself</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="comparison-card pinecone">
                                            <h4>🌲 Pinecone</h4>
                                            <div className="pros">
                                                <h5>✅ Advantages</h5>
                                                <ul>
                                                    <li>Fully managed service</li>
                                                    <li>Auto-scaling and backups</li>
                                                    <li>Real-time updates</li>
                                                    <li>Built-in metadata filtering</li>
                                                </ul>
                                            </div>
                                            <div className="cons">
                                                <h5>❌ Trade-offs</h5>
                                                <ul>
                                                    <li>Expensive ($70/month+)</li>
                                                    <li>Network latency overhead</li>
                                                    <li>Vendor lock-in</li>
                                                    <li>Data privacy concerns</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="recommendation">
                                        <h4>🎯 Our Choice: FAISS</h4>
                                        <p>For this tutorial, we're using FAISS because it's free, extremely fast, and perfect for learning the fundamentals of vector search.</p>
                                    </div>
                                </div>

                                <div className="setup-step">
                                    <h3>Step 1: Install FAISS</h3>
                                    <CodeBlock
                                        language="bash"
                                        id="install-faiss"
                                        code={`# In your Docker container, install FAISS
# For CPU-only version
pip install faiss-cpu

# For GPU version (if you have CUDA)
pip install faiss-gpu

# Also install additional dependencies
pip install numpy scikit-learn matplotlib`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 2: Create Vector Storage Service</h3>
                                    <CodeBlock
                                        language="python"
                                        id="vector-service"
                                        code={`# Create vector_service.py
import faiss
import numpy as np
import pickle
import os
import time
import logging
from typing import List, Dict, Any, Optional, Tuple
from pathlib import Path
import json
from dataclasses import dataclass, asdict
from config import settings

logger = logging.getLogger(__name__)

@dataclass
class VectorItem:
    """Represents a vector with metadata"""
    id: str
    vector: List[float]
    metadata: Dict[str, Any]
    modality: str
    timestamp: float

@dataclass
class SearchResult:
    """Represents a search result"""
    id: str
    score: float
    metadata: Dict[str, Any]
    modality: str

class FAISSVectorStore:
    """FAISS-based vector storage and search"""
    
    def __init__(self, 
                 dimension: int = 1024,
                 index_type: str = "IVF",
                 storage_dir: str = "vector_storage"):
        """
        Initialize FAISS vector store
        
        Args:
            dimension: Vector dimension (1024 for ImageBind)
            index_type: FAISS index type ('Flat', 'IVF', 'HNSW')
            storage_dir: Directory to store index and metadata
        """
        self.dimension = dimension
        self.index_type = index_type
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True)
        
        # FAISS index
        self.index = None
        self.is_trained = False
        
        # Metadata storage
        self.id_to_metadata = {}  # id -> metadata
        self.index_to_id = {}     # faiss_index -> id
        self.id_to_index = {}     # id -> faiss_index
        self.next_index = 0
        
        # Index configuration
        self.index_config = {
            'Flat': {'description': 'Exact search, best accuracy'},
            'IVF': {'description': 'Inverted file index, good speed/accuracy balance'},
            'HNSW': {'description': 'Hierarchical NSW, fastest search'}
        }
        
        self._initialize_index()
    
    def _initialize_index(self):
        """Initialize the FAISS index based on type"""
        try:
            if self.index_type == "Flat":
                # Exact search index - guarantees best results but slower for large datasets
                self.index = faiss.IndexFlatIP(self.dimension)  # Inner Product (cosine similarity)
                self.is_trained = True
                logger.info("Initialized Flat index for exact search")
                
            elif self.index_type == "IVF":
                # Inverted File index - good balance of speed and accuracy
                nlist = 100  # number of clusters
                quantizer = faiss.IndexFlatIP(self.dimension)
                self.index = faiss.IndexIVFFlat(quantizer, self.dimension, nlist)
                logger.info(f"Initialized IVF index with {nlist} clusters")
                
            elif self.index_type == "HNSW":
                # Hierarchical Navigable Small World - fastest search
                M = 16  # number of connections
                self.index = faiss.IndexHNSWFlat(self.dimension, M)
                self.index.hnsw.efConstruction = 200
                self.index.hnsw.efSearch = 50
                self.is_trained = True
                logger.info(f"Initialized HNSW index with M={M}")
                
            else:
                raise ValueError(f"Unsupported index type: {self.index_type}")
                
        except Exception as e:
            logger.error(f"Failed to initialize FAISS index: {e}")
            raise
    
    def add_vector(self, vector_item: VectorItem) -> bool:
        """Add a vector to the index"""
        try:
            # Validate vector
            if len(vector_item.vector) != self.dimension:
                raise ValueError(f"Vector dimension {len(vector_item.vector)} != {self.dimension}")
            
            # Check if ID already exists
            if vector_item.id in self.id_to_index:
                logger.warning(f"Vector ID {vector_item.id} already exists, skipping")
                return False
            
            # Convert to numpy array and normalize
            vector = np.array(vector_item.vector, dtype=np.float32).reshape(1, -1)
            vector = vector / np.linalg.norm(vector, axis=1, keepdims=True)  # L2 normalize
            
            # Train index if needed (for IVF)
            if not self.is_trained and self.index_type == "IVF":
                if self.next_index >= 256:  # Need at least 256 vectors to train IVF
                    self._train_index()
            
            # Add to FAISS index if trained
            if self.is_trained:
                self.index.add(vector)
                
                # Update mappings
                faiss_index = self.next_index
                self.index_to_id[faiss_index] = vector_item.id
                self.id_to_index[vector_item.id] = faiss_index
                self.next_index += 1
            
            # Store metadata
            self.id_to_metadata[vector_item.id] = {
                'metadata': vector_item.metadata,
                'modality': vector_item.modality,
                'timestamp': vector_item.timestamp,
                'vector': vector_item.vector  # Keep original vector for training
            }
            
            logger.debug(f"Added vector {vector_item.id} (index: {self.next_index-1 if self.is_trained else 'pending'})")
            return True
            
        except Exception as e:
            logger.error(f"Failed to add vector {vector_item.id}: {e}")
            return False
    
    def _train_index(self):
        """Train the index (for IVF type)"""
        try:
            if self.index_type != "IVF" or self.is_trained:
                return
            
            # Collect all vectors for training
            training_vectors = []
            for item_data in self.id_to_metadata.values():
                vector = np.array(item_data['vector'], dtype=np.float32)
                vector = vector / np.linalg.norm(vector)  # L2 normalize
                training_vectors.append(vector)
            
            if len(training_vectors) < 256:
                logger.warning(f"Not enough vectors for training: {len(training_vectors)} < 256")
                return
            
            training_data = np.vstack(training_vectors)
            logger.info(f"Training IVF index with {len(training_vectors)} vectors...")
            
            self.index.train(training_data)
            self.is_trained = True
            
            # Add all vectors to the trained index
            self.index.add(training_data)
            
            # Update index mappings
            for i, (item_id, _) in enumerate(self.id_to_metadata.items()):
                self.index_to_id[i] = item_id
                self.id_to_index[item_id] = i
            
            self.next_index = len(training_vectors)
            logger.info("IVF index training completed")
            
        except Exception as e:
            logger.error(f"Failed to train index: {e}")
            raise`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 3: Configuration Settings</h3>
                                    <CodeBlock
                                        language="python"
                                        id="vector-config"
                                        code={`# Add to config.py
class VectorSearchSettings:
    # FAISS Configuration
    vector_dimension: int = 1024
    index_type: str = "IVF"  # "Flat", "IVF", "HNSW"
    storage_directory: str = "vector_storage"
    
    # Search Configuration
    default_search_k: int = 10
    max_search_k: int = 100
    similarity_threshold: float = 0.0
    
    # Performance Configuration
    ivf_nlist: int = 100  # Number of clusters for IVF
    hnsw_m: int = 16      # Connections for HNSW
    hnsw_ef_construction: int = 200
    hnsw_ef_search: int = 50
    
    # Storage Configuration
    auto_save_interval: int = 100  # Save every N additions
    backup_enabled: bool = True
    compression_enabled: bool = True

# Update main settings
class Settings(BaseSettings):
    # ... existing settings ...
    
    # Vector Search Settings
    vector_search: VectorSearchSettings = VectorSearchSettings()

# Update global settings
settings = Settings()`}
                                    />
                                </div>

                                <div className="tips-card">
                                    <h4>🔧 Index Type Selection Guide</h4>
                                    <ul>
                                        <li>• <strong>Flat:</strong> Use for &lt;100K vectors, guarantees exact results</li>
                                        <li>• <strong>IVF:</strong> Use for 100K-10M vectors, good speed/accuracy balance</li>
                                        <li>• <strong>HNSW:</strong> Use for &gt;1M vectors, fastest search but uses more memory</li>
                                        <li>• <strong>Training:</strong> IVF requires 256+ vectors for training</li>
                                        <li>• <strong>Memory:</strong> Flat and IVF use less memory than HNSW</li>
                                    </ul>
                                </div>

                                <button
                                    className="continue-button"
                                    onClick={() => { setActiveStep(1); markStepComplete(0); }}
                                >
                                    Continue to Vector Index Management
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="step-content-container">
                                <div className="step-header">
                                    <Layers className="w-8 h-8" />
                                    <h2>Vector Index Management</h2>
                                </div>

                                <p className="step-description">
                                    Implement persistence, backup, and management features for your vector index to ensure data safety and efficient operations.
                                </p>

                                <div className="setup-step">
                                    <h3>Step 1: Persistence and Backup Methods</h3>
                                    <CodeBlock
                                        language="python"
                                        id="persistence-methods"
                                        code={`# Continue vector_service.py

    def save_index(self, filename: str = None) -> bool:
        """Save the FAISS index and metadata to disk"""
        try:
            if filename is None:
                timestamp = int(time.time())
                filename = f"faiss_index_{timestamp}"
            
            index_path = self.storage_dir / f"{filename}.index"
            metadata_path = self.storage_dir / f"{filename}.metadata"
            config_path = self.storage_dir / f"{filename}.config"
            
            # Save FAISS index
            if self.index is not None and self.is_trained:
                faiss.write_index(self.index, str(index_path))
                logger.info(f"Saved FAISS index to {index_path}")
            
            # Save metadata
            metadata = {
                'id_to_metadata': self.id_to_metadata,
                'index_to_id': self.index_to_id,
                'id_to_index': self.id_to_index,
                'next_index': self.next_index,
                'is_trained': self.is_trained
            }
            
            with open(metadata_path, 'wb') as f:
                pickle.dump(metadata, f)
            
            # Save configuration
            config = {
                'dimension': self.dimension,
                'index_type': self.index_type,
                'storage_dir': str(self.storage_dir),
                'timestamp': time.time(),
                'vector_count': len(self.id_to_metadata)
            }
            
            with open(config_path, 'w') as f:
                json.dump(config, f, indent=2)
            
            logger.info(f"Index saved successfully: {len(self.id_to_metadata)} vectors")
            return True
            
        except Exception as e:
            logger.error(f"Failed to save index: {e}")
            return False
    
    def load_index(self, filename: str) -> bool:
        """Load FAISS index and metadata from disk"""
        try:
            index_path = self.storage_dir / f"{filename}.index"
            metadata_path = self.storage_dir / f"{filename}.metadata"
            config_path = self.storage_dir / f"{filename}.config"
            
            # Verify files exist
            if not all(p.exists() for p in [index_path, metadata_path, config_path]):
                logger.error(f"Index files not found for {filename}")
                return False
            
            # Load configuration
            with open(config_path, 'r') as f:
                config = json.load(f)
            
            # Verify compatibility
            if config['dimension'] != self.dimension:
                logger.error(f"Dimension mismatch: {config['dimension']} != {self.dimension}")
                return False
            
            if config['index_type'] != self.index_type:
                logger.warning(f"Index type mismatch: {config['index_type']} != {self.index_type}")
            
            # Load FAISS index
            self.index = faiss.read_index(str(index_path))
            logger.info(f"Loaded FAISS index from {index_path}")
            
            # Load metadata
            with open(metadata_path, 'rb') as f:
                metadata = pickle.load(f)
            
            self.id_to_metadata = metadata['id_to_metadata']
            self.index_to_id = metadata['index_to_id']
            self.id_to_index = metadata['id_to_index']
            self.next_index = metadata['next_index']
            self.is_trained = metadata['is_trained']
            
            logger.info(f"Loaded index with {len(self.id_to_metadata)} vectors")
            return True
            
        except Exception as e:
            logger.error(f"Failed to load index: {e}")
            return False
    
    def get_index_stats(self) -> Dict[str, Any]:
        """Get statistics about the current index"""
        stats = {
            'vector_count': len(self.id_to_metadata),
            'indexed_count': self.next_index if self.is_trained else 0,
            'dimension': self.dimension,
            'index_type': self.index_type,
            'is_trained': self.is_trained,
            'memory_usage_mb': 0,
            'modality_distribution': {},
            'storage_size_mb': 0
        }
        
        try:
            # Calculate memory usage
            if self.index is not None:
                # Approximate memory usage (FAISS doesn't provide exact method)
                stats['memory_usage_mb'] = (self.next_index * self.dimension * 4) / (1024 * 1024)
            
            # Modality distribution
            modality_counts = {}
            for item_data in self.id_to_metadata.values():
                modality = item_data.get('modality', 'unknown')
                modality_counts[modality] = modality_counts.get(modality, 0) + 1
            stats['modality_distribution'] = modality_counts
            
            # Storage size
            total_size = 0
            for file_path in self.storage_dir.glob("*"):
                if file_path.is_file():
                    total_size += file_path.stat().st_size
            stats['storage_size_mb'] = total_size / (1024 * 1024)
            
        except Exception as e:
            logger.error(f"Error calculating stats: {e}")
        
        return stats
    
    def list_saved_indices(self) -> List[Dict[str, Any]]:
        """List all saved indices in the storage directory"""
        indices = []
        
        try:
            # Find all config files
            for config_path in self.storage_dir.glob("*.config"):
                try:
                    with open(config_path, 'r') as f:
                        config = json.load(f)
                    
                    # Check if corresponding files exist
                    base_name = config_path.stem
                    index_path = self.storage_dir / f"{base_name}.index"
                    metadata_path = self.storage_dir / f"{base_name}.metadata"
                    
                    if index_path.exists() and metadata_path.exists():
                        config['filename'] = base_name
                        config['files_exist'] = True
                        config['size_mb'] = (
                            index_path.stat().st_size + 
                            metadata_path.stat().st_size + 
                            config_path.stat().st_size
                        ) / (1024 * 1024)
                        indices.append(config)
                    
                except Exception as e:
                    logger.error(f"Error reading config {config_path}: {e}")
            
            # Sort by timestamp (newest first)
            indices.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
            
        except Exception as e:
            logger.error(f"Error listing indices: {e}")
        
        return indices
    
    def cleanup_old_indices(self, keep_count: int = 5) -> int:
        """Remove old index files, keeping only the most recent ones"""
        try:
            indices = self.list_saved_indices()
            
            if len(indices) <= keep_count:
                return 0
            
            removed_count = 0
            for index_info in indices[keep_count:]:
                filename = index_info['filename']
                
                # Remove the three files
                for suffix in ['.index', '.metadata', '.config']:
                    file_path = self.storage_dir / f"{filename}{suffix}"
                    if file_path.exists():
                        file_path.unlink()
                
                removed_count += 1
                logger.info(f"Removed old index: {filename}")
            
            return removed_count
            
        except Exception as e:
            logger.error(f"Error during cleanup: {e}")
            return 0`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 2: Vector Management Operations</h3>
                                    <CodeBlock
                                        language="python"
                                        id="vector-management"
                                        code={`    def remove_vector(self, vector_id: str) -> bool:
        """Remove a vector from the index (note: FAISS doesn't support efficient removal)"""
        try:
            if vector_id not in self.id_to_metadata:
                logger.warning(f"Vector ID {vector_id} not found")
                return False
            
            # Remove from metadata
            del self.id_to_metadata[vector_id]
            
            # For FAISS, we can't efficiently remove from index
            # This is a limitation - in production, consider using a deletion bitmap
            # or rebuilding the index periodically
            
            if vector_id in self.id_to_index:
                faiss_index = self.id_to_index[vector_id]
                del self.index_to_id[faiss_index]
                del self.id_to_index[vector_id]
            
            logger.info(f"Removed vector {vector_id} from metadata")
            return True
            
        except Exception as e:
            logger.error(f"Failed to remove vector {vector_id}: {e}")
            return False
    
    def get_vector(self, vector_id: str) -> Optional[VectorItem]:
        """Retrieve a vector by ID"""
        try:
            if vector_id not in self.id_to_metadata:
                return None
            
            item_data = self.id_to_metadata[vector_id]
            return VectorItem(
                id=vector_id,
                vector=item_data['vector'],
                metadata=item_data['metadata'],
                modality=item_data['modality'],
                timestamp=item_data['timestamp']
            )
            
        except Exception as e:
            logger.error(f"Failed to get vector {vector_id}: {e}")
            return None
    
    def update_metadata(self, vector_id: str, new_metadata: Dict[str, Any]) -> bool:
        """Update metadata for an existing vector"""
        try:
            if vector_id not in self.id_to_metadata:
                logger.warning(f"Vector ID {vector_id} not found")
                return False
            
            self.id_to_metadata[vector_id]['metadata'].update(new_metadata)
            logger.info(f"Updated metadata for vector {vector_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to update metadata for {vector_id}: {e}")
            return False
    
    def rebuild_index(self) -> bool:
        """Rebuild the index from scratch (useful after many deletions)"""
        try:
            logger.info("Rebuilding index from scratch...")
            
            # Save current metadata
            old_metadata = self.id_to_metadata.copy()
            
            # Reinitialize
            self._initialize_index()
            self.id_to_metadata = {}
            self.index_to_id = {}
            self.id_to_index = {}
            self.next_index = 0
            
            # Re-add all vectors
            success_count = 0
            for vector_id, item_data in old_metadata.items():
                vector_item = VectorItem(
                    id=vector_id,
                    vector=item_data['vector'],
                    metadata=item_data['metadata'],
                    modality=item_data['modality'],
                    timestamp=item_data['timestamp']
                )
                
                if self.add_vector(vector_item):
                    success_count += 1
            
            logger.info(f"Index rebuilt: {success_count}/{len(old_metadata)} vectors")
            return True
            
        except Exception as e:
            logger.error(f"Failed to rebuild index: {e}")
            return False
    
    def export_vectors(self, output_path: str, format: str = 'json') -> bool:
        """Export all vectors and metadata"""
        try:
            export_data = {
                'metadata': {
                    'dimension': self.dimension,
                    'index_type': self.index_type,
                    'vector_count': len(self.id_to_metadata),
                    'export_timestamp': time.time()
                },
                'vectors': []
            }
            
            for vector_id, item_data in self.id_to_metadata.items():
                export_data['vectors'].append({
                    'id': vector_id,
                    'vector': item_data['vector'],
                    'metadata': item_data['metadata'],
                    'modality': item_data['modality'],
                    'timestamp': item_data['timestamp']
                })
            
            if format == 'json':
                with open(output_path, 'w') as f:
                    json.dump(export_data, f, indent=2)
            elif format == 'pickle':
                with open(output_path, 'wb') as f:
                    pickle.dump(export_data, f)
            else:
                raise ValueError(f"Unsupported format: {format}")
            
            logger.info(f"Exported {len(self.id_to_metadata)} vectors to {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to export vectors: {e}")
            return False
    
    def import_vectors(self, input_path: str, format: str = 'json') -> int:
        """Import vectors from file"""
        try:
            if format == 'json':
                with open(input_path, 'r') as f:
                    import_data = json.load(f)
            elif format == 'pickle':
                with open(input_path, 'rb') as f:
                    import_data = pickle.load(f)
            else:
                raise ValueError(f"Unsupported format: {format}")
            
            imported_count = 0
            for vector_data in import_data['vectors']:
                vector_item = VectorItem(
                    id=vector_data['id'],
                    vector=vector_data['vector'],
                    metadata=vector_data['metadata'],
                    modality=vector_data['modality'],
                    timestamp=vector_data['timestamp']
                )
                
                if self.add_vector(vector_item):
                    imported_count += 1
            
            logger.info(f"Imported {imported_count} vectors from {input_path}")
            return imported_count
            
        except Exception as e:
            logger.error(f"Failed to import vectors: {e}")
            return 0`}
                                    />
                                </div>
                                <div className="setup-step">
                                    <h3>Step 3: Auto-backup and Monitoring</h3>
                                    <CodeBlock
                                        language="python"
                                        id="auto-backup"
                                        code={`# Add to vector_service.py
                
                import threading
                from datetime import datetime, timedelta
                
                class VectorStoreManager:
                    """High-level manager for vector store with auto-backup and monitoring"""
                    
                    def __init__(self, vector_store: FAISSVectorStore):
                        self.vector_store = vector_store
                        self.auto_save_counter = 0
                        self.auto_save_interval = settings.vector_search.auto_save_interval
                        self.last_backup = time.time()
                        self.backup_interval = 3600  # 1 hour
                        self.stats_history = []
                        
                    def add_vector_with_backup(self, vector_item: VectorItem) -> bool:
                        """Add vector with automatic backup management"""
                        success = self.vector_store.add_vector(vector_item)
                        
                        if success:
                            self.auto_save_counter += 1
                            
                            # Auto-save check
                            if self.auto_save_counter >= self.auto_save_interval:
                                self._auto_save()
                                self.auto_save_counter = 0
                            
                            # Backup check
                            if time.time() - self.last_backup > self.backup_interval:
                                self._create_backup()
                                self.last_backup = time.time()
                        
                        return success
                    
                    def _auto_save(self):
                        """Perform automatic save"""
                        try:
                            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                            filename = f"autosave_{timestamp}"
                            
                            if self.vector_store.save_index(filename):
                                logger.info(f"Auto-save completed: {filename}")
                                
                                # Cleanup old auto-saves (keep last 3)
                                self._cleanup_auto_saves()
                            
                        except Exception as e:
                            logger.error(f"Auto-save failed: {e}")
                    
                    def _create_backup(self):
                        """Create a backup of the current index"""
                        try:
                            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                            filename = f"backup_{timestamp}"
                            
                            if self.vector_store.save_index(filename):
                                logger.info(f"Backup created: {filename}")
                                
                                # Cleanup old backups (keep last 5)
                                self._cleanup_backups()
                            
                        except Exception as e:
                            logger.error(f"Backup creation failed: {e}")
                    
                    def _cleanup_auto_saves(self):
                        """Remove old auto-save files"""
                        try:
                            all_indices = self.vector_store.list_saved_indices()
                            auto_saves = [idx for idx in all_indices if idx['filename'].startswith('autosave_')]
                            
                            if len(auto_saves) > 3:
                                for old_save in auto_saves[3:]:
                                    self._remove_index_files(old_save['filename'])
                                    logger.info(f"Removed old auto-save: {old_save['filename']}")
                            
                        except Exception as e:
                            logger.error(f"Auto-save cleanup failed: {e}")
                    
                    def _cleanup_backups(self):
                        """Remove old backup files"""
                        try:
                            all_indices = self.vector_store.list_saved_indices()
                            backups = [idx for idx in all_indices if idx['filename'].startswith('backup_')]
                            
                            if len(backups) > 5:
                                for old_backup in backups[5:]:
                                    self._remove_index_files(old_backup['filename'])
                                    logger.info(f"Removed old backup: {old_backup['filename']}")
                            
                        except Exception as e:
                            logger.error(f"Backup cleanup failed: {e}")
                    
                    def _remove_index_files(self, filename: str):
                        """Remove all files associated with an index"""
                        for suffix in ['.index', '.metadata', '.config']:
                            file_path = self.vector_store.storage_dir / f"{filename}{suffix}"
                            if file_path.exists():
                                file_path.unlink()
                    
                    def get_health_status(self) -> Dict[str, Any]:
                        """Get comprehensive health status"""
                        stats = self.vector_store.get_index_stats()
                        
                        # Add manager-specific stats
                        health = {
                            'vector_store': stats,
                            'auto_save': {
                                'counter': self.auto_save_counter,
                                'interval': self.auto_save_interval,
                                'next_save_in': self.auto_save_interval - self.auto_save_counter
                            },
                            'backup': {
                                'last_backup': self.last_backup,
                                'backup_interval': self.backup_interval,
                                'next_backup_in': max(0, self.backup_interval - (time.time() - self.last_backup))
                            },
                            'storage': {
                                'available_indices': len(self.vector_store.list_saved_indices()),
                                'storage_dir': str(self.vector_store.storage_dir),
                                'storage_size_mb': stats['storage_size_mb']
                            }
                        }
                        
                        # Add health score
                        health['health_score'] = self._calculate_health_score(health)
                        
                        return health
                    
                    def _calculate_health_score(self, health_data: Dict) -> float:
                        """Calculate a health score from 0-1"""
                        score = 1.0
                        
                        # Reduce score for various issues
                        vector_count = health_data['vector_store']['vector_count']
                        if vector_count == 0:
                            score -= 0.3
                        
                        if not health_data['vector_store']['is_trained'] and vector_count > 0:
                            score -= 0.2
                        
                        if health_data['storage']['storage_size_mb'] > 1000:  # >1GB
                            score -= 0.1
                        
                        return max(0.0, score)
                    
                    def force_backup(self) -> bool:
                        """Force an immediate backup"""
                        try:
                            self._create_backup()
                            return True
                        except Exception as e:
                            logger.error(f"Force backup failed: {e}")
                            return False`}
                                    />
                                </div>

                                <div className="feature-highlight">
                                    <h4>🔄 Index Management Features</h4>
                                    <ul>
                                        <li>• <strong>Auto-save:</strong> Automatic saving every N vector additions</li>
                                        <li>• <strong>Backup system:</strong> Regular backups with cleanup of old files</li>
                                        <li>• <strong>Health monitoring:</strong> Track index status and performance</li>
                                        <li>• <strong>Export/Import:</strong> Data portability and migration support</li>
                                        <li>• <strong>Rebuild capability:</strong> Recover from index corruption</li>
                                    </ul>
                                </div>

                                <button
                                    className="continue-button"
                                    onClick={() => { setActiveStep(2); markStepComplete(1); }}
                                >
                                    Continue to Search Implementation
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>)}

                        {activeStep === 2 && (
                            <div className="step-content-container">
                                <div className="step-header">
                                    <Search className="w-8 h-8" />
                                    <h2>Search Implementation</h2>
                                </div>

                                <p className="step-description">
                                    Implement powerful similarity search functionality with filtering, ranking, and cross-modal capabilities.
                                </p>

                                <div className="setup-step">
                                    <h3>Step 1: Core Search Methods</h3>
                                    <CodeBlock
                                        language="python"
                                        id="search-methods"
                                        code={`# Continue vector_service.py

    def search_similar(self, 
                      query_vector: List[float], 
                      k: int = 10,
                      similarity_threshold: float = 0.0,
                      modality_filter: Optional[str] = None,
                      metadata_filters: Optional[Dict[str, Any]] = None) -> List[SearchResult]:
        """
        Search for similar vectors
        
        Args:
            query_vector: Query vector to search for
            k: Number of results to return
            similarity_threshold: Minimum similarity score
            modality_filter: Filter by modality type
            metadata_filters: Filter by metadata fields
        """
        try:
            if not self.is_trained or self.index is None:
                logger.warning("Index not trained or available")
                return []
            
            if len(query_vector) != self.dimension:
                raise ValueError(f"Query vector dimension {len(query_vector)} != {self.dimension}")
            
            # Normalize query vector
            query = np.array(query_vector, dtype=np.float32).reshape(1, -1)
            query = query / np.linalg.norm(query, axis=1, keepdims=True)
            
            # Perform FAISS search
            search_k = min(k * 2, self.next_index)  # Search more to allow for filtering
            scores, indices = self.index.search(query, search_k)
            
            results = []
            for score, idx in zip(scores[0], indices[0]):
                if idx == -1:  # FAISS returns -1 for invalid indices
                    continue
                
                # Convert FAISS similarity (inner product) to cosine similarity
                similarity_score = float(score)
                
                if similarity_score < similarity_threshold:
                    continue
                
                # Get vector ID and metadata
                vector_id = self.index_to_id.get(idx)
                if vector_id is None:
                    continue
                
                item_data = self.id_to_metadata.get(vector_id)
                if item_data is None:
                    continue
                
                # Apply filters
                if modality_filter and item_data['modality'] != modality_filter:
                    continue
                
                if metadata_filters and not self._matches_metadata_filters(item_data['metadata'], metadata_filters):
                    continue
                
                result = SearchResult(
                    id=vector_id,
                    score=similarity_score,
                    metadata=item_data['metadata'],
                    modality=item_data['modality']
                )
                results.append(result)
                
                if len(results) >= k:
                    break
            
            # Sort by similarity score (descending)
            results.sort(key=lambda x: x.score, reverse=True)
            
            logger.debug(f"Search completed: {len(results)} results for k={k}")
            return results
            
        except Exception as e:
            logger.error(f"Search failed: {e}")
            return []
    
    def _matches_metadata_filters(self, metadata: Dict[str, Any], filters: Dict[str, Any]) -> bool:
        """Check if metadata matches the given filters"""
        try:
            for key, expected_value in filters.items():
                if key not in metadata:
                    return False
                
                actual_value = metadata[key]
                
                # Handle different filter types
                if isinstance(expected_value, dict):
                    # Range or operator filters
                    if '$gt' in expected_value and actual_value <= expected_value['$gt']:
                        return False
                    if '$lt' in expected_value and actual_value >= expected_value['$lt']:
                        return False
                    if '$gte' in expected_value and actual_value < expected_value['$gte']:
                        return False
                    if '$lte' in expected_value and actual_value > expected_value['$lte']:
                        return False
                    if '$in' in expected_value and actual_value not in expected_value['$in']:
                        return False
                    if '$ne' in expected_value and actual_value == expected_value['$ne']:
                        return False
                elif isinstance(expected_value, list):
                    # Multiple possible values
                    if actual_value not in expected_value:
                        return False
                else:
                    # Exact match
                    if actual_value != expected_value:
                        return False
            
            return True
            
        except Exception as e:
            logger.error(f"Filter matching failed: {e}")
            return False
    
    def search_by_id(self, vector_id: str, k: int = 10, exclude_self: bool = True) -> List[SearchResult]:
        """Search for vectors similar to a specific vector ID"""
        try:
            if vector_id not in self.id_to_metadata:
                logger.warning(f"Vector ID {vector_id} not found")
                return []
            
            query_vector = self.id_to_metadata[vector_id]['vector']
            results = self.search_similar(query_vector, k + (1 if exclude_self else 0))
            
            if exclude_self:
                results = [r for r in results if r.id != vector_id]
                results = results[:k]
            
            return results
            
        except Exception as e:
            logger.error(f"Search by ID failed: {e}")
            return []
    
    def cross_modal_search(self, 
                          query_vector: List[float], 
                          target_modality: str,
                          k: int = 10) -> List[SearchResult]:
        """Search for vectors of a specific modality"""
        return self.search_similar(
            query_vector=query_vector,
            k=k,
            modality_filter=target_modality
        )
    
    def batch_search(self, 
                    query_vectors: List[List[float]], 
                    k: int = 10) -> List[List[SearchResult]]:
        """Perform batch search for multiple query vectors"""
        try:
            if not self.is_trained or self.index is None:
                return [[] for _ in query_vectors]
            
            # Validate and normalize all query vectors
            queries = []
            for i, query_vector in enumerate(query_vectors):
                if len(query_vector) != self.dimension:
                    raise ValueError(f"Query vector {i} dimension {len(query_vector)} != {self.dimension}")
                
                query = np.array(query_vector, dtype=np.float32)
                query = query / np.linalg.norm(query)
                queries.append(query)
            
            query_matrix = np.vstack(queries)
            
            # Perform batch search
            scores, indices = self.index.search(query_matrix, k)
            
            # Process results for each query
            all_results = []
            for query_idx in range(len(query_vectors)):
                query_results = []
                
                for score, idx in zip(scores[query_idx], indices[query_idx]):
                    if idx == -1:
                        continue
                    
                    vector_id = self.index_to_id.get(idx)
                    if vector_id is None:
                        continue
                    
                    item_data = self.id_to_metadata.get(vector_id)
                    if item_data is None:
                        continue
                    
                    result = SearchResult(
                        id=vector_id,
                        score=float(score),
                        metadata=item_data['metadata'],
                        modality=item_data['modality']
                    )
                    query_results.append(result)
                
                # Sort by score
                query_results.sort(key=lambda x: x.score, reverse=True)
                all_results.append(query_results)
            
            return all_results
            
        except Exception as e:
            logger.error(f"Batch search failed: {e}")
            return [[] for _ in query_vectors]`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 2: Advanced Search Features</h3>
                                    <CodeBlock
                                        language="python"
                                        id="advanced-search"
                                        code={`    def search_with_diversity(self, 
                             query_vector: List[float], 
                             k: int = 10,
                             diversity_threshold: float = 0.8) -> List[SearchResult]:
        """
        Search with diversity - avoid returning very similar results
        """
        try:
            # Get more results than needed
            initial_results = self.search_similar(query_vector, k * 3)
            
            if not initial_results:
                return []
            
            # Select diverse results
            selected = [initial_results[0]]  # Always include best match
            
            for candidate in initial_results[1:]:
                if len(selected) >= k:
                    break
                
                # Check if candidate is diverse enough
                is_diverse = True
                for selected_result in selected:
                    # Calculate similarity between candidate and selected results
                    similarity = self._calculate_vector_similarity(
                        self.id_to_metadata[candidate.id]['vector'],
                        self.id_to_metadata[selected_result.id]['vector']
                    )
                    
                    if similarity > diversity_threshold:
                        is_diverse = False
                        break
                
                if is_diverse:
                    selected.append(candidate)
            
            return selected
            
        except Exception as e:
            logger.error(f"Diverse search failed: {e}")
            return []
    
    def _calculate_vector_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors"""
        try:
            v1 = np.array(vec1)
            v2 = np.array(vec2)
            
            # Normalize vectors
            v1_norm = v1 / np.linalg.norm(v1)
            v2_norm = v2 / np.linalg.norm(v2)
            
            # Calculate cosine similarity
            similarity = np.dot(v1_norm, v2_norm)
            return float(similarity)
            
        except Exception as e:
            logger.error(f"Similarity calculation failed: {e}")
            return 0.0
    
    def search_with_reranking(self, 
                             query_vector: List[float],
                             k: int = 10,
                             rerank_factor: int = 3) -> List[SearchResult]:
        """
        Search with reranking - retrieve more candidates and rerank them
        """
        try:
            # Retrieve more candidates
            candidates = self.search_similar(query_vector, k * rerank_factor)
            
            if not candidates:
                return []
            
            # Rerank based on additional criteria
            for result in candidates:
                item_data = self.id_to_metadata[result.id]
                
                # Add recency bonus (newer vectors get slight boost)
                days_old = (time.time() - item_data['timestamp']) / (24 * 3600)
                recency_bonus = max(0, 0.1 * (1 - days_old / 30))  # Boost for vectors < 30 days
                
                # Add modality diversity bonus
                modality_bonus = 0.05 if result.modality != 'text' else 0  # Slightly favor non-text
                
                # Combine scores
                result.score = result.score + recency_bonus + modality_bonus
            
            # Re-sort and return top k
            candidates.sort(key=lambda x: x.score, reverse=True)
            return candidates[:k]
            
        except Exception as e:
            logger.error(f"Reranking search failed: {e}")
            return []
    
    def get_vector_neighbors(self, 
                           vector_id: str, 
                           radius: float = 0.7,
                           max_results: int = 100) -> List[SearchResult]:
        """
        Get all vectors within a similarity radius
        """
        try:
            if vector_id not in self.id_to_metadata:
                return []
            
            query_vector = self.id_to_metadata[vector_id]['vector']
            
            # Search with high k to get many candidates
            candidates = self.search_similar(query_vector, max_results, similarity_threshold=radius)
            
            # Filter out the query vector itself
            neighbors = [r for r in candidates if r.id != vector_id]
            
            return neighbors
            
        except Exception as e:
            logger.error(f"Neighbor search failed: {e}")
            return []
    
    def find_outliers(self, 
                     sample_size: int = 1000,
                     outlier_threshold: float = 0.3) -> List[str]:
        """
        Find potential outlier vectors (vectors that are dissimilar to most others)
        """
        try:
            if len(self.id_to_metadata) < sample_size:
                vector_ids = list(self.id_to_metadata.keys())
            else:
                vector_ids = np.random.choice(
                    list(self.id_to_metadata.keys()), 
                    sample_size, 
                    replace=False
                ).tolist()
            
            outliers = []
            
            for vector_id in vector_ids:
                # Find nearest neighbors
                neighbors = self.search_by_id(vector_id, k=5, exclude_self=True)
                
                if not neighbors:
                    outliers.append(vector_id)
                    continue
                
                # Check if best similarity is below threshold
                best_similarity = neighbors[0].score if neighbors else 0
                
                if best_similarity < outlier_threshold:
                    outliers.append(vector_id)
            
            return outliers
            
        except Exception as e:
            logger.error(f"Outlier detection failed: {e}")
            return []
    
    def cluster_vectors(self, 
                       n_clusters: int = 10,
                       sample_size: int = 1000) -> Dict[int, List[str]]:
        """
        Simple clustering of vectors using k-means
        """
        try:
            from sklearn.cluster import KMeans
            
            # Sample vectors for clustering
            if len(self.id_to_metadata) <= sample_size:
                vector_ids = list(self.id_to_metadata.keys())
            else:
                vector_ids = np.random.choice(
                    list(self.id_to_metadata.keys()), 
                    sample_size, 
                    replace=False
                ).tolist()
            
            # Extract vectors
            vectors = []
            for vector_id in vector_ids:
                vector = self.id_to_metadata[vector_id]['vector']
                vectors.append(vector)
            
            vectors_array = np.array(vectors)
            
            # Perform clustering
            kmeans = KMeans(n_clusters=n_clusters, random_state=42)
            cluster_labels = kmeans.fit_predict(vectors_array)
            
            # Group by cluster
            clusters = {}
            for vector_id, cluster_id in zip(vector_ids, cluster_labels):
                cluster_id = int(cluster_id)
                if cluster_id not in clusters:
                    clusters[cluster_id] = []
                clusters[cluster_id].append(vector_id)
            
            return clusters
            
        except ImportError:
            logger.error("scikit-learn not available for clustering")
            return {}
        except Exception as e:
            logger.error(f"Clustering failed: {e}")
            return {}`}
                                    />
                                </div>

                                <div className="tips-card">
                                    <h4>🔍 Search Strategy Guide</h4>
                                    <ul>
                                        <li>• <strong>Basic search:</strong> Use for most queries, fast and accurate</li>
                                        <li>• <strong>Diverse search:</strong> Avoid duplicate results, good for recommendations</li>
                                        <li>• <strong>Reranking:</strong> Improve results with additional scoring criteria</li>
                                        <li>• <strong>Cross-modal:</strong> Find images similar to text descriptions</li>
                                        <li>• <strong>Batch search:</strong> Efficient when processing multiple queries</li>
                                    </ul>
                                </div>

                                <button
                                    className="continue-button"
                                    onClick={() => { setActiveStep(3); markStepComplete(2); }}
                                >
                                    Continue to Performance Optimization
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                        {activeStep === 3 && (
                            <div className="step-content-container">
                                <div className="step-header">
                                    <Gauge className="w-8 h-8" />
                                    <h2>Performance Optimization</h2>
                                </div>

                                <p className="step-description">
                                    Optimize your vector search for speed, memory efficiency, and accuracy with advanced FAISS techniques and caching strategies.
                                </p>
                                <div className="setup-step">
                                    <h3>Step 1: Performance Monitoring</h3>
                                    <CodeBlock
                                        language="python"
                                        id="performance-monitoring"
                                        code={`# Create performance_monitor.py
import time
import psutil
import threading
from collections import deque, defaultdict
from dataclasses import dataclass
from typing import Dict, List, Optional
import numpy as np

@dataclass
class SearchMetrics:
    """Metrics for a single search operation"""
    query_time_ms: float
    vector_count: int
    k: int
    results_found: int
    index_type: str
    timestamp: float

class PerformanceMonitor:
    """Monitor and track vector search performance"""
    
    def __init__(self, max_history: int = 1000):
        self.max_history = max_history
        self.search_history = deque(maxlen=max_history)
        self.operation_times = defaultdict(deque)
        self.memory_samples = deque(maxlen=100)
        self.lock = threading.Lock()
        
        # Start background monitoring
        self.monitoring_active = True
        self.monitor_thread = threading.Thread(target=self._background_monitor, daemon=True)
        self.monitor_thread.start()
    
    def record_search(self, metrics: SearchMetrics):
        """Record search operation metrics"""
        with self.lock:
            self.search_history.append(metrics)
    
    def record_operation(self, operation: str, duration_ms: float):
        """Record any operation timing"""
        with self.lock:
            self.operation_times[operation].append(duration_ms)
            if len(self.operation_times[operation]) > 100:
                self.operation_times[operation].popleft()
    
    def _background_monitor(self):
        """Background thread to monitor system resources"""
        while self.monitoring_active:
            try:
                # Sample memory usage
                memory_info = psutil.virtual_memory()
                self.memory_samples.append({
                    'timestamp': time.time(),
                    'memory_percent': memory_info.percent,
                    'memory_used_gb': memory_info.used / (1024**3),
                    'memory_available_gb': memory_info.available / (1024**3)
                })
                
                time.sleep(10)  # Sample every 10 seconds
                
            except Exception as e:
                logger.error(f"Background monitoring error: {e}")
                time.sleep(30)
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """Get comprehensive performance statistics"""
        with self.lock:
            stats = {
                'search_performance': self._analyze_search_performance(),
                'operation_performance': self._analyze_operation_performance(),
                'memory_usage': self._analyze_memory_usage(),
                'recommendations': self._get_performance_recommendations()
            }
        return stats
    
    def _analyze_search_performance(self) -> Dict[str, Any]:
        """Analyze search operation performance"""
        if not self.search_history:
            return {'no_data': True}
        
        recent_searches = list(self.search_history)
        query_times = [s.query_time_ms for s in recent_searches]
        k_values = [s.k for s in recent_searches]
        result_counts = [s.results_found for s in recent_searches]
        
        # Group by index type
        by_index_type = defaultdict(list)
        for search in recent_searches:
            by_index_type[search.index_type].append(search.query_time_ms)
        
        analysis = {
            'total_searches': len(recent_searches),
            'avg_query_time_ms': np.mean(query_times),
            'median_query_time_ms': np.median(query_times),
            'p95_query_time_ms': np.percentile(query_times, 95),
            'p99_query_time_ms': np.percentile(query_times, 99),
            'avg_k': np.mean(k_values),
            'avg_results_found': np.mean(result_counts),
            'by_index_type': {}
        }
        
        # Per-index-type analysis
        for index_type, times in by_index_type.items():
            analysis['by_index_type'][index_type] = {
                'count': len(times),
                'avg_time_ms': np.mean(times),
                'median_time_ms': np.median(times)
            }
        
        return analysis
    
    def _analyze_operation_performance(self) -> Dict[str, Any]:
        """Analyze general operation performance"""
        analysis = {}
        
        for operation, times in self.operation_times.items():
            if times:
                times_list = list(times)
                analysis[operation] = {
                    'count': len(times_list),
                    'avg_time_ms': np.mean(times_list),
                    'median_time_ms': np.median(times_list),
                    'max_time_ms': np.max(times_list),
                    'min_time_ms': np.min(times_list)
                }
        
        return analysis
    
    def _analyze_memory_usage(self) -> Dict[str, Any]:
        """Analyze memory usage patterns"""
        if not self.memory_samples:
            return {'no_data': True}
        
        samples = list(self.memory_samples)
        memory_percents = [s['memory_percent'] for s in samples]
        memory_used = [s['memory_used_gb'] for s in samples]
        
        return {
            'current_memory_percent': memory_percents[-1] if memory_percents else 0,
            'avg_memory_percent': np.mean(memory_percents),
            'max_memory_percent': np.max(memory_percents),
            'current_memory_used_gb': memory_used[-1] if memory_used else 0,
            'avg_memory_used_gb': np.mean(memory_used),
            'max_memory_used_gb': np.max(memory_used),
            'sample_count': len(samples)
        }
    
    def _get_performance_recommendations(self) -> List[str]:
        """Generate performance recommendations"""
        recommendations = []
        
        if not self.search_history:
            return recommendations
        
        # Analyze recent performance
        recent_searches = list(self.search_history)[-100:]  # Last 100 searches
        avg_query_time = np.mean([s.query_time_ms for s in recent_searches])
        
        # Query time recommendations
        if avg_query_time > 100:
            recommendations.append("Average query time is high (>100ms). Consider using IVF or HNSW index.")
        elif avg_query_time > 50:
            recommendations.append("Query time could be improved. Consider index optimization.")
        
        # Memory recommendations
        if self.memory_samples:
            current_memory = self.memory_samples[-1]['memory_percent']
            if current_memory > 90:
                recommendations.append("High memory usage detected. Consider reducing index size or using compression.")
            elif current_memory > 75:
                recommendations.append("Memory usage is elevated. Monitor for potential issues.")
        
        # Index type recommendations
        by_index = defaultdict(list)
        for search in recent_searches:
            by_index[search.index_type].append(search.query_time_ms)
        
        if 'Flat' in by_index and len(recent_searches) > 0:
            vector_count = recent_searches[-1].vector_count
            if vector_count > 100000:
                recommendations.append("Large vector count with Flat index. Consider switching to IVF for better performance.")
        
        return recommendations
    
    def stop_monitoring(self):
        """Stop background monitoring"""
        self.monitoring_active = False
        if self.monitor_thread.is_alive():
            self.monitor_thread.join(timeout=5)  
            
            
            `} />
                                </div>
                                <div className="setup-step">
                                    <h3>Step 2: Caching and Optimization</h3>
                                    <CodeBlock
                                        language="python"
                                        id="caching-optimization"
                                        code={`# Add to vector_service.py

import hashlib
from functools import lru_cache
import pickle

class OptimizedVectorStore(FAISSVectorStore):
    """Enhanced vector store with caching and optimization"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.query_cache = {}
        self.cache_max_size = 1000
        self.performance_monitor = PerformanceMonitor()
        
        # Optimization settings
        self.batch_size = 32
        self.prefetch_enabled = True
        self.compression_enabled = False
    
    def _get_query_hash(self, query_vector: List[float], k: int, filters: Dict = None) -> str:
        """Generate hash for query caching"""
        # Create a deterministic hash from query parameters
        query_str = f"{query_vector[:10]}_{k}_{str(filters)}"  # Use first 10 dims for speed
        return hashlib.md5(query_str.encode()).hexdigest()
    
    def search_similar_cached(self, 
                             query_vector: List[float], 
                             k: int = 10,
                             **kwargs) -> List[SearchResult]:
        """Search with result caching"""
        start_time = time.time()
        
        # Check cache first
        cache_key = self._get_query_hash(query_vector, k, kwargs)
        
        if cache_key in self.query_cache:
            cached_result, timestamp = self.query_cache[cache_key]
            
            # Use cached result if it's less than 5 minutes old
            if time.time() - timestamp < 300:
                logger.debug(f"Cache hit for query {cache_key[:8]}")
                return cached_result
            else:
                # Remove expired cache entry
                del self.query_cache[cache_key]
        
        # Perform actual search
        results = self.search_similar(query_vector, k, **kwargs)
        
        # Cache the result
        if len(self.query_cache) >= self.cache_max_size:
            # Remove oldest cache entry
            oldest_key = min(self.query_cache.keys(), 
                           key=lambda k: self.query_cache[k][1])
            del self.query_cache[oldest_key]
        
        self.query_cache[cache_key] = (results, time.time())
        
        # Record performance metrics
        query_time = (time.time() - start_time) * 1000
        metrics = SearchMetrics(
            query_time_ms=query_time,
            vector_count=len(self.id_to_metadata),
            k=k,
            results_found=len(results),
            index_type=self.index_type,
            timestamp=time.time()
        )
        self.performance_monitor.record_search(metrics)
        
        return results
    
    def optimize_index_parameters(self):
        """Automatically optimize index parameters based on data"""
        try:
            vector_count = len(self.id_to_metadata)
            
            if self.index_type == "IVF" and vector_count > 1000:
                # Optimize nlist parameter
                optimal_nlist = min(max(int(np.sqrt(vector_count)), 100), 1000)
                
                if hasattr(self.index, 'nlist') and self.index.nlist != optimal_nlist:
                    logger.info(f"Optimizing IVF nlist: {self.index.nlist} -> {optimal_nlist}")
                    
                    # Rebuild index with optimal parameters
                    old_vectors = []
                    for item_data in self.id_to_metadata.values():
                        old_vectors.append(item_data['vector'])
                    
                    # Create new optimized index
                    quantizer = faiss.IndexFlatIP(self.dimension)
                    new_index = faiss.IndexIVFFlat(quantizer, self.dimension, optimal_nlist)
                    
                    if old_vectors:
                        vectors_array = np.array(old_vectors, dtype=np.float32)
                        vectors_array = vectors_array / np.linalg.norm(vectors_array, axis=1, keepdims=True)
                        
                        new_index.train(vectors_array)
                        new_index.add(vectors_array)
                        
                        self.index = new_index
                        self.is_trained = True
                        logger.info("Index optimization completed")
            
            elif self.index_type == "HNSW" and vector_count > 10000:
                # Optimize HNSW parameters for large datasets
                if hasattr(self.index, 'hnsw'):
                    self.index.hnsw.efSearch = min(100, max(50, int(np.log2(vector_count) * 10)))
                    logger.info(f"Optimized HNSW efSearch: {self.index.hnsw.efSearch}")
            
        except Exception as e:
            logger.error(f"Index optimization failed: {e}")
    
    def enable_gpu_acceleration(self):
        """Enable GPU acceleration if available"""
        try:
            import faiss
            
            if not faiss.get_num_gpus():
                logger.warning("No GPUs available for acceleration")
                return False
            
            # Move index to GPU
            gpu_resources = faiss.StandardGpuResources()
            self.index = faiss.index_cpu_to_gpu(gpu_resources, 0, self.index)
            
            logger.info("GPU acceleration enabled")
            return True
            
        except Exception as e:
            logger.error(f"GPU acceleration failed: {e}")
            return False
    
    def compress_index(self):
        """Apply compression to reduce memory usage"""
        try:
            if self.index_type != "IVF":
                logger.warning("Compression only supported for IVF indices")
                return False
            
            # Create compressed index
            compressed_index = faiss.IndexIVFPQ(
                self.index.quantizer,
                self.dimension,
                self.index.nlist,
                8,  # Number of sub-quantizers
                8   # Bits per sub-quantizer
            )
            
            # Train and populate compressed index
            if self.is_trained:
                training_vectors = []
                for item_data in self.id_to_metadata.values():
                    vector = np.array(item_data['vector'], dtype=np.float32)
                    vector = vector / np.linalg.norm(vector)
                    training_vectors.append(vector)
                
                if training_vectors:
                    training_data = np.vstack(training_vectors)
                    compressed_index.train(training_data)
                    compressed_index.add(training_data)
                    
                    self.index = compressed_index
                    self.compression_enabled = True
                    
                    logger.info("Index compression enabled")
                    return True
            
            return False
            
        except Exception as e:
            logger.error(f"Index compression failed: {e}")
            return False
    
    def benchmark_search_performance(self, 
                                   num_queries: int = 100,
                                   k_values: List[int] = [1, 5, 10, 50]) -> Dict[str, Any]:
        """Benchmark search performance with different parameters"""
        if not self.is_trained or len(self.id_to_metadata) < num_queries:
            return {'error': 'Insufficient data for benchmarking'}
        
        # Select random vectors for queries
        random_ids = np.random.choice(
            list(self.id_to_metadata.keys()), 
            min(num_queries, len(self.id_to_metadata)), 
            replace=False
        )
        
        query_vectors = [self.id_to_metadata[vid]['vector'] for vid in random_ids]
        
        results = {}
        
        for k in k_values:
            times = []
            accuracy_scores = []
            
            for query_vector in query_vectors:
                # Time the search
                start_time = time.time()
                search_results = self.search_similar(query_vector, k)
                query_time = (time.time() - start_time) * 1000
                times.append(query_time)
                
                # Simple accuracy metric: check if we got k results
                accuracy = len(search_results) / k if k > 0 else 1.0
                accuracy_scores.append(accuracy)
            
            results[f'k_{k}'] = {
                'avg_time_ms': np.mean(times),
                'median_time_ms': np.median(times),
                'p95_time_ms': np.percentile(times, 95),
                'avg_accuracy': np.mean(accuracy_scores),
                'throughput_qps': 1000 / np.mean(times) if np.mean(times) > 0 else 0
            }
        
        return {
            'benchmark_results': results,
            'index_type': self.index_type,
            'vector_count': len(self.id_to_metadata),
            'dimension': self.dimension,
            'num_queries': len(query_vectors)
        }
    
    def clear_cache(self):
        """Clear the query cache"""
        self.query_cache.clear()
        logger.info("Query cache cleared")
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache performance statistics"""
        return {
            'cache_size': len(self.query_cache),
            'cache_max_size': self.cache_max_size,
            'cache_utilization': len(self.query_cache) / self.cache_max_size,
            'oldest_entry_age_seconds': min(
                (time.time() - timestamp for _, timestamp in self.query_cache.values()),
                default=0
            ),
            'newest_entry_age_seconds': max(
                (time.time() - timestamp for _, timestamp in self.query_cache.values()),
                default=0
            )
        }`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 3: Advanced Index Configurations</h3>
                                    <CodeBlock
                                        language="python"
                                        id="advanced-configs"
                                        code={`# Create index_factory.py

class IndexFactory:
    """Factory for creating optimized FAISS indices"""
    
    @staticmethod
    def create_optimal_index(vector_count: int, 
                           dimension: int,
                           memory_budget_gb: float = 2.0,
                           query_latency_target_ms: float = 10.0,
                           accuracy_target: float = 0.95) -> tuple:
        """
        Create an optimal FAISS index based on requirements
        
        Returns: (index, config_dict)
        """
        
        config = {
            'vector_count': vector_count,
            'dimension': dimension,
            'memory_budget_gb': memory_budget_gb,
            'latency_target_ms': query_latency_target_ms,
            'accuracy_target': accuracy_target
        }
        
        # Memory estimation (rough)
        flat_memory_gb = (vector_count * dimension * 4) / (1024**3)
        
        if vector_count < 1000:
            # Small dataset - use exact search
            index = faiss.IndexFlatIP(dimension)
            config['index_type'] = 'Flat'
            config['exact_search'] = True
            
        elif vector_count < 100000 and flat_memory_gb < memory_budget_gb:
            # Medium dataset, fits in memory - use exact search
            index = faiss.IndexFlatIP(dimension)
            config['index_type'] = 'Flat'
            config['exact_search'] = True
            
        elif query_latency_target_ms < 5 and accuracy_target < 0.9:
            # Need very fast search, can sacrifice some accuracy
            M = 32
            index = faiss.IndexHNSWFlat(dimension, M)
            index.hnsw.efConstruction = 200
            index.hnsw.efSearch = 16  # Low for speed
            config['index_type'] = 'HNSW'
            config['M'] = M
            config['efSearch'] = 16
            
        elif memory_budget_gb < 1.0:
            # Memory constrained - use compressed index
            nlist = min(int(np.sqrt(vector_count)), 1000)
            quantizer = faiss.IndexFlatIP(dimension)
            index = faiss.IndexIVFPQ(quantizer, dimension, nlist, 8, 8)
            config['index_type'] = 'IVFPQ'
            config['nlist'] = nlist
            config['compressed'] = True
            
        else:
            # Balanced approach - IVF
            nlist = min(int(np.sqrt(vector_count)), 1000)
            quantizer = faiss.IndexFlatIP(dimension)
            index = faiss.IndexIVFFlat(quantizer, dimension, nlist)
            config['index_type'] = 'IVF'
            config['nlist'] = nlist
        
        return index, config
    
    @staticmethod
    def create_hybrid_index(dimension: int, nlist: int = 100) -> faiss.Index:
        """Create a hybrid index that balances speed and accuracy"""
        
        # Create multiple sub-indices with different characteristics
        quantizer = faiss.IndexFlatIP(dimension)
        
        # Fast but less accurate index
        fast_index = faiss.IndexIVFFlat(quantizer, dimension, nlist)
        
        # More accurate but slower index  
        accurate_index = faiss.IndexIVFFlat(quantizer, dimension, nlist * 2)
        
        # In practice, you would use a custom search strategy
        # This is a simplified example
        return fast_index
    
    @staticmethod
    def tune_index_for_workload(index: faiss.Index, 
                              workload_profile: Dict[str, Any]) -> bool:
        """Tune index parameters based on workload characteristics"""
        try:
            workload_type = workload_profile.get('type', 'balanced')
            avg_k = workload_profile.get('avg_k', 10)
            query_frequency = workload_profile.get('queries_per_second', 100)
            
            if hasattr(index, 'hnsw'):
                # Tune HNSW parameters
                if workload_type == 'low_latency':
                    index.hnsw.efSearch = max(16, avg_k)
                elif workload_type == 'high_accuracy':
                    index.hnsw.efSearch = max(100, avg_k * 2)
                else:
                    index.hnsw.efSearch = max(50, avg_k)
                
                return True
                
            elif hasattr(index, 'nprobe'):
                # Tune IVF parameters
                if workload_type == 'low_latency':
                    index.nprobe = max(1, min(10, int(index.nlist * 0.05)))
                elif workload_type == 'high_accuracy':
                    index.nprobe = max(10, min(100, int(index.nlist * 0.2)))
                else:
                    index.nprobe = max(5, min(50, int(index.nlist * 0.1)))
                
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Index tuning failed: {e}")
            return False

# Integration with vector store
class ProductionVectorStore(OptimizedVectorStore):
    """Production-ready vector store with all optimizations"""
    
    def __init__(self, *args, **kwargs):
        # Auto-select optimal index type
        estimated_vectors = kwargs.pop('estimated_vector_count', 10000)
        memory_budget = kwargs.pop('memory_budget_gb', 4.0)
        
        # Use factory to create optimal index
        temp_index, index_config = IndexFactory.create_optimal_index(
            estimated_vectors, 
            kwargs.get('dimension', 1024),
            memory_budget
        )
        
        # Override index_type with optimal choice
        kwargs['index_type'] = index_config['index_type']
        
        super().__init__(*args, **kwargs)
        
        # Store configuration
        self.index_config = index_config
        
        # Enable optimizations
        self.auto_optimization_enabled = True
        self.optimization_interval = 1000  # Re-optimize every 1000 additions
        self.addition_count = 0
    
    def add_vector(self, vector_item: VectorItem) -> bool:
        """Add vector with automatic optimization"""
        start_time = time.time()
        
        success = super().add_vector(vector_item)
        
        if success:
            self.addition_count += 1
            
            # Record operation time
            operation_time = (time.time() - start_time) * 1000
            self.performance_monitor.record_operation('add_vector', operation_time)
            
            # Auto-optimization check
            if (self.auto_optimization_enabled and 
                self.addition_count % self.optimization_interval == 0):
                self._auto_optimize()
        
        return success
    
    def _auto_optimize(self):
        """Perform automatic optimization"""
        try:
            logger.info("Starting automatic optimization...")
            
            # Optimize index parameters
            self.optimize_index_parameters()
            
            # Clear old cache entries
            if len(self.query_cache) > self.cache_max_size * 0.8:
                self.clear_cache()
            
            # Check if compression would be beneficial
            if (not self.compression_enabled and 
                len(self.id_to_metadata) > 50000):
                
                memory_usage = self._estimate_memory_usage()
                if memory_usage > self.index_config.get('memory_budget_gb', 4.0):
                    self.compress_index()
            
            logger.info("Automatic optimization completed")
            
        except Exception as e:
            logger.error(f"Auto-optimization failed: {e}")
    
    def _estimate_memory_usage(self) -> float:
        """Estimate current memory usage in GB"""
        vector_count = len(self.id_to_metadata)
        dimension = self.dimension
        
        # Base vector storage
        base_memory = (vector_count * dimension * 4) / (1024**3)
        
        # Index overhead (approximate)
        if self.index_type == 'HNSW':
            overhead = base_memory * 1.5  # HNSW uses more memory
        elif self.index_type == 'IVF':
            overhead = base_memory * 0.1  # IVF has modest overhead
        else:
            overhead = 0  # Flat index has no overhead
        
        return base_memory + overhead`}
                                    />
                                </div>

                                <div className="feature-highlight">
                                    <h4>⚡ Performance Optimization Features</h4>
                                    <ul>
                                        <li>• <strong>Query caching:</strong> Cache frequent searches for instant results</li>
                                        <li>• <strong>Auto-optimization:</strong> Automatically tune index parameters</li>
                                        <li>• <strong>Memory management:</strong> Compression and efficient storage</li>
                                        <li>• <strong>GPU acceleration:</strong> Leverage GPU for faster searches</li>
                                        <li>• <strong>Performance monitoring:</strong> Track and analyze search metrics</li>
                                    </ul>
                                </div>

                                <button
                                    className="continue-button"
                                    onClick={() => { setActiveStep(4); markStepComplete(3); }}
                                >
                                    Continue to API Integration
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>)}
                        {activeStep === 4 && (
                            <div className="step-content-container">
                                <div className="step-header">
                                    <BarChart3 className="w-8 h-8" />
                                    <h2>API Integration</h2>
                                </div>

                                <p className="step-description">
                                    Integrate the vector search functionality into your FastAPI application with new endpoints for similarity search and vector management.
                                </p>

                                <div className="setup-step">
                                    <h3>Step 1: Search API Endpoints</h3>
                                    <CodeBlock
                                        language="python"
                                        id="search-endpoints"
                                        code={`# Add to main.py

from vector_service import ProductionVectorStore, VectorStoreManager, VectorItem
from performance_monitor import PerformanceMonitor
from models import SearchRequest, SearchResponse, VectorManagementRequest

# Global vector store
vector_store = None
vector_manager = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize vector store
    global vector_store, vector_manager
    print("🚀 Initializing vector search system...")
    
    # Initialize ImageBind service (existing)
    imagebind_service = ImageBindService()
    await imagebind_service.initialize()
    
    # Initialize vector store
    vector_store = ProductionVectorStore(
        dimension=1024,
        estimated_vector_count=100000,
        memory_budget_gb=4.0
    )
    
    # Try to load existing index
    indices = vector_store.list_saved_indices()
    if indices:
        latest_index = indices[0]['filename']
        if vector_store.load_index(latest_index):
            print(f"✅ Loaded existing index: {latest_index}")
        else:
            print("⚠️ Failed to load existing index, starting fresh")
    
    # Initialize manager
    vector_manager = VectorStoreManager(vector_store)
    
    print("✅ Vector search system ready!")
    
    yield
    
    # Shutdown: Save vector store
    print("🔄 Saving vector store...")
    if vector_store:
        vector_store.save_index("final_index")
    print("✅ Shutdown complete!")

# Update the FastAPI app
app = FastAPI(
    title="ImageBind Multimodal Search API",
    description="Generate embeddings and search across modalities using ImageBind + FAISS",
    version="2.0.0",
    lifespan=lifespan
)

@app.post("/search/similar", response_model=List[SearchResponse])
async def search_similar_vectors(
    embedding: List[float],
    k: int = 10,
    similarity_threshold: float = 0.0,
    modality_filter: Optional[str] = None,
    metadata_filters: Optional[Dict[str, Any]] = None
):
    """Search for similar vectors"""
    try:
        global vector_store
        
        if not vector_store:
            raise HTTPException(status_code=503, detail="Vector store not available")
        
        # Validate inputs
        if len(embedding) != 1024:
            raise HTTPException(status_code=400, detail="Embedding must be 1024-dimensional")
        
        if k > 100:
            raise HTTPException(status_code=400, detail="k cannot exceed 100")
        
        # Perform search
        results = vector_store.search_similar_cached(
            query_vector=embedding,
            k=k,
            similarity_threshold=similarity_threshold,
            modality_filter=modality_filter,
            metadata_filters=metadata_filters
        )
        
        # Convert to response format
        search_responses = []
        for result in results:
            search_responses.append(SearchResponse(
                id=result.id,
                similarity_score=result.score,
                metadata=result.metadata,
                modality=result.modality
            ))
        
        return search_responses
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.post("/search/by_id")
async def search_by_vector_id(
    vector_id: str,
    k: int = 10,
    exclude_self: bool = True
):
    """Find vectors similar to a specific vector ID"""
    try:
        global vector_store
        
        if not vector_store:
            raise HTTPException(status_code=503, detail="Vector store not available")
        
        results = vector_store.search_by_id(vector_id, k, exclude_self)
        
        return [SearchResponse(
            id=result.id,
            similarity_score=result.score,
            metadata=result.metadata,
            modality=result.modality
        ) for result in results]
        
    except Exception as e:    def record_operation(self, operation: str, duration_ms: float):
        """Record any operation timing"""
        with self.lock:
            self.operation_times[operation].append(duration_ms)
            if len(self.operation_times[operation]) > 100:
                self.operation_times[operation].popleft()
    
    def _background_monitor(self):
        """Background thread to monitor system resources"""
        while self.monitoring_active:
            try:
                # Sample memory usage
                memory_info = psutil.virtual_memory()
                self.memory_samples.append({
                    'timestamp': time.time(),
                    'memory_percent': memory_info.percent,
                    'memory_used_gb': memory_info.used / (1024**3),
                    'memory_available_gb': memory_info.available / (1024**3)
                })
                
                time.sleep(10)  # Sample every 10 seconds
                
            except Exception as e:
                logger.error(f"Background monitoring error: {e}")
                time.sleep(30)
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """Get comprehensive performance statistics"""
        with self.lock:
            stats = {
                'search_performance': self._analyze_search_performance(),
                'operation_performance': self._analyze_operation_performance(),
                'memory_usage': self._analyze_memory_usage(),
                'recommendations': self._get_performance_recommendations()
            }
        return stats
    
    def _analyze_search_performance(self) -> Dict[str, Any]:
        """Analyze search operation performance"""
        if not self.search_history:
            return {'no_data': True}
        
        recent_searches = list(self.search_history)
        query_times = [s.query_time_ms for s in recent_searches]
        k_values = [s.k for s in recent_searches]
        result_counts = [s.results_found for s in recent_searches]
        
        # Group by index type
        by_index_type = defaultdict(list)
        for search in recent_searches:
            by_index_type[search.index_type].append(search.query_time_ms)
        
        analysis = {
            'total_searches': len(recent_searches),
            'avg_query_time_ms': np.mean(query_times),
            'median_query_time_ms': np.median(query_times),
            'p95_query_time_ms': np.percentile(query_times, 95),
            'p99_query_time_ms': np.percentile(query_times, 99),
            'avg_k': np.mean(k_values),
            'avg_results_found': np.mean(result_counts),
            'by_index_type': {}
        }
        
        # Per-index-type analysis
        for index_type, times in by_index_type.items():
            analysis['by_index_type'][index_type] = {
                'count': len(times),
                'avg_time_ms': np.mean(times),
                'median_time_ms': np.median(times)
            }
        
        return analysis
    
    def _analyze_operation_performance(self) -> Dict[str, Any]:
        """Analyze general operation performance"""
        analysis = {}
        
        for operation, times in self.operation_times.items():
            if times:
                times_list = list(times)
                analysis[operation] = {
                    'count': len(times_list),
                    'avg_time_ms': np.mean(times_list),
                    'median_time_ms': np.median(times_list),
                    'max_time_ms': np.max(times_list),
                    'min_time_ms': np.min(times_list)
                }
        
        return analysis
    
    def _analyze_memory_usage(self) -> Dict[str, Any]:
        """Analyze memory usage patterns"""
        if not self.memory_samples:
            return {'no_data': True}
        
        samples = list(self.memory_samples)
        memory_percents = [s['memory_percent'] for s in samples]
        memory_used = [s['memory_used_gb'] for s in samples]
        
        return {
            'current_memory_percent': memory_percents[-1] if memory_percents else 0,
            'avg_memory_percent': np.mean(memory_percents),
            'max_memory_percent': np.max(memory_percents),
            'current_memory_used_gb': memory_used[-1] if memory_used else 0,
            'avg_memory_used_gb': np.mean(memory_used),
            'max_memory_used_gb': np.max(memory_used),
            'sample_count': len(samples)
        }
    
    def _get_performance_recommendations(self) -> List[str]:
        """Generate performance recommendations"""
        recommendations = []
        
        if not self.search_history:
            return recommendations
        
        # Analyze recent performance
        recent_searches = list(self.search_history)[-100:]  # Last 100 searches
        avg_query_time = np.mean([s.query_time_ms for s in recent_searches])
        
        # Query time recommendations
        if avg_query_time > 100:
            recommendations.append("Average query time is high (>100ms). Consider using IVF or HNSW index.")
        elif avg_query_time > 50:
            recommendations.append("Query time could be improved. Consider index optimization.")
        
        # Memory recommendations
        if self.memory_samples:
            current_memory = self.memory_samples[-1]['memory_percent']
            if current_memory > 90:
                recommendations.append("High memory usage detected. Consider reducing index size or using compression.")
            elif current_memory > 75:
                recommendations.append("Memory usage is elevated. Monitor for potential issues.")
        
        # Index type recommendations
        by_index = defaultdict(list)
        for search in recent_searches:
            by_index[search.index_type].append(search.query_time_ms)
        
        if 'Flat' in by_index and len(recent_searches) > 0:
            vector_count = recent_searches[-1].vector_count
            if vector_count > 100000:
                recommendations.append("Large vector count with Flat index. Consider switching to IVF for better performance.")
        
        return recommendations
    
    def stop_monitoring(self):
        """Stop background monitoring"""
        self.monitoring_active = False
        if self.monitor_thread.is_alive():
            self.monitor_thread.join(timeout=5)    def get_vector(self, vector_id: str) -> Optional[VectorItem]:
        """Retrieve a vector by ID"""
        try:
            if vector_id not in self.id_to_metadata:
                return None
            
            item_data = self.id_to_metadata[vector_id]
            return VectorItem(
                id=vector_id,
                vector=item_data['vector'],
                metadata=item_data['metadata'],
                modality=item_data['modality'],
                timestamp=item_data['timestamp']
            )
            
        except Exception as e:
            logger.error(f"Failed to get vector {vector_id}: {e}")
            return None
    
    def update_metadata(self, vector_id: str, new_metadata: Dict[str, Any]) -> bool:
        """Update metadata for an existing vector"""
        try:
            if vector_id not in self.id_to_metadata:
                logger.warning(f"Vector ID {vector_id} not found")
                return False
            
            self.id_to_metadata[vector_id]['metadata'].update(new_metadata)
            logger.info(f"Updated metadata for vector {vector_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to update metadata for {vector_id}: {e}")
            return False
    
    def rebuild_index(self) -> bool:
        """Rebuild the index from scratch (useful after many deletions)"""
        try:
            logger.info("Rebuilding index from scratch...")
            
            # Save current metadata
            old_metadata = self.id_to_metadata.copy()
            
            # Reinitialize
            self._initialize_index()
            self.id_to_metadata = {}
            self.index_to_id = {}
            self.id_to_index = {}
            self.next_index = 0
            
            # Re-add all vectors
            success_count = 0
            for vector_id, item_data in old_metadata.items():
                vector_item = VectorItem(
                    id=vector_id,
                    vector=item_data['vector'],
                    metadata=item_data['metadata'],
                    modality=item_data['modality'],
                    timestamp=item_data['timestamp']
                )
                
                if self.add_vector(vector_item):
                    success_count += 1
            
            logger.info(f"Index rebuilt: {success_count}/{len(old_metadata)} vectors")
            return True
            
        except Exception as e:
            logger.error(f"Failed to rebuild index: {e}")
            return False
    
    def export_vectors(self, output_path: str, format: str = 'json') -> bool:
        """Export all vectors and metadata"""
        try:
            export_data = {
                'metadata': {
                    'dimension': self.dimension,
                    'index_type': self.index_type,
                    'vector_count': len(self.id_to_metadata),
                    'export_timestamp': time.time()
                },
                'vectors': []
            }
            
            for vector_id, item_data in self.id_to_metadata.items():
                export_data['vectors'].append({
                    'id': vector_id,
                    'vector': item_data['vector'],
                    'metadata': item_data['metadata'],
                    'modality': item_data['modality'],
                    'timestamp': item_data['timestamp']
                })
            
            if format == 'json':
                with open(output_path, 'w') as f:
                    json.dump(export_data, f, indent=2)
            elif format == 'pickle':
                with open(output_path, 'wb') as f:
                    pickle.dump(export_data, f)
            else:
                raise ValueError(f"Unsupported format: {format}")
            
            logger.info(f"Exported {len(self.id_to_metadata)} vectors to {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to export vectors: {e}")
            return False
    
    def import_vectors(self, input_path: str, format: str = 'json') -> int:
        """Import vectors from file"""
        try:
            if format == 'json':
                with open(input_path, 'r') as f:
                    import_data = json.load(f)
            elif format == 'pickle':
                with open(input_path, 'rb') as f:
                    import_data = pickle.load(f)
            else:
                raise ValueError(f"Unsupported format: {format}")
            
            imported_count = 0
            for vector_data in import_data['vectors']:
                vector_item = VectorItem(
                    id=vector_data['id'],
                    vector=vector_data['vector'],
                    metadata=vector_data['metadata'],
                    modality=vector_data['modality'],
                    timestamp=vector_data['timestamp']
                )
                
                if self.add_vector(vector_item):
                    imported_count += 1
            
            logger.info(f"Imported {imported_count} vectors from {input_path}")
            return imported_count
            
        except Exception as e:
            logger.error(f"Failed to import vectors: {e}")
            return 0`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 3: Auto-backup and Monitoring</h3>
                                    <CodeBlock
                                        language="python"
                                        id="auto-backup"
                                        code={`# Add to vector_service.py

import threading
from datetime import datetime, timedelta

class VectorStoreManager:
    """High-level manager for vector store with auto-backup and monitoring"""
    
    def __init__(self, vector_store: FAISSVectorStore):
        self.vector_store = vector_store
        self.auto_save_counter = 0
        self.auto_save_interval = settings.vector_search.auto_save_interval
        self.last_backup = time.time()
        self.backup_interval = 3600  # 1 hour
        self.stats_history = []
        
    def add_vector_with_backup(self, vector_item: VectorItem) -> bool:
        """Add vector with automatic backup management"""
        success = self.vector_store.add_vector(vector_item)
        
        if success:
            self.auto_save_counter += 1
            
            # Auto-save check
            if self.auto_save_counter >= self.auto_save_interval:
                self._auto_save()
                self.auto_save_counter = 0
            
            # Backup check
            if time.time() - self.last_backup > self.backup_interval:
                self._create_backup()
                self.last_backup = time.time()
        
        return success
    
    def _auto_save(self):
        """Perform automatic save"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"autosave_{timestamp}"
            
            if self.vector_store.save_index(filename):
                logger.info(f"Auto-save completed: {filename}")
                
                # Cleanup old auto-saves (keep last 3)
                self._cleanup_auto_saves()
            
        except Exception as e:
            logger.error(f"Auto-save failed: {e}")
    
    def _create_backup(self):
        """Create a backup of the current index"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"backup_{timestamp}"
            
            if self.vector_store.save_index(filename):
                logger.info(f"Backup created: {filename}")
                
                # Cleanup old backups (keep last 5)
                self._cleanup_backups()
            
        except Exception as e:
            logger.error(f"Backup creation failed: {e}")
    
    def _cleanup_auto_saves(self):
        """Remove old auto-save files"""
        try:
            all_indices = self.vector_store.list_saved_indices()
            auto_saves = [idx for idx in all_indices if idx['filename'].startswith('autosave_')]
            
            if len(auto_saves) > 3:
                for old_save in auto_saves[3:]:
                    self._remove_index_files(old_save['filename'])
                    logger.info(f"Removed old auto-save: {old_save['filename']}")
            
        except Exception as e:
            logger.error(f"Auto-save cleanup failed: {e}")
    
    def _cleanup_backups(self):
        """Remove old backup files"""
        try:
            all_indices = self.vector_store.list_saved_indices()
            backups = [idx for idx in all_indices if idx['filename'].startswith('backup_')]
            
            if len(backups) > 5:
                for old_backup in backups[5:]:
                    self._remove_index_files(old_backup['filename'])
                    logger.info(f"Removed old backup: {old_backup['filename']}")
            
        except Exception as e:
            logger.error(f"Backup cleanup failed: {e}")
    
    def _remove_index_files(self, filename: str):
        """Remove all files associated with an index"""
        for suffix in ['.index', '.metadata', '.config']:
            file_path = self.vector_store.storage_dir / f"{filename}{suffix}"
            if file_path.exists():
                file_path.unlink()
    
    def get_health_status(self) -> Dict[str, Any]:
        """Get comprehensive health status"""
        stats = self.vector_store.get_index_stats()
        
        # Add manager-specific stats
        health = {
            'vector_store': stats,
            'auto_save': {
                'counter': self.auto_save_counter,
                'interval': self.auto_save_interval,
                'next_save_in': self.auto_save_interval - self.auto_save_counter
            },
            'backup': {
                'last_backup': self.last_backup,
                'backup_interval': self.backup_interval,
                'next_backup_in': max(0, self.backup_interval - (time.time() - self.last_backup))
            },
            'storage': {
                'available_indices': len(self.vector_store.list_saved_indices()),
                'storage_dir': str(self.vector_store.storage_dir),
                'storage_size_mb': stats['storage_size_mb']
            }
        }
        
        # Add health score
        health['health_score'] = self._calculate_health_score(health)
        
        return health
    
    def _calculate_health_score(self, health_data: Dict) -> float:
        """Calculate a health score from 0-1"""
        score = 1.0
        
        # Reduce score for various issues
        vector_count = health_data['vector_store']['vector_count']
        if vector_count == 0:
            score -= 0.3
        
        if not health_data['vector_store']['is_trained'] and vector_count > 0:
            score -= 0.2
        
        if health_data['storage']['storage_size_mb'] > 1000:  # >1GB
            score -= 0.1
        
        return max(0.0, score)
    
    def force_backup(self) -> bool:
        """Force an immediate backup"""
        try:
            self._create_backup()
            return True
        except Exception as e:
            logger.error(f"Force backup failed: {e}")
            return False 
            
        except Exception as e:
                raise HTTPException(status_code=500, detail=f"Search by ID failed: {str(e)}")
        
        @app.post("/search/cross_modal")
        async def cross_modal_search(
            embedding: List[float],
            target_modality: str,
            k: int = 10
        ):
            """Search for vectors of a specific modality"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                # Validate modality
                valid_modalities = ["text", "image", "audio", "video"]
                if target_modality not in valid_modalities:
                    raise HTTPException(
                        status_code=400, 
                        detail=f"Invalid modality. Must be one of: {valid_modalities}"
                    )
                
                results = vector_store.cross_modal_search(embedding, target_modality, k)
                
                return [SearchResponse(
                    id=result.id,
                    similarity_score=result.score,
                    metadata=result.metadata,
                    modality=result.modality
                ) for result in results]
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Cross-modal search failed: {str(e)}")
        
        @app.post("/search/batch")
        async def batch_search(
            embeddings: List[List[float]],
            k: int = 10
        ):
            """Perform batch search for multiple embeddings"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                if len(embeddings) > 50:
                    raise HTTPException(status_code=400, detail="Maximum 50 embeddings per batch")
                
                # Validate all embeddings
                for i, embedding in enumerate(embeddings):
                    if len(embedding) != 1024:
                        raise HTTPException(
                            status_code=400, 
                            detail=f"Embedding {i} must be 1024-dimensional"
                        )
                
                results = vector_store.batch_search(embeddings, k)
                
                # Convert to response format
                batch_responses = []
                for query_results in results:
                    query_response = [SearchResponse(
                        id=result.id,
                        similarity_score=result.score,
                        metadata=result.metadata,
                        modality=result.modality
                    ) for result in query_results]
                    batch_responses.append(query_response)
                
                return batch_responses
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Batch search failed: {str(e)}")
        
        @app.post("/search/diverse")
        async def diverse_search(
            embedding: List[float],
            k: int = 10,
            diversity_threshold: float = 0.8
        ):
            """Search with diversity to avoid similar results"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                results = vector_store.search_with_diversity(embedding, k, diversity_threshold)
                
                return [SearchResponse(
                    id=result.id,
                    similarity_score=result.score,
                    metadata=result.metadata,
                    modality=result.modality
                ) for result in results]
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Diverse search failed: {str(e)}")`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 2: Vector Management Endpoints</h3>
                                    <CodeBlock
                                        language="python"
                                        id="management-endpoints"
                                        code={`@app.post("/vectors/add")
        async def add_vector_to_store(
            vector_id: str,
            embedding: List[float],
            modality: str,
            metadata: Dict[str, Any] = {}
        ):
            """Add a vector to the search index"""
            try:
                global vector_manager
                
                if not vector_manager:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                # Validate inputs
                if len(embedding) != 1024:
                    raise HTTPException(status_code=400, detail="Embedding must be 1024-dimensional")
                
                valid_modalities = ["text", "image", "audio", "video"]
                if modality not in valid_modalities:
                    raise HTTPException(
                        status_code=400, 
                        detail=f"Invalid modality. Must be one of: {valid_modalities}"
                    )
                
                # Create vector item
                vector_item = VectorItem(
                    id=vector_id,
                    vector=embedding,
                    metadata=metadata,
                    modality=modality,
                    timestamp=time.time()
                )
                
                # Add to store
                success = vector_manager.add_vector_with_backup(vector_item)
                
                if not success:
                    raise HTTPException(status_code=400, detail="Failed to add vector")
                
                return {"status": "success", "vector_id": vector_id, "message": "Vector added successfully"}
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to add vector: {str(e)}")
        
        @app.get("/vectors/{vector_id}")
        async def get_vector(vector_id: str):
            """Retrieve a specific vector by ID"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                vector_item = vector_store.get_vector(vector_id)
                
                if not vector_item:
                    raise HTTPException(status_code=404, detail="Vector not found")
                
                return {
                    "id": vector_item.id,
                    "embedding": vector_item.vector,
                    "metadata": vector_item.metadata,
                    "modality": vector_item.modality,
                    "timestamp": vector_item.timestamp
                }
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to get vector: {str(e)}")
        
        @app.delete("/vectors/{vector_id}")
        async def remove_vector(vector_id: str):
            """Remove a vector from the index"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                success = vector_store.remove_vector(vector_id)
                
                if not success:
                    raise HTTPException(status_code=404, detail="Vector not found or removal failed")
                
                return {"status": "success", "message": f"Vector {vector_id} removed"}
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to remove vector: {str(e)}")
        
        @app.post("/vectors/embed_and_add")
        async def embed_and_add_to_search(
            content_type: str,  # "text", "image", "audio"
            content: str = None,  # For text
            file: UploadFile = File(None),  # For image/audio
            vector_id: str = None,
            metadata: Dict[str, Any] = {}
        ):
            """Generate embedding and add to search index in one step"""
            try:
                global imagebind_service, vector_manager
                
                if not imagebind_service or not vector_manager:
                    raise HTTPException(status_code=503, detail="Services not available")
                
                # Generate embedding based on content type
                if content_type == "text":
                    if not content:
                        raise HTTPException(status_code=400, detail="Text content required")
                    
                    embedding_result = await imagebind_service.embed_text(content)
                    embedding = embedding_result.embedding
                    
                    # Auto-generate ID if not provided
                    if not vector_id:
                        vector_id = f"text_{hashlib.md5(content.encode()).hexdigest()[:12]}"
                    
                    # Add content to metadata
                    metadata.update({"content": content[:500]})  # Store first 500 chars
                    
                elif content_type in ["image", "audio"]:
                    if not file:
                        raise HTTPException(status_code=400, detail="File required for image/audio")
                    
                    # Save temporary file
                    temp_path = f"/tmp/{uuid.uuid4()}_{file.filename}"
                    with open(temp_path, "wb") as f:
                        content_bytes = await file.read()
                        f.write(content_bytes)
                    
                    try:
                        if content_type == "image":
                            embedding_result = await imagebind_service.embed_image(temp_path)
                        else:  # audio
                            embedding_result = await imagebind_service.embed_audio(temp_path)
                        
                        embedding = embedding_result.embedding
                        
                        # Auto-generate ID if not provided
                        if not vector_id:
                            file_hash = hashlib.md5(content_bytes).hexdigest()[:12]
                            vector_id = f"{content_type}_{file_hash}"
                        
                        # Add file info to metadata
                        metadata.update({
                            "filename": file.filename,
                            "file_size": len(content_bytes),
                            "processing_time_ms": embedding_result.processing_time_ms
                        })
                        
                    finally:
                        # Clean up temp file
                        if os.path.exists(temp_path):
                            os.unlink(temp_path)
                
                else:
                    raise HTTPException(
                        status_code=400, 
                        detail="content_type must be 'text', 'image', or 'audio'"
                    )
                
                # Add to vector store
                vector_item = VectorItem(
                    id=vector_id,
                    vector=embedding,
                    metadata=metadata,
                    modality=content_type,
                    timestamp=time.time()
                )
                
                success = vector_manager.add_vector_with_backup(vector_item)
                
                if not success:
                    raise HTTPException(status_code=400, detail="Failed to add vector to store")
                
                return {
                    "status": "success",
                    "vector_id": vector_id,
                    "embedding_dimension": len(embedding),
                    "processing_time_ms": embedding_result.processing_time_ms,
                    "message": "Content embedded and added to search index"
                }
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Embed and add failed: {str(e)}")
        
        @app.post("/search/content")
        async def search_by_content(
            content_type: str,
            content: str = None,
            file: UploadFile = File(None),
            k: int = 10,
            target_modality: str = None,
            similarity_threshold: float = 0.0
        ):
            """Search by providing content directly (embed and search in one step)"""
            try:
                global imagebind_service, vector_store
                
                if not imagebind_service or not vector_store:
                    raise HTTPException(status_code=503, detail="Services not available")
                
                # Generate embedding
                if content_type == "text":
                    if not content:
                        raise HTTPException(status_code=400, detail="Text content required")
                    embedding_result = await imagebind_service.embed_text(content)
                    
                elif content_type in ["image", "audio"]:
                    if not file:
                        raise HTTPException(status_code=400, detail="File required")
                    
                    # Save temporary file
                    temp_path = f"/tmp/{uuid.uuid4()}_{file.filename}"
                    with open(temp_path, "wb") as f:
                        await f.write(await file.read())
                    
                    try:
                        if content_type == "image":
                            embedding_result = await imagebind_service.embed_image(temp_path)
                        else:
                            embedding_result = await imagebind_service.embed_audio(temp_path)
                    finally:
                        if os.path.exists(temp_path):
                            os.unlink(temp_path)
                else:
                    raise HTTPException(status_code=400, detail="Invalid content_type")
                
                # Perform search
                if target_modality:
                    results = vector_store.cross_modal_search(
                        embedding_result.embedding, target_modality, k
                    )
                else:
                    results = vector_store.search_similar_cached(
                        embedding_result.embedding, k, similarity_threshold=similarity_threshold
                    )
                
                return {
                    "query_info": {
                        "content_type": content_type,
                        "embedding_time_ms": embedding_result.processing_time_ms,
                        "target_modality": target_modality
                    },
                    "results": [SearchResponse(
                        id=result.id,
                        similarity_score=result.score,
                        metadata=result.metadata,
                        modality=result.modality
                    ) for result in results]
                }
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Content search failed: {str(e)}")`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 3: Analytics and Management Endpoints</h3>
                                    <CodeBlock
                                        language="python"
                                        id="analytics-endpoints"
                                        code={`@app.get("/analytics/performance")
        async def get_performance_analytics():
            """Get detailed performance analytics"""
            try:
                global vector_store, vector_manager
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                # Get performance stats
                performance_stats = vector_store.performance_monitor.get_performance_stats()
                
                # Get vector store stats
                store_stats = vector_store.get_index_stats()
                
                # Get health status
                health_status = vector_manager.get_health_status() if vector_manager else {}
                
                # Get cache stats
                cache_stats = vector_store.get_cache_stats()
                
                return {
                    "performance": performance_stats,
                    "vector_store": store_stats,
                    "health": health_status,
                    "cache": cache_stats,
                    "timestamp": time.time()
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to get analytics: {str(e)}")
        
        @app.get("/analytics/benchmark")
        async def run_performance_benchmark():
            """Run a performance benchmark"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                benchmark_results = vector_store.benchmark_search_performance()
                
                return {
                    "benchmark": benchmark_results,
                    "timestamp": time.time(),
                    "recommendations": vector_store.performance_monitor._get_performance_recommendations()
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Benchmark failed: {str(e)}")
        
        @app.post("/management/optimize")
        async def optimize_index():
            """Manually trigger index optimization"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                # Clear cache
                vector_store.clear_cache()
                
                # Optimize parameters
                vector_store.optimize_index_parameters()
                
                # Get updated stats
                stats = vector_store.get_index_stats()
                
                return {
                    "status": "success",
                    "message": "Index optimization completed",
                    "stats": stats
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Optimization failed: {str(e)}")
        
        @app.post("/management/backup")
        async def create_backup():
            """Create a manual backup"""
            try:
                global vector_manager
                
                if not vector_manager:
                    raise HTTPException(status_code=503, detail="Vector manager not available")
                
                success = vector_manager.force_backup()
                
                if success:
                    return {"status": "success", "message": "Backup created successfully"}
                else:
                    raise HTTPException(status_code=500, detail="Backup creation failed")
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Backup failed: {str(e)}")
        
        @app.get("/management/indices")
        async def list_saved_indices():
            """List all saved indices"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                indices = vector_store.list_saved_indices()
                
                return {
                    "indices": indices,
                    "count": len(indices)
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to list indices: {str(e)}")
        
        @app.post("/management/load_index")
        async def load_index(index_name: str):
            """Load a specific saved index"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                success = vector_store.load_index(index_name)
                
                if success:
                    stats = vector_store.get_index_stats()
                    return {
                        "status": "success", 
                        "message": f"Index {index_name} loaded successfully",
                        "stats": stats
                    }
                else:
                    raise HTTPException(status_code=400, detail=f"Failed to load index {index_name}")
                
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Index loading failed: {str(e)}")
        
        @app.get("/search/outliers")
        async def find_outlier_vectors():
            """Find vectors that are outliers (dissimilar to most others)"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                outliers = vector_store.find_outliers()
                
                # Get details for each outlier
                outlier_details = []
                for vector_id in outliers[:20]:  # Limit to 20 for response size
                    vector_item = vector_store.get_vector(vector_id)
                    if vector_item:
                        outlier_details.append({
                            "id": vector_id,
                            "modality": vector_item.modality,
                            "metadata": vector_item.metadata,
                            "timestamp": vector_item.timestamp
                        })
                
                return {
                    "outlier_count": len(outliers),
                    "outliers": outlier_details,
                    "total_vectors": len(vector_store.id_to_metadata)
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Outlier detection failed: {str(e)}")
        
        @app.get("/search/clusters")
        async def get_vector_clusters():
            """Get vector clusters for data analysis"""
            try:
                global vector_store
                
                if not vector_store:
                    raise HTTPException(status_code=503, detail="Vector store not available")
                
                clusters = vector_store.cluster_vectors()
                
                # Add cluster statistics
                cluster_stats = {}
                for cluster_id, vector_ids in clusters.items():
                    modality_counts = {}
                    for vector_id in vector_ids:
                        vector_item = vector_store.get_vector(vector_id)
                        if vector_item:
                            modality = vector_item.modality
                            modality_counts[modality] = modality_counts.get(modality, 0) + 1
                    
                    cluster_stats[cluster_id] = {
                        "size": len(vector_ids),
                        "modality_distribution": modality_counts,
                        "sample_vectors": vector_ids[:5]  # Show first 5 as samples
                    }
                
                return {
                    "cluster_count": len(clusters),
                    "clusters": cluster_stats,
                    "total_vectors_clustered": sum(len(v) for v in clusters.values())
                }
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Clustering failed: {str(e)}")`}
                                    />
                                </div>

                                <div className="setup-step">
                                    <h3>Step 4: Updated Response Models</h3>
                                    <CodeBlock
                                        language="python"
                                        id="response-models"
                                        code={`# Add to models.py
        
        class SearchResponse(BaseModel):
            id: str = Field(..., description="Vector ID")
            similarity_score: float = Field(..., description="Similarity score (0-1)")
            metadata: Dict[str, Any] = Field(..., description="Vector metadata")
            modality: str = Field(..., description="Content modality")
        
        class VectorStoreStats(BaseModel):
            vector_count: int = Field(..., description="Total number of vectors")
            indexed_count: int = Field(..., description="Number of indexed vectors")
            dimension: int = Field(..., description="Vector dimension")
            index_type: str = Field(..., description="FAISS index type")
            is_trained: bool = Field(..., description="Whether index is trained")
            memory_usage_mb: float = Field(..., description="Estimated memory usage")
            modality_distribution: Dict[str, int] = Field(..., description="Count by modality")
            storage_size_mb: float = Field(..., description="Disk storage size")
        
        class PerformanceStats(BaseModel):
            search_performance: Dict[str, Any] = Field(..., description="Search timing statistics")
            operation_performance: Dict[str, Any] = Field(..., description="Operation timing statistics")
            memory_usage: Dict[str, Any] = Field(..., description="Memory usage statistics")
            recommendations: List[str] = Field(..., description="Performance recommendations")
        
        class AnalyticsResponse(BaseModel):
            performance: PerformanceStats
            vector_store: VectorStoreStats
            health: Dict[str, Any]
            cache: Dict[str, Any]
            timestamp: float
        
        class BenchmarkResponse(BaseModel):
            benchmark: Dict[str, Any]
            timestamp: float
            recommendations: List[str]
        
        class OutlierResponse(BaseModel):
            outlier_count: int
            outliers: List[Dict[str, Any]]
            total_vectors: int
        
        class ClusterResponse(BaseModel):
            cluster_count: int
            clusters: Dict[str, Any]
            total_vectors_clustered: int    
            
            `} />

                                </div>
                                <div className="completion-card">
                                    <h4>🎯 Congratulations! You've Built a Complete Vector Search System</h4>
                                    <div className="completion-grid">
                                        <div className="completion-section">
                                            <h5>✅ What You've Accomplished</h5>
                                            <ul>
                                                <li>• Implemented FAISS vector storage and indexing</li>
                                                <li>• Built high-performance similarity search</li>
                                                <li>• Added cross-modal search capabilities</li>
                                                <li>• Created performance monitoring and optimization</li>
                                                <li>• Integrated with FastAPI for production use</li>
                                                <li>• Added analytics and management endpoints</li>
                                            </ul>
                                        </div>
                                        <div className="completion-section">
                                            <h5>🚀 What's Next in Tutorial 4</h5>
                                            <ul>
                                                <li>• Implement cross-modal search UI</li>
                                                <li>• Build advanced search interfaces</li>
                                                <li>• Create recommendation systems</li>
                                                <li>• Add real-time search capabilities</li>
                                                <li>• Optimize for production workloads</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="final-buttons">
                                    <button
                                        className="complete-button"
                                        onClick={() => markStepComplete(4)}
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Mark Tutorial Complete
                                    </button>

                                    <button className="next-tutorial-button">
                                        Continue to Tutorial 4: Cross-Modal Search
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="tutorial-navigation">
                        <div className="nav-info">
                            Tutorial 3 of 8 • Implementing Vector Search with FAISS
                        </div>
                        <div className="nav-dots">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`nav-dot ${i === 2 ? 'active' : i < 2 ? 'completed' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                   .tutorial-container {
                     min-height: 100vh;
                     background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                     color: white;
                     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                   }
                   
                   .tutorial-content {
                     max-width: 1400px;
                     margin: 0 auto;
                     padding: 30px;
                   }
                   
                   .tutorial-header {
                     margin-bottom: 40px;
                   }
                   
                   .back-button {
                     display: flex;
                     align-items: center;
                     gap: 8px;
                     padding: 12px 20px;
                     background: rgba(255, 255, 255, 0.1);
                     backdrop-filter: blur(15px);
                     border: none;
                     border-radius: 12px;
                     color: white;
                     cursor: pointer;
                     margin-bottom: 30px;
                     transition: all 0.3s ease;
                     border: 1px solid rgba(255, 255, 255, 0.2);
                   }
                   
                   .back-button:hover {
                     background: rgba(255, 255, 255, 0.2);
                     transform: translateY(-2px);
                   }
                   
                   .hero-section {
                     text-align: center;
                     margin-bottom: 40px;
                   }
                   
                   .page-title {
                     font-size: 3rem;
                     margin-bottom: 20px;
                     color: rgba(255, 255, 255, 0.6);
                     font-weight: 600;
                   }
                   
                   .tutorial-badge {
                     display: inline-flex;
                     align-items: center;
                     gap: 8px;
                     padding: 8px 16px;
                     background: rgba(255, 255, 255, 0.1);
                     border-radius: 20px;
                     border: 1px solid rgba(255, 255, 255, 0.2);
                     margin-bottom: 30px;
                     font-size: 0.9em;
                     font-weight: 500;
                   }
                   
                   .main-title {
                     font-size: 3.5rem;
                     margin-bottom: 25px;
                     font-weight: 700;
                     line-height: 1.2;
                   }
                   
                   .main-description {
                     font-size: 1.3rem;
                     color: rgba(255, 255, 255, 0.8);
                     max-width: 800px;
                     margin: 0 auto;
                     line-height: 1.6;
                   }
                   
                   .feature-cards-grid {
                     display: grid;
                     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                     gap: 25px;
                     margin-top: 40px;
                   }
                   
                   .feature-card {
                     background: rgba(255, 255, 255, 0.08);
                     backdrop-filter: blur(15px);
                     border-radius: 20px;
                     padding: 30px;
                     border: 1px solid rgba(255, 255, 255, 0.1);
                     transition: all 0.3s ease;
                     text-align: center;
                   }
                   
                   .feature-card:hover {
                     background: rgba(255, 255, 255, 0.12);
                     transform: translateY(-5px);
                     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                   }
                   
                   .feature-card svg {
                     margin-bottom: 15px;
                     color: #4ecdc4;
                   }
                   
                   .feature-card h3 {
                     font-size: 1.3rem;
                     margin-bottom: 10px;
                     color: white;
                   }
                   
                   .feature-card p {
                     color: rgba(255, 255, 255, 0.7);
                     line-height: 1.5;
                   }
                   
                   .progress-section {
                     background: rgba(255, 255, 255, 0.08);
                     backdrop-filter: blur(15px);
                     border-radius: 20px;
                     padding: 30px;
                     border: 1px solid rgba(255, 255, 255, 0.1);
                     margin-bottom: 30px;
                   }
                   
                   .progress-header {
                     display: flex;
                     align-items: center;
                     gap: 12px;
                     margin-bottom: 25px;
                   }
                   
                   .progress-header svg {
                     color: #2ecc71;
                   }
                   
                   .progress-header h2 {
                     margin: 0;
                     font-size: 1.8rem;
                     color: white;
                   }
                   
                   .progress-steps {
                     display: flex;
                     flex-direction: column;
                     gap: 15px;
                   }
                   
                   .progress-step {
                     display: flex;
                     align-items: center;
                     gap: 15px;
                     padding: 20px;
                     background: rgba(255, 255, 255, 0.05);
                     border-radius: 15px;
                     border: 1px solid rgba(255, 255, 255, 0.1);
                     cursor: pointer;
                     transition: all 0.3s ease;
                   }
                   
                   .progress-step:hover {
                     background: rgba(255, 255, 255, 0.1);
                   }
                   
                   .progress-step.active {
                     background: rgba(255, 255, 255, 0.15);
                     border-color: rgba(255, 255, 255, 0.3);
                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                   }
                   
                   .progress-step.completed {
                     background: rgba(46, 204, 113, 0.1);
                     border-color: rgba(46, 204, 113, 0.3);
                   }
                   
                   .step-icon {
                     padding: 10px;
                     background: rgba(255, 255, 255, 0.1);
                     border-radius: 10px;
                     color: white;
                   }
                   
                   .step-content {
                     flex: 1;
                   }
                   
                   .step-content h4 {
                     margin: 0 0 5px 0;
                     color: white;
                     font-size: 1.1rem;
                   }
                   
                   .step-content p {
                     margin: 0;
                     color: rgba(255, 255, 255, 0.6);
                     font-size: 0.9rem;
                   }
                   
                   .step-status {
                     display: flex;
                     align-items: center;
                     gap: 10px;
                   }
                   
                   .step-status svg {
                     color: #2ecc71;
                   }
                   
                   .active-indicator {
                     width: 12px;
                     height: 12px;
                     background: #3498db;
                     border-radius: 50%;
                     animation: pulse 2s infinite;
                   }
                   
                   @keyframes pulse {
                     0%, 100% { opacity: 0.7; transform: scale(1); }
                     50% { opacity: 1; transform: scale(1.1); }
                   }
                   
                   .main-content-section {
                     background: rgba(255, 255, 255, 0.08);
                     backdrop-filter: blur(15px);
                     border-radius: 20px;
                     border: 1px solid rgba(255, 255, 255, 0.1);
                     overflow: hidden;
                   }
                   
                   .step-content-container {
                     padding: 40px;
                   }
                   
                   .step-header {
                     display: flex;
                     align-items: center;
                     gap: 15px;
                     margin-bottom: 30px;
                   }
                   
                   .step-header svg {
                     color: #4ecdc4;
                   }
                   
                   .step-header h2 {
                     margin: 0;
                     font-size: 2.5rem;
                     color: white;
                   }
                   
                   .step-description {
                     font-size: 1.2rem;
                     color: rgba(255, 255, 255, 0.8);
                     line-height: 1.6;
                     margin-bottom: 30px;
                   }
                   
                   .architecture-overview {
                     background: rgba(255, 255, 255, 0.05);
                     border-radius: 15px;
                     padding: 25px;
                     margin-bottom: 30px;
                     border: 1px solid rgba(255, 255, 255, 0.1);
                   }
                   
                   .architecture-overview h3 {
                     color: white;
                     margin-bottom: 20px;
                     font-size: 1.3rem;
                   }
                   
                   .comparison-grid {
                     display: grid;
                     grid-template-columns: 1fr 1fr;
                     gap: 25px;
                     margin-bottom: 20px;
                   }
                   
                   @media (max-width: 768px) {
                     .comparison-grid {
                       grid-template-columns: 1fr;
                     }
                   }
                   
                   .comparison-card {
                     background: rgba(255, 255, 255, 0.1);
                     border-radius: 15px;
                     padding: 20px;
                     transition: all 0.3s ease;
                   }
                   
                   .comparison-card.faiss {
                     border-left: 4px solid #3498db;
                   }
                   
                   .comparison-card.pinecone {
                     border-left: 4px solid #e74c3c;
                   }
                   
                   .comparison-card:hover {
                     background: rgba(255, 255, 255, 0.15);
                     transform: translateY(-3px);
                   }
                   
                   .comparison-card h4 {
                     margin: 0 0 15px 0;
                     color: white;
                     font-size: 1.2rem;
                   }
                   
                   .pros, .cons {
                     margin-bottom: 15px;
                   }
                   
                   .pros h5 {
                     color: #2ecc71;
                     margin: 0 0 8px 0;
                     font-size: 1rem;
                   }
                   
                   .cons h5 {
                     color: #e74c3c;
                     margin: 0 0 8px 0;
                     font-size: 1rem;
                   }
                   
                   .pros ul, .cons ul {
                     margin: 0;
                     padding-left: 20px;
                     font-size: 0.9rem;
                     color: rgba(255, 255, 255, 0.8);
                   }
                   
                   .pros li, .cons li {
                     margin: 4px 0;
                     line-height: 1.4;
                   }
                   
                   .recommendation {
                     background: linear-gradient(135deg, rgba(46, 204, 113, 0.2) 0%, rgba(39, 174, 96, 0.2) 100%);
                     border: 1px solid rgba(46, 204, 113, 0.3);
                     border-radius: 12px;
                     padding: 20px;
                     text-align: center;
                   }
                   
                   .recommendation h4 {
                     margin: 0 0 10px 0;
                     color: #2ecc71;
                     font-size: 1.2rem;
                   }
                   
                   .recommendation p {
                     margin: 0;
                     color: rgba(255, 255, 255, 0.9);
                     line-height: 1.5;
                   }
                   
                   .setup-steps {
                     display: flex;
                     flex-direction: column;
                     gap: 30px;
                   }
                   
                   .setup-step h3 {
                     color: white;
                     font-size: 1.4rem;
                     margin-bottom: 15px;
                     border-left: 4px solid #4ecdc4;
                     padding-left: 15px;
                   }
                   
                   .continue-button {
                     width: 100%;
                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                     border: none;
                     padding: 18px 30px;
                     border-radius: 15px;
                     color: white;
                     font-size: 1.1rem;
                     font-weight: 600;
                     cursor: pointer;
                     transition: all 0.3s ease;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     gap: 10px;
                     margin-top: 30px;
                   }
                   
                   .continue-button:hover {
                     background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
                     transform: translateY(-2px);
                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                   }
                   
                   .tips-card {
                     background: linear-gradient(135deg, rgba(52, 152, 219, 0.15) 0%, rgba(155, 89, 182, 0.15) 100%);
                     border: 1px solid rgba(52, 152, 219, 0.3);
                     border-radius: 15px;
                     padding: 25px;
                     margin-bottom: 30px;
                     backdrop-filter: blur(10px);
                   }
                   
                   .tips-card h4 {
                     margin: 0 0 15px 0;
                     color: #3498db;
                     font-size: 1.2rem;
                   }
                   
                   .tips-card ul {
                     margin: 0;
                     padding-left: 20px;
                     color: rgba(255, 255, 255, 0.8);
                   }
                   
                   .tips-card li {
                     margin: 10px 0;
                     line-height: 1.5;
                   }
                   
                   .feature-highlight {
                     background: linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(26, 188, 156, 0.15) 100%);
                     border: 1px solid rgba(46, 204, 113, 0.3);
                     border-radius: 15px;
                     padding: 25px;
                     margin-bottom: 30px;
                     backdrop-filter: blur(10px);
                   }
                   
                   .feature-highlight h4 {
                     margin: 0 0 15px 0;
                     color: #2ecc71;
                     font-size: 1.2rem;
                   }
                   
                   .feature-highlight ul {
                     margin: 0;
                     padding-left: 20px;
                     color: rgba(255, 255, 255, 0.8);
                   }
                   
                   .feature-highlight li {
                     margin: 10px 0;
                     line-height: 1.5;
                   }
                   
                   .completion-card {
                     background: linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.15) 100%);
                     border: 1px solid rgba(231, 76, 60, 0.3);
                     border-radius: 20px;
                     padding: 30px;
                     margin-bottom: 30px;
                     backdrop-filter: blur(10px);
                   }
                   
                   .completion-card h4 {
                     margin: 0 0 25px 0;
                     color: #e74c3c;
                     font-size: 1.5rem;
                     text-align: center;
                   }
                   
                   .completion-grid {
                     display: grid;
                     grid-template-columns: 1fr 1fr;
                     gap: 30px;
                   }
                   
                   @media (max-width: 768px) {
                     .completion-grid {
                       grid-template-columns: 1fr;
                     }
                   }
                   
                   .completion-section h5 {
                     margin: 0 0 15px 0;
                     color: white;
                     font-size: 1.1rem;
                   }
                   
                   .completion-section ul {
                     margin: 0;
                     padding-left: 20px;
                     color: rgba(255, 255, 255, 0.8);
                   }
                   
                   .completion-section li {
                     margin: 8px 0;
                     line-height: 1.4;
                   }
                   
                   .final-buttons {
                     display: grid;
                     grid-template-columns: 1fr 1fr;
                     gap: 20px;
                   }
                   
                   @media (max-width: 768px) {
                     .final-buttons {
                       grid-template-columns: 1fr;
                     }
                   }
                   
                   .complete-button {
                     background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
                     border: none;
                     padding: 18px 30px;
                     border-radius: 15px;
                     color: white;
                     font-size: 1.1rem;
                     font-weight: 600;
                     cursor: pointer;
                     transition: all 0.3s ease;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     gap: 10px;
                   }
                   
                   .complete-button:hover {
                     background: linear-gradient(135deg, #27ae60 0%, #219a52 100%);
                     transform: translateY(-2px);
                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                   }
                   
                   .next-tutorial-button {
                     background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
                     border: none;
                     padding: 18px 30px;
                     border-radius: 15px;
                     color: white;
                     font-size: 1.1rem;
                     font-weight: 600;
                     cursor: pointer;
                     transition: all 0.3s ease;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     gap: 10px;
                   }
                   
                   .next-tutorial-button:hover {
                     background: linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%);
                     transform: translateY(-2px);
                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                   }
                   
                   .tutorial-navigation {
                     margin-top: 40px;
                     display: flex;
                     justify-content: space-between;
                     align-items: center;
                     padding: 20px 0;
                   }
                   
                   .nav-info {
                     color: rgba(255, 255, 255, 0.6);
                     font-size: 0.9rem;
                   }
                   
                   .nav-dots {
                     display: flex;
                     gap: 8px;
                   }
                   
                   .nav-dot {
                     width: 12px;
                     height: 12px;
                     border-radius: 50%;
                     background: rgba(255, 255, 255, 0.3);
                     transition: all 0.3s ease;
                   }
                   
                   .nav-dot.active {
                     background: #9b59b6;
                     transform: scale(1.2);
                   }
                   
                   .nav-dot.completed {
                     background: #2ecc71;
                   }
                 `}</style>
        </>

    )
}





