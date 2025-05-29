'use client'
import React from 'react';
import ChallengeCard from './ChallengeCard';

interface Challenge {
  Tutorial: number;
  title: string;
  description: string;
  path: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  category?: string;
}

interface ChallengeGridProps {
  challenges: Challenge[];
  title?: string;
  subtitle?: string;
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ 
  challenges, 
  title = "🚀 Tutorial Challenges",
  subtitle = "Master multimodal AI step by step"
}) => {
  return (
    <div className="challenge-section">
      {(title || subtitle) && (
        <div className="section-header">
          <h1 className="section-title">{title}</h1>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="challenge-grid">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.Tutorial} challenge={challenge} />
        ))}
      </div>
      
      <style jsx>{`
        .challenge-section {
          padding: 20px 0;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .section-title {
          font-size: 2.5em;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-subtitle {
          font-size: 1.2em;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-weight: 300;
        }
        
        .challenge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .challenge-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0 10px;
          }
          
          .section-title {
            font-size: 2em;
          }
          
          .section-subtitle {
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  );
};

export default ChallengeGrid;