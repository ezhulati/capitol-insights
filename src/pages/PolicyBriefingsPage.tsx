import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ChevronRight, 
  Download, 
  Calendar, 
  User,
  Tag,
  Search,
  Filter,
  Mail,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import DownloadForm from '../components/DownloadForm';

interface BriefingProps {
  title: string;
  description: string;
  date: string;
  author: string;
  authorTitle: string;
  category: string;
  tags: string[];
  pdfUrl: string;
}

const PolicyBriefing: React.FC<BriefingProps & { onDownload: (briefing: BriefingProps) => void }> = ({ 
  title, 
  description, 
  date, 
  author, 
  authorTitle, 
  category, 
  tags, 
  pdfUrl,
  onDownload
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-secondary-100 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
            {category}
          </span>
          <span className="text-secondary-500 text-sm flex items-center">
            <Calendar size={14} className="mr-1" />
            {date}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-secondary-900 mb-3">{title}</h3>
        <p className="text-secondary-700 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
          <div className="flex items-center">
            <div className="bg-primary-50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <User size={14} className="text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-secondary-900 text-sm">{author}</p>
              <p className="text-secondary-500 text-xs">{authorTitle}</p>
            </div>
          </div>
          
          <button 
            onClick={() => onDownload({ title, description, date, author, authorTitle, category, tags, pdfUrl })}
            className="text-primary-600 font-medium inline-flex items-center hover:text-primary-700"
          >
            <Download size={16} className="mr-1" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PolicyBriefingsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingProps | null>(null);
  
  // Handle download request
  const handleDownload = (briefing: BriefingProps) => {
    setSelectedBriefing(briefing);
    setShowDownloadForm(true);
  };
  
  // Sample policy briefings
  const briefings: BriefingProps[] = [
    {
      title: "Texas Transportation Funding: 2025-2026 Outlook",
      description: "A comprehensive analysis of transportation funding priorities for the upcoming legislative session, including potential impacts on infrastructure development and regional mobility initiatives.",
      date: "October 15, 2024",
      author: "Drew Campbell",
      authorTitle: "President",
      category: "Transportation",
      tags: ["Infrastructure", "Funding", "Legislative Priorities"],
      pdfUrl: "/downloads/texas-transportation-funding-outlook.html"
    },
    {
      title: "Healthcare Regulatory Changes: Impact Analysis for Texas Providers",
      description: "This briefing examines recent regulatory changes affecting healthcare providers in Texas and provides strategic recommendations for adaptation and compliance.",
      date: "September 28, 2024",
      author: "Byron Campbell",
      authorTitle: "Senior Partner",
      category: "Healthcare",
      tags: ["Regulatory", "Compliance", "Healthcare Policy"],
      pdfUrl: "/downloads/healthcare-regulatory-changes.html"
    },
    {
      title: "Water Infrastructure Funding: Legislative Priorities for 2025",
      description: "An analysis of water infrastructure needs across Texas and recommendations for securing funding in the upcoming legislative session.",
      date: "September 10, 2024",
      author: "Byron Campbell",
      authorTitle: "Senior Partner",
      category: "Water Resources",
      tags: ["Infrastructure", "Funding", "Water Policy"],
      pdfUrl: "/downloads/water-infrastructure-funding.html"
    },
    {
      title: "Energy Grid Reliability: Policy Recommendations",
      description: "This briefing provides an overview of current challenges facing the Texas energy grid and offers policy recommendations to enhance reliability and resilience.",
      date: "August 22, 2024",
      author: "Drew Campbell",
      authorTitle: "President",
      category: "Energy",
      tags: ["Energy Policy", "Regulatory", "Infrastructure"],
      pdfUrl: "/downloads/energy-grid-reliability.html"
    },
    {
      title: "Municipal Advocacy Strategies for the 89th Legislative Session",
      description: "Strategic guidance for municipalities seeking to effectively advocate for their interests in the upcoming legislative session.",
      date: "August 5, 2024",
      author: "Drew Campbell",
      authorTitle: "President",
      category: "Municipal Affairs",
      tags: ["Local Government", "Advocacy", "Strategy"],
      pdfUrl: "/downloads/municipal-advocacy-strategies.html"
    },
    {
      title: "Telecommunications Regulatory Outlook for Texas",
      description: "An overview of upcoming regulatory changes affecting the telecommunications industry in Texas and strategies for adaptation.",
      date: "July 18, 2024",
      author: "Byron Campbell",
      authorTitle: "Senior Partner",
      category: "Telecommunications",
      tags: ["Regulatory", "Technology", "Communications"],
      pdfUrl: "/downloads/telecommunications-regulatory-outlook.html"
    }
  ];
  
  // Extract unique categories and tags
  const categories = [...new Set(briefings.map(briefing => briefing.category))];
  const allTags = [...new Set(briefings.flatMap(briefing => briefing.tags))];
  
  // Filter briefings based on search, category, and tag
  const filteredBriefings = briefings.filter(briefing => {
    const matchesSearch = searchTerm === '' || 
      briefing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      briefing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || briefing.category === selectedCategory;
    
    const matchesTag = selectedTag === '' || briefing.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Policy Briefings | Capitol Insights"
        description="Access in-depth policy briefings on key legislative and regulatory issues affecting Texas organizations. Our expert analysis helps you understand potential impacts and develop effective strategies."
        canonical="/policy-briefings"
        additionalMetaTags={[
          { name: "keywords", content: "texas policy briefings, legislative analysis, regulatory impact, government affairs, policy research, texas legislature" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Download Form Modal */}
      {showDownloadForm && selectedBriefing && (
        <DownloadForm
          title={`Download ${selectedBriefing.title}`}
          description="Please provide your information to download this policy briefing."
          pdfUrl={selectedBriefing.pdfUrl}
          pdfTitle={selectedBriefing.title}
          onClose={() => setShowDownloadForm(false)}
        />
      )}

      {/* Briefings Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 sm:mb-6 mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
              <FileText size={28} className="text-primary-200" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Policy Briefings</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              In-depth analysis of key legislative and regulatory issues affecting Texas organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Briefings Content */}
      <section className="py-12 sm:py-16 bg-secondary-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.div 
                className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-secondary-100 lg:sticky lg:top-24"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-display font-semibold text-secondary-900 mb-4 pb-2 border-b border-secondary-100">Filter Briefings</h3>
                
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by keyword..."
                      className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-10"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                    <Filter size={16} className="mr-2 text-primary-600" />
                    Categories
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-categories"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="all-categories" className="ml-2 text-secondary-700">
                        All Categories
                      </label>
                    </div>
                    
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${index}`}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor={`category-${index}`} className="ml-2 text-secondary-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-secondary-900 mb-3 flex items-center">
                    <Tag size={16} className="mr-2 text-primary-600" />
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => setSelectedTag('')}
                      className={`text-xs px-3 py-1 rounded-full ${
                        selectedTag === '' 
                          ? 'bg-primary-100 text-primary-700 font-medium' 
                          : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      All
                    </button>
                    
                    {allTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-xs px-3 py-1 rounded-full ${
                          selectedTag === tag 
                            ? 'bg-primary-100 text-primary-700 font-medium' 
                            : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-secondary-100">
                  <h4 className="font-medium text-secondary-900 mb-3">Request Custom Briefing</h4>
                  <p className="text-secondary-600 text-sm mb-4">
                    Need analysis on a specific issue? Contact us for a customized policy briefing.
                  </p>
                  <Link 
                    to="/contact" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center whitespace-nowrap"
                  >
                    <Mail size={16} className="mr-2" />
                    Request Briefing
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Briefings */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary-900">Policy Briefings</h2>
                  <p className="text-secondary-600">
                    {filteredBriefings.length} briefing{filteredBriefings.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                
                {(searchTerm || selectedCategory || selectedTag) && (
                  <button 
                    onClick={clearFilters}
                    className="mt-4 md:mt-0 text-primary-600 font-medium hover:text-primary-700 flex items-center"
                  >
                    <span>Clear all filters</span>
                  </button>
                )}
              </div>
              
              {filteredBriefings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {filteredBriefings.map((briefing, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <PolicyBriefing 
                        {...briefing} 
                        onDownload={handleDownload}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 text-center border border-secondary-100">
                  <FileText size={48} className="text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">No results found</h3>
                  <p className="text-secondary-600 mb-4">
                    We couldn't find any briefings matching your current filters.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">Additional Resources</h2>
              <p className="text-secondary-700 max-w-2xl mx-auto">
                Explore these resources to enhance your understanding of the Texas legislative and regulatory landscape.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">Legislative Calendar</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Stay informed about key dates and deadlines for the Texas Legislature.
                </p>
                <Link 
                  to="/legislative-calendar" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>View Calendar</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <FileText size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">Capitol Watch</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Regular updates on legislative developments and policy trends.
                </p>
                <Link 
                  to="/updates" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>Read Updates</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-secondary-100 shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg mr-4">
                    <ExternalLink size={20} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900">Texas Legislature Online</h3>
                </div>
                <p className="text-secondary-700 mb-4">
                  Access the official Texas Legislature website for bills, committees, and more.
                </p>
                <a 
                  href="https://capitol.texas.gov/" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-secondary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-primary-50 rounded-xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 mb-3 sm:mb-4">Need personalized policy guidance?</h2>
                <p className="text-secondary-700 mb-4 md:mb-0">
                  Schedule a consultation to discuss how these policy developments could impact your organization.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center whitespace-nowrap"
                >
                  Schedule Consultation
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyBriefingsPage;
