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
  ArrowLeft
} from 'lucide-react';
import SEO from '../components/SEO';
import { ArticleSchemaMarkup } from '../utils/seo';

// Blog posts data - same as in UpdatesPage
const blogPosts = [
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
    body: "The upcoming 89th Texas Legislative Session is set to convene on January 14, 2025, with several key issues expected to dominate the agenda. Organizations across various sectors should prepare for potentially significant policy changes.\n\n## Budget Priorities\n\nWith Texas' strong economic recovery, the state is projecting a substantial budget surplus. Key funding priorities likely include:\n\n- Infrastructure improvements\n- Property tax relief\n- Education funding\n- Border security\n\n## Healthcare Initiatives\n\nHealthcare providers and organizations should monitor:\n\n- Medicaid expansion discussions\n- Telemedicine regulation updates\n- Healthcare workforce development\n- Mental health funding\n\n## Business and Economic Development\n\nBusinesses operating in Texas should prepare for debates surrounding:\n\n- Corporate tax incentives\n- Workforce development programs\n- Regulatory reforms\n- Energy grid reliability measures\n\n## How to Prepare\n\nOrganizations should begin developing their legislative strategies now by:\n\n1. Identifying key issues affecting their operations\n2. Building relationships with relevant legislators\n3. Engaging with industry associations\n4. Developing clear policy positions"
  },
  {
    _sys: {
      filename: "healthcare-regulatory-changes-impact.mdx",
      basename: "healthcare-regulatory-changes-impact",
      relativePath: "healthcare-regulatory-changes-impact.mdx"
    },
    id: "healthcare-regulatory-changes-impact",
    title: "Impact of Recent Healthcare Regulatory Changes on Texas Providers",
    excerpt: "An analysis of how recent regulatory changes are affecting healthcare providers across Texas and strategies for adaptation.",
    date: "2024-09-28T12:00:00.000Z",
    author: "Byron Campbell",
    authorTitle: "Healthcare Policy Specialist",
    readTime: "5 min read",
    category: "Healthcare",
    tags: ["Healthcare", "Regulatory", "Compliance"],
    featured: false,
    image: "/uploads/posts/healthcare-regulatory.jpg",
    body: "Recent regulatory changes have created both challenges and opportunities for healthcare providers across Texas. This analysis examines the key impacts and offers strategic approaches for adaptation.\n\n## Telehealth Expansion\n\nThe permanent expansion of telehealth services has significant implications:\n\n- Broader reimbursement eligibility\n- Updated licensing requirements\n- New privacy and security standards\n- Interstate practice considerations\n\nProviders should review their telehealth infrastructure and ensure compliance with the new regulatory framework.\n\n## Value-Based Care Transitions\n\nThe accelerated shift toward value-based payment models requires:\n\n- Enhanced data collection capabilities\n- Quality metric tracking systems\n- Cost management strategies\n- Patient engagement initiatives\n\n## Workforce Regulations\n\nNew requirements affecting healthcare staffing include:\n\n- Expanded scope of practice for advanced practice providers\n- Modified continuing education requirements\n- Streamlined licensing processes for out-of-state providers\n- New safety protocols\n\n## Compliance Strategies\n\nTo effectively navigate these changes, providers should consider:\n\n1. Conducting a comprehensive regulatory impact assessment\n2. Updating policies and procedures\n3. Investing in staff training\n4. Engaging with industry associations for support\n5. Implementing robust compliance monitoring systems"
  },
  {
    _sys: {
      filename: "municipal-advocacy-strategies.mdx",
      basename: "municipal-advocacy-strategies",
      relativePath: "municipal-advocacy-strategies.mdx"
    },
    id: "municipal-advocacy-strategies",
    title: "Effective Municipal Advocacy Strategies for 2025",
    excerpt: "Key strategies for organizations to effectively advocate for their interests at the municipal level in Texas.",
    date: "2024-09-10T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "4 min read",
    category: "Municipal Affairs",
    tags: ["Local Government", "Advocacy", "Strategy"],
    featured: false,
    image: "/uploads/posts/municipal-advocacy.jpg",
    body: "Effective municipal advocacy requires a strategic approach tailored to the unique dynamics of local government. Organizations seeking to advance their priorities at the municipal level in Texas should consider these key strategies for 2025.\n\n## Understand Local Decision Processes\n\nSuccessful advocacy begins with a thorough understanding of:\n\n- The formal and informal decision-making structures\n- Budget cycles and planning horizons\n- Key stakeholders and their priorities\n- Local political dynamics\n\n## Build Meaningful Relationships\n\nRelationship development should focus on:\n\n- Elected officials and their staff\n- Department heads and key administrative personnel\n- Community leaders and neighborhood associations\n- Local media outlets\n\n## Develop Compelling Messaging\n\nEffective messaging should:\n\n- Connect your priorities to community benefits\n- Provide clear, actionable solutions\n- Include data-driven arguments\n- Tell powerful stories that resonate locally\n\n## Leverage Community Coalitions\n\nStrategic coalitions can significantly amplify your influence by:\n\n- Demonstrating broad-based support\n- Pooling resources and expertise\n- Accessing diverse networks\n- Enhancing credibility across various constituencies\n\n## Implement a Multi-Channel Approach\n\nA comprehensive advocacy strategy should include:\n\n1. Direct engagement with decision-makers\n2. Public education campaigns\n3. Targeted media relations\n4. Digital advocacy and social media presence\n5. Participation in public forums and meetings"
  },
  {
    _sys: {
      filename: "transportation-funding-outlook.mdx",
      basename: "transportation-funding-outlook",
      relativePath: "transportation-funding-outlook.mdx"
    },
    id: "transportation-funding-outlook",
    title: "Texas Transportation Funding Outlook for 2025-2026",
    excerpt: "A detailed analysis of transportation funding priorities and opportunities in the upcoming legislative session.",
    date: "2024-08-22T12:00:00.000Z",
    author: "Byron Campbell",
    authorTitle: "Transportation Policy Analyst",
    readTime: "7 min read",
    category: "Transportation",
    tags: ["Infrastructure", "Funding", "Transportation"],
    featured: false,
    image: "/uploads/posts/transportation-funding.jpg",
    body: "The 2025-2026 period represents a critical juncture for transportation infrastructure funding in Texas. This analysis explores the emerging priorities, potential funding sources, and strategic considerations for stakeholders in the transportation sector.\n\n## Funding Landscape\n\nThe Texas transportation funding environment is shaped by several key factors:\n\n- Projected state budget surplus of approximately $15 billion\n- Federal Infrastructure Investment and Jobs Act (IIJA) implementation\n- Evolving vehicle fleet composition and fuel tax implications\n- Growth-driven infrastructure demands across urban centers\n\n## Legislative Priorities\n\nExpected focus areas in the upcoming legislative session include:\n\n- Rural connectivity investments\n- Urban congestion relief programs\n- Alternative transportation funding mechanisms\n- Public-private partnership frameworks\n- Resilience improvements for weather events\n\n## Federal Funding Opportunities\n\nSignificant federal programs available include:\n\n- Competitive bridge investment program grants\n- Rural surface transportation grants\n- PROTECT formula and competitive grants for resilience\n- Electric vehicle infrastructure deployment funding\n\n## Strategic Considerations\n\nOrganizations should consider these approaches when engaging with transportation funding issues:\n\n1. Develop comprehensive project proposals aligned with state and federal priorities\n2. Build regional coalitions to advocate for interconnected infrastructure needs\n3. Highlight economic development impacts and return on investment\n4. Incorporate sustainability and resilience elements into funding requests\n5. Engage early with TxDOT's planning processes and metropolitan planning organizations"
  },
  {
    _sys: {
      filename: "coalition-building-case-study.mdx",
      basename: "coalition-building-case-study",
      relativePath: "coalition-building-case-study.mdx"
    },
    id: "coalition-building-case-study",
    title: "Coalition Building: A Case Study in Effective Advocacy",
    excerpt: "How strategic coalition building led to legislative success for a diverse group of stakeholders.",
    date: "2024-08-05T12:00:00.000Z",
    author: "Drew Campbell",
    authorTitle: "Senior Partner",
    readTime: "5 min read",
    category: "Advocacy Strategy",
    tags: ["Coalition Building", "Advocacy", "Case Study"],
    featured: false,
    image: "/uploads/posts/coalition-building.jpg",
    body: "This case study examines how a diverse coalition of stakeholders successfully advocated for comprehensive water infrastructure legislation during the 2023 Texas Legislative Session. The coalition's strategic approach offers valuable lessons for organizations seeking to build effective advocacy partnerships.\n\n## Background\n\nThe Texas Water Infrastructure Coalition (TWIC) was formed in response to critical challenges facing the state:\n\n- Aging water infrastructure across municipalities\n- Increasing population demands on water systems\n- Climate variability affecting water security\n- Limited funding mechanisms for small and rural communities\n\n## Coalition Composition\n\nTWIC's strength derived from its diverse membership, including:\n\n- Municipal water authorities\n- Agricultural organizations\n- Environmental advocacy groups\n- Business and manufacturing associations\n- Engineering and construction firms\n- Public health organizations\n\n## Strategic Approach\n\nThe coalition employed several key strategies that contributed to its success:\n\n### 1. Unified Messaging Framework\n\nDespite diverse interests, the coalition developed consistent messaging around:\n- Economic benefits of water security\n- Public health imperatives\n- Environmental stewardship\n- Rural community sustainability\n\n### 2. Data-Driven Advocacy\n\nThe coalition commissioned comprehensive research to:\n- Document infrastructure deficiencies statewide\n- Quantify economic impacts of inaction\n- Project return on investment for proposed solutions\n- Model implementation scenarios\n\n### 3. Strategic Legislative Engagement\n\nEngagement efforts included:\n- Early education of key committee members\n- Targeted outreach to leadership offices\n- Regular briefings for legislative staff\n- Coordinated testimony at hearings\n\n## Outcomes\n\nThe coalition's efforts resulted in the passage of HB 2530, which established:\n\n1. A $2 billion water infrastructure fund\n2. Streamlined permitting processes for critical projects\n3. Technical assistance programs for rural communities\n4. Innovation grants for water conservation technologies\n\n## Key Lessons\n\nThis case study demonstrates the power of:\n\n- Finding common ground among diverse interests\n- Balancing unified messaging with stakeholder-specific concerns\n- Investing in quality research and data analysis\n- Building relationships with decision-makers throughout the process\n- Maintaining coalition discipline and coordination"
  },
  {
    _sys: {
      filename: "telecommunications-regulatory-outlook.mdx",
      basename: "telecommunications-regulatory-outlook",
      relativePath: "telecommunications-regulatory-outlook.mdx"
    },
    id: "telecommunications-regulatory-outlook",
    title: "Telecommunications Regulatory Outlook for Texas",
    excerpt: "An overview of upcoming regulatory changes affecting the telecommunications industry in Texas.",
    date: "2024-07-18T12:00:00.000Z",
    author: "Byron Campbell",
    authorTitle: "Telecommunications Policy Specialist",
    readTime: "6 min read",
    category: "Telecommunications",
    tags: ["Telecommunications", "Regulatory", "Technology"],
    featured: false,
    image: "/uploads/posts/telecommunications-regulatory.jpg",
    body: "The telecommunications regulatory landscape in Texas is poised for significant evolution over the next 18-24 months. This analysis examines emerging policy trends, anticipated regulatory changes, and strategic considerations for industry stakeholders.\n\n## Federal and State Regulatory Dynamics\n\nTelecommunications providers must navigate the complex interplay between:\n\n- FCC rulemaking implementation timelines\n- Public Utility Commission of Texas (PUCT) enforcement mechanisms\n- Legislative oversight priorities\n- Municipal rights-of-way management\n\n## Broadband Deployment Regulations\n\nKey regulatory developments affecting broadband expansion include:\n\n- Updated Texas Broadband Development Office grant requirements\n- New service area mapping and challenge processes\n- Modified infrastructure access regulations\n- Evolving universal service requirements\n\n## 5G and Small Cell Implementation\n\nThe ongoing deployment of 5G infrastructure faces changing regulatory conditions:\n\n- Revised municipal fee structures for small cell attachments\n- Updated aesthetic and design requirements\n- Streamlined permitting processes\n- New spectrum allocation rules\n\n## Data Privacy and Consumer Protection\n\nTelecommunications providers should prepare for enhanced regulations regarding:\n\n- Customer data usage and sharing policies\n- Service transparency requirements\n- Marketing and billing practices oversight\n- IoT device security standards\n\n## Strategic Compliance Approaches\n\nTo effectively navigate this evolving landscape, telecommunications stakeholders should consider:\n\n1. Developing comprehensive regulatory monitoring systems\n2. Engaging proactively with rulemaking processes\n3. Building collaborative relationships with regulatory staff\n4. Implementing flexible compliance frameworks\n5. Participating in industry associations for collective advocacy"
  }
];

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

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Find the current post by slug and related posts
  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    
    try {
      // Find post with matching basename
      const currentPost = blogPosts.find(post => post._sys.basename === slug);
      
      if (currentPost) {
        setPost(currentPost);
        
        // Get related posts by category or tag
        const related = blogPosts
          .filter(post => 
            post._sys.basename !== slug && 
            (post.category === currentPost.category || 
             post.tags.some(tag => currentPost.tags.includes(tag)))
          )
          .slice(0, 3);
        
        setRelatedPosts(related);
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
  }, [slug, navigate]);
  
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

  // Function to convert markdown-like content to paragraphs and headings
  const renderContent = (content: string) => {
    if (!content) return null;
    
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        const text = paragraph.replace('# ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return <h1 key={index} id={id} className="text-3xl font-bold mb-4">{text}</h1>;
      } else if (paragraph.startsWith('## ')) {
        const text = paragraph.replace('## ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return <h2 key={index} id={id} className="text-2xl font-bold mb-3">{text}</h2>;
      } else if (paragraph.startsWith('### ')) {
        const text = paragraph.replace('### ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return <h3 key={index} id={id} className="text-xl font-bold mb-3">{text}</h3>;
      } else if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').map(item => item.replace('- ', ''));
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="mb-1">{item}</li>
            ))}
          </ul>
        );
      } else if (paragraph.match(/^\d+\./)) {
        const items = paragraph.split('\n');
        return (
          <ol key={index} className="list-decimal pl-5 mb-4">
            {items.map((item, itemIndex) => {
              const text = item.replace(/^\d+\.\s/, '');
              return <li key={itemIndex} className="mb-1">{text}</li>;
            })}
          </ol>
        );
      } else {
        return <p key={index} className="mb-4">{paragraph}</p>;
      }
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
                  {renderContent(post.body)}
                </div>
              </motion.article>
              
              <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-100">
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
                
                <div className="flex items-center mb-6">
                  <div className="bg-gold-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4">
                    <User size={22} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-900 text-lg">{post.author}</p>
                    <p className="text-slate-600">{post.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
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
              </div>
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

export default BlogPostPage;
