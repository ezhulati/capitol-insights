export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (55-60 characters)',
      validation: (Rule: any) => Rule.max(60).warning('Title should be between 55-60 characters'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (155-160 characters)',
      validation: (Rule: any) => Rule.max(160).warning('Description should be between 155-160 characters'),
    },
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for search engines',
    },
    {
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Image for social media sharing (Facebook, Twitter, etc.)',
      options: {
        hotspot: true,
      },
    },
  ],
}
