import React from 'react';
import { ProsConsData } from '../types';

interface ProsConsCardProps {
  title: string;
  items: string[];
  type?: 'pros' | 'cons';
}

const ProsConsCard: React.FC<ProsConsCardProps> = ({ title, items, type = 'pros' }) => {
  const cardClass = type === 'cons' ? 'pros-cons-card cons-card' : 'pros-cons-card';
  
  return (
    <div className={cardClass}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
      
      <style jsx>{`
        .pros-cons-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 25px;
          border-left: 5px solid #2ecc71;
        }
        
        .cons-card {
          border-left-color: #e74c3c;
        }
        
        .pros-cons-card h3 {
          margin-top: 0;
          color: #2ecc71;
        }
        
        .cons-card h3 {
          color: #e74c3c;
        }
        
        .pros-cons-card ul {
          padding-left: 20px;
        }
        
        .pros-cons-card li {
          margin: 10px 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

interface ProsSectionProps {
  faissData: ProsConsData;
  pineconeData: ProsConsData;
}

const ProsConsSection: React.FC<ProsSectionProps> = ({ faissData, pineconeData }) => {
  return (
    <div className="pros-cons">
      <div>
        <ProsConsCard 
          title="✅ FAISS Advantages" 
          items={faissData.pros}
          type="pros"
        />
        <ProsConsCard 
          title="❌ FAISS Disadvantages" 
          items={faissData.cons}
          type="cons"
        />
      </div>
      <div>
        <ProsConsCard 
          title="✅ Pinecone Advantages" 
          items={pineconeData.pros}
          type="pros"
        />
        <ProsConsCard 
          title="❌ Pinecone Disadvantages" 
          items={pineconeData.cons}
          type="cons"
        />
      </div>
      
      <style jsx>{`
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 40px 0;
        }
      `}</style>
    </div>
  );
};

export default ProsConsSection;