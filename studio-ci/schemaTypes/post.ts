import seo from './objects/seo'

export default {
  name: 'post',
  title: 'Post',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Primary Category',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Whether to show this page in the main navigation',
      initialValue: false,
    },
    {
      name: 'navigationOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Order to display in navigation (if shown)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      author: 'author',
    },
    prepare(selection: any) {
      const {title, media, author} = selection
      return {
        title: title,
        subtitle: author ? `by ${author}` : '',
        media: media,
      }
    },
  },
}
