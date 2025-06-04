import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: string;
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, title, isActive, onClick }) => {
  return (
    <Link href={href} className={`nav-link ${isActive ? 'active' : ''}`} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-title">{title}</span>
      
      <style jsx>{`
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: ${isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'};
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 2px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
          font-size: 0.9em;
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .nav-link:hover::before {
          left: 100%;
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        
        .nav-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .nav-icon {
          font-size: 1.1em;
          position: relative;
          z-index: 1;
        }
        
        .nav-title {
          font-size: 0.85em;
          white-space: nowrap;
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 900px) {
          .nav-link {
            padding: 10px 12px;
          }
          
          .nav-title {
            font-size: 0.8em;
          }
        }
        
        @media (max-width: 768px) {
          .nav-link {
            justify-content: center;
            padding: 15px 10px;
          }
          
          .nav-title {
            display: none;
          }
        }
      `}</style>
    </Link>
  );
};

interface SafeNavigationProps {
  currentPath?: string;
}

const Navigation: React.FC<SafeNavigationProps> = ({ currentPath = '/' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState(currentPath);
  
  const navItems = [
    { href: '/', icon: '🚀', title: 'API Flow' },
    { href: '/comparison', icon: '⚖️', title: 'Vector DBs' },
    { href: '/databases', icon: '🗄️', title: 'Databases' },
    { href: '/imagebind', icon: '🔗', title: 'ImageBind' },
    { href: '/search', icon: '🔍', title: 'Search' },
    { href: '/challenges', icon: '🎯', title: 'Challenges' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Update active path from browser location
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.navigation');
      if (nav && !nav.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen && typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <span className="brand-icon">🤖</span>
          <span className="brand-text">Multimodal Docs</span>
        </Link>
        
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <div className={`nav-items ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={activePath === item.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActivePath(item.href);
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .navigation {
          position: fixed;
          top: 20px;
          left: 20px;
          right: 20px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 15px 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .navigation.scrolled {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 1.1em;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .nav-brand:hover {
          transform: scale(1.05);
          color: #4ecdc4;
        }
        
        .brand-icon {
          font-size: 1.5em;
          animation: brandPulse 3s ease-in-out infinite;
        }
        
        @keyframes brandPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.3s ease;
        }
        
        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          position: relative;
        }
        
        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
          position: absolute;
        }
        
        .hamburger span:nth-child(1) {
          top: 0;
        }
        
        .hamburger span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }
        
        .hamburger span:nth-child(3) {
          bottom: 0;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg);
          top: 50%;
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg);
          bottom: 50%;
        }
        
        .nav-items {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        @media (max-width: 900px) {
          .navigation {
            padding: 12px 20px;
          }
          
          .nav-items {
            gap: 8px;
          }
        }
        
        @media (max-width: 768px) {
          .navigation {
            position: relative;
            margin-bottom: 20px;
            padding: 15px 20px;
          }
          
          .mobile-menu-button {
            display: block;
          }
          
          .nav-items {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 0 0 20px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            flex-direction: column;
            gap: 12px;
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          
          .nav-items.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .brand-text {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .navigation {
            left: 10px;
            right: 10px;
            padding: 12px 15px;
          }
          
          .nav-items {
            padding: 15px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;