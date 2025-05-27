import React from 'react';
import { UseCase } from '../types';

interface UseCaseCardProps {
  title: string;
  items: string[];
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ title, items }) => {
  return (
    <div className="use-case">
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <style jsx>{`
        .use-case {
          background: rgba(255, 255, 255, 0.08);
          padding: 25px;
          border-radius: 15px;
          border-top: 4px solid #f39c12;
          transition: all 0.3s ease;
        }
        
        .use-case:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

interface UseCaseGridProps {
  useCases: UseCase[];
}

const UseCaseGrid: React.FC<UseCaseGridProps> = ({ useCases }) => {
  return (
    <div className="use-case-grid">
      {useCases.map((useCase, index) => (
        <UseCaseCard
          key={index}
          title={useCase.title}
          items={useCase.items}
        />
      ))}
      
      <style jsx>{`
        .use-case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
      `}</style>
    </div>
  );
};

export default UseCaseGrid;