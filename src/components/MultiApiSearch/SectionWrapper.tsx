import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  padding?: string;
  background?: 'default' | 'transparent' | 'dark' | 'light';
  borderRadius?: string;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = '',
  maxWidth = '1200px',
  padding = '30px',
  background = 'default',
  borderRadius = '20px',
  shadow = 'large',
  id
}) => {
  const getBackgroundStyle = () => {
    switch (background) {
      case 'transparent':
        return {
          background: 'transparent',
          backdropFilter: 'none'
        };
      case 'dark':
        return {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        };
      case 'light':
        return {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)'
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)'
        };
    }
  };

  const getShadowStyle = () => {
    switch (shadow) {
      case 'none':
        return '0 0 0 rgba(0,0,0,0)';
      case 'small':
        return '0 4px 15px rgba(0,0,0,0.1)';
      case 'medium':
        return '0 10px 30px rgba(0,0,0,0.2)';
      case 'large':
      default:
        return '0 25px 50px rgba(0,0,0,0.3)';
    }
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <section 
      id={id}
      className={`section-wrapper ${className}`}
      role="region"
      aria-label={id ? `Section: ${id}` : undefined}
    >
      {children}
      
      <style jsx>{`
        .section-wrapper {
          max-width: ${maxWidth};
          margin: 0 auto 30px auto;
          background: ${backgroundStyle.background};
          backdrop-filter: ${backgroundStyle.backdropFilter};
          border-radius: ${borderRadius};
          padding: ${padding};
          box-shadow: ${getShadowStyle()};
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .section-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          opacity: 0.6;
        }
        
        .section-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: ${shadow === 'none' ? 'none' : '0 30px 60px rgba(0,0,0,0.4)'};
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        /* Responsive adjustments */
        @media (max-width: 1400px) {
          .section-wrapper {
            margin: 0 20px 30px 20px;
            max-width: calc(${maxWidth} - 40px);
          }
        }
        
        @media (max-width: 768px) {
          .section-wrapper {
            margin: 0 15px 25px 15px;
            padding: 20px;
            border-radius: 15px;
            max-width: calc(100vw - 30px);
          }
          
          .section-wrapper:hover {
            transform: none;
          }
        }
        
        @media (max-width: 480px) {
          .section-wrapper {
            margin: 0 10px 20px 10px;
            padding: 15px;
            border-radius: 12px;
            max-width: calc(100vw - 20px);
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .section-wrapper {
            border: 2px solid rgba(255, 255, 255, 0.8);
            background: rgba(0, 0, 0, 0.8);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .section-wrapper {
            transition: none;
          }
          
          .section-wrapper:hover {
            transform: none;
          }
        }
        
        /* Print styles */
        @media print {
          .section-wrapper {
            background: white;
            color: black;
            box-shadow: none;
            border: 1px solid #ccc;
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
        
        /* Dark mode adjustments (if system preference) */
        @media (prefers-color-scheme: dark) {
          .section-wrapper {
            border-color: rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </section>
  );
};

export default SectionWrapper;