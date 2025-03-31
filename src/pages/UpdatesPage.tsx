import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  Mail
} from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/enhanced-seo';
import { generateFAQStructuredData } from '../utils/structured-data';
import BreadcrumbNavigation from '../components/BreadcrumbNavigation';
import { getAllPosts } from '../utils/content-provider';
import type { BlogPost } from '../utils/mdx-sanity';

// Fallback blog posts in case fetching fails
const fallbackPosts = [
  {
    _sys: {
      filename: "texas-legislative-session-2025-preview.mdx",
      basename: "texas-legislative-session-2025-preview",
      relativePath: "texas-legislative-session-2025-preview.mdx"
    },
    id: "texas-legislative-session-2025-preview",
    title: "Texas Legislative Session 2025 - What Organizations Need to Know",
    excerpt: "A comprehensive preview of key issues likely to dominate the upcoming legislative session and how they may impact various sectors.",
    date: "2024-10-15T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "6 min read",
    category: "Legislative Preview",
    tags: ["Texas Legislature", "Policy", "Government Affairs"],
    featured: true,
    image: "/uploads/posts/texas-legislative.jpg",
    body: ""
  }
];

const UpdatesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Get URL parameters
  useEffect(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (tag) setSelectedTag(tag);
    if (category) setSelectedCategory(category);
    if (search) setSearchTerm(search);
  }, [searchParams]);
  
  // Fetch posts from Sanity via content provider
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
          
          // Extract unique categories and tags from posts
          const uniqueCategories = [...new Set(fetchedPosts.map(post => post.category || "Uncategorized"))];
          const uniqueTags = [...new Set(fetchedPosts.flatMap(post => post.tags || []))];
          
          setCategories(uniqueCategories);
          setAllTags(uniqueTags);
        } else {
          // Fallback to static data if no posts were returned
          console.warn("No posts returned from Sanity, using fallback data");
          setPosts(fallbackPosts as unknown as BlogPost[]);
          setCategories(["Legislative Preview"]);
          setAllTags(["Texas Legislature", "Policy", "Government Affairs"]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Fallback to static data on error
        setPosts(fallbackPosts as unknown as BlogPost[]);
        setCategories(["Legislative Preview"]);
        setAllTags(["Texas Legislature", "Policy", "Government Affairs"]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  // Filter posts based on search, category, and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Get the featured post
  const featuredPost = posts.find(post => post.featured);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, selectedTag, setSearchParams]);
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };
  
  // Simple loading state to render while fetching posts
  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-800 border-t-gold-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-navy-800 font-medium">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        {...getPageSEO({
          pageType: 'updates',
          title: "Capitol Watch: Latest Policy Insights | Capitol Insights",
          description: "Stay informed with the latest legislative developments, regulatory changes, and policy trends affecting Texas organizations through Capitol Insights' policy updates.",
          image: "/images/texas-capitol.jpg"
        })}
        structuredData={[
          // Add FAQ schema for common policy questions
          generateFAQStructuredData([
            {
              question: "How often are Texas policy updates published?",
              answer: "Capitol Insights publishes new policy updates weekly, with additional special reports during legislative sessions and after significant regulatory developments."
            },
            {
              question: "Who writes Capitol Insights policy analyses?",
              answer: "Our policy analyses are written by experienced government relations professionals with decades of experience in Texas politics and policy."
            },
            {
              question: "How can I stay updated on Texas legislative developments?",
              answer: "Subscribe to our Capitol Watch newsletter to receive regular updates on legislative developments, regulatory changes, and policy trends in Texas."
            }
          ])
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://capitol-insights.com/' },
          { name: 'Policy Updates', url: 'https://capitol-insights.com/updates' }
        ]}
        includeOrganizationData={true}
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
      
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container py-3">
          <BreadcrumbNavigation 
            items={[
              { name: 'Home', path: '/' },
              { name: 'Policy Updates', path: '/updates', isLast: true }
            ]}
          />
        </div>
      </div>

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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                      {formatDate(featuredPost.date)}
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
                      to={`/updates/${featuredPost._sys.basename}`} 
                      className="btn btn-primary btn-md w-full sm:w-auto justify-center sm:justify-start whitespace-nowrap"
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                    <button className="bg-gold-600 text-navy-950 px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors flex items-center justify-center whitespace-nowrap">
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
              
  {(
                <>
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {filteredPosts.map((post) => (
                        <motion.div 
                          key={post.id}
                          className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, staggerChildren: 0.1, delay: 0.4 }}
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
                                {formatDate(post.date)}
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
                                to={`/updates/${post._sys.basename}`} 
                                className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700 text-sm"
                                aria-label={`Read more about ${post.title}`}
                              >
                                <span>Read more</span>
                                <ArrowRight size={14} className="ml-1" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-8 text-center border border-slate-100 md:col-span-2">
                      <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">No results found</h3>
                      <p className="text-slate-600 mb-4">
                        We couldn't find any articles matching your current filters.
                      </p>
                      <button 
                        onClick={clearFilters}
                        className="text-gold-600 font-medium hover:text-gold-700"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}
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

export default UpdatesPage;
