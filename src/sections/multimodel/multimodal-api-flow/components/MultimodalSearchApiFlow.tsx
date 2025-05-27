'use client'
import React from 'react';
import Head from 'next/head';
import FlowSection from './FlowSection';
import DataFlow from './DataFlow';
import FlowSteps from './FlowSteps';
import ApiEndpoints from './ApiEndpoints';
import FeatureGrid from './FeatureGrid';
import TechStack from './TechStack';
import { 
  FlowData, 
  ProcessingStep, 
  ApiEndpoint, 
  Feature, 
  Technology 
} from '../../types';

const MultimodalSearchApiFlow: React.FC = () => {
  const architectureFlow: FlowData[] = [
    { title: '📱 Client Request', description: 'Upload image, text, or audio' },
    { title: '🔗 FastAPI', description: 'REST API endpoints' },
    { title: '🧠 ImageBind', description: 'Generate embeddings' },
    { title: '🗃️ Vector DB', description: 'Store & search embeddings' },
    { title: '📤 Response', description: 'Return results' }
  ];

  const processingSteps: ProcessingStep[] = [
    {
      title: 'Input Processing',
      description: 'Client uploads content (image, text, audio) via REST API endpoints. The system validates and preprocesses the input data.'
    },
    {
      title: 'ImageBind Preprocessing',
      description: 'Data is transformed into the format ImageBind expects using specific preprocessing pipelines for each modality.'
    },
    {
      title: 'Embedding Generation',
      description: 'ImageBind processes the input and generates a 1024-dimensional embedding vector in the shared semantic space.'
    },
    {
      title: 'Vector Storage/Search',
      description: 'Embeddings are stored in FAISS vector database or used to search for similar content across all modalities.'
    },
    {
      title: 'Result Processing',
      description: 'Similar items are ranked by similarity score and formatted for the API response.'
    }
  ];

  const apiEndpoints: ApiEndpoint[] = [
    {
      method: 'POST',
      path: '/embed/text',
      description: 'Generate embeddings from text input',
      codeExample: `{
  "text": "A beautiful sunset over the ocean"
}
→ Returns 1024-dim vector`
    },
    {
      method: 'POST',
      path: '/embed/image',
      description: 'Generate embeddings from uploaded images',
      codeExample: `FormData: image file
→ Returns 1024-dim vector`
    },
    {
      method: 'POST',
      path: '/embed/audio',
      description: 'Generate embeddings from audio files',
      codeExample: `FormData: audio file
→ Returns 1024-dim vector`
    },
    {
      method: 'POST',
      path: '/search',
      description: 'Search across all modalities using any input type',
      codeExample: `Input: text/image/audio
→ Returns ranked results`
    }
  ];

  const technicalFeatures: Feature[] = [
    {
      title: '🐳 Containerization',
      description: 'Docker containers for consistent deployment across environments with proper dependency management.'
    },
    {
      title: '📊 Monitoring',
      description: 'Prometheus metrics collection and Grafana dashboards for performance monitoring and alerting.'
    },
    {
      title: '🗄️ Data Storage',
      description: 'MongoDB for metadata and FAISS for efficient vector similarity search operations.'
    },
    {
      title: '🔧 Model Optimization',
      description: 'Custom patches for ImageBind to work without optional dependencies like cartopy and mayavi.'
    }
  ];

  const technologies: Technology[] = [
    { label: '🚀 API Framework', technology: 'FastAPI' },
    { label: '🧠 AI Model', technology: 'ImageBind' },
    { label: '🔢 ML Framework', technology: 'PyTorch' },
    { label: '🗃️ Vector Search', technology: 'FAISS' },
    { label: '🍃 Database', technology: 'MongoDB' },
    { label: '📊 Monitoring', technology: 'Prometheus + Grafana' },
    { label: '🐳 Deployment', technology: 'Docker + Docker Compose' },
    { label: '⚡ Server', technology: 'Uvicorn' }
  ];

  return (
    <>
      <Head>
        <title>Multimodal Search API Flow</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="container">
        <h1>🚀 Multimodal Search API Project Flow</h1>
        
        <FlowSection title="📊 Overall Architecture">
          <DataFlow flowData={architectureFlow} />
        </FlowSection>
        
        <FlowSection title="🔄 Request Processing Flow">
          <FlowSteps steps={processingSteps} />
        </FlowSection>
        
        <FlowSection title="🔌 API Endpoints Structure">
          <ApiEndpoints endpoints={apiEndpoints} />
        </FlowSection>
        
        <FlowSection title="⚙️ Technical Implementation">
          <FeatureGrid features={technicalFeatures} />
        </FlowSection>
        
        <TechStack technologies={technologies} />
      </div>
      
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          min-height: 100vh;
          color: white;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        h1 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 30px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
};

export default MultimodalSearchApiFlow;