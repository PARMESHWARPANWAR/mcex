import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Multimodal Search Documentation',
  description = 'Complete documentation and tools for multimodal search architecture'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="multimodal, search, AI, ImageBind, FAISS, vector database" />
        <meta name="author" content="Multimodal Search Team" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      
      <div className="layout">
        <Navigation />
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 Multimodal Search Documentation. Built with ❤️ using Next.js & TypeScript.</p>
          </div>
        </footer>
      </div>
      
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                       'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
        
        /* Selection styles */
        ::selection {
          background: rgba(102, 126, 234, 0.3);
          color: white;
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 0.5em;
        }
        
        p {
          margin-bottom: 1em;
        }
        
        a {
          color: #4ecdc4;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        a:hover {
          color: #45b7b8;
        }
        
        /* Button base styles */
        button {
          font-family: inherit;
          cursor: pointer;
          border: none;
          background: none;
          transition: all 0.2s ease;
        }
        
        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        /* Input base styles */
        input, select, textarea {
          font-family: inherit;
          border: none;
          outline: none;
        }
        
        /* Animation keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Utility classes */
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .slide-in {
          animation: slideIn 0.6s ease-out;
        }
        
        .text-center {
          text-align: center;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
      
      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .main-content {
          flex: 1;
          padding: 20px;
          padding-top: 100px;
          animation: fadeIn 0.6s ease-out;
        }
        
        .footer {
          margin-top: auto;
          padding: 30px 20px;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9em;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding-top: 20px;
            padding: 10px;
          }
          
          .footer {
            padding: 20px 10px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .main-content {
            animation: none;
          }
          
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;