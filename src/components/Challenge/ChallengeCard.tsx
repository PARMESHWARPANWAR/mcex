'use client'
import React from 'react';
import Link from 'next/link';

interface Challenge {
  Tutorial: number;
  title: string;
  description: string;
  path: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  category?: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return '#2ecc71';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#e74c3c';
      default: return '#4ecdc4';
    }
  };

  return (
    <Link href={challenge.path} className="challenge-card-link">
      <div className="challenge-card">
        <div className="challenge-header">
          <div className="tutorial-badge">
            Tutorial {challenge.Tutorial}
          </div>
          {challenge.difficulty && (
            <div 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
            >
              {challenge.difficulty}
            </div>
          )}
        </div>
        
        <div className="challenge-content">
          <h2 className="challenge-title">
            {challenge.title}
          </h2>
          <p className="challenge-description">
            {challenge.description}
          </p>
          {challenge.category && (
            <div className="challenge-category">
              🏷️ {challenge.category}
            </div>
          )}
        </div>
        
        <div className="challenge-arrow">→</div>
      </div>
      
      <style jsx>{`
        .challenge-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        
        .challenge-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          padding: 25px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .challenge-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .challenge-card:hover::before {
          left: 100%;
        }
        
        .challenge-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .challenge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .tutorial-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85em;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .difficulty-badge {
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.8em;
          font-weight: 600;
          color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .challenge-content {
          position: relative;
          z-index: 1;
        }
        
        .challenge-title {
          font-size: 1.4em;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          line-height: 1.3;
        }
        
        .challenge-description {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin: 0 0 15px 0;
          font-size: 0.95em;
        }
        
        .challenge-category {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.85em;
          color: rgba(255, 255, 255, 0.8);
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .challenge-arrow {
          position: absolute;
          top: 50%;
          right: 25px;
          transform: translateY(-50%);
          font-size: 1.5em;
          color: #4ecdc4;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .challenge-card:hover .challenge-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(5px);
        }
        
        @media (max-width: 768px) {
          .challenge-card {
            padding: 20px;
          }
          
          .challenge-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .challenge-title {
            font-size: 1.2em;
          }
          
          .challenge-arrow {
            display: none;
          }
        }
      `}</style>
    </Link>
  );
};

export default ChallengeCard;