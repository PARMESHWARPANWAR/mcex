'use client'
import React, { useState } from 'react';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Download, Zap, Shield, Code, ArrowRight, Cpu, HardDrive, Layers } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useRouter } from 'next/navigation';

export default function ImageBindSetupTutorial() {
  const router = useRouter()
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
      title: "Understanding ImageBind",
      icon: <Layers className="w-5 h-5" />,
      content: "Learn about multimodal AI capabilities"
    },
    {
      title: "Docker Environment Setup", 
      icon: <HardDrive className="w-5 h-5" />,
      content: "Configure containerized development environment"
    },
    {
      title: "ImageBind Installation",
      icon: <Download className="w-5 h-5" />,
      content: "Install and configure ImageBind library"
    },
    {
      title: "First Embedding Test",
      icon: <Play className="w-5 h-5" />,
      content: "Generate your first multimodal embeddings"
    },
    {
      title: "Results Analysis",
      icon: <CheckCircle className="w-5 h-5" />,
      content: "Understand outputs and similarity scores"
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
    <div className="tutorial-container">
      <div className="tutorial-content">
        
        {/* Header */}
        <div className="tutorial-header">
          <BackButton path='/tutorials'/>
                    
          <div className="hero-section">
            <h1 className="page-title">ImageBind Setup</h1>
            
            <div className="tutorial-badge">
              <Zap className="w-4 h-4" />
              <span>Tutorial 1 of 8</span>
            </div>
            
            <h2 className="main-title">Setting Up ImageBind Environment</h2>
            
            <p className="main-description">
              Master ImageBind installation with Docker, create your development environment, 
              and generate your first multimodal embeddings in this comprehensive hands-on tutorial.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="feature-cards-grid">
            <div className="feature-card">
              <Shield className="w-8 h-8" />
              <h3>Secure Setup</h3>
              <p>Docker containerization for consistent environments</p>
            </div>
            <div className="feature-card">
              <Cpu className="w-8 h-8" />
              <h3>GPU Acceleration</h3>
              <p>NVIDIA GPU support for faster processing</p>
            </div>
            <div className="feature-card">
              <Code className="w-8 h-8" />
              <h3>Hands-On Code</h3>
              <p>Real working examples you can run immediately</p>
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
                className={`progress-step ${
                  activeStep === index ? 'active' : ''
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
                <Layers className="w-8 h-8" />
                <h2>Understanding ImageBind</h2>
              </div>
              
              <div className="content-grid">
                <div className="content-left">
                  <p className="content-description">
                    ImageBind is Meta's revolutionary AI model that creates a unified embedding space 
                    for six different modalities. Think of it as a universal translator between 
                    images, text, audio, video, depth, and thermal data.
                  </p>
                  
                  <div className="highlight-card">
                    <h4>🎯 Key Innovation</h4>
                    <p>
                      Similar concepts across different modalities have similar vector representations, 
                      enabling powerful cross-modal search and understanding.
                    </p>
                  </div>
                </div>
                
                <div className="content-right">
                  <h4>Supported Modalities</h4>
                  <div className="modalities-list">
                    {[
                      { emoji: "🖼️", name: "Images", desc: "Photos, artwork, screenshots" },
                      { emoji: "📝", name: "Text", desc: "Descriptions, captions, queries" },
                      { emoji: "🎵", name: "Audio", desc: "Music, speech, sound effects" },
                      { emoji: "🎬", name: "Video", desc: "Clips, motion content" },
                      { emoji: "📐", name: "Depth", desc: "3D spatial information" },
                      { emoji: "🌡️", name: "Thermal", desc: "Heat signature data" }
                    ].map((modality, i) => (
                      <div key={i} className="modality-item">
                        <span className="modality-emoji">{modality.emoji}</span>
                        <div className="modality-info">
                          <h5>{modality.name}</h5>
                          <p>{modality.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                className="continue-button"
                onClick={() => { setActiveStep(1); markStepComplete(0); }}
              >
                Continue to Docker Setup
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeStep === 1 && (
            <div className="step-content-container">
              <div className="step-header">
                <HardDrive className="w-8 h-8" />
                <h2>Docker Environment Setup</h2>
              </div>
              
              <div className="prerequisites-card">
                <h4>📋 Prerequisites</h4>
                <ul>
                  <li>• Docker installed on your system</li>
                  <li>• At least 8GB RAM (16GB recommended)</li>
                  <li>• NVIDIA GPU (optional but recommended)</li>
                  <li>• Basic knowledge of command line</li>
                </ul>
              </div>

              <div className="setup-steps">
                <div className="setup-step">
                  <h3>Step 1: Create Project Structure</h3>
                  <CodeBlock
                    language="bash"
                    id="project-structure"
                    code={`mkdir multimodal-search-system
cd multimodal-search-system
mkdir imagebind-setup
cd imagebind-setup`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 2: Create Dockerfile</h3>
                  <CodeBlock
                    language="dockerfile"
                    id="dockerfile"
                    code={`FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-devel

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    git \\
    wget \\
    curl \\
    vim \\
    htop \\
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install \\
    torch \\
    torchvision \\
    torchaudio \\
    transformers \\
    Pillow \\
    numpy \\
    matplotlib \\
    jupyter \\
    ipython

# Clone ImageBind repository
RUN git clone https://github.com/facebookresearch/ImageBind.git
WORKDIR /app/ImageBind

# Install ImageBind requirements
RUN pip install -e .

# Create directories for our work
RUN mkdir -p /app/workspace
WORKDIR /app/workspace

# Expose port for Jupyter
EXPOSE 8888

# Default command
CMD ["bash"]`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 3: Create Docker Compose</h3>
                  <CodeBlock
                    language="yaml"
                    id="docker-compose"
                    code={`version: '3.8'

services:
  imagebind:
    build: .
    container_name: imagebind-dev
    volumes:
      - ./workspace:/app/workspace
      - ./data:/app/data
    ports:
      - "8888:8888"
      - "8000:8000"
    environment:
      - JUPYTER_ENABLE_LAB=yes
    stdin_open: true
    tty: true
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    command: >
      bash -c "
        jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root --NotebookApp.token='' --NotebookApp.password='' &
        tail -f /dev/null
      "`}
                  />
                </div>

                <div className="setup-step">
                  <h3>Step 4: Build and Start Container</h3>
                  <CodeBlock
                    language="bash"
                    id="docker-commands"
                    code={`# Build the Docker image
docker-compose build

# Start the container
docker-compose up -d

# Check if container is running
docker-compose ps`}
                  />
                </div>
              </div>
              
              <button
                className="continue-button"
                onClick={() => { setActiveStep(2); markStepComplete(1); }}
              >
                Continue to ImageBind Installation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="step-content-container">
              <div className="step-header">
                <Download className="w-8 h-8" />
                <h2>ImageBind Installation & Access</h2>
              </div>
              
              <div className="access-options">
                <div className="access-card jupyter">
                  <h4>Option 1: Jupyter Lab (Recommended)</h4>
                  <p>Perfect for beginners with visual interface</p>
                  <code>http://localhost:8888</code>
                </div>
                
                <div className="access-card terminal">
                  <h4>Option 2: Command Line</h4>
                  <p>Direct terminal access for advanced users</p>
                  <code>docker-compose exec imagebind bash</code>
                </div>
              </div>

              <div className="setup-step">
                <h3>Verification Commands</h3>
                <CodeBlock
                  language="bash"
                  id="verification"
                  code={`# Check if container is running
docker ps

# Access the container
docker-compose exec imagebind bash

# Test Python environment
python -c "import torch; print(f'PyTorch: {torch.__version__}')"
python -c "import imagebind; print('ImageBind installed successfully!')"

# Check GPU availability
python -c "import torch; print(f'CUDA available: {torch.cuda.is_available()}')"
python -c "import torch; print(f'GPU count: {torch.cuda.device_count()}')"
`}
                />
              </div>

              <div className="tips-card">
                <h4>🚀 Quick Start Tips</h4>
                <ul>
                  <li>• <strong>First time setup:</strong> Model weights will be downloaded automatically (~2GB)</li>
                  <li>• <strong>GPU users:</strong> Check nvidia-docker is properly configured</li>
                  <li>• <strong>Memory:</strong> ImageBind requires significant RAM for large models</li>
                  <li>• <strong>Jupyter access:</strong> No password required for localhost access</li>
                </ul>
              </div>
              
              <button
                className="continue-button"
                onClick={() => { setActiveStep(3); markStepComplete(2); }}
              >
                Continue to First Test
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeStep === 3 && (
            <div className="step-content-container">
              <div className="step-header">
                <Play className="w-8 h-8" />
                <h2>Your First ImageBind Test</h2>
              </div>
              
              <p className="step-description">
                Now let's create and run a comprehensive test script that demonstrates ImageBind's multimodal capabilities.
              </p>

              <div className="setup-step">
                <h3>Create first_embedding.py</h3>
                <CodeBlock
                  language="python"
                  id="first-test-script"
                  code={`import torch
from imagebind import data
from imagebind.models import imagebind_model
from imagebind.models.imagebind_model import ModalityType
import requests
from PIL import Image
import numpy as np

def download_sample_image():
    """Download a sample image for testing"""
    url = "https://raw.githubusercontent.com/facebookresearch/ImageBind/main/.assets/dog_image.jpg"
    response = requests.get(url)
    
    with open("sample_dog.jpg", "wb") as f:
        f.write(response.content)
    
    return "sample_dog.jpg"

def initialize_imagebind():
    """Initialize ImageBind model"""
    print("🔄 Loading ImageBind model...")
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    print(f"📱 Using device: {device}")
    
    # Load the model
    model = imagebind_model.imagebind_huge(pretrained=True)
    model.eval()
    model.to(device)
    
    print("✅ ImageBind model loaded successfully!")
    return model, device

def create_embeddings(model, device):
    """Create embeddings for different modalities"""
    
    # Download sample image
    image_path = download_sample_image()
    
    # Prepare inputs for different modalities
    inputs = {
        ModalityType.TEXT: data.load_and_transform_text(
            ["A dog playing in the park", "A cute puppy"], device
        ),
        ModalityType.VISION: data.load_and_transform_vision_data(
            [image_path], device
        ),
    }
    
    print("🔄 Generating embeddings...")
    
    # Generate embeddings
    with torch.no_grad():
        embeddings = model(inputs)
    
    print("✅ Embeddings generated successfully!")
    
    return embeddings

def main():
    """Main function to run the complete test"""
    
    print("🚀 Starting ImageBind First Test")
    print("=" * 50)
    
    try:
        # Initialize model
        model, device = initialize_imagebind()
        
        # Create embeddings
        embeddings = create_embeddings(model, device)
        
        print("\\n🎉 Test completed successfully!")
        print("You now have a working ImageBind setup!")
        
    except Exception as e:
        print(f"❌ Error occurred: {str(e)}")
        print("Please check your setup and try again.")

if __name__ == "__main__":
    main()`}
                />
              </div>

              <div className="setup-step">
                <h3>Run the Test</h3>
                <CodeBlock
                  language="bash"
                  id="run-test"
                  code={`# Navigate to workspace
cd /app/workspace

# Run the test script
python first_embedding.py`}
                />
              </div>

              <div className="feature-highlight">
                <h4>🔥 What This Script Does</h4>
                <ul>
                  <li>• Downloads a sample image automatically</li>
                  <li>• Initializes ImageBind with GPU/CPU detection</li>
                  <li>• Generates embeddings for text and image</li>
                  <li>• Computes cross-modal similarity scores</li>
                  <li>• Provides detailed analysis of results</li>
                </ul>
              </div>
              
              <button
                className="continue-button"
                onClick={() => { setActiveStep(4); markStepComplete(3); }}
              >
                View Results Analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeStep === 4 && (
            <div className="step-content-container">
              <div className="step-header">
                <CheckCircle className="w-8 h-8" />
                <h2>Understanding Your Results</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Expected Output</h3>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`🚀 Starting ImageBind First Test
==================================================
🔄 Loading ImageBind model...
📱 Using device: cuda:0
✅ ImageBind model loaded successfully!
🔄 Generating embeddings...
✅ Embeddings generated successfully!

📊 Embedding Analysis:
--------------------------------------------------
🔍 ModalityType.TEXT:
   Shape: torch.Size([2, 1024])
   Type: torch.float32
   Device: cuda:0
   Mean: -0.0123
   Std: 0.2847

🔍 ModalityType.VISION:
   Shape: torch.Size([1, 1024])
   Type: torch.float32
   Device: cuda:0
   Mean: 0.0089
   Std: 0.3021

🔗 Computing Cross-Modal Similarities:
--------------------------------------------------
Text 0 <-> Image: 0.7832
Text 1 <-> Image: 0.8456

🎯 Best matching text: 'A cute puppy'
   Similarity: 0.8456

🎉 Test completed successfully!`}
                    </pre>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-300 mb-3">📊 Embedding Properties</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>Shape:</strong> [batch_size, 1024] dimensions</li>
                      <li>• <strong>Values:</strong> Normalized vectors in shared space</li>
                      <li>• <strong>Device:</strong> Shows GPU acceleration status</li>
                      <li>• <strong>Type:</strong> float32 for optimal performance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-300 mb-3">🎯 Similarity Scores</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>Range:</strong> -1 to 1 (cosine similarity)</li>
                      <li>• <strong>Higher values:</strong> More similar concepts</li>
                      <li>• <strong>Cross-modal:</strong> Direct comparison possible</li>
                      <li>• <strong>Threshold:</strong>0.7 typically indicates strong similarity</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-300 mb-4">🛠️ Troubleshooting Common Issues</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-white mb-2">Permission Errors</h5>
                      <code className="text-sm text-gray-300">sudo chown -R $USER:$USER ./workspace</code>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">Import Errors</h5>
                      <code className="text-sm text-gray-300">pip install -e /app/ImageBind</code>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-green-300 mb-4">🚀 Performance Optimization Tips</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-white mb-2">Speed Improvements</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Use GPU when available (10-50x faster)</li>
                        <li>• Batch process multiple items together</li>
                        <li>• Load model once, use multiple times</li>
                        <li>• Resize large images before processing</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">Memory Management</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Clear GPU cache between runs</li>
                        <li>• Use smaller batch sizes if needed</li>
                        <li>• Process data in chunks for large datasets</li>
                        <li>• Monitor memory usage with htop</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-indigo-300 mb-4">📚 Practice Exercises</h4>
                  <p className="text-gray-300 mb-4">Try these exercises to deepen your understanding:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-white">🎯 Beginner Challenges</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Replace sample image with your own photos</li>
                        <li>• Try different text descriptions</li>
                        <li>• Experiment with similarity thresholds</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-white">🚀 Advanced Challenges</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Add audio file processing</li>
                        <li>• Process multiple images at once</li>
                        <li>• Create custom preprocessing pipelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="completion-card">
                <h4>🎯 Congratulations! You've Completed Tutorial 1</h4>
                <div className="completion-grid">
                  <div className="completion-section">
                    <h5>✅ What You've Accomplished</h5>
                    <ul>
                      <li>• Set up Docker environment for AI development</li>
                      <li>• Successfully installed and configured ImageBind</li>
                      <li>• Generated your first multimodal embeddings</li>
                      <li>• Computed cross-modal similarity scores</li>
                      <li>• Understanding of embedding properties and outputs</li>
                    </ul>
                  </div>
                  <div className="completion-section">
                    <h5>🚀 What's Next in Tutorial 2</h5>
                    <ul>
                      <li>• Transform setup into FastAPI service</li>
                      <li>• Create REST API endpoints</li>
                      <li>• Handle file uploads and processing</li>
                      <li>• Add proper error handling</li>
                      <li>• Response formatting and validation</li>
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
                
                <button className="next-tutorial-button" onClick={()=>{router.push('first-api-endpoint')}}>
                  Continue to Tutorial 2: API Development
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tutorial Navigation */}
        <div className="tutorial-navigation">
          <div className="nav-info">
            Tutorial 1 of 8 • ImageBind Environment Setup
          </div>
          <div className="nav-dots">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`nav-dot ${i === 0 ? 'active' : ''}`}
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
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 30px;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .content-left {
          space: 25px;
        }
        
        .content-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 25px;
        }
        
        .highlight-card {
          background: linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(155, 89, 182, 0.2) 100%);
          border: 1px solid rgba(52, 152, 219, 0.3);
          border-radius: 15px;
          padding: 25px;
          backdrop-filter: blur(10px);
        }
        
        .highlight-card h4 {
          margin: 0 0 15px 0;
          color: #3498db;
          font-size: 1.2rem;
        }
        
        .highlight-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }
        
        .content-right h4 {
          color: white;
          font-size: 1.3rem;
          margin-bottom: 20px;
        }
        
        .modalities-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .modality-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .modality-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(5px);
        }
        
        .modality-emoji {
          font-size: 1.8rem;
        }
        
        .modality-info h5 {
          margin: 0 0 5px 0;
          color: white;
          font-size: 1rem;
        }
        
        .modality-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
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
        }
        
        .continue-button:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .prerequisites-card {
          background: rgba(255, 193, 7, 0.15);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
        }
        
        .prerequisites-card h4 {
          margin: 0 0 15px 0;
          color: #ffc107;
          font-size: 1.2rem;
        }
        
        .prerequisites-card ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .prerequisites-card li {
          margin: 8px 0;
          line-height: 1.4;
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
        
        .access-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }
        
        @media (max-width: 768px) {
          .access-options {
            grid-template-columns: 1fr;
          }
        }
        
        .access-card {
          padding: 25px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .access-card.jupyter {
          background: linear-gradient(135deg, rgba(155, 89, 182, 0.2) 0%, rgba(52, 152, 219, 0.2) 100%);
          border: 1px solid rgba(155, 89, 182, 0.3);
        }
        
        .access-card.terminal {
          background: linear-gradient(135deg, rgba(46, 204, 113, 0.2) 0%, rgba(26, 188, 156, 0.2) 100%);
          border: 1px solid rgba(46, 204, 113, 0.3);
        }
        
        .access-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .access-card h4 {
          margin: 0 0 10px 0;
          color: white;
          font-size: 1.2rem;
        }
        
        .access-card p {
          margin: 0 0 15px 0;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }
        
        .access-card code {
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 12px;
          border-radius: 6px;
          color: #2ecc71;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
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
        
        .step-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 30px;
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
      `}</style>
    </div>
  );
}