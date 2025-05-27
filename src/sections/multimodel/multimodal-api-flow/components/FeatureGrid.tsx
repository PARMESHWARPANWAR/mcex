import React from 'react';
import { Feature } from '../../types';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h4>{title}</h4>
      <p>{description}</p>
      
      <style jsx>{`
        .feature-card {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          padding: 25px;
          border-radius: 15px;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

interface FeatureGridProps {
  features: Feature[];
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
      
      <style jsx>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
      `}</style>
    </div>
  );
};

export default FeatureGrid;