// Import needed for the 'seo' type reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import seo from './objects/seo'

// Define a type for Sanity validation rules
type SanityRule = {
  required: () => SanityRule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: SanityRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: SanityRule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload PDF or other downloadable file',
    },
    {
      name: 'requiresEmail',
      title: 'Requires Email',
      type: 'boolean',
      description: 'If enabled, users must provide email to download',
      initialValue: true,
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
  },
}
