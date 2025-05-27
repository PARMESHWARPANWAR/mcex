import React from 'react';

interface RecommendationSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ 
  title, 
  subtitle, 
  description 
}) => {
  return (
    <div className="recommendation">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{description}</p>
      
      <style jsx>{`
        .recommendation {
          background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
          padding: 30px;
          border-radius: 20px;
          margin: 40px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .recommendation::before {
          content: '🏆';
          font-size: 3em;
          position: absolute;
          top: 20px;
          right: 30px;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default RecommendationSection;