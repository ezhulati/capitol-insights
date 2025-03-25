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
  Share2,
  Printer,
  BookmarkPlus,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import SEO from '../components/SEO';

// Sample blog post data - should match the data in UpdatesPage.tsx
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
    content: `
      <p>Texas healthcare providers are facing a significant wave of regulatory changes in 2024, creating both challenges and opportunities across the sector. This analysis examines the most impactful developments and offers practical strategies for maintaining compliance while preserving operational efficiency.</p>
      
      <h2>Key Regulatory Developments</h2>
      
      <h3>1. Enhanced Data Privacy Requirements</h3>
      <p>The Texas Health Data Protection Act, which takes full effect in Q3 2024, establishes new standards for patient data handling, storage, and breach reporting. Healthcare entities must implement:</p>
      <ul>
        <li>Enhanced encryption protocols for all patient data</li>
        <li>More stringent access controls and authentication requirements</li>
        <li>Accelerated breach notification timelines (now 45 days vs. previous 60 days)</li>
        <li>Annual security audits with documentation submitted to state regulators</li>
      </ul>
      
      <h3>2. Telehealth Service Extensions</h3>
      <p>While pandemic-era telehealth flexibilities have been extended through 2024, permanent regulatory frameworks are being developed with several important modifications:</p>
      <ul>
        <li>New provider licensing requirements for interstate telehealth services</li>
        <li>Modified reimbursement structures for virtual care with service-specific rates</li>
        <li>Quality reporting mandates specific to telehealth outcomes</li>
      </ul>
      
      <h3>3. Workforce Credentialing Changes</h3>
      <p>The Healthcare Provider Modernization Act introduces revised scope-of-practice regulations affecting:</p>
      <ul>
        <li>Advanced practice registered nurses</li>
        <li>Physician assistants</li>
        <li>Pharmacy practitioners</li>
        <li>Mental health professionals</li>
      </ul>
      
      <h2>Compliance Strategies</h2>
      
      <p>Based on our work with healthcare organizations across Texas, we recommend these practical approaches to efficiently navigate the new regulatory landscape:</p>
      
      <h3>Integrated Compliance Frameworks</h3>
      <p>Rather than treating each regulatory change as a separate initiative, develop an integrated compliance framework that addresses overlapping requirements. This approach can reduce redundancy and create efficiency in documentation, training, and reporting.</p>
      
      <h3>Technology Leveraging</h3>
      <p>Invest in compliance technology platforms that can automate monitoring, documentation, and reporting functions. Modern compliance software can significantly reduce administrative burden while improving accuracy and consistency in regulatory adherence.</p>
      
      <h3>Strategic Personnel Deployment</h3>
      <p>Consider restructuring compliance responsibilities to allow clinical staff to focus on patient care while dedicated compliance specialists handle regulatory administration. This specialization model has proven effective in preserving operational efficiency during regulatory transitions.</p>
      
      <h2>Cost-Benefit Considerations</h2>
      
      <p>Our analysis indicates that healthcare organizations implementing strategic compliance approaches rather than reactive measures can expect:</p>
      <ul>
        <li>15-20% reduction in compliance administrative costs</li>
        <li>Significant decrease in regulatory penalties and remediation expenses</li>
        <li>Improved staff satisfaction through reduced administrative burden</li>
        <li>Enhanced patient trust through demonstrable commitment to privacy and quality</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      
      <p>Regulatory evolution will continue through 2025, with pending legislation likely to address:</p>
      <ul>
        <li>Artificial intelligence in clinical decision support</li>
        <li>Remote patient monitoring standards</li>
        <li>Hospital staffing ratio requirements</li>
        <li>Price transparency enforcement</li>
      </ul>
      
      <p>Capitol Insights is actively engaged with regulatory stakeholders and can provide organization-specific guidance on navigating both current and anticipated regulatory changes. For a customized compliance strategy assessment, please contact our healthcare policy team.</p>
    `,
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
    content: `
      <p>While state-level policy often dominates the conversation, municipal and county governments make decisions daily that significantly impact organizations' operations, costs, and opportunities. This analysis offers practical strategies for effective advocacy at the local level based on our work with clients across Texas municipalities.</p>
      
      <h2>Understanding the Municipal Landscape</h2>
      
      <p>Local government advocacy requires a different approach than state-level engagement for several key reasons:</p>
      
      <ul>
        <li>Local officials typically have broader portfolios and less staff support</li>
        <li>Technical expertise on industry-specific issues may be more limited</li>
        <li>Constituent connections often carry greater weight in decision-making</li>
        <li>Formal and informal processes vary significantly between municipalities</li>
        <li>The pace of policy development can be either much faster or significantly slower than state-level action</li>
      </ul>
      
      <h2>Strategic Advocacy Approaches</h2>
      
      <h3>1. Community Integration</h3>
      
      <p>Organizations with demonstrated community investment typically experience greater policy advocacy success. Effective integration includes:</p>
      
      <ul>
        <li>Maintaining visible participation in community events and initiatives</li>
        <li>Highlighting local economic impact through employment and investment</li>
        <li>Building relationships outside of specific policy requests</li>
        <li>Engaging with community partners on shared priorities</li>
      </ul>
      
      <h3>2. Educational Approach</h3>
      
      <p>Local officials often lack access to specialized policy research. Organizations can position themselves as valuable resources by:</p>
      
      <ul>
        <li>Providing concise, balanced information on complex issues</li>
        <li>Offering peer city comparisons on policy approaches</li>
        <li>Sharing implementation considerations from industry perspective</li>
        <li>Demonstrating alignment between organizational goals and community benefits</li>
      </ul>
      
      <h3>3. Relationship Development</h3>
      
      <p>Effective municipal advocacy requires engagement with multiple stakeholders:</p>
      
      <ul>
        <li>Elected officials (council members, mayor)</li>
        <li>Administrative leadership (city manager, department directors)</li>
        <li>Advisory boards and commissions</li>
        <li>Neighborhood associations and community organizations</li>
        <li>Local business coalitions and economic development entities</li>
      </ul>
      
      <h2>Case Study: Municipal Permitting Reform</h2>
      
      <p>A multi-city initiative to streamline commercial permitting processes demonstrates these principles in action:</p>
      
      <h3>Challenge</h3>
      <p>Inconsistent, lengthy permitting processes were creating significant operational delays and cost overruns for businesses across multiple Texas cities.</p>
      
      <h3>Approach</h3>
      <p>Rather than pursuing individual city-by-city advocacy, a coalition approach leveraged:</p>
      <ul>
        <li>Data collection on economic impact of permitting delays</li>
        <li>Best practice research from high-performing municipalities</li>
        <li>Collaborative workshops between business leaders and city staff</li>
        <li>Joint development of streamlined processes with implementation support</li>
      </ul>
      
      <h3>Outcome</h3>
      <p>This collaborative approach resulted in:</p>
      <ul>
        <li>Comprehensive permitting reforms in five Texas cities</li>
        <li>Average 40% reduction in permit processing time</li>
        <li>Improved relationships between business community and municipal staff</li>
        <li>Creation of ongoing working groups to address future issues</li>
      </ul>
      
      <h2>Implementation Guidance</h2>
      
      <p>Organizations seeking to enhance their municipal advocacy effectiveness should consider these practical steps:</p>
      
      <ol>
        <li>Map the decision-making processes for your priority municipalities</li>
        <li>Identify key relationship development opportunities beyond immediate policy needs</li>
        <li>Prepare concise, solution-oriented policy positions with clear local benefits</li>
        <li>Develop coalition partnerships with aligned stakeholders</li>
        <li>Create a consistent engagement calendar rather than issue-specific outreach</li>
      </ol>
      
      <p>Capitol Insights offers municipal relationship mapping and advocacy strategy development for organizations seeking to enhance their local government engagement. Contact our municipal affairs team to discuss your specific needs and objectives.</p>
    `,
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
    content: ``,
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
    content: ``,
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
    content: ``,
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

// Get related posts by category or tag
const getRelatedPosts = (currentPost, limit = 3) => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

const ShareButton = ({ platform, icon, color, url, title }) => {
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

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [url, setUrl] = useState('');
  
  // Set URL for sharing
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
  // Find post by slug
  useEffect(() => {
    const foundPost = blogPosts.find(post => post.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      setRelatedPosts(getRelatedPosts(foundPost));
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    } else {
      // Redirect to updates page if post not found
      navigate('/updates');
    }
  }, [slug, navigate]);
  
  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-navy-900 mb-2">Loading article...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-16">
      {/* SEO Configuration */}
      <SEO 
        title={`${post.title} | Capitol Insights`}
        description={post.excerpt}
        image={post.image}
        canonical={`/updates/${post.slug}`}
        type="article"
        additionalMetaTags={[
          { name: "keywords", content: post.tags.join(', ').toLowerCase() + ', texas government relations, policy analysis' },
          { property: "og:site_name", content: "Capitol Insights" },
          { property: "article:published_time", content: new Date(post.date).toISOString() },
          { property: "article:author", content: post.author },
          { property: "article:section", content: post.category }
        ]}
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
                {post.date}
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
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-display prose-headings:font-semibold prose-p:text-slate-700 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-strong:text-navy-800"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
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
                          to={`/updates/${relatedPost.slug}`}
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
                              <div className="mb-1 text-xs text-slate-500">{relatedPost.date}</div>
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