'use client'
import React, { useState } from 'react';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Server, Zap, Shield, Code, ArrowRight, Cpu, Globe, Layers, Upload, Download, Database } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function Tutorial2ApiEndpoint() {
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
      title: "FastAPI Foundation",
      icon: <Server className="w-5 h-5" />,
      content: "Set up FastAPI structure and basic configuration"
    },
    {
      title: "ImageBind Integration",
      icon: <Layers className="w-5 h-5" />,
      content: "Connect ImageBind model to API endpoints"
    },
    {
      title: "File Upload Handling",
      icon: <Upload className="w-5 h-5" />,
      content: "Process image, audio, and text inputs"
    },
    {
      title: "Response Formatting",
      icon: <Database className="w-5 h-5" />,
      content: "Structure API responses and error handling"
    },
    {
      title: "Testing & Deployment",
      icon: <Globe className="w-5 h-5" />,
      content: "Test endpoints and prepare for production"
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
            <BackButton path='/tutorials' />

            <div className="hero-section">
              <h1 className="page-title">API Development</h1>

              <div className="tutorial-badge">
                <Zap className="w-4 h-4" />
                <span>Tutorial 2 of 8</span>
              </div>

              <h2 className="main-title">Building Your First API Endpoint</h2>

              <p className="main-description">
                Transform your ImageBind setup into a production-ready FastAPI service with file uploads,
                embedding generation, and proper error handling. Build REST endpoints that can process
                multimodal data at scale.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="feature-cards-grid">
              <div className="feature-card">
                <Server className="w-8 h-8" />
                <h3>FastAPI Framework</h3>
                <p>Modern, fast web framework with automatic API documentation</p>
              </div>
              <div className="feature-card">
                <Upload className="w-8 h-8" />
                <h3>File Processing</h3>
                <p>Handle image, audio, and text uploads with validation</p>
              </div>
              <div className="feature-card">
                <Globe className="w-8 h-8" />
                <h3>Production Ready</h3>
                <p>Scalable architecture with proper error handling</p>
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
                  <Server className="w-8 h-8" />
                  <h2>FastAPI Foundation</h2>
                </div>

                <p className="step-description">
                  Let's build a robust FastAPI application that serves ImageBind embeddings through clean REST endpoints.
                </p>

                <div className="architecture-overview">
                  <h3>🏗️ API Architecture Overview</h3>
                  <div className="architecture-flow">
                    <div className="flow-item">
                      <Upload className="w-6 h-6" />
                      <span>Client Upload</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                      <Server className="w-6 h-6" />
                      <span>FastAPI</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                      <Layers className="w-6 h-6" />
                      <span>ImageBind</span>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item">
                      <Database className="w-6 h-6" />
                      <span>Response</span>
                    </div>
                  </div>
                </div>

                <div className="setup-step">
                  <h3>Step 1: Install Dependencies</h3>
                  <CodeBlock
                    language="bash"
                    id="install-deps"
                    code={`# Add to your existing Dockerfile or install in container
pip install fastapi uvicorn python-multipart aiofiles pydantic`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: Create Project Structure</h3>
                  <CodeBlock
                    language="bash"
                    id="project-structure"
                    code={`# In your workspace directory
mkdir api
cd api

# Create the main files
touch main.py
touch models.py
touch services.py
touch config.py

# Create directories
mkdir uploads
mkdir static`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 3: Basic FastAPI Setup (main.py)</h3>
                  <CodeBlock
                    language="python"
                    id="main-fastapi"
                    code={`from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import os
from contextlib import asynccontextmanager

from services import ImageBindService
from models import EmbeddingResponse, ErrorResponse
from config import settings

# Global variable to hold our ImageBind service
imagebind_service = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize ImageBind model
    global imagebind_service
    print("🚀 Initializing ImageBind service...")
    imagebind_service = ImageBindService()
    await imagebind_service.initialize()
    print("✅ ImageBind service ready!")
    
    yield
    
    # Shutdown: Clean up resources
    print("🔄 Shutting down ImageBind service...")
    if imagebind_service:
        imagebind_service.cleanup()
    print("✅ Cleanup complete!")

# Create FastAPI app with lifespan management
app = FastAPI(
    title="ImageBind Multimodal API",
    description="Generate embeddings from images, text, and audio using Meta's ImageBind",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for web applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    """Welcome endpoint with API information"""
    return {
        "message": "ImageBind Multimodal API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "text_embedding": "/embed/text",
            "image_embedding": "/embed/image", 
            "audio_embedding": "/embed/audio",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    global imagebind_service
    if imagebind_service and imagebind_service.is_ready():
        return {"status": "healthy", "model": "loaded"}
    return JSONResponse(
        status_code=503,
        content={"status": "unhealthy", "model": "not_loaded"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 4: Configuration (config.py)</h3>
                  <CodeBlock
                    language="python"
                    id="config-file"
                    code={`import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Configuration
    api_title: str = "ImageBind Multimodal API"
    api_version: str = "1.0.0"
    debug: bool = True
    
    # Model Configuration
    device: str = "cuda" if os.environ.get("CUDA_AVAILABLE") else "cpu"
    model_name: str = "imagebind_huge"
    
    # File Upload Configuration
    max_file_size: int = 50 * 1024 * 1024  # 50MB
    allowed_image_types: list = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    allowed_audio_types: list = ["audio/wav", "audio/mp3", "audio/ogg", "audio/flac"]
    
    # Processing Configuration
    batch_size: int = 1
    max_text_length: int = 1000
    
    # Directory Configuration
    upload_dir: str = "uploads"
    static_dir: str = "static"
    
    class Config:
        env_file = ".env"

# Create global settings instance
settings = Settings()`}
                  />
                </div>

                <button
                  className="continue-button"
                  onClick={() => { setActiveStep(1); markStepComplete(0); }}
                >
                  Continue to ImageBind Integration
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {activeStep === 1 && (
              <div className="step-content-container">
                <div className="step-header">
                  <Layers className="w-8 h-8" />
                  <h2>ImageBind Integration</h2>
                </div>

                <p className="step-description">
                  Create a service class that manages the ImageBind model and provides clean interfaces for embedding generation.
                </p>

                <div className="setup-step">
                  <h3>Step 1: Pydantic Models (models.py)</h3>
                  <CodeBlock
                    language="python"
                    id="pydantic-models"
                    code={`from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class ModalityType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    AUDIO = "audio"
    VIDEO = "video"

class TextEmbeddingRequest(BaseModel):
    text: str = Field(..., max_length=1000, description="Text to embed")
    normalize: bool = Field(True, description="Whether to normalize the embedding")

class EmbeddingResponse(BaseModel):
    embedding: List[float] = Field(..., description="1024-dimensional embedding vector")
    modality: ModalityType = Field(..., description="Type of input modality")
    shape: List[int] = Field(..., description="Shape of the embedding tensor")
    processing_time_ms: float = Field(..., description="Processing time in milliseconds")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional metadata")

class SimilarityRequest(BaseModel):
    embedding1: List[float] = Field(..., description="First embedding vector")
    embedding2: List[float] = Field(..., description="Second embedding vector")

class SimilarityResponse(BaseModel):
    similarity: float = Field(..., description="Cosine similarity score between -1 and 1")
    processing_time_ms: float = Field(..., description="Processing time in milliseconds")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    error_code: str = Field(..., description="Error code for programmatic handling")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional error details")

class HealthResponse(BaseModel):
    status: str = Field(..., description="Service health status")
    model_loaded: bool = Field(..., description="Whether ImageBind model is loaded")
    device: str = Field(..., description="Device being used (cpu/cuda)")
    memory_usage: Optional[Dict[str, float]] = Field(None, description="Memory usage statistics")`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: ImageBind Service (services.py)</h3>
                  <CodeBlock
                    language="python"
                    id="imagebind-service"
                    code={`import torch
import time
import asyncio
from pathlib import Path
from typing import List, Dict, Any, Optional
import numpy as np
from PIL import Image
import tempfile
import os

from imagebind import data
from imagebind.models import imagebind_model
from imagebind.models.imagebind_model import ModalityType as IBModalityType
from config import settings
from models import ModalityType, EmbeddingResponse

class ImageBindService:
    def __init__(self):
        self.model = None
        self.device = settings.device
        self.is_initialized = False
        
    async def initialize(self):
        """Initialize the ImageBind model asynchronously"""
        try:
            print(f"🔄 Loading ImageBind model on {self.device}...")
            
            # Load model in a thread to avoid blocking
            loop = asyncio.get_event_loop()
            self.model = await loop.run_in_executor(
                None, 
                self._load_model
            )
            
            self.is_initialized = True
            print("✅ ImageBind model loaded successfully!")
            
        except Exception as e:
            print(f"❌ Failed to initialize ImageBind: {str(e)}")
            raise e
    
    def _load_model(self):
        """Load the ImageBind model (runs in thread)"""
        model = imagebind_model.imagebind_huge(pretrained=True)
        model.eval()
        model.to(self.device)
        return model
    
    def is_ready(self) -> bool:
        """Check if the service is ready to process requests"""
        return self.is_initialized and self.model is not None
    
    async def embed_text(self, text: str, normalize: bool = True) -> EmbeddingResponse:
        """Generate embedding for text input"""
        if not self.is_ready():
            raise RuntimeError("ImageBind service not initialized")
        
        start_time = time.time()
        
        try:
            # Prepare text input
            inputs = {
                IBModalityType.TEXT: data.load_and_transform_text([text], self.device)
            }
            
            # Generate embedding
            with torch.no_grad():
                embeddings = self.model(inputs)
                text_embedding = embeddings[IBModalityType.TEXT]
                
                if normalize:
                    text_embedding = torch.nn.functional.normalize(text_embedding, dim=-1)
                
                # Convert to list
                embedding_list = text_embedding.cpu().numpy().flatten().tolist()
            
            processing_time = (time.time() - start_time) * 1000
            
            return EmbeddingResponse(
                embedding=embedding_list,
                modality=ModalityType.TEXT,
                shape=list(text_embedding.shape),
                processing_time_ms=processing_time,
                metadata={"text_length": len(text)}
            )
            
        except Exception as e:
            raise RuntimeError(f"Text embedding failed: {str(e)}")
    
    async def embed_image(self, image_path: str, normalize: bool = True) -> EmbeddingResponse:
        """Generate embedding for image input"""
        if not self.is_ready():
            raise RuntimeError("ImageBind service not initialized")
        
        start_time = time.time()
        
        try:
            # Verify image exists and is valid
            if not os.path.exists(image_path):
                raise FileNotFoundError(f"Image file not found: {image_path}")
            
            # Load and validate image
            with Image.open(image_path) as img:
                image_size = img.size
                image_mode = img.mode
            
            # Prepare image input
            inputs = {
                IBModalityType.VISION: data.load_and_transform_vision_data([image_path], self.device)
            }
            
            # Generate embedding
            with torch.no_grad():
                embeddings = self.model(inputs)
                image_embedding = embeddings[IBModalityType.VISION]
                
                if normalize:
                    image_embedding = torch.nn.functional.normalize(image_embedding, dim=-1)
                
                # Convert to list
                embedding_list = image_embedding.cpu().numpy().flatten().tolist()
            
            processing_time = (time.time() - start_time) * 1000
            
            return EmbeddingResponse(
                embedding=embedding_list,
                modality=ModalityType.IMAGE,
                shape=list(image_embedding.shape),
                processing_time_ms=processing_time,
                metadata={
                    "image_size": image_size,
                    "image_mode": image_mode,
                    "file_path": image_path
                }
            )
            
        except Exception as e:
            raise RuntimeError(f"Image embedding failed: {str(e)}")
    
    async def embed_audio(self, audio_path: str, normalize: bool = True) -> EmbeddingResponse:
        """Generate embedding for audio input"""
        if not self.is_ready():
            raise RuntimeError("ImageBind service not initialized")
        
        start_time = time.time()
        
        try:
            # Verify audio file exists
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")
            
            # Prepare audio input
            inputs = {
                IBModalityType.AUDIO: data.load_and_transform_audio_data([audio_path], self.device)
            }
            
            # Generate embedding
            with torch.no_grad():
                embeddings = self.model(inputs)
                audio_embedding = embeddings[IBModalityType.AUDIO]
                
                if normalize:
                    audio_embedding = torch.nn.functional.normalize(audio_embedding, dim=-1)
                
                # Convert to list
                embedding_list = audio_embedding.cpu().numpy().flatten().tolist()
            
            processing_time = (time.time() - start_time) * 1000
            
            return EmbeddingResponse(
                embedding=embedding_list,
                modality=ModalityType.AUDIO,
                shape=list(audio_embedding.shape),
                processing_time_ms=processing_time,
                metadata={"file_path": audio_path}
            )
            
        except Exception as e:
            raise RuntimeError(f"Audio embedding failed: {str(e)}")
    
    def compute_similarity(self, embedding1: List[float], embedding2: List[float]) -> float:
        """Compute cosine similarity between two embeddings"""
        try:
            # Convert to numpy arrays
            emb1 = np.array(embedding1)
            emb2 = np.array(embedding2)
            
            # Compute cosine similarity
            dot_product = np.dot(emb1, emb2)
            norm1 = np.linalg.norm(emb1)
            norm2 = np.linalg.norm(emb2)
            
            if norm1 == 0 or norm2 == 0:
                return 0.0
            
            similarity = dot_product / (norm1 * norm2)
            return float(similarity)
            
        except Exception as e:
            raise RuntimeError(f"Similarity computation failed: {str(e)}")
    
    def cleanup(self):
        """Clean up resources"""
        if self.model is not None:
            del self.model
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
        self.is_initialized = False`}
                  />
                </div>

                <div className="tips-card">
                  <h4>🔧 Service Architecture Highlights</h4>
                  <ul>
                    <li>• <strong>Async initialization:</strong> Non-blocking model loading</li>
                    <li>• <strong>Thread execution:</strong> Model loading in separate thread</li>
                    <li>• <strong>Error handling:</strong> Comprehensive exception management</li>
                    <li>• <strong>Memory management:</strong> Proper cleanup and GPU cache clearing</li>
                    <li>• <strong>Metadata tracking:</strong> Processing times and input details</li>
                  </ul>
                </div>

                <button
                  className="continue-button"
                  onClick={() => { setActiveStep(2); markStepComplete(1); }}
                >
                  Continue to File Upload Handling
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {activeStep === 2 && (
              <div className="step-content-container">
                <div className="step-header">
                  <Upload className="w-8 h-8" />
                  <h2>File Upload Handling</h2>
                </div>

                <p className="step-description">
                  Implement robust file upload endpoints that handle validation, processing, and cleanup for images, audio, and text.
                </p>

                <div className="setup-step">
                  <h3>Step 1: Text Embedding Endpoint</h3>
                  <CodeBlock
                    language="python"
                    id="text-endpoint"
                    code={`# Add these endpoints to main.py

@app.post("/embed/text", response_model=EmbeddingResponse)
async def embed_text(request: TextEmbeddingRequest):
    """Generate embedding for text input"""
    try:
        global imagebind_service
        
        if not imagebind_service or not imagebind_service.is_ready():
            raise HTTPException(
                status_code=503, 
                detail="ImageBind service not available"
            )
        
        # Validate text length
        if len(request.text.strip()) == 0:
            raise HTTPException(
                status_code=400,
                detail="Text input cannot be empty"
            )
        
        if len(request.text) > settings.max_text_length:
            raise HTTPException(
                status_code=400,
                detail=f"Text too long. Max length: {settings.max_text_length}"
            )
        
        # Generate embedding
        result = await imagebind_service.embed_text(
            text=request.text.strip(),
            normalize=request.normalize
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text embedding failed: {str(e)}")

@app.get("/embed/text/example")
async def text_embedding_example():
    """Example of text embedding usage"""
    return {
        "endpoint": "/embed/text",
        "method": "POST",
        "example_request": {
            "text": "A beautiful sunset over the ocean",
            "normalize": True
        },
        "example_response": {
            "embedding": "[0.123, -0.456, 0.789, ...]",
            "modality": "text",
            "shape": [1, 1024],
            "processing_time_ms": 45.2,
            "metadata": {"text_length": 32}
        }
    }`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: Image Upload Endpoint</h3>
                  <CodeBlock
                    language="python"
                    id="image-endpoint"
                    code={`import aiofiles
import uuid
from pathlib import Path

@app.post("/embed/image", response_model=EmbeddingResponse)
async def embed_image(
    file: UploadFile = File(..., description="Image file to embed"),
    normalize: bool = True
):
    """Generate embedding for uploaded image"""
    try:
        global imagebind_service
        
        if not imagebind_service or not imagebind_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ImageBind service not available"
            )
        
        # Validate file type
        if file.content_type not in settings.allowed_image_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {settings.allowed_image_types}"
            )
        
        # Check file size
        file_size = 0
        content = await file.read()
        file_size = len(content)
        
        if file_size > settings.max_file_size:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Max size: {settings.max_file_size // (1024*1024)}MB"
            )
        
        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail="Empty file uploaded"
            )
        
        # Create unique filename
        file_id = str(uuid.uuid4())
        file_extension = Path(file.filename).suffix.lower()
        temp_filename = f"{file_id}{file_extension}"
        temp_path = Path(settings.upload_dir) / temp_filename
        
        # Ensure upload directory exists
        temp_path.parent.mkdir(exist_ok=True)
        
        try:
            # Save uploaded file
            async with aiofiles.open(temp_path, 'wb') as f:
                await f.write(content)
            
            # Generate embedding
            result = await imagebind_service.embed_image(
                image_path=str(temp_path),
                normalize=normalize
            )
            
            # Add file info to metadata
            result.metadata.update({
                "original_filename": file.filename,
                "file_size_bytes": file_size,
                "file_id": file_id
            })
            
            return result
            
        finally:
            # Clean up temporary file
            if temp_path.exists():
                temp_path.unlink()
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image embedding failed: {str(e)}")

@app.get("/embed/image/example")
async def image_embedding_example():
    """Example of image embedding usage"""
    return {
        "endpoint": "/embed/image",
        "method": "POST",
        "content_type": "multipart/form-data",
        "parameters": {
            "file": "Image file (JPEG, PNG, GIF, WebP)",
            "normalize": "boolean (optional, default: true)"
        },
        "example_response": {
            "embedding": "[0.123, -0.456, 0.789, ...]",
            "modality": "image",
            "shape": [1, 1024],
            "processing_time_ms": 156.7,
            "metadata": {
                "image_size": [1920, 1080],
                "image_mode": "RGB",
                "original_filename": "sunset.jpg",
                "file_size_bytes": 2048576
            }
        }
    }`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 3: Audio Upload Endpoint</h3>
                  <CodeBlock
                    language="python"
                    id="audio-endpoint"
                    code={`@app.post("/embed/audio", response_model=EmbeddingResponse)
async def embed_audio(
    file: UploadFile = File(..., description="Audio file to embed"),
    normalize: bool = True
):
    """Generate embedding for uploaded audio"""
    try:
        global imagebind_service
        
        if not imagebind_service or not imagebind_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ImageBind service not available"
            )
        
        # Validate file type
        if file.content_type not in settings.allowed_audio_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {settings.allowed_audio_types}"
            )
        
        # Check file size
        content = await file.read()
        file_size = len(content)
        
        if file_size > settings.max_file_size:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Max size: {settings.max_file_size // (1024*1024)}MB"
            )
        
        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail="Empty file uploaded"
            )
        
        # Create unique filename
        file_id = str(uuid.uuid4())
        file_extension = Path(file.filename).suffix.lower()
        temp_filename = f"{file_id}{file_extension}"
        temp_path = Path(settings.upload_dir) / temp_filename
        
        # Ensure upload directory exists
        temp_path.parent.mkdir(exist_ok=True)
        
        try:
            # Save uploaded file
            async with aiofiles.open(temp_path, 'wb') as f:
                await f.write(content)
            
            # Generate embedding
            result = await imagebind_service.embed_audio(
                audio_path=str(temp_path),
                normalize=normalize
            )
            
            # Add file info to metadata
            result.metadata.update({
                "original_filename": file.filename,
                "file_size_bytes": file_size,
                "file_id": file_id
            })
            
            return result
            
        finally:
            # Clean up temporary file
            if temp_path.exists():
                temp_path.unlink()
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio embedding failed: {str(e)}")`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 4: File Validation Utilities</h3>
                  <CodeBlock
                    language="python"
                    id="validation-utils"
                    code={`# Add these utility functions to services.py

import magic
from PIL import Image
import io

class FileValidator:
    @staticmethod
    def validate_image_content(content: bytes) -> bool:
        """Validate that the file content is actually an image"""
        try:
            # Try to open with PIL
            with Image.open(io.BytesIO(content)) as img:
                img.verify()  # Verify it's a valid image
            return True
        except Exception:
            return False
    
    @staticmethod
    def validate_audio_content(content: bytes) -> bool:
        """Validate that the file content is actually audio"""
        try:
            # Use python-magic to check file type
            mime_type = magic.from_buffer(content, mime=True)
            return mime_type.startswith('audio/')
        except Exception:
            return False
    
    @staticmethod
    def get_file_info(content: bytes, filename: str) -> dict:
        """Get detailed file information"""
        try:
            file_info = {
                "size_bytes": len(content),
                "filename": filename,
                "mime_type": magic.from_buffer(content, mime=True) if content else None
            }
            
            # Add image-specific info
            if file_info["mime_type"] and file_info["mime_type"].startswith('image/'):
                try:
                    with Image.open(io.BytesIO(content)) as img:
                        file_info.update({
                            "dimensions": img.size,
                            "mode": img.mode,
                            "format": img.format
                        })
                except Exception:
                    pass
            
            return file_info
        except Exception as e:
            return {"error": str(e)}

# Enhanced file upload with validation
async def validate_and_save_file(
    file: UploadFile, 
    allowed_types: list, 
    max_size: int,
    upload_dir: str
) -> tuple[Path, dict]:
    """Validate and save uploaded file with comprehensive checks"""
    
    # Read file content
    content = await file.read()
    file_size = len(content)
    
    # Basic validations
    if file_size == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")
    
    if file_size > max_size:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size: {max_size // (1024*1024)}MB"
        )
    
    # Content type validation
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {allowed_types}"
        )
    
    # Content validation based on type
    if file.content_type.startswith('image/'):
        if not FileValidator.validate_image_content(content):
            raise HTTPException(
                status_code=400,
                detail="File content doesn't match image type"
            )
    elif file.content_type.startswith('audio/'):
        if not FileValidator.validate_audio_content(content):
            raise HTTPException(
                status_code=400,
                detail="File content doesn't match audio type"
            )
    
    # Create unique filename and save
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix.lower()
    temp_filename = f"{file_id}{file_extension}"
    temp_path = Path(upload_dir) / temp_filename
    
    # Ensure directory exists
    temp_path.parent.mkdir(exist_ok=True)
    
    # Save file
    async with aiofiles.open(temp_path, 'wb') as f:
        await f.write(content)
    
    # Get file info
    file_info = FileValidator.get_file_info(content, file.filename)
    file_info["file_id"] = file_id
    
    return temp_path, file_info`}
                  />
                </div>

                <div className="feature-highlight">
                  <h4>🛡️ File Upload Security Features</h4>
                  <ul>
                    <li>• <strong>Content validation:</strong> Verify file content matches declared type</li>
                    <li>• <strong>Size limits:</strong> Prevent oversized uploads</li>
                    <li>• <strong>Type restrictions:</strong> Only allow specific file formats</li>
                    <li>• <strong>Temporary storage:</strong> Auto-cleanup after processing</li>
                    <li>• <strong>Unique IDs:</strong> Prevent filename conflicts</li>
                  </ul>
                </div>

                <button
                  className="continue-button"
                  onClick={() => { setActiveStep(3); markStepComplete(2); }}
                >
                  Continue to Response Formatting
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {activeStep === 3 && (
              <div className="step-content-container">
                <div className="step-header">
                  <Database className="w-8 h-8" />
                  <h2>Response Formatting</h2>
                </div>

                <p className="step-description">
                  Implement proper error handling, response formatting, and utility endpoints for a production-ready API.
                </p>

                <div className="setup-step">
                  <h3>Step 1: Similarity Computation Endpoint</h3>
                  <CodeBlock
                    language="python"
                    id="similarity-endpoint"
                    code={`@app.post("/similarity", response_model=SimilarityResponse)
async def compute_similarity(request: SimilarityRequest):
    """Compute cosine similarity between two embeddings"""
    try:
        global imagebind_service
        
        if not imagebind_service or not imagebind_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ImageBind service not available"
            )
        
        # Validate embedding dimensions
        if len(request.embedding1) != len(request.embedding2):
            raise HTTPException(
                status_code=400,
                detail="Embeddings must have the same dimensions"
            )
        
        if len(request.embedding1) != 1024:
            raise HTTPException(
                status_code=400,
                detail="Embeddings must be 1024-dimensional"
            )
        
        start_time = time.time()
        
        # Compute similarity
        similarity = imagebind_service.compute_similarity(
            request.embedding1,
            request.embedding2
        )
        
        processing_time = (time.time() - start_time) * 1000
        
        return SimilarityResponse(
            similarity=similarity,
            processing_time_ms=processing_time
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Similarity computation failed: {str(e)}"
        )`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: Advanced Error Handling</h3>
                  <CodeBlock
                    language="python"
                    id="error-handling"
                    code={`from fastapi import Request
from fastapi.responses import JSONResponse
import traceback
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class APIException(Exception):
    def __init__(self, status_code: int, message: str, error_code: str = None, details: dict = None):
        self.status_code = status_code
        self.message = message
        self.error_code = error_code or "GENERIC_ERROR"
        self.details = details or {}

@app.exception_handler(APIException)
async def api_exception_handler(request: Request, exc: APIException):
    """Handle custom API exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=exc.message,
            error_code=exc.error_code,
            details=exc.details
        ).dict()
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle FastAPI HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=exc.detail,
            error_code=f"HTTP_{exc.status_code}",
            details={"path": str(request.url)}
        ).dict()
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions"""
    logger.error(f"Unexpected error: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            error_code="INTERNAL_ERROR",
            details={
                "path": str(request.url),
                "type": type(exc).__name__
            }
        ).dict()
    )

# Custom validation functions
def validate_embedding_request(embedding: List[float], name: str = "embedding"):
    """Validate embedding format and dimensions"""
    if not embedding:
        raise APIException(
            status_code=400,
            message=f"{name} cannot be empty",
            error_code="EMPTY_EMBEDDING"
        )
    
    if len(embedding) != 1024:
        raise APIException(
            status_code=400,
            message=f"{name} must be 1024-dimensional, got {len(embedding)}",
            error_code="INVALID_EMBEDDING_DIMENSION",
            details={"expected": 1024, "actual": len(embedding)}
        )
    
    # Check for valid numbers
    try:
        for i, val in enumerate(embedding):
            if not isinstance(val, (int, float)) or np.isnan(val) or np.isinf(val):
                raise APIException(
                    status_code=400,
                    message=f"Invalid value in {name} at index {i}: {val}",
                    error_code="INVALID_EMBEDDING_VALUE",
                    details={"index": i, "value": str(val)}
                )
    except TypeError:
        raise APIException(
            status_code=400,
            message=f"{name} must contain numeric values",
            error_code="NON_NUMERIC_EMBEDDING"
        )`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 3: Batch Processing Endpoint</h3>
                  <CodeBlock
                    language="python"
                    id="batch-endpoint"
                    code={`from typing import List

class BatchTextRequest(BaseModel):
    texts: List[str] = Field(..., max_items=10, description="List of texts to embed")
    normalize: bool = Field(True, description="Whether to normalize embeddings")

class BatchEmbeddingResponse(BaseModel):
    embeddings: List[EmbeddingResponse] = Field(..., description="List of embedding responses")
    total_processing_time_ms: float = Field(..., description="Total processing time")
    batch_size: int = Field(..., description="Number of items processed")

@app.post("/embed/text/batch", response_model=BatchEmbeddingResponse)
async def embed_text_batch(request: BatchTextRequest):
    """Generate embeddings for multiple texts"""
    try:
        global imagebind_service
        
        if not imagebind_service or not imagebind_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ImageBind service not available"
            )
        
        if not request.texts:
            raise HTTPException(
                status_code=400,
                detail="At least one text must be provided"
            )
        
        if len(request.texts) > 10:
            raise HTTPException(
                status_code=400,
                detail="Maximum 10 texts per batch"
            )
        
        start_time = time.time()
        embeddings = []
        
        # Process each text
        for i, text in enumerate(request.texts):
            if not text.strip():
                raise HTTPException(
                    status_code=400,
                    detail=f"Text at index {i} is empty"
                )
            
            if len(text) > settings.max_text_length:
                raise HTTPException(
                    status_code=400,
                    detail=f"Text at index {i} exceeds max length"
                )
            
            embedding_result = await imagebind_service.embed_text(
                text=text.strip(),
                normalize=request.normalize
            )
            embeddings.append(embedding_result)
        
        total_processing_time = (time.time() - start_time) * 1000
        
        return BatchEmbeddingResponse(
            embeddings=embeddings,
            total_processing_time_ms=total_processing_time,
            batch_size=len(embeddings)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Batch text embedding failed: {str(e)}"
        )`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 4: API Information and Stats</h3>
                  <CodeBlock
                    language="python"
                    id="info-endpoints"
                    code={`import psutil
import torch

@app.get("/info")
async def api_info():
    """Get API information and capabilities"""
    global imagebind_service
    
    return {
        "api": {
            "name": settings.api_title,
            "version": settings.api_version,
            "description": "ImageBind Multimodal Embedding API"
        },
        "model": {
            "name": "ImageBind",
            "version": "huge",
            "dimensions": 1024,
            "modalities": ["text", "image", "audio"]
        },
        "capabilities": {
            "max_file_size_mb": settings.max_file_size // (1024 * 1024),
            "max_text_length": settings.max_text_length,
            "supported_image_types": settings.allowed_image_types,
            "supported_audio_types": settings.allowed_audio_types,
            "batch_processing": True,
            "similarity_computation": True
        },
        "service_status": {
            "model_loaded": imagebind_service.is_ready() if imagebind_service else False,
            "device": settings.device
        }
    }

@app.get("/stats")
async def system_stats():
    """Get system performance statistics"""
    try:
        stats = {
            "system": {
                "cpu_percent": psutil.cpu_percent(interval=1),
                "memory_percent": psutil.virtual_memory().percent,
                "disk_percent": psutil.disk_usage('/').percent
            },
            "process": {
                "memory_mb": psutil.Process().memory_info().rss / 1024 / 1024,
                "cpu_percent": psutil.Process().cpu_percent()
            }
        }
        
        # Add GPU stats if available
        if torch.cuda.is_available():
            stats["gpu"] = {
                "name": torch.cuda.get_device_name(0),
                "memory_allocated_mb": torch.cuda.memory_allocated(0) / 1024 / 1024,
                "memory_reserved_mb": torch.cuda.memory_reserved(0) / 1024 / 1024,
                "utilization_percent": torch.cuda.utilization(0) if hasattr(torch.cuda, 'utilization') else None
            }
        
        return stats
        
    except Exception as e:
        return {"error": f"Failed to get stats: {str(e)}"}

@app.get("/docs-info")
async def docs_info():
    """Information about API documentation"""
    return {
        "interactive_docs": "/docs",
        "redoc_docs": "/redoc",
        "openapi_json": "/openapi.json",
        "examples": {
            "text_embedding": "/embed/text/example",
            "image_embedding": "/embed/image/example"
        },
        "testing": {
            "health_check": "/health",
            "system_info": "/info",
            "system_stats": "/stats"
        }
    }`}
                  />
                </div>

                <div className="tips-card">
                  <h4>📊 Response Structure Benefits</h4>
                  <ul>
                    <li>• <strong>Consistent format:</strong> All responses follow Pydantic models</li>
                    <li>• <strong>Error details:</strong> Structured error information for debugging</li>
                    <li>• <strong>Performance metrics:</strong> Processing times for optimization</li>
                    <li>• <strong>Metadata tracking:</strong> Rich context about inputs and outputs</li>
                    <li>• <strong>Batch processing:</strong> Efficient handling of multiple inputs</li>
                  </ul>
                </div>

                <button
                  className="continue-button"
                  onClick={() => { setActiveStep(4); markStepComplete(3); }}
                >
                  Continue to Testing & Deployment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {activeStep === 4 && (
              <div className="step-content-container">
                <div className="step-header">
                  <Globe className="w-8 h-8" />
                  <h2>Testing & Deployment</h2>
                </div>

                <p className="step-description">
                  Test your API endpoints thoroughly and prepare for production deployment with proper configuration.
                </p>

                <div className="setup-step">
                  <h3>Step 1: Start the API Server</h3>
                  <CodeBlock
                    language="bash"
                    id="start-server"
                    code={`# In your container, navigate to the api directory
cd /app/workspace/api

# Install additional dependencies if needed
pip install python-multipart aiofiles python-magic psutil

# Start the development server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# The API will be available at:
# - Main API: http://localhost:8000
# - Interactive docs: http://localhost:8000/docs
# - ReDoc docs: http://localhost:8000/redoc`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: Test with cURL Commands</h3>
                  <CodeBlock
                    language="bash"
                    id="curl-tests"
                    code={`# Test health endpoint
curl -X GET "http://localhost:8000/health"

# Test text embedding
curl -X POST "http://localhost:8000/embed/text" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "A beautiful sunset over the ocean",
    "normalize": true
  }'

# Test image embedding (replace with actual image file)
curl -X POST "http://localhost:8000/embed/image" \\
  -F "file=@/path/to/your/image.jpg" \\
  -F "normalize=true"

# Test similarity computation
curl -X POST "http://localhost:8000/similarity" \\
  -H "Content-Type: application/json" \\
  -d '{
    "embedding1": [0.1, 0.2, 0.3, ...],
    "embedding2": [0.15, 0.25, 0.35, ...]
  }'

# Test batch processing
curl -X POST "http://localhost:8000/embed/text/batch" \\
  -H "Content-Type: application/json" \\
  -d '{
    "texts": ["Hello world", "Goodbye world"],
    "normalize": true
  }'

# Get API information
curl -X GET "http://localhost:8000/info"

# Get system stats
curl -X GET "http://localhost:8000/stats"`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 3: Python Client Example</h3>
                  <CodeBlock
                    language="python"
                    id="python-client"
                    code={`import requests
import json
from pathlib import Path

class ImageBindClient:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        
    def health_check(self):
        """Check if the API is healthy"""
        response = requests.get(f"{self.base_url}/health")
        return response.json()
    
    def embed_text(self, text: str, normalize: bool = True):
        """Generate embedding for text"""
        response = requests.post(
            f"{self.base_url}/embed/text",
            json={"text": text, "normalize": normalize}
        )
        response.raise_for_status()
        return response.json()
    
    def embed_image(self, image_path: str, normalize: bool = True):
        """Generate embedding for image"""
        with open(image_path, 'rb') as f:
            files = {'file': f}
            data = {'normalize': normalize}
            response = requests.post(
                f"{self.base_url}/embed/image",
                files=files,
                data=data
            )
        response.raise_for_status()
        return response.json()
    
    def embed_audio(self, audio_path: str, normalize: bool = True):
        """Generate embedding for audio"""
        with open(audio_path, 'rb') as f:
            files = {'file': f}
            data = {'normalize': normalize}
            response = requests.post(
                f"{self.base_url}/embed/audio",
                files=files,
                data=data
            )
        response.raise_for_status()
        return response.json()
    
    def compute_similarity(self, embedding1, embedding2):
        """Compute similarity between embeddings"""
        response = requests.post(
            f"{self.base_url}/similarity",
            json={
                "embedding1": embedding1,
                "embedding2": embedding2
            }
        )
        response.raise_for_status()
        return response.json()
    
    def embed_text_batch(self, texts: list, normalize: bool = True):
        """Generate embeddings for multiple texts"""
        response = requests.post(
            f"{self.base_url}/embed/text/batch",
            json={"texts": texts, "normalize": normalize}
        )
        response.raise_for_status()
        return response.json()

# Example usage
if __name__ == "__main__":
    client = ImageBindClient()
    
    # Check health
    health = client.health_check()
    print(f"API Health: {health}")
    
    # Test text embedding
    text_result = client.embed_text("A dog playing in the park")
    print(f"Text embedding shape: {text_result['shape']}")
    print(f"Processing time: {text_result['processing_time_ms']:.2f}ms")
    
    # Test batch processing
    batch_result = client.embed_text_batch([
        "A beautiful sunset",
        "A cute puppy",
        "Ocean waves"
    ])
    print(f"Batch processed {batch_result['batch_size']} texts")
    
    # Compute similarity
    embedding1 = text_result['embedding']
    embedding2 = batch_result['embeddings'][0]['embedding']
    
    similarity = client.compute_similarity(embedding1, embedding2)
    print(f"Similarity: {similarity['similarity']:.4f}")`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 4: Production Deployment Configuration</h3>
                  <CodeBlock
                    language="dockerfile"
                    id="production-dockerfile"
                    code={`# Production Dockerfile
FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    libmagic1 \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ImageBind installation
COPY ImageBind/ ./ImageBind/
RUN cd ImageBind && pip install -e .

# Copy API code
COPY api/ ./api/
WORKDIR /app/api

# Create necessary directories
RUN mkdir -p uploads static

# Set environment variables
ENV PYTHONPATH=/app
ENV CUDA_AVAILABLE=true

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 5: Production Requirements</h3>
                  <CodeBlock
                    language="text"
                    id="requirements-txt"
                    code={`# requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
aiofiles==23.2.1
pydantic==2.5.0
pydantic-settings==2.1.0
python-magic==0.4.27
psutil==5.9.6
Pillow==10.1.0
numpy==1.24.3
requests==2.31.0

# ImageBind dependencies
torch>=2.0.0
torchvision>=0.15.0
torchaudio>=2.0.0
transformers>=4.21.0`}
                  />
                </div>

                <div className="completion-card">
                  <h4>🎯 Congratulations! You've Built Your First API</h4>
                  <div className="completion-grid">
                    <div className="completion-section">
                      <h5>✅ What You've Accomplished</h5>
                      <ul>
                        <li>• Created a production-ready FastAPI application</li>
                        <li>• Implemented multimodal embedding endpoints</li>
                        <li>• Added robust file upload and validation</li>
                        <li>• Built comprehensive error handling</li>
                        <li>• Created batch processing capabilities</li>
                        <li>• Added monitoring and health check endpoints</li>
                      </ul>
                    </div>
                    <div className="completion-section">
                      <h5>🚀 What's Next in Tutorial 3</h5>
                      <ul>
                        <li>• Implement FAISS vector database</li>
                        <li>• Build similarity search functionality</li>
                        <li>• Create vector indexing and storage</li>
                        <li>• Optimize search performance</li>
                        <li>• Add persistent vector storage</li>
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
                    Continue to Tutorial 3: Vector Search with FAISS
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tutorial Navigation */}
          <div className="tutorial-navigation">
            <div className="nav-info">
              Tutorial 2 of 8 • Building Your First API Endpoint
            </div>
            <div className="nav-dots">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`nav-dot ${i === 1 ? 'active' : i === 0 ? 'completed' : ''}`}
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
        
        .architecture-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .flow-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          min-width: 120px;
          transition: all 0.3s ease;
        }
        
        .flow-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }
        
        .flow-item svg {
          color: #4ecdc4;
        }
        
        .flow-item span {
          font-size: 0.9rem;
          color: white;
          font-weight: 500;
        }
        
        .flow-arrow {
          font-size: 1.5rem;
          color: #f39c12;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .architecture-flow {
            flex-direction: column;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
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
  );
}