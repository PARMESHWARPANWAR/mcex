import { Challenge } from "./challenges";

export const tutorials:Challenge[] = [
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
