import React from 'react';
import { ProcessingStep } from '../../types';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="step">
      <div className="step-number">{stepNumber}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      
      <style jsx>{`
        .step {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 25px;
          border-radius: 15px;
          position: relative;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .step:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        
        .step-number {
          position: absolute;
          top: -10px;
          left: 20px;
          background: #e74c3c;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

interface FlowStepsProps {
  steps: ProcessingStep[];
}

const FlowSteps: React.FC<FlowStepsProps> = ({ steps }) => {
  return (
    <div className="flow-steps">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          stepNumber={index + 1}
          title={step.title}
          description={step.description}
        />
      ))}
      
      <style jsx>{`
        .flow-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default FlowSteps;