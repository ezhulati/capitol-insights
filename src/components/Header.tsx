import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Landmark, ChevronRight, ChevronDown, Phone, Mail, Search, Users, FileText, Info } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard accessibility for dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Better navigation handler for mobile links
  const handleNavigation = (path: string) => {
    // First navigate to the desired path
    navigate(path);
    
    // Then close menus after a short delay to ensure navigation happens
    setTimeout(() => {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }, 50);
  };

  // Reorganized navigation with dropdown structure
  const navLinks = [
    { 
      title: 'Services', 
      key: 'services',
      hasDropdown: true,
      icon: <FileText size={16} />,
      items: [
        { title: 'Services Overview', path: '/services' },
        { title: 'Practice Areas', path: '/practice-areas' },
      ]
    },
    { 
      title: 'About Us', 
      key: 'about',
      hasDropdown: true,
      icon: <Users size={16} />,
      items: [
        { title: 'Our Team', path: '/team' },
        { title: 'Results', path: '/results' },
        { title: 'Success Stories', path: '/success-stories' },
      ]
    },
    { 
      title: 'Resources', 
      key: 'resources',
      hasDropdown: true,
      icon: <Info size={16} />,
      items: [
        { title: 'Updates', path: '/updates' },
        { title: 'Resources', path: '/resources' },
        { title: 'Legislative Calendar', path: '/legislative-calendar' },
        { title: 'Policy Briefings', path: '/policy-briefings' },
      ]
    },
  ];

  // Safe isActive function that handles undefined paths
  const isActive = (path?: string) => {
    if (!path) return false;
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
          
          <div className="hidden lg:flex items-center space-x-6 ml-auto" ref={dropdownRef}>
            <nav className="flex items-center space-x-4" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <div key={link.key} className="relative">
                  <button
                    onClick={() => toggleDropdown(link.key)}
                    className={`px-4 py-2 font-medium rounded-md transition-all duration-250 flex items-center ${
                      isScrolled 
                        ? 'text-navy-800 hover:text-gold-600' 
                        : 'text-white hover:text-gold-300'
                    } ${
                      activeDropdown === link.key || link.items?.some(item => isActive(item.path))
                        ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                        : ''
                    }`}
                    aria-expanded={activeDropdown === link.key}
                    aria-haspopup="true"
                  >
                    {link.title}
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform ${activeDropdown === link.key ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {activeDropdown === link.key && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-20 border border-slate-100">
                      {link.items?.map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block px-4 py-2 text-navy-800 hover:bg-slate-50 hover:text-gold-600 ${
                            isActive(item.path) ? 'font-medium text-gold-600 bg-slate-50' : ''
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Link 
                to="/contact"
                className={`px-4 py-2 font-medium rounded-md transition-all duration-250 ${
                  isScrolled 
                    ? 'text-navy-800 hover:text-gold-600' 
                    : 'text-white hover:text-gold-300'
                } ${
                  isActive('/contact')
                    ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                    : ''
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <div 
                    className={`h-0.5 mt-0.5 rounded-full ${isScrolled ? 'bg-gold-500' : 'bg-gold-400'}`}
                  />
                )}
              </Link>
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
                <li key={link.key} role="none">
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.key)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors duration-250 ${
                        isScrolled 
                          ? 'text-navy-800 hover:text-gold-600' 
                          : 'text-white hover:text-gold-300'
                      } ${
                        activeDropdown === link.key
                          ? `font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-300'}`
                          : ''
                      }`}
                      aria-expanded={activeDropdown === link.key}
                      aria-haspopup="true"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.title}
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${activeDropdown === link.key ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {activeDropdown === link.key && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
                        {link.items?.map(item => (
                          <li key={item.path} onClick={(e) => e.stopPropagation()}>
                            {/* Use button instead of Link for more reliable navigation */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNavigation(item.path);
                              }}
                              className={`block w-full text-left px-4 py-2 rounded-md ${
                                isScrolled 
                                  ? 'text-navy-700 hover:text-gold-600 hover:bg-slate-50' 
                                  : 'text-white/90 hover:text-gold-300 hover:bg-white/10'
                              } ${
                                isActive(item.path) ? `font-medium ${isScrolled ? 'text-gold-600 bg-slate-50' : 'text-gold-300 bg-white/10'}` : ''
                              }`}
                              role="menuitem"
                            >
                              {item.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
              <li role="none">
                {/* Use button instead of Link for more reliable navigation */}
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className={`block w-full text-left px-4 py-3 rounded-md transition-colors duration-250 ${
                    isScrolled 
                      ? 'text-navy-800 hover:text-gold-600 hover:bg-slate-50' 
                      : 'text-white hover:text-gold-300 hover:bg-white/10'
                  } ${
                    isActive('/contact')
                      ? `font-semibold ${isScrolled ? 'text-gold-600 bg-slate-50' : 'text-gold-300 bg-white/10'}`
                      : ''
                  }`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                  role="menuitem"
                >
                  Contact
                </button>
              </li>
              <li className="pt-3 mt-2 border-t border-slate-100/10 px-4" role="none">
                {/* Use button instead of Link for more reliable navigation */}
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="btn btn-primary btn-md w-full justify-center group whitespace-nowrap"
                  role="menuitem"
                >
                  <span>Schedule Assessment</span>
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
              <li className="pt-4 px-4" role="none">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="mailto:byroncampbell@capitol-insights.com" 
                    className={`flex items-center text-sm ${
                      isScrolled ? 'text-navy-700' : 'text-white/80'
                    }`}
                    aria-label="Email us"
                    role="menuitem"
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
