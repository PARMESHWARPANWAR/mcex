import React from 'react';
import { ComparisonRow } from '../types';

interface ComparisonTableProps {
  data: ComparisonRow[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <div className="comparison-table">
      <div className="table-header">
        <div className="feature-category">Feature</div>
        <div>FAISS</div>
        <div>Pinecone</div>
      </div>
      {data.map((row, index) => (
        <div key={index} className="table-row">
          <div className="feature-category">{row.feature}</div>
          <div>{row.faiss}</div>
          <div>{row.pinecone}</div>
        </div>
      ))}
      
      <style jsx>{`
        .comparison-table {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          margin: 30px 0;
          backdrop-filter: blur(10px);
        }
        
        .table-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          font-weight: bold;
          font-size: 1.1em;
        }
        
        .table-row {
          padding: 15px 20px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .table-row:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .feature-category {
          font-weight: bold;
          color: #4ecdc4;
        }
      `}</style>
    </div>
  );
};

export default ComparisonTable;