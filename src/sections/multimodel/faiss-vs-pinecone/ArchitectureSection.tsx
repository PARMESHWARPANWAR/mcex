import React from 'react';

interface ArchitectureCardProps {
  title: string;
  description: string;
  code: string;
}

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ title, description, code }) => {
  return (
    <div className="arch-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="code-example">
        <pre><code>{code}</code></pre>
      </div>
      
      <style jsx>{`
        .arch-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 25px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .arch-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }
        
        .code-example {
          background: #1e1e1e;
          color: #f8f8f2;
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9em;
          overflow-x: auto;
          border: 1px solid #444;
        }
        
        .code-example pre {
          margin: 0;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

const ArchitectureSection: React.FC = () => {
  const faissCode = `import faiss
import numpy as np

# Create index for 1024-dim vectors
index = faiss.IndexFlatIP(1024)

# Add vectors
vectors = np.random.random((1000, 1024))
index.add(vectors.astype('float32'))

# Search
query = np.random.random((1, 1024))
distances, indices = index.search(
    query.astype('float32'), k=10
)`;

  const pineconeCode = `import pinecone

# Initialize Pinecone
pinecone.init(api_key="your-key")

# Create index
index = pinecone.Index("imagebind-index")

# Upsert vectors
index.upsert([
    ("id1", [0.1, 0.2, ...], {"text": "dog"}),
    ("id2", [0.3, 0.4, ...], {"text": "cat"})
])

# Search
results = index.query(
    vector=[0.1, 0.2, ...], 
    top_k=10, 
    include_metadata=True
)`;

  return (
    <div className="architecture-section">
      <h2>🏗️ How They Work</h2>
      <div className="architecture-grid">
        <ArchitectureCard
          title="🔍 FAISS Architecture"
          description="FAISS is a library that runs within your application. It builds efficient index structures in memory or on disk for fast similarity search."
          code={faissCode}
        />
        <ArchitectureCard
          title="🌲 Pinecone Architecture"
          description="Pinecone is a managed service accessed via REST API. Your data is stored and indexed in Pinecone's cloud infrastructure."
          code={pineconeCode}
        />
      </div>
      
      <style jsx>{`
        .architecture-section {
          margin: 40px 0;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .architecture-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-top: 25px;
        }
      `}</style>
    </div>
  );
};

export default ArchitectureSection;