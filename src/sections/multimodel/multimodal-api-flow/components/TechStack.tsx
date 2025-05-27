import React from 'react';
import { Technology } from '../../types';

interface TechItemProps {
  label: string;
  technology: string;
}

const TechItem: React.FC<TechItemProps> = ({ label, technology }) => {
  return (
    <div className="tech-item">
      <strong>{label}:</strong> {technology}
    </div>
  );
};

interface TechStackProps {
  technologies: Technology[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  return (
    <div className="tech-stack">
      <h3>🛠️ Technology Stack</h3>
      <div className="tech-grid">
        {technologies.map((tech, index) => (
          <TechItem
            key={index}
            label={tech.label}
            technology={tech.technology}
          />
        ))}
      </div>
      
      <style jsx>{`
        .tech-stack {
          background: rgba(52, 152, 219, 0.2);
          padding: 25px;
          border-radius: 15px;
          border: 2px solid #3498db;
          margin: 30px 0;
        }
        
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .tech-item {
          padding: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default TechStack;