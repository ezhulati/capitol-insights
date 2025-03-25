import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  ChevronRight, 
  FileText, 
  Clock, 
  User, 
  Tag,
  Search,
  Filter,
  ArrowRight,
  Mail,
  Bookmark
} from 'lucide-react';
import SEO from '../components/SEO';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    slug: 'texas-legislative-session-2025-preview',
    title: 'Texas Legislative Session 2025: What Organizations Need to Know',
    excerpt: 'A comprehensive preview of key issues likely to dominate the upcoming legislative session and how they may impact various sectors.',
    content: `
      <p>The 2025 Texas Legislative Session is fast approaching, and organizations across sectors need to prepare for what promises to be a consequential period for state policy. Our government relations team has compiled this preview of key issues we anticipate will dominate the upcoming session.</p>
      
      <h2>Budget Priorities</h2>
      <p>With projections indicating a budget surplus for the 2025-2026 biennium, we anticipate significant debate over spending priorities. Key areas likely to receive attention include:</p>
      <ul>
        <li>Infrastructure investment, particularly in grid resilience and rural broadband</li>
        <li>Public education funding formulas</li>
        <li>Healthcare accessibility initiatives</li>
        <li>Property tax relief measures</li>
      </ul>
      
      <h2>Regulatory Focus</h2>
      <p>Several regulatory areas are positioned for possible reform:</p>
      <ul>
        <li>Energy regulation and market structure following ongoing reliability concerns</li>
        <li>Technology sector oversight, particularly regarding data privacy and artificial intelligence</li>
        <li>Healthcare delivery systems and telehealth permanence</li>
        <li>Environmental permitting processes, especially water usage in manufacturing and agriculture</li>
      </ul>
      
      <h2>Industry-Specific Outlook</h2>
      <p>Based on interim committee hearings and stakeholder engagement, we predict the following industry-specific focus areas:</p>
      
      <h3>Technology & Telecommunications</h3>
      <p>With broadband access now recognized as essential infrastructure, expect continued legislative attention on expanding deployment to underserved areas. Additionally, data privacy regulation modeled after other state frameworks appears increasingly likely.</p>
      
      <h3>Healthcare</h3>
      <p>Healthcare workforce shortage solutions will be a major focus, along with measures to address rural healthcare access. Regulatory frameworks for new care delivery models are also expected.</p>
      
      <h3>Energy</h3>
      <p>The legislature will continue addressing grid reliability with potential market structure reforms. Renewable energy incentives may face scrutiny, while natural gas infrastructure will likely receive support for resilience purposes.</p>
      
      <h2>Strategic Recommendations</h2>
      <p>Organizations should consider these proactive steps in preparation for the 2025 session:</p>
      <ol>
        <li>Engage with legislative offices during the interim to establish relationships and educate on key issues</li>
        <li>Develop specific policy recommendations rather than general position statements</li>
        <li>Build coalitions with aligned stakeholders to amplify advocacy efforts</li>
        <li>Prepare data-driven impact analyses to support policy positions</li>
        <li>Create a comprehensive government relations strategy with contingency plans for various scenarios</li>
      </ol>
      
      <p>Capitol Insights will continue monitoring interim committee activities and leadership priorities. For a personalized analysis of how the upcoming session might impact your organization, please contact our team to schedule a consultation.</p>
    `,
    date: 'October 15, 2024',
    author: 'Drew Campbell',
    authorTitle: 'Senior Partner',
    readTime: '6 min read',
    category: 'Legislative Preview',
    tags: ['Texas Legislature', 'Policy', 'Government Affairs'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    slug: 'healthcare-regulatory-changes-impact',
    title: 'Navigating Texas Healthcare Regulatory Changes in 2024',
    excerpt: 'An analysis of recent regulatory changes affecting healthcare providers and strategies for compliance without sacrificing operational efficiency.',
    content: '',
    date: 'September 28, 2024',
    author: 'Drew Campbell',
    authorTitle: 'Senior Partner',
    readTime: '5 min read',
    category: 'Healthcare',
    tags: ['Healthcare', 'Regulatory Compliance', 'Policy Analysis'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 3,
    slug: 'municipal-advocacy-strategies',
    title: 'Effective Municipal Advocacy: Strategies for Local Policy Influence',
    excerpt: 'How organizations can effectively engage with city councils and local regulatory bodies to shape favorable policy outcomes.',
    content: '',
    date: 'September 12, 2024',
    author: 'Byron Campbell',
    authorTitle: 'Senior Partner',
    readTime: '4 min read',
    category: 'Municipal Affairs',
    tags: ['Local Government', 'Advocacy', 'Municipal Relations'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1571954471509-801c155e01ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: 4,
    slug: 'transportation-funding-outlook',
    title: 'Transportation Funding Outlook: Preparing for the Next Budget Cycle',
    excerpt: 'Analysis of potential transportation funding priorities and how stakeholders can position for infrastructure investment.',
    content: '',
    date: 'August 25, 2024',
    author: 'Drew Campbell',
    authorTitle: 'Senior Partner',
    readTime: '7 min read',
    category: 'Transportation',
    tags: ['Infrastructure', 'Budget', 'Transportation'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1528460452708-38945e33cd4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 5,
    slug: 'coalition-building-case-study',
    title: 'Coalition Building: A Case Study in Effective Policy Advocacy',
    excerpt: 'How a diverse stakeholder coalition successfully navigated complex regulatory challenges through strategic alignment.',
    content: '',
    date: 'August 10, 2024',
    author: 'Byron Campbell',
    authorTitle: 'Senior Partner',
    readTime: '5 min read',
    category: 'Advocacy Strategy',
    tags: ['Coalition Building', 'Case Study', 'Advocacy'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80'
  },
  {
    id: 6,
    slug: 'telecommunications-regulatory-outlook',
    title: 'Telecommunications Regulatory Outlook for 2025',
    excerpt: 'Key regulatory trends affecting telecommunications companies and strategic considerations for policy engagement.',
    content: '',
    date: 'July 30, 2024',
    author: 'Drew Campbell',
    authorTitle: 'Senior Partner',
    readTime: '6 min read',
    category: 'Telecommunications',
    tags: ['Telecommunications', 'Regulatory Affairs', 'Technology'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
];

// Get all unique categories
const categories = [...new Set(blogPosts.map(post => post.category))];

// Get all unique tags
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const UpdatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // Filter posts based on search, category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Get the featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title="Capitol Watch: Latest Policy Insights | Capitol Insights"
        description="Stay informed with the latest legislative developments, regulatory changes, and policy trends affecting Texas organizations through Capitol Insights' policy updates."
        image="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
        canonical="/updates"
        additionalMetaTags={[
          { name: "keywords", content: "texas policy updates, legislative analysis, regulatory changes, government affairs blog, texas lobbying insights" },
          { property: "og:site_name", content: "Capitol Insights" }
        ]}
      />

      {/* Updates Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4">
              Capitol Watch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6">Policy Updates</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Insights and analysis on legislative developments, regulatory changes, and policy trends affecting Texas organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-4">
                Featured Analysis
              </span>
              <h2 className="section-title font-display">
                Latest Policy Insights
              </h2>
              <p className="section-subtitle">
                Our most recent analysis of important legislative and regulatory developments.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <span className="inline-block px-3 py-1 bg-gold-600/20 text-white rounded-full text-sm font-medium mb-2">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {featuredPost.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-navy-700 rounded-full text-sm">
                      <CalendarDays size={14} className="mr-1 text-navy-600" />
                      {featuredPost.date}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-navy-700 rounded-full text-sm">
                      <Clock size={14} className="mr-1 text-navy-600" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="bg-gold-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <User size={18} className="text-gold-600" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{featuredPost.author}</p>
                        <p className="text-slate-500 text-sm">{featuredPost.authorTitle}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/updates/${featuredPost.slug}`} 
                      className="btn btn-primary btn-md w-full sm:w-auto justify-center sm:justify-start"
                    >
                      Read Full Analysis
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Posts with Filters */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.div 
                className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-100 lg:sticky lg:top-24"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-display font-semibold text-navy-900 mb-4 pb-2 border-b border-slate-100">Filter Updates</h3>
                
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-navy-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by keyword..."
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent pl-10"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-navy-900 mb-3 flex items-center">
                    <Filter size={16} className="mr-2 text-gold-600" />
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
                        className="h-4 w-4 text-gold-600 focus:ring-gold-500"
                      />
                      <label htmlFor="all-categories" className="ml-2 text-slate-700">
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
                          className="h-4 w-4 text-gold-600 focus:ring-gold-500"
                        />
                        <label htmlFor={`category-${index}`} className="ml-2 text-slate-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-navy-900 mb-3 flex items-center">
                    <Tag size={16} className="mr-2 text-gold-600" />
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => setSelectedTag('')}
                      className={`text-xs px-3 py-1 rounded-full ${
                        selectedTag === '' 
                          ? 'bg-gold-100 text-gold-700 font-medium' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                            ? 'bg-gold-100 text-gold-700 font-medium' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-medium text-navy-900 mb-3">Capitol Watch Newsletter</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Subscribe to receive our legislative updates directly to your inbox.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                    <button className="bg-gold-600 text-navy-950 px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors flex items-center justify-center">
                      <Mail size={16} className="mr-2" />
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Blog Posts */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">Policy Updates</h2>
                  <p className="text-slate-600">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <select 
                    className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
                    defaultValue="newest"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="a-z">Title A-Z</option>
                    <option value="z-a">Title Z-A</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-navy-900/80 text-white rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                          <span className="inline-flex items-center">
                            <CalendarDays size={14} className="mr-1 text-gold-600" />
                            {post.date}
                          </span>
                          <span className="inline-flex items-center">
                            <Clock size={14} className="mr-1 text-gold-600" />
                            {post.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-display font-bold text-navy-900 mb-3 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 mb-4 line-clamp-3 flex-grow text-sm sm:text-base">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                          <div className="flex items-center">
                            <div className="bg-gold-50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                              <User size={14} className="text-gold-600" />
                            </div>
                            <div>
                              <p className="font-medium text-navy-900 text-sm">{post.author}</p>
                              <p className="text-slate-500 text-xs">{post.authorTitle}</p>
                            </div>
                          </div>
                          
                          <Link 
                            to={`/updates/${post.slug}`} 
                            className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700 text-sm"
                            aria-label={`Read more about ${post.title}`}
                          >
                            <span>Read more</span>
                            <ArrowRight size={14} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center border border-slate-100 md:col-span-2">
                    <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">No results found</h3>
                    <p className="text-slate-600 mb-4">
                      We couldn't find any articles matching your current filters.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedTag('');
                      }}
                      className="text-gold-600 font-medium hover:text-gold-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-navy-50 rounded-xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-navy-900 mb-3 sm:mb-4">Need personalized policy guidance?</h2>
                <p className="text-slate-700 mb-4 md:mb-0">
                  Schedule a consultation to discuss how these policy developments could impact your organization.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg w-full md:w-auto justify-center"
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

// Define the missing Calendar component
const Calendar = CalendarDays;

export default UpdatesPage;