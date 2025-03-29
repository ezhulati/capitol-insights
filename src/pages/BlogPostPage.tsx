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

  // Parse the content from Sanity
  const content = renderMarkdown(post.body);
  
  // For Sanity Portable Text rendering
  let sanityContent;
  try {
    sanityContent = JSON.parse(post.body);
  } catch (e) {
    console.error('Error parsing Sanity content:', e);
  }

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

          <div className="prose prose-lg max-w-none">
            {sanityContent ? (
              // Render using Portable Text when we have valid Sanity content
              <PortableText value={sanityContent} />
            ) : (
              // Fallback to our simple renderer when using MDX or if there's an issue with JSON parsing
              content.map((block: any) => {
                if (block.type === 'h1') {
                  return <h1 key={block.key} id={block.id} className="text-3xl font-bold mt-8 mb-4">{block.content}</h1>;
                } else if (block.type === 'h2') {
                  return <h2 key={block.key} id={block.id} className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>;
                } else if (block.type === 'h3') {
                  return <h3 key={block.key} id={block.id} className="text-xl font-bold mt-6 mb-3">{block.content}</h3>;
                } else if (block.type === 'ul') {
                  return (
                    <ul key={block.key} className="list-disc pl-5 my-4">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="mb-2">{item}</li>
                      ))}
                    </ul>
                  );
                } else if (block.type === 'ol') {
                  return (
                    <ol key={block.key} className="list-decimal pl-5 my-4">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="mb-2">{item}</li>
                      ))}
                    </ol>
                  );
                } else {
                  return <p key={block.key} className="my-4">{block.content}</p>;
                }
              })
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;
