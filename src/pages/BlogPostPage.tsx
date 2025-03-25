import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  ChevronRight, 
  FileText, 
  Clock, 
  User, 
  Tag,
  ArrowLeft,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import SEO from '../components/SEO';
import client from '../tina-client';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

import { ArticleSchemaMarkup } from '../utils/seo';

// Define types for blog posts
interface BlogPost {
  _sys: {
    filename: string;
    basename: string;
    relativePath: string;
  };
  id: string;
  title: string;
  metaDescription?: string;
  metaKeywords?: string[];
  excerpt: string;
  date: string;
  author: string;
  authorTitle: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  body: any;
  schemaMarkup?: ArticleSchemaMarkup;
}

// Share button component
const ShareButton: React.FC<{
  platform: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  title: string;
}> = ({ platform, icon, color, url, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleShare = () => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  return (
    <button 
      onClick={handleShare}
      className={`p-2 rounded-full text-white ${color} hover:opacity-90 transition-opacity`}
      aria-label={`Share on ${platform}`}
    >
      {platform === 'copy' && copied ? <Check size={18} /> : icon}
    </button>
  );
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>('');
  
  // Set URL for sharing
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
  // Fetch all posts for related posts functionality
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsResponse = await client.postConnection();
        if (postsResponse.data.postConnection.edges) {
          const posts = postsResponse.data.postConnection.edges
            .filter(edge => edge?.node)
            .map(edge => edge?.node as BlogPost);
          setAllPosts(posts);
        }
      } catch (err) {
        console.error('Error fetching all posts:', err);
      }
    };
    
    fetchAllPosts();
  }, []);
  
  // Fetch the current post by slug
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Find the post file path from the slug
        const relativePath = `${slug}.mdx`;
        const postResponse = await client.post({ relativePath });
        
        if (postResponse.data.post) {
          setPost(postResponse.data.post as BlogPost);
          
          // Find related posts once we have the current post
          if (allPosts.length > 0) {
            const related = getRelatedPosts(postResponse.data.post as BlogPost, allPosts);
            setRelatedPosts(related);
          }
          
          // Scroll to top when post changes
          window.scrollTo(0, 0);
        } else {
          setError('Post not found');
          navigate('/updates');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Error loading post');
        navigate('/updates');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, navigate, allPosts]);
  
  // Get related posts by category or tag
  const getRelatedPosts = (currentPost: BlogPost, posts: BlogPost[], limit = 3): BlogPost[] => {
    return posts
      .filter(post => 
        post._sys.relativePath !== currentPost._sys.relativePath && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, limit);
  };
  
  // Update related posts when all posts are loaded
  useEffect(() => {
    if (post && allPosts.length > 0) {
      const related = getRelatedPosts(post, allPosts);
      setRelatedPosts(related);
    }
  }, [post, allPosts]);
  
  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-navy-900 mb-2">Loading article...</h2>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-navy-900 mb-2">Article not found</h2>
          <p className="text-slate-600 mb-4">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/updates" className="btn btn-primary">
            View all updates
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title={`${post.title} | Capitol Insights`}
        description={post.metaDescription || post.excerpt}
        image={post.image}
        canonical={`/updates/${slug}`}
        type="article"
        additionalMetaTags={[
          { name: "keywords", content: post.metaKeywords ? post.metaKeywords.join(', ') : post.tags.join(', ').toLowerCase() + ', texas government relations, policy analysis' },
          { property: "og:site_name", content: "Capitol Insights" },
          { property: "article:published_time", content: new Date(post.date).toISOString() },
          { property: "article:author", content: post.author },
          { property: "article:section", content: post.category }
        ]}
        schemaMarkup={post.schemaMarkup}
      />

      {/* Blog Post Header */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/updates" 
              className="inline-flex items-center text-gold-300 hover:text-gold-200 mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to all updates</span>
            </Link>
            
            <span className="inline-block px-3 py-1 bg-gold-600/20 text-gold-200 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/90">
              <span className="flex items-center">
                <CalendarDays size={16} className="mr-2" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative -mt-16 sm:-mt-20 z-10 mb-10 sm:mb-16">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[250px] sm:h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Blog Post Content */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.article 
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-display prose-headings:font-semibold prose-p:text-slate-700 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-strong:text-navy-800">
                  {post.body && <TinaMarkdown content={post.body} />}
                </div>
              </motion.article>
              
              <motion.div 
                className="mt-10 sm:mt-12 pt-8 border-t border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  <p className="text-slate-700 mr-2 font-medium">Tags:</p>
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      to={`/updates?tag=${tag}`}
                      className="inline-flex items-center px-3 py-1 bg-slate-100 text-navy-700 rounded-full text-sm hover:bg-slate-200 transition-colors"
                    >
                      <Tag size={14} className="mr-1 text-gold-600" />
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="bg-gold-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4">
                      <User size={22} className="text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-900 text-lg">{post.author}</p>
                      <p className="text-slate-600">{post.authorTitle}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <p className="text-sm font-medium text-navy-800 mb-2">Share this article:</p>
                    <div className="flex gap-2">
                      <ShareButton 
                        platform="facebook" 
                        icon={<Facebook size={18} />} 
                        color="bg-[#1877F2]" 
                        url={url} 
                        title={post.title} 
                      />
                      <ShareButton 
                        platform="twitter" 
                        icon={<Twitter size={18} />} 
                        color="bg-[#1DA1F2]" 
                        url={url} 
                        title={post.title} 
                      />
                      <ShareButton 
                        platform="linkedin" 
                        icon={<Linkedin size={18} />} 
                        color="bg-[#0A66C2]" 
                        url={url} 
                        title={post.title} 
                      />
                      <ShareButton 
                        platform="copy" 
                        icon={<Copy size={18} />} 
                        color="bg-navy-800" 
                        url={url} 
                        title={post.title} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <motion.div 
                className="sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Author Bio */}
                <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100 mb-6 sm:mb-8">
                  <h3 className="text-lg font-display font-semibold text-navy-900 mb-4 pb-2 border-b border-slate-100">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <div className="bg-gold-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4">
                      <User size={22} className="text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-900">{post.author}</p>
                      <p className="text-slate-600">{post.authorTitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm mb-4">
                    {post.author === 'Drew Campbell' && 
                      "Drew Campbell brings over 30 years of government relations experience to Capitol Insights. As a founding partner, he has established the firm as a respected voice in Texas politics."}
                    {post.author === 'Byron Campbell' && 
                      "Byron Campbell has dedicated over 10 years to understanding and navigating the intersection of policy, politics, and business. His experience spans local, state, and federal government."}
                  </p>
                  <Link 
                    to="/team" 
                    className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700"
                  >
                    <span>View full profile</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-100 mb-6 sm:mb-8">
                    <h3 className="text-lg font-display font-semibold text-navy-900 mb-4 pb-2 border-b border-slate-100">Related Updates</h3>
                    <div className="space-y-5 sm:space-y-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost.id}
                          to={`/updates/${relatedPost._sys.basename}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <div className="mb-1 text-xs text-slate-500">{formatDate(relatedPost.date)}</div>
                              <h4 className="font-medium text-navy-900 group-hover:text-gold-600 transition-colors leading-tight text-sm sm:text-base">
                                {relatedPost.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Link 
                        to="/updates" 
                        className="text-gold-600 font-medium inline-flex items-center hover:text-gold-700"
                      >
                        <span>View all updates</span>
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
                
                {/* Newsletter Signup */}
                <div className="bg-navy-50 p-5 sm:p-6 rounded-xl border border-navy-100">
                  <h3 className="text-lg font-display font-semibold text-navy-900 mb-3">Capitol Watch Newsletter</h3>
                  <p className="text-slate-700 text-sm mb-4">
                    Subscribe to receive our legislative updates and policy analysis directly to your inbox.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                    <button className="btn btn-primary btn-md justify-center">
                      <Mail size={16} className="mr-2" />
                      <span>Subscribe</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 sm:p-8 md:p-12 shadow-lg border border-slate-100">
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

export default BlogPostPage;
