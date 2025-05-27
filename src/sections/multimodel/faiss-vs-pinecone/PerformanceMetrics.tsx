import React from 'react';
import { PerformanceMetric } from '../types';

interface MetricCardProps {
  value: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, description }) => {
  return (
    <div className="metric-card">
      <span className="metric-value">{value}</span>
      <div>{description}</div>
      
      <style jsx>{`
        .metric-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .metric-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }
        
        .metric-value {
          font-size: 2em;
          font-weight: bold;
          color: #4ecdc4;
          display: block;
        }
      `}</style>
    </div>
  );
};

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div className="performance-metrics">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          value={metric.value}
          description={metric.description}
        />
      ))}
      
      <style jsx>{`
        .performance-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
      `}</style>
    </div>
  );
};

export default PerformanceMetrics;