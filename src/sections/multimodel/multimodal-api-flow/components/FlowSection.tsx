import React from 'react';

interface FlowSectionProps {
  title: string;
  children: React.ReactNode;
}

const FlowSection: React.FC<FlowSectionProps> = ({ title, children }) => {
  return (
    <div className="flow-section">
      <h2>{title}</h2>
      {children}
      
      <style jsx>{`
        .flow-section {
          margin: 40px 0;
          padding: 25px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          border-left: 5px solid #3498db;
        }
      `}</style>
    </div>
  );
};

export default FlowSection;