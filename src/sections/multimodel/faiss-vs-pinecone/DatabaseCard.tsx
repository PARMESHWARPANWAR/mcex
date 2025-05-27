import React from 'react';
import { DatabaseCardProps } from '../types';

const DatabaseCard: React.FC<DatabaseCardProps> = ({ 
  name, 
  logo, 
  subtitle, 
  description, 
  cardType 
}) => {
  const cardClass = cardType === 'faiss' ? 'faiss-card' : 'pinecone-card';
  
  return (
    <div className={`db-card ${cardClass}`}>
      <span className="db-logo">{logo}</span>
      <h2>{name}</h2>
      <p><strong>{subtitle}</strong></p>
      <p>{description}</p>
      
      <style jsx>{`
        .db-card {
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .faiss-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 3px solid #667eea;
        }
        
        .pinecone-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border: 3px solid #f093fb;
        }
        
        .db-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .db-logo {
          font-size: 4em;
          margin-bottom: 15px;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default DatabaseCard;