import React from 'react';
import { ApiEndpoint } from '../../types';

interface EndpointCardProps {
  method: string;
  endpoint: string;
  description: string;
  codeExample: string;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ 
  method, 
  endpoint, 
  description, 
  codeExample 
}) => {
  return (
    <div className="endpoint">
      <div className="endpoint-method">{method}</div>
      <h4>{endpoint}</h4>
      <p>{description}</p>
      <div className="code-block">
        <pre>{codeExample}</pre>
      </div>
      
      <style jsx>{`
        .endpoint {
          background: rgba(46, 204, 113, 0.2);
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #2ecc71;
        }
        
        .endpoint-method {
          background: #27ae60;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 10px;
        }
        
        .code-block {
          background: #1e1e1e;
          color: #f8f8f2;
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          font-family: 'Monaco', 'Menlo', monospace;
          overflow-x: auto;
          border: 1px solid #444;
        }
        
        .code-block pre {
          margin: 0;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

interface ApiEndpointsProps {
  endpoints: ApiEndpoint[];
}

const ApiEndpoints: React.FC<ApiEndpointsProps> = ({ endpoints }) => {
  return (
    <div className="api-endpoints">
      {endpoints.map((endpoint, index) => (
        <EndpointCard
          key={index}
          method={endpoint.method}
          endpoint={endpoint.path}
          description={endpoint.description}
          codeExample={endpoint.codeExample}
        />
      ))}
      
      <style jsx>{`
        .api-endpoints {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
      `}</style>
    </div>
  );
};

export default ApiEndpoints;