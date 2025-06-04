import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  icon, 
  description,
  alignment = 'center',
  size = 'large',
  animated = true,
  breadcrumbs
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          titleSize: '1.8em',
          subtitleSize: '1em',
          spacing: '20px'
        };
      case 'medium':
        return {
          titleSize: '2.2em',
          subtitleSize: '1.1em',
          spacing: '30px'
        };
      case 'large':
      default:
        return {
          titleSize: '2.5em',
          subtitleSize: '1.2em',
          spacing: '40px'
        };
    }
  };

  const { titleSize, subtitleSize, spacing } = getSizeStyles();

  return (
    <header className={`page-header ${animated ? 'animated' : ''}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="breadcrumb-item">
                {crumb.href ? (
                  <a href={crumb.href} className="breadcrumb-link">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="header-content">
        {icon && (
          <div className="header-icon" aria-hidden="true">
            {icon}
          </div>
        )}
        
        <h1 className="header-title">
          {title}
        </h1>
        
        {subtitle && (
          <p className="header-subtitle">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="header-description">
            {description}
          </p>
        )}
      </div>
      
      <style jsx>{`
        .page-header {
          text-align: ${alignment};
          margin-bottom: ${spacing};
          position: relative;
        }
        
        .page-header.animated {
          animation: headerFadeIn 0.8s ease-out;
        }
        
        @keyframes headerFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .breadcrumbs {
          margin-bottom: 20px;
          text-align: left;
        }
        
        .breadcrumb-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 8px;
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .breadcrumb-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9em;
          transition: color 0.2s ease;
          padding: 4px 8px;
          border-radius: 6px;
        }
        
        .breadcrumb-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .breadcrumb-current {
          color: white;
          font-size: 0.9em;
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9em;
        }
        
        .header-content {
          position: relative;
        }
        
        .header-icon {
          font-size: 3em;
          margin-bottom: 15px;
          opacity: 0.9;
          line-height: 1;
          display: inline-block;
          animation: ${animated ? 'iconFloat 3s ease-in-out infinite' : 'none'};
        }
        
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .header-title {
          font-size: ${titleSize};
          font-weight: 700;
          margin: 0 0 ${subtitle || description ? '15px' : '0'} 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          animation: ${animated ? 'gradientShift 4s ease-in-out infinite' : 'none'};
          position: relative;
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .header-subtitle {
          font-size: ${subtitleSize};
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 ${description ? '10px' : '0'} 0;
          font-weight: 300;
          line-height: 1.4;
          opacity: 0.95;
        }
        
        .header-description {
          font-size: 1em;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
          max-width: 600px;
          margin: ${alignment === 'center' ? '0 auto' : '0'};
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .page-header {
            text-align: center;
            margin-bottom: ${parseInt(spacing) * 0.7}px;
          }
          
          .header-title {
            font-size: ${parseFloat(titleSize) * 0.8}em;
            line-height: 1.3;
          }
          
          .header-subtitle {
            font-size: ${parseFloat(subtitleSize) * 0.9}em;
          }
          
          .header-description {
            font-size: 0.95em;
          }
          
          .header-icon {
            font-size: 2.5em;
            margin-bottom: 10px;
          }
          
          .breadcrumb-list {
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .header-title {
            font-size: ${parseFloat(titleSize) * 0.7}em;
          }
          
          .header-subtitle {
            font-size: ${parseFloat(subtitleSize) * 0.85}em;
          }
          
          .header-icon {
            font-size: 2em;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .header-title {
            background: none;
            -webkit-background-clip: unset;
            -webkit-text-fill-color: white;
            background-clip: unset;
            color: white;
          }
          
          .breadcrumb-link {
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .page-header.animated,
          .header-icon,
          .header-title {
            animation: none;
          }
        }
        
        /* Print styles */
        @media print {
          .page-header {
            color: black;
          }
          
          .header-title {
            background: none;
            -webkit-background-clip: unset;
            -webkit-text-fill-color: black;
            background-clip: unset;
            color: black;
            text-shadow: none;
          }
          
          .header-subtitle,
          .header-description {
            color: #333;
          }
          
          .breadcrumb-link {
            color: #666;
          }
        }
      `}</style>
    </header>
  );
};

export default PageHeader;