import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Landmark, ChevronRight, ChevronDown, Phone, Mail, Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

// Navigation data structure
const navigationItems = [
  {
    title: 'Services',
    path: '/services',
    children: [
      { title: 'Services Overview', path: '/services' },
      { title: 'Practice Areas', path: '/practice-areas' },
    ]
  },
  {
    title: 'About Us',
    path: '/about',
    children: [
      { title: 'Our Team', path: '/team' },
      { title: 'Results', path: '/results' },
      { title: 'Success Stories', path: '/success-stories' },
    ]
  },
  {
    title: 'Resources',
    path: '/resources',
    children: [
      { title: 'Updates', path: '/updates' },
      { title: 'Resources', path: '/resources' },
      { title: 'Legislative Calendar', path: '/legislative-calendar' },
      { title: 'Policy Briefings', path: '/policy-briefings' },
    ]
  },
  {
    title: 'Contact',
    path: '/contact',
    children: []
  }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of the header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return window.location.pathname === path;
    }
    return window.location.pathname.startsWith(path);
  };

  // Helper function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled 
          ? 'bg-white py-2 shadow-sm' 
          : 'py-3 sm:py-4 bg-navy-950/90 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2 group" 
            aria-label="Capitol Insights - Home"
          >
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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            <nav className="flex items-center space-x-4" aria-label="Main Navigation">
              {navigationItems.map((item) => (
                item.children.length > 0 ? (
                  // Dropdown menu for items with children
                  <div key={item.title} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={`px-4 py-2 font-medium rounded-md transition-all duration-250 flex items-center ${
                        isScrolled 
                          ? 'text-navy-800 hover:text-gold-600' 
                          : 'text-white hover:text-gold-300'
                      } ${
                        activeDropdown === item.title || isActive(item.path)
                          ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                          : ''
                      }`}
                      aria-expanded={activeDropdown === item.title}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {activeDropdown === item.title && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-20 border border-slate-100">
                        {item.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-navy-800 hover:bg-slate-50 hover:text-gold-600 ${
                              isActive(child.path) ? 'font-medium text-gold-600 bg-slate-50' : ''
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular link for items without children
                  <Link 
                    key={item.title}
                    to={item.path}
                    className={`px-4 py-2 font-medium rounded-md transition-all duration-250 ${
                      isScrolled 
                        ? 'text-navy-800 hover:text-gold-600' 
                        : 'text-white hover:text-gold-300'
                    } ${
                      isActive(item.path)
                        ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                        : ''
                    }`}
                  >
                    {item.title}
                    {isActive(item.path) && (
                      <div 
                        className={`h-0.5 mt-0.5 rounded-full ${isScrolled ? 'bg-gold-500' : 'bg-gold-400'}`}
                      />
                    )}
                  </Link>
                )
              ))}
            </nav>
            
            <Link 
              to="/contact"
              className={`btn ${isScrolled ? 'btn-primary' : 'bg-gold-600 hover:bg-gold-500 text-navy-950'} btn-md flex items-center whitespace-nowrap`}
            >
              <span>Schedule Assessment</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors focus:outline-none focus-gold ${
                isScrolled 
                  ? 'text-navy-800 hover:text-gold-600 hover:bg-slate-100' 
                  : 'text-navy-100 hover:text-gold-300 hover:bg-navy-800/50'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
          
          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 mr-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-gold"
              aria-label="Search"
            >
              <Search size={20} className={isScrolled ? 'text-navy-900' : 'text-white'} />
            </button>
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className={isScrolled ? 'text-navy-900' : 'text-white'} />
              ) : (
                <Menu size={24} className={isScrolled ? 'text-navy-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className={`lg:hidden pt-4 pb-6 mt-4 border-t ${
              isScrolled 
                ? 'bg-white border-slate-100' 
                : 'glass-dark'
            }`}
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  {item.children.length > 0 ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors duration-250 ${
                          isScrolled 
                            ? 'text-navy-800 hover:text-gold-600' 
                            : 'text-white hover:text-gold-300'
                        } ${
                          activeDropdown === item.title
                            ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                            : ''
                        }`}
                        aria-expanded={activeDropdown === item.title}
                        aria-controls={`${item.title}-dropdown`}
                      >
                        <span>{item.title}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      {activeDropdown === item.title && (
                        <ul 
                          id={`${item.title}-dropdown`}
                          className="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1"
                        >
                          {item.children.map(child => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className={`block w-full text-left px-4 py-2 rounded-md ${
                                  isScrolled
                                    ? 'text-navy-700 hover:text-gold-600 hover:bg-slate-50'
                                    : 'text-white/90 hover:text-gold-300 hover:bg-white/10'
                                } ${
                                  isActive(child.path) ? `font-medium ${isScrolled ? 'text-gold-600 bg-slate-50' : 'text-gold-300 bg-white/10'}` : ''
                                }`}
                                onClick={closeMobileMenu}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block w-full text-left px-4 py-3 rounded-md transition-colors duration-250 ${
                        isScrolled
                          ? 'text-navy-800 hover:text-gold-600 hover:bg-slate-50'
                          : 'text-white hover:text-gold-300 hover:bg-white/10'
                      } ${
                        isActive(item.path)
                          ? `font-semibold ${isScrolled ? 'text-gold-600 bg-slate-50' : 'text-gold-300 bg-white/10'}`
                          : ''
                      }`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              
              <li className="pt-3 mt-2 border-t border-slate-100/10 px-4">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-md w-full justify-center group whitespace-nowrap"
                  onClick={closeMobileMenu}
                >
                  <span>Schedule Assessment</span>
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
              
              <li className="pt-4 px-4">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="mailto:byroncampbell@capitol-insights.com" 
                    className={`flex items-center text-sm ${
                      isScrolled ? 'text-navy-700' : 'text-white/80'
                    }`}
                    aria-label="Email us"
                  >
                    <Mail size={14} className="mr-2 text-gold-500" />
                    byroncampbell@capitol-insights.com
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
      
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;
