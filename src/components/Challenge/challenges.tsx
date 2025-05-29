'use client'
import React from 'react';
import { NextPage } from 'next';
// import Layout from '../components/Layout';

import ChallengeGrid from './ChallengeGrid';

const ChallengesPage: NextPage = () => {
  const challenges = [
    {
      Tutorial: 1,
      title: "Setting Up ImageBind Environment",
      description: "Learn how to install and configure ImageBind with Docker, set up your development environment, and run your first multimodal embedding.",
      path: "/tutorials/setup-imagebind",
      difficulty: "Easy" as const,
      category: "Setup"
    },
    {
      Tutorial: 2,
      title: "Building Your First API Endpoint",
      description: "Create a FastAPI endpoint that accepts images and returns embeddings using ImageBind. Includes error handling and response formatting.",
      path: "/tutorials/first-api-endpoint",
      difficulty: "Easy" as const,
      category: "API Development"
    },
    {
      Tutorial: 3,
      title: "Implementing Vector Search with FAISS",
      description: "Build a similarity search system using FAISS. Learn to index embeddings, perform searches, and optimize for performance.",
      path: "/tutorials/vector-search-faiss",
      difficulty: "Medium" as const,
      category: "Vector Databases"
    },
    {
      Tutorial: 4,
      title: "Cross-Modal Search Implementation",
      description: "Create a system that can search for images using text queries, audio using images, and any modality combination using ImageBind.",
      path: "/tutorials/cross-modal-search",
      difficulty: "Medium" as const,
      category: "Multimodal AI"
    },
    {
      Tutorial: 5,
      title: "MongoDB Integration for Metadata",
      description: "Design and implement a MongoDB schema for storing multimodal content metadata, with efficient queries and aggregation pipelines.",
      path: "/tutorials/mongodb-integration",
      difficulty: "Medium" as const,
      category: "Database"
    },
    {
      Tutorial: 6,
      title: "Production Deployment with Docker",
      description: "Deploy your multimodal search API to production using Docker Compose, with monitoring, logging, and scaling considerations.",
      path: "/tutorials/production-deployment",
      difficulty: "Hard" as const,
      category: "DevOps"
    },
    {
      Tutorial: 7,
      title: "Advanced Embedding Optimization",
      description: "Learn advanced techniques for optimizing embedding generation, batch processing, and memory management for large-scale applications.",
      path: "/tutorials/embedding-optimization",
      difficulty: "Hard" as const,
      category: "Performance"
    },
    {
      Tutorial: 8,
      title: "Building a Complete Web Interface",
      description: "Create a React frontend that connects to your API, with file upload, search functionality, and real-time results visualization.",
      path: "/tutorials/web-interface",
      difficulty: "Hard" as const,
      category: "Frontend"
    }
  ];

  return (
    <div
      title="Multimodal AI Challenges"
      description="Step-by-step tutorials for mastering multimodal AI development with ImageBind"
    >
      <div maxWidth="1400px">
        <ChallengeGrid 
          challenges={challenges}
          title="🎯 Multimodal AI Learning Path"
          subtitle="Master ImageBind and multimodal search from basics to production"
        />
        
        <div className="learning-path-info">
          <div className="info-card">
            <h3>📚 Progressive Learning</h3>
            <p>Each tutorial builds upon the previous ones, creating a complete multimodal search system by the end.</p>
          </div>
          <div className="info-card">
            <h3>🛠️ Hands-On Practice</h3>
            <p>Every challenge includes practical code examples, exercises, and real-world implementations.</p>
          </div>
          <div className="info-card">
            <h3>🚀 Production Ready</h3>
            <p>Learn not just the concepts, but how to deploy and scale multimodal AI systems in production.</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .learning-path-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 60px;
        }
        
        .info-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 25px;
          border-left: 4px solid #4ecdc4;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-3px);
        }
        
        .info-card h3 {
          margin-top: 0;
          color: #4ecdc4;
          font-size: 1.3em;
        }
        
        .info-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ChallengesPage;