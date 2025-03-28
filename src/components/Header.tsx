import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, ChevronRight, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const location = useLocation();
  const contactRef = useRef(null);

  // Close mobile menu and contact info when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsContactVisible(false);
  }, [location]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of contact dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setIsContactVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard accessibility for dropdowns
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsContactVisible(false);
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Simplified navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Our Team', path: '/team' },
    { title: 'Results', path: '/results' },
    { title: 'Updates', path: '/updates' },
    { title: 'Legislative Calendar', path: '/legislative-calendar' },
    { title: 'Policy Briefings', path: '/policy-briefings' },
    { title: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled 
          ? 'bg-white py-2 shadow-sm' 
          : 'py-3 sm:py-4 bg-navy-950/90 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group" aria-label="Capitol Insights - Home">
            <div 
              className={`relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center ${
                isScrolled ? 'bg-gold-600' : 'bg-gold-500'
              } text-navy-950 rounded-md overflow-hidden transition-colors duration-300`}
            >
              <Landmark size={20} className="mt-1 z-10 relative sm:size-22" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-display font-semibold tracking-tight ${
                isScrolled ? 'text-navy-900' : 'text-white'
              } transition-colors duration-300`}>
                Capitol Insights
              </span>
              <span className={`text-xs font-medium tracking-wide hidden sm:block ${
                isScrolled ? 'text-navy-600' : 'text-gold-300'
              } transition-colors duration-300`}>
                TEXAS GOVERNMENT RELATIONS
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`px-4 py-2 font-medium rounded-md transition-all duration-250 ${
                    isScrolled 
                      ? 'text-navy-800 hover:text-gold-600' 
                      : 'text-white hover:text-gold-300'
                  } ${
                    isActive(link.path)
                      ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                      : ''
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.title}
                  {isActive(link.path) && (
                    <div 
                      className={`h-0.5 mt-0.5 rounded-full ${isScrolled ? 'bg-gold-500' : 'bg-gold-400'}`}
                    />
                  )}
                </Link>
              ))}
              
<Link 
  to="/contact"
  className={`ml-5 btn ${isScrolled ? 'btn-primary' : 'bg-gold-600 hover:bg-gold-500 text-navy-950'} btn-md hidden sm:flex items-center whitespace-nowrap`}
>
  <span>Schedule Assessment</span>
  <ChevronRight size={16} className="ml-1" />
</Link>
            </nav>
          </div>
          
          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-navy-900' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-navy-900' : 'text-white'} />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu"
            className={`lg:hidden pt-4 pb-6 mt-4 border-t ${
              isScrolled 
                ? 'bg-white border-slate-100' 
                : 'glass-dark'
            }`}
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col space-y-1" role="menu">
              {navLinks.map((link) => (
                <li key={link.path} role="none">
                  <Link 
                    to={link.path} 
                    className={`block px-4 py-3 rounded-md transition-colors duration-250 ${
                      isScrolled 
                        ? 'text-navy-800 hover:text-gold-600 hover:bg-slate-50' 
                        : 'text-white hover:text-gold-300 hover:bg-white/10'
                    } ${
                      isActive(link.path)
                        ? `font-semibold ${isScrolled ? 'text-gold-600 bg-slate-50' : 'text-gold-300 bg-white/10'}`
                        : ''
                    }`}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                    role="menuitem"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-2 border-t border-slate-100/10 px-4" role="none">
<Link 
  to="/contact"
  className="btn btn-primary btn-md w-full justify-center group whitespace-nowrap"
  role="menuitem"
>
  <span>Schedule Assessment</span>
  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
</Link>
              </li>
              <li className="pt-4 px-4" role="none">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="mailto:info@capitol-insights.com" 
                    className={`flex items-center text-sm ${
                      isScrolled ? 'text-navy-700' : 'text-white/80'
                    }`}
                    aria-label="Email us"
                    role="menuitem"
                  >
                    <Mail size={14} className="mr-2 text-gold-500" />
                    info@capitol-insights.com
                  </a>
                  <p 
                    className={`flex items-center text-sm ${
                      isScrolled ? 'text-navy-700' : 'text-white/80'
                    }`}
                  >
                    <Phone size={14} className="mr-2 text-gold-500" />
                    Contact for details
                  </p>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      {/* Subtle shimmer effect on scroll */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>
      )}
    </header>
  );
};

export default Header;
