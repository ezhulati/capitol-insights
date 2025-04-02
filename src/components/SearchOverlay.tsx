import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Calendar, Users, Book, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'blog' | 'resource' | 'service' | 'page';
  excerpt?: string;
  url: string;
  icon: React.ReactNode;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeResult, setActiveResult] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mock search data - in a real implementation, this would come from an API or search index
  const mockSearchData: SearchResult[] = [
    {
      id: '1',
      title: 'Texas Legislative Calendar 2025',
      type: 'resource',
      excerpt: 'Complete timeline of the 89th Texas Legislative Session with important deadlines and key dates.',
      url: '/resources#calendar',
      icon: <Calendar size={18} className="text-gold-600" />
    },
    {
      id: '2',
      title: 'Transportation & Infrastructure Practice',
      type: 'service',
      excerpt: 'Strategic advocacy for transportation projects, infrastructure funding, and mobility initiatives.',
      url: '/practice-areas#transportation',
      icon: <FileText size={18} className="text-gold-600" />
    },
    {
      id: '3',
      title: 'Legislative Advocacy Guide',
      type: 'resource',
      excerpt: 'A comprehensive guide to effective advocacy during the Texas legislative session.',
      url: '/resources',
      icon: <Book size={18} className="text-gold-600" />
    },
    {
      id: '4',
      title: 'Meet Our Team',
      type: 'page',
      excerpt: 'Our leadership brings decades of experience and established relationships with key decision-makers.',
      url: '/team',
      icon: <Users size={18} className="text-gold-600" />
    },
    {
      id: '5',
      title: 'Texas Transportation Funding Outlook',
      type: 'blog',
      excerpt: 'An analysis of transportation funding trends, legislative priorities, and future projections.',
      url: '/updates/transportation-funding-outlook',
      icon: <FileText size={18} className="text-gold-600" />
    }
  ];

  // Filter results based on search term
  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSearchData.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setResults(filtered);
        setIsLoading(false);
        setActiveResult(-1);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle result click
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveResult(prev => (prev < results.length - 1) ? prev + 1 : prev);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveResult(prev => (prev > 0) ? prev - 1 : prev);
      } else if (e.key === 'Enter' && activeResult >= 0 && activeResult < results.length) {
        e.preventDefault();
        handleResultClick(results[activeResult].url);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, results, activeResult, onClose]);

  // Prevent scroll on body when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle result click
  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-32 pb-8 overflow-y-auto">
      <div className="w-full max-w-3xl px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-slate-200 flex items-center bg-white sticky top-0">
            <Search size={24} className="text-navy-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for resources, services, and more..."
              className="flex-1 border-none outline-none text-lg bg-transparent"
              autoComplete="off"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-navy-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchTerm.length > 0 && (
              <div className="p-2">
                {isLoading ? (
                  <div className="py-6 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-gold-500 rounded-full animate-spin"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <div 
                        key={result.id}
                        className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                          index === activeResult ? 'bg-slate-100' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => handleResultClick(result.url)}
                      >
                        <div className="flex items-start">
                          <div className="mt-1 mr-3">
                            {result.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-navy-800 mb-1">{result.title}</h4>
                            {result.excerpt && (
                              <p className="text-sm text-slate-600 line-clamp-2">{result.excerpt}</p>
                            )}
                            <div className="mt-1.5 flex items-center">
                              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded capitalize">
                                {result.type}
                              </span>
                              <span className="text-xs text-gold-600 ml-3 flex items-center">
                                View <ArrowRight size={12} className="ml-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-slate-600">No results found for "{searchTerm}"</p>
                    <div className="mt-4 text-sm text-slate-500">
                      <p>Try:</p>
                      <ul className="mt-2 space-y-1">
                        <li>• Using different keywords</li>
                        <li>• Checking for typos</li>
                        <li>• Using more general terms</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Quick Links (when no search term) */}
            {!searchTerm && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-navy-900 mb-4">Popular Searches</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSearchTerm('legislative calendar')}
                    className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <Calendar size={18} className="text-gold-600 mr-3" />
                    <span className="text-slate-700">Legislative Calendar</span>
                  </button>
                  <button 
                    onClick={() => setSearchTerm('transportation')}
                    className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <FileText size={18} className="text-gold-600 mr-3" />
                    <span className="text-slate-700">Transportation</span>
                  </button>
                  <button 
                    onClick={() => setSearchTerm('advocacy guide')}
                    className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <Book size={18} className="text-gold-600 mr-3" />
                    <span className="text-slate-700">Advocacy Guide</span>
                  </button>
                  <button 
                    onClick={() => setSearchTerm('team')}
                    className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <Users size={18} className="text-gold-600 mr-3" />
                    <span className="text-slate-700">Our Team</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Footer Area */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
                <div className="text-slate-600 mb-3 sm:mb-0">
                  Press <kbd className="px-2 py-1 bg-white rounded-md border border-slate-300 shadow-sm mx-1 text-xs">↑</kbd> 
                  <kbd className="px-2 py-1 bg-white rounded-md border border-slate-300 shadow-sm mx-1 text-xs">↓</kbd> 
                  to navigate and <kbd className="px-2 py-1 bg-white rounded-md border border-slate-300 shadow-sm mx-1 text-xs">Enter</kbd> to select
                </div>
                <Link 
                  to="/resources"
                  onClick={() => onClose()}
                  className="text-gold-600 hover:text-gold-700 flex items-center font-medium"
                >
                  <span>View all resources</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
