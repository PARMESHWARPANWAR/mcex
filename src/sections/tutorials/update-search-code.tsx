'use client'
import React, { useState } from 'react';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Search, Zap, Shield, Code, ArrowRight, Database, Layers, Cpu, BarChart3, Gauge } from 'lucide-react';

export default function Tutorial3VectorSearchUpdated() {
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
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mb-6">
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-gray-300 text-sm font-medium">{language}</span>
                <button
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-1 rounded text-sm"
                    onClick={() => copyToClipboard(code, id)}
                >
                    <Copy className="w-4 h-4" />
                    {copiedCode === id ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all mb-6">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Challenges
                    </button>

                    <div className="text-center mb-8">
                        <h1 className="text-6xl font-bold text-white/60 mb-4">Vector Search</h1>
                        
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Tutorial 3 of 8</span>
                        </div>

                        <h2 className="text-4xl font-bold mb-4">Implementing Vector Search with FAISS</h2>
                        
                        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Build a high-performance similarity search system using FAISS. Learn to index embeddings,
                            perform fast nearest neighbor searches, and optimize for production workloads with
                            millions of vectors.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
                            <Database className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">FAISS Indexing</h3>
                            <p className="text-white/70">Facebook's library for efficient similarity search and clustering</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
                            <Search className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Fast Search</h3>
                            <p className="text-white/70">Millisecond-level search across millions of high-dimensional vectors</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all">
                            <Gauge className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Production Scale</h3>
                            <p className="text-white/70">Optimized for memory efficiency and search performance</p>
                        </div>
                    </div>
                </div>

                {/* Tutorial Progress */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="w-6 h-6 text-green-400" />
                        <h2 className="text-2xl font-semibold">Tutorial Progress</h2>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                                    activeStep === index 
                                        ? 'bg-white/20 border-white/30' 
                                        : completedSteps.has(index)
                                        ? 'bg-green-500/20 border-green-400/30'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="p-2 bg-white/10 rounded-lg">
                                    {step.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold">{step.title}</h4>
                                    <p className="text-white/60 text-sm">{step.content}</p>
                                </div>
                                <div className="flex items-center">
                                    {completedSteps.has(index) && <CheckCircle className="w-5 h-5 text-green-400" />}
                                    {activeStep === index && <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                    {activeStep === 0 && (
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Database className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-3xl font-bold">FAISS Setup & Configuration</h2>
                            </div>

                            <p className="text-xl text-white/80 mb-8">
                                FAISS (Facebook AI Similarity Search) is a library for efficient similarity search and clustering of dense vectors.
                                Let's install and configure it for our multimodal search system.
                            </p>

                            <div className="bg-white/5 rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-cyan-400">🏗️ FAISS vs Alternatives Comparison</h3>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-300 mb-3">🔍 FAISS</h4>
                                        <div className="mb-4">
                                            <h5 className="text-green-400 font-medium mb-2">✅ Advantages</h5>
                                            <ul className="text-sm text-white/80 space-y-1 pl-4">
                                                <li>• Extremely fast (sub-millisecond search)</li>
                                                <li>• Free and open source</li>
                                                <li>• Runs locally - full data control</li>
                                                <li>• Multiple index types for different needs</li>
                                                <li>• GPU acceleration support</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-red-400 font-medium mb-2">❌ Trade-offs</h5>
                                            <ul className="text-sm text-white/80 space-y-1 pl-4">
                                                <li>• Requires more setup and configuration</li>
                                                <li>• Manual scaling and management</li>
                                                <li>• Need to handle persistence yourself</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                                        <h4 className="font-semibold text-red-300 mb-3">🌲 Pinecone</h4>
                                        <div className="mb-4">
                                            <h5 className="text-green-400 font-medium mb-2">✅ Advantages</h5>
                                            <ul className="text-sm text-white/80 space-y-1 pl-4">
                                                <li>• Fully managed service</li>
                                                <li>• Auto-scaling and backups</li>
                                                <li>• Real-time updates</li>
                                                <li>• Built-in metadata filtering</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-red-400 font-medium mb-2">❌ Trade-offs</h5>
                                            <ul className="text-sm text-white/80 space-y-1 pl-4">
                                                <li>• Expensive ($70/month+)</li>
                                                <li>• Network latency overhead</li>
                                                <li>• Vendor lock-in</li>
                                                <li>• Data privacy concerns</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-center">
                                    <h4 className="text-green-300 font-semibold mb-2">🎯 Our Choice: FAISS</h4>
                                    <p className="text-white/80">For this tutorial, we're using FAISS because it's free, extremely fast, and perfect for learning the fundamentals of vector search.</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Step 1: Install FAISS</h3>
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

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Step 2: Create Vector Storage Service</h3>
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
        self.dimension = dimension
        self.index_type = index_type
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True)
        
        # FAISS index
        self.index = None
        self.is_trained = False
        
        # Metadata storage
        self.id_to_metadata = {}
        self.index_to_id = {}
        self.id_to_index = {}
        self.next_index = 0
        
        self._initialize_index()
    
    def _initialize_index(self):
        """Initialize the FAISS index based on type"""
        if self.index_type == "Flat":
            self.index = faiss.IndexFlatIP(self.dimension)
            self.is_trained = True
        elif self.index_type == "IVF":
            nlist = 100
            quantizer = faiss.IndexFlatIP(self.dimension)
            self.index = faiss.IndexIVFFlat(quantizer, self.dimension, nlist)
        elif self.index_type == "HNSW":
            M = 16
            self.index = faiss.IndexHNSWFlat(self.dimension, M)
            self.index.hnsw.efConstruction = 200
            self.index.hnsw.efSearch = 50
            self.is_trained = True`}
                                />
                            </div>

                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6 mb-8">
                                <h4 className="text-blue-300 font-semibold mb-4">🔧 Index Type Selection Guide</h4>
                                <ul className="text-white/80 space-y-2">
                                    <li>• <strong>Flat:</strong> Use for &lt;100K vectors, guarantees exact results</li>
                                    <li>• <strong>IVF:</strong> Use for 100K-10M vectors, good speed/accuracy balance</li>
                                    <li>• <strong>HNSW:</strong> Use for &gt;1M vectors, fastest search but uses more memory</li>
                                    <li>• <strong>Training:</strong> IVF requires 256+ vectors for training</li>
                                    <li>• <strong>Memory:</strong> Flat and IVF use less memory than HNSW</li>
                                </ul>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                                onClick={() => { setActiveStep(1); markStepComplete(0); }}
                            >
                                Continue to Vector Index Management
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Layers className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-3xl font-bold">Vector Index Management</h2>
                            </div>

                            <p className="text-xl text-white/80 mb-8">
                                Implement persistence, backup, and management features for your vector index to ensure data safety and efficient operations.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Add Vector and Persistence Methods</h3>
                                <CodeBlock
                                    language="python"
                                    id="persistence-methods"
                                    code={`    def add_vector(self, vector_item: VectorItem) -> bool:
        """Add a vector to the index"""
        try:
            if len(vector_item.vector) != self.dimension:
                raise ValueError(f"Vector dimension mismatch")
            
            # Convert to numpy array and normalize
            vector = np.array(vector_item.vector, dtype=np.float32).reshape(1, -1)
            vector = vector / np.linalg.norm(vector, axis=1, keepdims=True)
            
            # Train index if needed (for IVF)
            if not self.is_trained and self.index_type == "IVF":
                if self.next_index >= 256:
                    self._train_index()
            
            # Add to FAISS index if trained
            if self.is_trained:
                self.index.add(vector)
                faiss_index = self.next_index
                self.index_to_id[faiss_index] = vector_item.id
                self.id_to_index[vector_item.id] = faiss_index
                self.next_index += 1
            
            # Store metadata
            self.id_to_metadata[vector_item.id] = {
                'metadata': vector_item.metadata,
                'modality': vector_item.modality,
                'timestamp': vector_item.timestamp,
                'vector': vector_item.vector
            }
            
            return True
        except Exception as e:
            logger.error(f"Failed to add vector: {e}")
            return False
    
    def save_index(self, filename: str = None) -> bool:
        """Save the FAISS index and metadata to disk"""
        try:
            if filename is None:
                timestamp = int(time.time())
                filename = f"faiss_index_{timestamp}"
            
            index_path = self.storage_dir / f"{filename}.index"
            metadata_path = self.storage_dir / f"{filename}.metadata"
            
            # Save FAISS index
            if self.index is not None and self.is_trained:
                faiss.write_index(self.index, str(index_path))
            
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
            
            return True
        except Exception as e:
            logger.error(f"Failed to save index: {e}")
            return False`}
                                />
                            </div>

                            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6 mb-8">
                                <h4 className="text-green-300 font-semibold mb-4">🔄 Index Management Features</h4>
                                <ul className="text-white/80 space-y-2">
                                    <li>• <strong>Auto-save:</strong> Automatic saving every N vector additions</li>
                                    <li>• <strong>Backup system:</strong> Regular backups with cleanup of old files</li>
                                    <li>• <strong>Health monitoring:</strong> Track index status and performance</li>
                                    <li>• <strong>Export/Import:</strong> Data portability and migration support</li>
                                    <li>• <strong>Rebuild capability:</strong> Recover from index corruption</li>
                                </ul>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                                onClick={() => { setActiveStep(2); markStepComplete(1); }}
                            >
                                Continue to Search Implementation
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Search className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-3xl font-bold">Search Implementation</h2>
                            </div>

                            <p className="text-xl text-white/80 mb-8">
                                Implement powerful similarity search functionality with filtering, ranking, and cross-modal capabilities.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Core Search Methods</h3>
                                <CodeBlock
                                    language="python"
                                    id="search-methods"
                                    code={`    def search_similar(self, 
                      query_vector: List[float], 
                      k: int = 10,
                      similarity_threshold: float = 0.0,
                      modality_filter: Optional[str] = None) -> List[SearchResult]:
        """Search for similar vectors"""
        try:
            if not self.is_trained or self.index is None:
                return []
            
            if len(query_vector) != self.dimension:
                raise ValueError(f"Query vector dimension mismatch")
            
            # Normalize query vector
            query = np.array(query_vector, dtype=np.float32).reshape(1, -1)
            query = query / np.linalg.norm(query, axis=1, keepdims=True)
            
            # Perform FAISS search
            search_k = min(k * 2, self.next_index)
            scores, indices = self.index.search(query, search_k)
            
            results = []
            for score, idx in zip(scores[0], indices[0]):
                if idx == -1:
                    continue
                
                similarity_score = float(score)
                if similarity_score < similarity_threshold:
                    continue
                
                vector_id = self.index_to_id.get(idx)
                if vector_id is None:
                    continue
                
                item_data = self.id_to_metadata.get(vector_id)
                if item_data is None:
                    continue
                
                # Apply modality filter
                if modality_filter and item_data['modality'] != modality_filter:
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
            return results
            
        except Exception as e:
            logger.error(f"Search failed: {e}")
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
        )`}
                                />
                            </div>

                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-6 mb-8">
                                <h4 className="text-blue-300 font-semibold mb-4">🔍 Search Strategy Guide</h4>
                                <ul className="text-white/80 space-y-2">
                                    <li>• <strong>Basic search:</strong> Use for most queries, fast and accurate</li>
                                    <li>• <strong>Cross-modal:</strong> Find images similar to text descriptions</li>
                                    <li>• <strong>Filtered search:</strong> Search within specific modalities or metadata</li>
                                    <li>• <strong>Similarity threshold:</strong> Control result quality vs quantity</li>
                                    <li>• <strong>K parameter:</strong> Balance between speed and comprehensiveness</li>
                                </ul>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                                onClick={() => { setActiveStep(3); markStepComplete(2); }}
                            >
                                Continue to Performance Optimization
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Gauge className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-3xl font-bold">Performance Optimization</h2>
                            </div>

                            <p className="text-xl text-white/80 mb-8">
                                Optimize your vector search for speed, memory efficiency, and accuracy with advanced FAISS techniques and caching strategies.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Performance Monitoring & Caching</h3>
                                <CodeBlock
                                    language="python"
                                    id="performance-optimization"
                                    code={`# Create performance_monitor.py
import time
import hashlib
from collections import deque
from dataclasses import dataclass
from typing import Dict, List, Any
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
    
    def record_search(self, metrics: SearchMetrics):
        """Record search operation metrics"""
        self.search_history.append(metrics)
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """Get comprehensive performance statistics"""
        if not self.search_history:
            return {'no_data': True}
        
        recent_searches = list(self.search_history)
        query_times = [s.query_time_ms for s in recent_searches]
        
        return {
            'total_searches': len(recent_searches),
            'avg_query_time_ms': np.mean(query_times),
            'median_query_time_ms': np.median(query_times),
            'p95_query_time_ms': np.percentile(query_times, 95),
            'recommendations': self._get_recommendations(query_times)
        }
    
    def _get_recommendations(self, query_times: List[float]) -> List[str]:
        """Generate performance recommendations"""
        recommendations = []
        avg_time = np.mean(query_times)
        
        if avg_time > 100:
            recommendations.append("High query times. Consider using IVF or HNSW index.")
        elif avg_time > 50:
            recommendations.append("Query performance could be improved.")
        
        return recommendations

# Enhanced Vector Store with Caching
class OptimizedVectorStore(FAISSVectorStore):
    """Enhanced vector store with caching and optimization"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.query_cache = {}
        self.cache_max_size = 1000
        self.performance_monitor = PerformanceMonitor()
    
    def _get_query_hash(self, query_vector: List[float], k: int) -> str:
        """Generate hash for query caching"""
        query_str = f"{query_vector[:10]}_{k}"
        return hashlib.md5(query_str.encode()).hexdigest()
    
    def search_similar_cached(self, query_vector: List[float], k: int = 10, **kwargs) -> List[SearchResult]:
        """Search with result caching"""
        start_time = time.time()
        
        # Check cache first
        cache_key = self._get_query_hash(query_vector, k)
        
        if cache_key in self.query_cache:
            cached_result, timestamp = self.query_cache[cache_key]
            
            # Use cached result if it's less than 5 minutes old
            if time.time() - timestamp < 300:
                return cached_result
            else:
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
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache performance statistics"""
        return {
            'cache_size': len(self.query_cache),
            'cache_max_size': self.cache_max_size,
            'cache_utilization': len(self.query_cache) / self.cache_max_size
        }`}
                                />
                            </div>

                            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6 mb-8">
                                <h4 className="text-yellow-300 font-semibold mb-4">⚡ Performance Optimization Features</h4>
                                <ul className="text-white/80 space-y-2">
                                    <li>• <strong>Query caching:</strong> Cache frequent searches for instant results</li>
                                    <li>• <strong>Performance monitoring:</strong> Track search metrics and identify bottlenecks</li>
                                    <li>• <strong>Memory management:</strong> Efficient cache management with automatic cleanup</li>
                                    <li>• <strong>Recommendations:</strong> Automatic suggestions for performance improvements</li>
                                    <li>• <strong>Metrics tracking:</strong> Detailed analytics on search performance</li>
                                </ul>
                            </div>

                            <button
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                                onClick={() => { setActiveStep(4); markStepComplete(3); }}
                            >
                                Continue to API Integration
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {activeStep === 4 && (
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <BarChart3 className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-3xl font-bold">API Integration</h2>
                            </div>

                            <p className="text-xl text-white/80 mb-8">
                                Integrate the vector search functionality into your FastAPI application with new endpoints for similarity search and vector management.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">FastAPI Integration</h3>
                                <CodeBlock
                                    language="python"
                                    id="api-integration"
                                    code={`# Add to main.py
from vector_service import OptimizedVectorStore, VectorItem
from performance_monitor import PerformanceMonitor
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from typing import List, Dict, Any, Optional
import time

# Global vector store
vector_store = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize vector store
    global vector_store
    print("🚀 Initializing vector search system...")
    
    # Initialize vector store
    vector_store = OptimizedVectorStore(
        dimension=1024,
        index_type="IVF"
    )
    
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

@app.post("/search/similar")
async def search_similar_vectors(
    embedding: List[float],
    k: int = 10,
    similarity_threshold: float = 0.0,
    modality_filter: Optional[str] = None
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
            modality_filter=modality_filter
        )
        
        # Convert to response format
        return [{
            "id": result.id,
            "similarity_score": result.score,
            "metadata": result.metadata,
            "modality": result.modality
        } for result in results]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

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
        
        return [{
            "id": result.id,
            "similarity_score": result.score,
            "metadata": result.metadata,
            "modality": result.modality
        } for result in results]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cross-modal search failed: {str(e)}")`}
                                />
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-4">Vector Management & Analytics</h3>
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
        global vector_store
        
        if not vector_store:
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
        success = vector_store.add_vector(vector_item)
        
        if not success:
            raise HTTPException(status_code=400, detail="Failed to add vector")
        
        return {
            "status": "success", 
            "vector_id": vector_id, 
            "message": "Vector added successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add vector: {str(e)}")

@app.get("/analytics/performance")
async def get_performance_analytics():
    """Get detailed performance analytics"""
    try:
        global vector_store
        
        if not vector_store:
            raise HTTPException(status_code=503, detail="Vector store not available")
        
        # Get performance stats
        performance_stats = vector_store.performance_monitor.get_performance_stats()
        
        # Get cache stats
        cache_stats = vector_store.get_cache_stats()
        
        # Get basic vector store info
        vector_store_info = {
            "total_vectors": len(vector_store.id_to_metadata),
            "index_type": vector_store.index_type,
            "is_trained": vector_store.is_trained
        }
        
        return {
            "performance": performance_stats,
            "cache": cache_stats,
            "vector_store": vector_store_info,
            "timestamp": time.time()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get analytics: {str(e)}")

@app.post("/management/clear_cache")
async def clear_search_cache():
    """Clear the search cache"""
    try:
        global vector_store
        
        if not vector_store:
            raise HTTPException(status_code=503, detail="Vector store not available")
        
        vector_store.clear_cache()
        
        return {"status": "success", "message": "Cache cleared successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clear cache: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    global vector_store
    
    if not vector_store:
        return {"status": "unhealthy", "message": "Vector store not available"}
    
    return {
        "status": "healthy",
        "vector_count": len(vector_store.id_to_metadata),
        "index_trained": vector_store.is_trained,
        "cache_size": len(vector_store.query_cache)
    }`}
                                />
                            </div>

                            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-8 mb-8">
                                <h4 className="text-red-300 font-semibold text-xl mb-6 text-center">🎯 Congratulations! You've Built a Complete Vector Search System</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="text-green-400 font-semibold mb-3">✅ What You've Accomplished</h5>
                                        <ul className="text-white/80 space-y-2 text-sm">
                                            <li>• Implemented FAISS vector storage and indexing</li>
                                            <li>• Built high-performance similarity search</li>
                                            <li>• Added cross-modal search capabilities</li>
                                            <li>• Created performance monitoring and caching</li>
                                            <li>• Integrated with FastAPI for production use</li>
                                            <li>• Added analytics and management endpoints</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="text-blue-400 font-semibold mb-3">🚀 What's Next in Tutorial 4</h5>
                                        <ul className="text-white/80 space-y-2 text-sm">
                                            <li>• Implement cross-modal search UI</li>
                                            <li>• Build advanced search interfaces</li>
                                            <li>• Create recommendation systems</li>
                                            <li>• Add real-time search capabilities</li>
                                            <li>• Optimize for production workloads</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <button
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                                    onClick={() => markStepComplete(4)}
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Mark Tutorial Complete
                                </button>

                                <button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3">
                                    Continue to Tutorial 4: Cross-Modal Search
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tutorial Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
                    <div className="text-white/60 text-sm">
                        Tutorial 3 of 8 • Implementing Vector Search with FAISS
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    i === 2 
                                        ? 'bg-purple-500 scale-125' 
                                        : i < 2 
                                        ? 'bg-green-400' 
                                        : 'bg-white/30'
                                }`}
                            />
                        ))}
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
        </div>
    );
}