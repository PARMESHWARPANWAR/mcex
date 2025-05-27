import React from 'react';
import { FlowData } from '../../types';

interface DataBoxProps {
  title: string;
  description: string;
}

const DataBox: React.FC<DataBoxProps> = ({ title, description }) => {
  return (
    <div className="data-box">
      <h4>{title}</h4>
      <p>{description}</p>
      
      <style jsx>{`
        .data-box {
          background: rgba(255, 255, 255, 0.15);
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          flex: 1;
          min-width: 200px;
          transition: all 0.3s ease;
        }
        
        .data-box:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

const ArrowFlow: React.FC = () => {
  return (
    <>
      <div className="arrow-flow">→</div>
      <style jsx>{`
        .arrow-flow {
          font-size: 2em;
          color: #f39c12;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

interface DataFlowProps {
  flowData: FlowData[];
}

const DataFlow: React.FC<DataFlowProps> = ({ flowData }) => {
  return (
    <div className="data-flow">
      {flowData.map((item, index) => (
        <React.Fragment key={index}>
          <DataBox title={item.title} description={item.description} />
          {index < flowData.length - 1 && <ArrowFlow />}
        </React.Fragment>
      ))}
      
      <style jsx>{`
        .data-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 30px 0;
          flex-wrap: wrap;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default DataFlow;