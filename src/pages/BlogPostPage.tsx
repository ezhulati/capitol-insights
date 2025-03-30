import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getBlogPostSEO } from '../utils/enhanced-seo';
import LazyImage from '../components/LazyImage';
import { getPostBySlug, renderMarkdown, getRelatedPosts } from '../utils/content-provider';
import { PortableText } from '@portabletext/react';
import type { BlogPost } from '../utils/mdx-sanity';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formattedContent, setFormattedContent] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Refs for scroll tracking and heading elements
  const articleRef = useRef<HTMLElement>(null);
  const headingsRef = useRef<{ [id: string]: HTMLElement }>({});
  const tocRef = useRef<HTMLDivElement>(null);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const articleHeight = articleRef.current.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const totalScrollableDistance = articleHeight - windowHeight;
        
        // Calculate reading progress as percentage
        const progress = Math.min(
          100,
          Math.round((scrollTop / totalScrollableDistance) * 100)
        );
        
        setReadingProgress(progress);
        
        // Update active section in TOC
        updateActiveSection();
      }
    };
    
    // Handle intersection observer for headings
    const updateActiveSection = () => {
      // If no headings, return
      if (Object.keys(headingsRef.current).length === 0) return;
      
      // Get all heading positions
      const headingPositions = Object.entries(headingsRef.current).map(([id, el]) => ({
        id,
        top: el.getBoundingClientRect().top,
      }));
      
      // Find the heading that's currently at the top of the viewport
      const activeHeading = headingPositions
        .filter(heading => heading.top <= 100)
        .sort((a, b) => b.top - a.top)[0];
      
      if (activeHeading) {
        setActiveSection(activeHeading.id);
      } else {
        setActiveSection(headingPositions[0]?.id || '');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract table of contents from content
  const tableOfContents = formattedContent
    .filter(block => ['h1', 'h2', 'h3'].includes(block.type))
    .map(heading => ({
      id: heading.id,
      type: heading.type,
      content: heading.content,
    }));

  // Combine post loading and content formatting in a single effect
  useEffect(() => {
    async function loadPostAndContent() {
      if (!slug) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        
        setPost(postData);
        
        // Load related posts
        if (postData.category) {
          const related = await getRelatedPosts(postData.category, slug);
          setRelatedPosts(related.slice(0, 3));
        }
        
        // Process the post content
        try {
          const result = renderMarkdown(postData.body as string);
          if (result instanceof Promise) {
            // If it returns a promise (Sanity content), await it
            const resolvedContent = await result;
            setFormattedContent(resolvedContent);
          } else {
            // If it's already an array, use it directly
            setFormattedContent(result);
          }
        } catch (contentError) {
          console.error("Error processing content:", contentError);
          setFormattedContent([{ type: 'p', content: "Error loading content", key: 0 }]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Error loading post');
        setLoading(false);
      }
    }

    loadPostAndContent();
  }, [slug]);

  // Handle scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header
        behavior: 'smooth',
      });
    }
  };

  // Share post functions
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Capitol Insights Article';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
        break;
    }
    
    setShowShareOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-navy-800">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-navy-800 border-t-gold-500 rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-medium">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-navy-800">
        <div className="text-2xl text-gray-700 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
          <p className="mb-6">{error || 'We couldn\'t find the article you were looking for.'}</p>
          <Link to="/updates" className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            View All Articles
          </Link>
        </div>
      </div>
    );
  }

  // Format date for display
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEO
        {...getBlogPostSEO({
          title: post.title,
          slug: slug || '',
          excerpt: post.excerpt,
          metaDescription: post.metaDescription,
          metaTitle: post.metaTitle,
          metaKeywords: post.metaKeywords,
          author: post.author,
          date: post.date,
          image: post.image
        })}
      />
      <Header />
      
      {/* Reading progress bar */}
      <div 
        className="fixed top-0 left-0 z-50 h-2 bg-gold-500 transition-all duration-300 ease-out" 
        style={{ width: `${readingProgress}%` }}
      />
      
      <main className="pt-24 pb-20 bg-white" ref={articleRef}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main content area */}
          <article className="lg:col-span-8 xl:col-span-9 mb-12 lg:mb-0">
            <header className="mb-14">
              {/* Category tag */}
              {post.category && (
                <div className="mb-6">
                  <span className="inline-block bg-navy-100 text-navy-800 font-medium text-sm px-4 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              )}
              
              {/* Article title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight tracking-tight">
                {post.title}
              </h1>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center text-gray-600 mb-10 gap-4 sm:gap-0">
                <div className="flex items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shadow-sm">
                    <LazyImage 
                      src={`/uploads/team/${post.author.replace(' ', '-').toLowerCase()}.jpg`}
                      alt={post.author}
                      className="w-full h-full object-cover"
                      placeholderColor="#e5e7eb"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-navy-800 text-base">{post.author}</div>
                    <div className="text-sm flex items-center mt-1">
                      <time dateTime={post.date} className="text-gray-500">{formattedDate}</time>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Share button */}
                <div className="ml-auto relative">
                  <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center text-navy-600 hover:text-navy-800 font-medium bg-gray-50 px-4 py-2 rounded-md shadow-sm transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  {/* Share options dropdown */}
                  {showShareOptions && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl z-10 py-2 border border-gray-200 overflow-hidden">
                      <button onClick={() => handleShare('twitter')} className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                        Twitter
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button onClick={() => handleShare('email')} className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                      <button onClick={() => handleShare('copy')} className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Featured image */}
              {post.image && (
                <div className="mt-8 mb-12 overflow-hidden rounded-xl shadow-xl">
                  <LazyImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Excerpt/introduction */}
              {post.excerpt && (
                <div className="text-xl text-gray-700 font-medium mb-10 leading-relaxed border-l-4 border-gold-500 pl-6 py-2 italic bg-gray-50 rounded-r-lg shadow-sm">
                  {post.excerpt}
                </div>
              )}
            </header>

            {/* Article content */}
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:text-navy-900 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:text-navy-800 prose-h3:mt-10 prose-h3:mb-5 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-8 prose-li:text-slate-700 prose-li:mb-3 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:text-gold-700 prose-blockquote:border-l-4 prose-blockquote:border-gold-400 prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg prose-strong:font-bold prose-strong:text-navy-800">
              {formattedContent.map((block: any) => {
                // Store refs to heading elements for TOC scrolling
                if (['h1', 'h2', 'h3'].includes(block.type)) {
                  return React.createElement(
                    block.type,
                    { 
                      key: block.key, 
                      id: block.id,
                      ref: (el: HTMLElement | null) => {
                        if (el) {
                          headingsRef.current[block.id] = el;
                        }
                      }
                    },
                    block.content
                  );
                } else if (block.type === 'ul') {
                  return (
                    <ul key={block.key} className="list-disc pl-8 mb-8 space-y-3">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="mb-2">{item}</li>
                      ))}
                    </ul>
                  );
                } else if (block.type === 'ol') {
                  return (
                    <ol key={block.key} className="list-decimal pl-8 mb-8 space-y-3">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="mb-2">{item}</li>
                      ))}
                    </ol>
                  );
                } else if (block.type === 'blockquote') {
                  return (
                    <blockquote key={block.key} className="border-l-4 border-gold-400 pl-6 py-3 my-8 italic text-gray-700 bg-gray-50 rounded-r-lg">
                      {block.content}
                    </blockquote>
                  );
                } else {
                  return <p key={block.key} className="mb-8 leading-relaxed text-slate-700">{block.content}</p>;
                }
              })}
            </div>
            
            {/* Author bio */}
            <div className="mt-20 border-t border-gray-200 pt-10">
              <div className="flex items-center p-6 bg-gray-50 rounded-xl shadow-sm">
                <div className="w-20 h-20 rounded-full overflow-hidden mr-6 shadow-md">
                  <LazyImage 
                    src={`/uploads/team/${post.author.replace(' ', '-').toLowerCase()}.jpg`}
                    alt={post.author}
                    className="w-full h-full object-cover"
                    placeholderColor="#e5e7eb"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-navy-800">{post.author}</h3>
                  <p className="text-gray-600 leading-relaxed">Senior Partner at Capitol Insights with expertise in government relations and legislative strategy.</p>
                </div>
              </div>
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-20 border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold mb-10 text-navy-800">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      to={`/updates/${relatedPost.slug}`}
                      className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {relatedPost.image && (
                        <div className="h-48 overflow-hidden">
                          <LazyImage
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {relatedPost.category && (
                          <span className="inline-block text-sm font-medium text-gold-600 mb-3 bg-gold-50 px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </span>
                        )}
                        <h3 className="font-bold text-lg mb-3 group-hover:text-gold-600 transition-colors leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-base line-clamp-2 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
          
          {/* Sidebar with sticky table of contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28" ref={tocRef}>
              {tableOfContents.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-sm">
                  <h2 className="font-bold text-xl mb-6 text-navy-900">Table of Contents</h2>
                  <nav>
                    <ul className="space-y-3">
                      {tableOfContents.map((item) => (
                        <li key={item.id} className={`
                          ${item.type === 'h1' ? '' : item.type === 'h2' ? 'ml-5' : 'ml-10'} 
                          ${activeSection === item.id ? 'text-gold-600 font-medium border-l-2 border-gold-500 pl-3 -ml-[2px]' : 'text-gray-700'}
                        `}>
                          <button 
                            onClick={() => scrollToSection(item.id)}
                            className="hover:text-gold-700 text-left w-full transition-colors py-1.5 block"
                          >
                            {item.content}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
              
              {/* Newsletter signup */}
              <div className="bg-navy-800 rounded-xl p-8 shadow-md">
                <h3 className="font-bold text-xl mb-4 text-white">Stay Informed</h3>
                <p className="text-gray-200 mb-6 text-base leading-relaxed">
                  Get the latest Capitol Insights delivered to your inbox.
                </p>
                <form className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-4 py-3 text-navy-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Mobile table of contents button (fixed at bottom) */}
      {tableOfContents.length > 0 && (
        <div className="lg:hidden fixed bottom-8 right-8 z-30">
          <button 
            onClick={() => {
              const tocModal = document.getElementById('mobile-toc');
              if (tocModal) {
                tocModal.classList.toggle('hidden');
              }
            }}
            className="bg-navy-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl"
            aria-label="Show table of contents"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          {/* Mobile TOC modal */}
          <div id="mobile-toc" className="hidden fixed inset-0 bg-black bg-opacity-60 z-40 flex items-end">
            <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-navy-900">Table of Contents</h3>
                <button 
                  onClick={() => {
                    const tocModal = document.getElementById('mobile-toc');
                    if (tocModal) {
                      tocModal.classList.add('hidden');
                    }
                  }}
                  className="text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav>
                <ul className="space-y-4">
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={`
                      ${item.type === 'h1' ? '' : item.type === 'h2' ? 'ml-5' : 'ml-10'} 
                      ${activeSection === item.id ? 'text-gold-600 font-medium border-l-2 border-gold-500 pl-3 -ml-[2px]' : 'text-gray-700'}
                    `}>
                      <button 
                        onClick={() => {
                          scrollToSection(item.id);
                          const tocModal = document.getElementById('mobile-toc');
                          if (tocModal) {
                            tocModal.classList.add('hidden');
                          }
                        }}
                        className="hover:text-gold-700 text-left w-full py-2 block text-base"
                      >
                        {item.content}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default BlogPostPage;
