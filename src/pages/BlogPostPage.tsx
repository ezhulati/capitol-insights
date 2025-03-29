import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';
import { getPostBySlug, renderMarkdown } from '../utils/content-provider';
import { PortableText } from '@portabletext/react';
import type { BlogPost } from '../utils/mdx-sanity';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
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
        setLoading(false);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Error loading post');
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-700">{error || 'Post not found'}</div>
      </div>
    );
  }

  // Handle Markdown content rendering
  const [formattedContent, setFormattedContent] = useState<any[]>([]);
  
  useEffect(() => {
    // Skip processing if post is null
    if (!post) return;
    
    async function processContent() {
      try {
        const result = renderMarkdown(post.body as string);
        if (result instanceof Promise) {
          // If it returns a promise (Sanity content), await it
          const resolvedContent = await result;
          setFormattedContent(resolvedContent);
        } else {
          // If it's already an array, use it directly
          setFormattedContent(result);
        }
      } catch (error) {
        console.error("Error processing content:", error);
        setFormattedContent([{ type: 'p', content: "Error loading content", key: 0 }]);
      }
    }
    
    processContent();
  }, [post]);

  return (
    <>
      <SEO
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        image={post.image || ''}
        additionalMetaTags={post.metaKeywords?.length ? [
          { name: 'keywords', content: post.metaKeywords.join(', ') }
        ] : []}
      />
      <Header />
      
      <main className="pt-20 pb-16">
        <article className="max-w-4xl mx-auto px-4">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <time dateTime={post.date} className="mr-6">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="mr-6">{post.author}</span>
              <span>{post.readTime}</span>
            </div>
            
            {post.image && (
              <div className="mt-6 mb-10">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {post.excerpt && (
              <div className="text-xl text-gray-700 italic mb-8">
                {post.excerpt}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:text-navy-900 prose-h3:text-xl prose-h3:text-navy-800 prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:text-gold-700 prose-blockquote:border-l-4 prose-blockquote:border-gold-400 prose-strong:font-bold prose-strong:text-navy-800">
            {formattedContent.map((block: any) => {
              if (block.type === 'h1') {
                return <h1 key={block.key} id={block.id}>{block.content}</h1>;
              } else if (block.type === 'h2') {
                return <h2 key={block.key} id={block.id}>{block.content}</h2>;
              } else if (block.type === 'h3') {
                return <h3 key={block.key} id={block.id}>{block.content}</h3>;
              } else if (block.type === 'ul') {
                return (
                  <ul key={block.key}>
                    {block.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              } else if (block.type === 'ol') {
                return (
                  <ol key={block.key}>
                    {block.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                );
              } else {
                return <p key={block.key}>{block.content}</p>;
              }
            })}
          </div>
        </article>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;
