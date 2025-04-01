import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ChevronRight, 
  Download, 
  Mail, 
  Search,
  Filter,
  X,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import { generateResourceStructuredData, generateFAQStructuredData } from '../utils/structured-data';
import { generateResourcePreview } from '../utils/social-preview';
import BreadcrumbNavigation from '../components/BreadcrumbNavigation';
import DocumentViewHandler from '../components/PDFDownloadHandler';

// Types
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'brief' | 'report' | 'calendar';
  downloadUrl: string;
  date: string;
  featured?: boolean;
  thumbnailUrl?: string;
  fileSize?: string;
  pdfUrl?: string; // Actual PDF file URL
}

// Resource category options for filtering
const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'legislative', label: 'Legislative' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'technology', label: 'Technology' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'municipal', label: 'Municipal Affairs' }
];

// Resource type options for filtering
const resourceTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'guide', label: 'Guides' },
  { id: 'brief', label: 'Policy Briefs' },
  { id: 'report', label: 'Reports' },
  { id: 'calendar', label: 'Calendars' }
];

// Mock resource data
const resourcesData: Resource[] = [
  {
    id: 'texas-leg-calendar-2025',
    title: 'Texas Legislative Calendar 2025',
    description: 'Comprehensive guide to the 89th Texas Legislative Session with important deadlines, committee meeting schedules, and key dates.',
    category: 'legislative',
    type: 'calendar',
    downloadUrl: '/downloads/texas-legislative-calendar-2025.html',
    pdfUrl: '/files/texas-legislative-calendar-2025.pdf',
    date: '2024-12-15',
    featured: true,
    thumbnailUrl: '/images/capitol-background.jpg',
    fileSize: '2.4 MB'
  },
  {
    id: 'texas-leg-advocacy-guide',
    title: 'Texas Legislative Advocacy Guide',
    description: 'A comprehensive guide to effective advocacy during the Texas legislative session, including strategies, best practices, and key contacts.',
    category: 'legislative',
    type: 'guide',
    downloadUrl: '/downloads/texas-legislative-advocacy-guide.html',
    pdfUrl: '/files/texas-legislative-influence-guide-2025.pdf', // Using the existing PDF file
    date: '2024-11-20',
    featured: true,
    fileSize: '3.1 MB'
  },
  {
    id: 'trans-funding-outlook',
    title: 'Texas Transportation Funding Outlook',
    description: 'Analysis of transportation funding trends, legislative priorities, and future funding projections for Texas infrastructure.',
    category: 'transportation',
    type: 'report',
    downloadUrl: '/downloads/texas-transportation-funding-outlook.html',
    pdfUrl: '/files/texas-transportation-funding-outlook.pdf',
    date: '2024-10-18',
    fileSize: '1.8 MB'
  },
  {
    id: 'telecom-regulatory-outlook',
    title: 'Telecommunications Regulatory Outlook',
    description: 'Overview of upcoming regulatory changes, legislative priorities, and industry trends affecting telecommunications in Texas.',
    category: 'technology',
    type: 'brief',
    downloadUrl: '/downloads/telecommunications-regulatory-outlook.html',
    pdfUrl: '/files/telecommunications-regulatory-outlook.pdf',
    date: '2024-09-22',
    fileSize: '1.5 MB'
  },
  {
    id: 'healthcare-regulatory-changes',
    title: 'Healthcare Regulatory Changes Impact Analysis',
    description: 'Analysis of recent and upcoming healthcare regulatory changes and their potential impact on providers and patients in Texas.',
    category: 'healthcare',
    type: 'brief',
    downloadUrl: '/downloads/healthcare-regulatory-changes.html',
    pdfUrl: '/files/healthcare-regulatory-changes.pdf',
    date: '2024-09-05',
    fileSize: '2.2 MB'
  },
  {
    id: 'municipal-advocacy-strategies',
    title: 'Municipal Advocacy Strategies',
    description: 'Effective advocacy strategies for cities and local governments to advance their legislative priorities in the Texas Legislature.',
    category: 'municipal',
    type: 'guide',
    downloadUrl: '/downloads/municipal-advocacy-strategies.html',
    pdfUrl: '/files/municipal-advocacy-strategies.pdf',
    date: '2024-08-15',
    fileSize: '2.7 MB'
  },
  {
    id: 'water-infrastructure-funding',
    title: 'Water Infrastructure Funding Guide',
    description: 'Comprehensive guide to funding opportunities for water infrastructure projects in Texas, including state and federal programs.',
    category: 'municipal',
    type: 'guide',
    downloadUrl: '/downloads/water-infrastructure-funding.html',
    pdfUrl: '/files/water-infrastructure-funding.pdf',
    date: '2024-07-12',
    fileSize: '3.5 MB'
  },
  {
    id: 'energy-grid-reliability',
    title: 'Energy Grid Reliability Assessment',
    description: 'Analysis of Texas energy grid reliability, regulatory framework, and policy recommendations for improving resilience.',
    category: 'technology',
    type: 'report',
    downloadUrl: '/downloads/energy-grid-reliability.html',
    pdfUrl: '/files/energy-grid-reliability.pdf',
    date: '2024-06-20',
    fileSize: '4.1 MB'
  }
];

const ResourcesPage: React.FC = () => {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Email capture state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Download form state
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  
  // Handle resource download click
  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowDownloadForm(true);
  };

  // Get featured resources
  const featuredResources = resourcesData.filter(resource => resource.featured);
  
  // Filter and sort resources
  const filteredResources = resourcesData.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });
  
  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Handle newsletter signup
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Resource category badges
  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      legislative: 'bg-blue-100 text-blue-800',
      transportation: 'bg-green-100 text-green-800',
      technology: 'bg-purple-100 text-purple-800',
      healthcare: 'bg-red-100 text-red-800',
      municipal: 'bg-amber-100 text-amber-800'
    };
    
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="pt-16">
      <SEO 
        {...getPageSEO({
          pageType: 'resources',
          title: 'Legislative Resources | Capitol Insights',
          description: 'Access our collection of legislative resources, policy briefs, guidance documents, and reports on Texas government affairs and regulatory matters.',
          image: '/images/capitol-background.jpg'
        })}
        socialPreview={generateResourcePreview({
          title: 'Legislative Resources & Policy Materials',
          description: 'Access guides, policy briefs, calendars, and reports to help navigate the complex landscape of Texas government affairs.',
          type: 'collection',
          category: 'resources',
          image: '/images/capitol-background.jpg'
        })}
        structuredData={[
          // Generate structured data for each featured resource
          ...featuredResources.map(resource => generateResourceStructuredData(resource)),
          // Add FAQ structured data for common questions
          generateFAQStructuredData([
            {
              question: "What types of resources does Capitol Insights offer?",
              answer: "Capitol Insights offers legislative guides, policy briefs, regulatory reports, calendars, and analysis documents focused on Texas government affairs."
            },
            {
              question: "How often are resources updated?",
              answer: "Resources are updated regularly to reflect current legislative sessions, regulatory changes, and policy developments in Texas government."
            },
            {
              question: "Can I request custom research or analysis?",
              answer: "Yes, Capitol Insights provides custom research and analysis services tailored to your organization's specific needs. Contact us to learn more."
            }
          ])
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://capitol-insights.com/' },
          { name: 'Resources', url: 'https://capitol-insights.com/resources' }
        ]}
        includeOrganizationData={true}
      />

      {/* Hero section */}
      <section className="pt-20 pb-16 bg-navy-900 relative">
        <div className="absolute inset-0 bg-capitol bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-900"></div>
        <div className="grain-overlay opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              RESOURCES CENTER
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Legislative Resources &<br />Policy Materials
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Access guides, policy briefs, calendars, and reports to help navigate the complex landscape of Texas government affairs.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by keyword..."
                className="block w-full pl-10 pr-4 py-3 border-0 rounded-lg shadow-md focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container py-3">
          <BreadcrumbNavigation 
            items={[
              { name: 'Home', path: '/' },
              { name: 'Resources', path: '/resources', isLast: true }
            ]}
          />
        </div>
      </div>

      {/* Featured Resources Section */}
      {featuredResources.length > 0 && !searchQuery && selectedCategory === 'all' && selectedType === 'all' && (
        <section className="py-12 bg-slate-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-shadow flex flex-col">
                  {resource.thumbnailUrl && (
                    <div className="w-full h-48 bg-navy-100 overflow-hidden">
                      <img 
                        src={resource.thumbnailUrl} 
                        alt={resource.title} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadge(resource.category)}`}>
                        {categories.find(c => c.id === resource.category)?.label || resource.category}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        {formatDate(resource.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{resource.title}</h3>
                    <p className="text-slate-600 mb-4">{resource.description}</p>
                  </div>
                  <div className="px-6 pb-6 mt-auto">
                    <button
                      onClick={() => handleDownloadClick(resource)}
                      className="btn btn-primary w-full flex items-center justify-center"
                    >
                      <Download size={16} className="mr-2" />
                      <span>Download Resource</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Resources Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-64 lg:shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-navy-900">Filters</h2>
                  <button
                    className="lg:hidden p-2 text-slate-500 hover:text-navy-800 rounded-md"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? <X size={20} /> : <Filter size={20} />}
                  </button>
                </div>
                
                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Sort Options */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy-800 mb-3">Sort By</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSortOrder('newest')}
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          sortOrder === 'newest' 
                            ? 'bg-slate-100 text-navy-800 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ArrowDown size={16} className="mr-2" />
                        <span>Newest First</span>
                      </button>
                      <button
                        onClick={() => setSortOrder('oldest')}
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          sortOrder === 'oldest' 
                            ? 'bg-slate-100 text-navy-800 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ArrowUp size={16} className="mr-2" />
                        <span>Oldest First</span>
                      </button>
                      <button
                        onClick={() => setSortOrder('alphabetical')}
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          sortOrder === 'alphabetical' 
                            ? 'bg-slate-100 text-navy-800 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="inline-block w-4 mr-2 text-center">A</span>
                        <span>Alphabetical</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy-800 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex items-center w-full px-3 py-2 rounded-md ${
                            selectedCategory === category.id 
                              ? 'bg-slate-100 text-navy-800 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{category.label}</span>
                          {selectedCategory === category.id && (
                            <ChevronRight size={16} className="ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resource Type Filter */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy-800 mb-3">Resource Type</h3>
                    <div className="space-y-2">
                      {resourceTypes.map(type => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center w-full px-3 py-2 rounded-md ${
                            selectedType === type.id 
                              ? 'bg-slate-100 text-navy-800 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{type.label}</span>
                          {selectedType === type.id && (
                            <ChevronRight size={16} className="ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources List */}
            <div className="flex-grow">
              {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' ? (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">
                    {sortedResources.length} {sortedResources.length === 1 ? 'Resource' : 'Resources'} Found
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <div className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-sm text-slate-800">
                        <span className="mr-1">Search: "{searchQuery}"</span>
                        <button onClick={() => setSearchQuery('')} className="text-slate-500">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {selectedCategory !== 'all' && (
                      <div className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-sm text-slate-800">
                        <span className="mr-1">Category: {categories.find(c => c.id === selectedCategory)?.label}</span>
                        <button onClick={() => setSelectedCategory('all')} className="text-slate-500">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {selectedType !== 'all' && (
                      <div className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-sm text-slate-800">
                        <span className="mr-1">Type: {resourceTypes.find(t => t.id === selectedType)?.label}</span>
                        <button onClick={() => setSelectedType('all')} className="text-slate-500">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedType('all');
                        }}
                        className="text-sm text-gold-600 hover:text-gold-700"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-navy-900 mb-6">All Resources</h2>
              )}

              {sortedResources.length === 0 ? (
                <div className="bg-slate-50 rounded-lg p-8 text-center">
                  <FileText size={48} className="text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">No Resources Found</h3>
                  <p className="text-slate-600 mb-4">
                    We couldn't find any resources matching your current filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedType('all');
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedResources.map(resource => (
                    <div 
                      key={resource.id}
                      className="bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row"
                    >
                      <div className="flex-grow p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryBadge(resource.category)}`}>
                            {categories.find(c => c.id === resource.category)?.label || resource.category}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatDate(resource.date)}
                          </span>
                          {resource.fileSize && (
                            <span className="text-xs text-slate-500">
                              {resource.fileSize}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-navy-900 mb-2">{resource.title}</h3>
                        <p className="text-slate-600 text-sm mb-4">{resource.description}</p>
                      </div>
                      <div className="px-6 pb-6 sm:p-6 sm:pl-0 sm:ml-auto sm:flex sm:flex-col sm:justify-center">
                        <button
                          onClick={() => handleDownloadClick(resource)}
                          className="btn btn-primary whitespace-nowrap flex items-center"
                        >
                          <Download size={16} className="mr-2" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-navy-800 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Mail size={32} className="text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Subscribe to Legislative Updates</h2>
            <p className="text-navy-100 mb-6">
              Stay informed about legislative developments, policy changes, and new resources relevant to your interests.
            </p>
            
            {isSubscribed ? (
              <div className="bg-navy-700/50 rounded-lg p-6">
                <CheckIcon className="text-gold-400 mx-auto mb-3" />
                <h3 className="text-xl font-medium mb-2">Thank you for subscribing!</h3>
                <p className="text-navy-100">
                  You'll now receive our regular updates on legislative developments and resources.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-grow bg-navy-700/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-navy-300 focus:ring-2 focus:ring-gold-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-gold-600 hover:bg-gold-500 text-navy-950 whitespace-nowrap flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingIcon className="animate-spin mr-2" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe Now</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 sm:p-10 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4">
                  Need Customized Research or Analysis?
                </h2>
                <p className="text-slate-600 mb-6">
                  Our team provides tailored research, analysis, and strategic recommendations specific to your organization's needs and priorities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn btn-primary">
                    Request Custom Research
                  </Link>
                  <Link to="/services" className="btn bg-slate-200 hover:bg-slate-300 text-navy-800">
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document View Handler */}
      {showDownloadForm && selectedResource && (
        <DocumentViewHandler
          title={`View ${selectedResource.title}`}
          description="Please provide your information to access this resource."
          documentUrl={selectedResource.pdfUrl || '#'}
          documentTitle={selectedResource.title}
          onClose={() => setShowDownloadForm(false)}
        />
      )}
    </div>
  );
};

// Helper Icons
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 6L9 17L4 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const LoadingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M19.07 19.07L16.24 16.24M4.93 19.07L7.76 16.24M4.93 4.93L7.76 7.76" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default ResourcesPage;
