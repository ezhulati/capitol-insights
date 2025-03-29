/**
 * Sanity Client Configuration
 * 
 * This client connects the website to your Sanity CMS content
 */
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'bowvx6js',
  dataset: 'production',
  apiVersion: '2023-05-03', // use a UTC date string
  useCdn: true // `false` if you want to ensure fresh data
});

/**
 * Fetch all posts from Sanity
 */
export async function getSanityPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "categories": categories,
      "featuredImage": featuredImage{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `);
}

/**
 * Fetch a specific post by slug
 */
export async function getSanityPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      body,
      excerpt,
      "categories": categories,
      "featuredImage": featuredImage{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `, { slug });
}

/**
 * Fetch all services from Sanity
 */
export async function getSanityServices() {
  return sanityClient.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "icon": icon{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `);
}

/**
 * Fetch a specific page by slug
 */
export async function getSanityPageBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      content,
      "featuredImage": featuredImage{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `, { slug });
}

/**
 * Fetch team members from Sanity
 */
export async function getSanityTeamMembers() {
  return sanityClient.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      position,
      bio,
      "image": image{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `);
}

/**
 * Fetch resources/briefings from Sanity
 */
export async function getSanityResources() {
  return sanityClient.fetch(`
    *[_type == "resource"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      requiresEmail,
      "file": file{
        asset->{
          _id,
          url
        }
      },
      "featuredImage": featuredImage{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `);
}

/**
 * Fetch home page features from Sanity
 */
export async function getSanityHomeFeatures() {
  return sanityClient.fetch(`
    *[_type == "homeFeature"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      content,
      "image": image{
        asset->{
          _id,
          url
        }
      },
      "seo": seo
    }
  `);
}
