'use client'
import React from 'react';
import Head from 'next/head';
import DatabaseCard from './DatabaseCard';
import ComparisonTable from './ComparisonTable';
import ProsConsSection from './ProsConsSection';
import ArchitectureSection from './ArchitectureSection';
import PerformanceMetrics from './PerformanceMetrics';
import RecommendationSection from './RecommendationSection';
import UseCaseGrid from './UseCaseGrid';
import { 
  ComparisonRow, 
  ProsConsData, 
  PerformanceMetric, 
  UseCase 
} from '../types';

const FaissPineconeComparison: React.FC = () => {
  const comparisonData: ComparisonRow[] = [
    { feature: '🏗️ Architecture', faiss: 'Self-hosted library', pinecone: 'Managed cloud service' },
    { feature: '💰 Cost', faiss: 'Free (infrastructure costs)', pinecone: '$70/month starter + usage' },
    { feature: '⚡ Performance', faiss: 'Extremely fast (optimized)', pinecone: 'Fast (network latency)' },
    { feature: '📈 Scalability', faiss: 'Manual scaling required', pinecone: 'Auto-scaling' },
    { feature: '🛠️ Setup Complexity', faiss: 'Medium (coding required)', pinecone: 'Easy (API calls)' },
    { feature: '🔒 Data Control', faiss: 'Full control', pinecone: 'Third-party managed' },
    { feature: '🚀 Production Ready', faiss: 'Requires DevOps work', pinecone: 'Ready out-of-the-box' }
  ];

  const faissData: ProsConsData = {
    pros: [
      '<strong>Cost:</strong> Completely free, only pay for infrastructure',
      '<strong>Performance:</strong> Extremely fast, no network latency',
      '<strong>Flexibility:</strong> Multiple index types and optimization options',
      '<strong>Privacy:</strong> Your data never leaves your infrastructure',
      '<strong>Customization:</strong> Full control over indexing strategies',
      '<strong>Offline:</strong> Works without internet connection',
      '<strong>Integration:</strong> Direct Python library integration'
    ],
    cons: [
      '<strong>Complexity:</strong> Requires more coding and setup',
      '<strong>Scaling:</strong> Manual scaling and sharding needed',
      '<strong>Persistence:</strong> Need to handle data persistence yourself',
      '<strong>DevOps:</strong> Requires infrastructure management',
      '<strong>Updates:</strong> Complex to update vectors in large indices',
      '<strong>Backup:</strong> Need to implement backup strategies'
    ]
  };

  const pineconeData: ProsConsData = {
    pros: [
      '<strong>Simplicity:</strong> Easy API, quick setup',
      '<strong>Managed:</strong> Automatic scaling, backups, updates',
      '<strong>Features:</strong> Built-in metadata filtering',
      '<strong>Real-time:</strong> Live updates and deletes',
      '<strong>Monitoring:</strong> Built-in analytics and monitoring',
      '<strong>Support:</strong> Professional support available',
      '<strong>Multi-tenancy:</strong> Built-in namespace support'
    ],
    cons: [
      '<strong>Cost:</strong> Expensive for large-scale usage',
      '<strong>Latency:</strong> Network calls add latency',
      '<strong>Vendor Lock-in:</strong> Dependent on Pinecone service',
      '<strong>Data Privacy:</strong> Data stored on third-party servers',
      '<strong>Limited Control:</strong> Cannot optimize index structures',
      '<strong>Internet Dependency:</strong> Requires internet connection'
    ]
  };

  const performanceData: PerformanceMetric[] = [
    { value: '~1ms', description: 'FAISS Query Time (local)' },
    { value: '~50ms', description: 'Pinecone Query Time (API)' },
    { value: '1M+', description: 'FAISS Vectors/second' },
    { value: '10K', description: 'Pinecone Queries/second' }
  ];

  const useCaseData: UseCase[] = [
    {
      title: '🚀 Choose FAISS When:',
      items: [
        'Building prototypes or learning',
        'Cost is a primary concern',
        'Need maximum performance',
        'Data privacy is critical',
        'Have DevOps capabilities',
        'Want full customization control'
      ]
    },
    {
      title: '🌲 Choose Pinecone When:',
      items: [
        'Want managed infrastructure',
        'Need rapid deployment',
        'Require real-time updates',
        'Limited DevOps resources',
        'Need enterprise support',
        'Building multi-tenant apps'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>FAISS vs Pinecone Comparison</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="container">
        <h1>🚀 FAISS vs Pinecone: Vector Database Showdown</h1>
        
        <div className="comparison-header">
          <DatabaseCard
            name="FAISS"
            logo="🔍"
            subtitle="Facebook AI Similarity Search"
            description="Open-source, self-hosted library for efficient similarity search"
            cardType="faiss"
          />
          <DatabaseCard
            name="Pinecone"
            logo="🌲"
            subtitle="Managed Vector Database"
            description="Cloud-native, fully managed vector database service"
            cardType="pinecone"
          />
        </div>
        
        <ComparisonTable data={comparisonData} />
        
        <ArchitectureSection />
        
        <ProsConsSection 
          faissData={faissData}
          pineconeData={pineconeData}
        />
        
        <PerformanceMetrics metrics={performanceData} />
        
        <RecommendationSection
          title="🎯 Recommendation for Your ImageBind Project"
          subtitle="Start with FAISS, Consider Pinecone for Production"
          description="For your current development phase and learning, FAISS is the better choice. It's free, integrates directly with your Docker setup, and gives you full control. Once you scale to production with many users, consider migrating to Pinecone for the managed convenience."
        />
        
        <UseCaseGrid useCases={useCaseData} />
      </div>
      
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          min-height: 100vh;
          color: white;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        
        h1 {
          text-align: center;
          font-size: 2.8em;
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .comparison-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
};

export default FaissPineconeComparison;