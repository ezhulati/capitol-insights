import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GIT_BRANCH || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID, // Get this from tina.io and set as environment variable
  token: process.env.TINA_TOKEN, // Get this from tina.io and set as environment variable
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            description: "The title of the blog post (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the post for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the post content",
            list: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            description: "A short summary of the post that appears in listings",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "authorTitle",
            label: "Author Title",
            required: true,
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Legislative Preview",
              "Healthcare",
              "Municipal Affairs",
              "Transportation",
              "Advocacy Strategy",
              "Telecommunications"
            ]
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["Article", "BlogPosting", "NewsArticle", "TechArticle"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                description: "The headline for the article (defaults to post title if empty)",
              },
              {
                type: "datetime",
                name: "datePublished",
                label: "Date Published",
                description: "When the article was first published (defaults to post date if empty)",
              },
              {
                type: "datetime",
                name: "dateModified",
                label: "Date Modified",
                description: "When the article was last modified",
              },
              {
                type: "string",
                name: "authorName",
                label: "Author Name",
                description: "The name of the author (defaults to post author if empty)",
              },
              {
                type: "string",
                name: "publisherName",
                label: "Publisher Name",
                description: "The name of the publisher (defaults to 'Capitol Insights' if empty)",
              },
              {
                type: "string",
                name: "publisherLogo",
                label: "Publisher Logo URL",
                description: "URL to the publisher's logo (must be at least 112x112px)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the article (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              }
            ],
          },
        ],
      },
      {
        name: "homePage",
        label: "Home Page",
        path: "content/home",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Background Image",
            required: true,
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "Organization", "LocalBusiness"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Statistics",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label || "Statistic" };
              },
            },
            fields: [
              {
                type: "string",
                name: "value",
                label: "Value",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "features",
            label: "Feature Cards",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Feature" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  "GanttChart",
                  "Briefcase",
                  "Globe",
                  "ShieldCheck",
                  "Handshake",
                  "LineChart",
                  "Award",
                  "Users",
                  "Target",
                  "Sparkles",
                ],
              },
            ],
          },
          {
            type: "object",
            name: "valueCards",
            label: "Value Cards",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Value" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  "ShieldCheck",
                  "Handshake",
                  "LineChart",
                  "Award",
                ],
              },
            ],
          },
          {
            type: "object",
            name: "testimonial",
            label: "Featured Testimonial",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "author",
                label: "Author",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "industries",
            label: "Industries We Serve",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Industry Name",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "teamMembers",
            label: "Featured Team Members",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name || "Team Member" };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "bio",
                label: "Short Bio",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "image",
                label: "Photo",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "AboutPage", "ContactPage", "FAQPage", "Organization", "Service"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
        ],
      },
      {
        name: "approachPage",
        label: "Approach Page",
        path: "content/approach",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            description: "The main image for the page, used in SEO and social sharing",
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "AboutPage", "Organization"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "approachSteps",
            label: "Approach Steps",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Step" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "number",
                name: "stepNumber",
                label: "Step Number",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "principles",
            label: "Guiding Principles",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Principle" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  "ShieldCheck",
                  "Handshake",
                  "LineChart",
                  "Award",
                  "Target",
                  "Sparkles",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "resultsPage",
        label: "Results Page",
        path: "content/results",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "AboutPage", "Organization"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "metrics",
            label: "Metrics",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label || "Metric" };
              },
            },
            fields: [
              {
                type: "string",
                name: "value",
                label: "Value",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Label",
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  "FileText",
                  "Building",
                  "Users",
                  "BarChart",
                ],
              },
            ],
          },
          {
            type: "object",
            name: "caseStudies",
            label: "Case Studies",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Case Study" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "challenge",
                label: "Challenge",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "approach",
                label: "Approach",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "outcome",
                label: "Outcome",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "client",
                label: "Client Name",
                required: true,
              },
              {
                type: "string",
                name: "clientRole",
                label: "Client Role",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "achievements",
            label: "Key Achievements",
            list: true,
            fields: [
              {
                type: "string",
                name: "text",
                label: "Achievement Text",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "testimonial",
            label: "Featured Testimonial",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "author",
                label: "Author",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "servicesPage",
        label: "Services Page",
        path: "content/services",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "Service", "Organization"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Service" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: [
                  "GanttChart",
                  "Briefcase",
                  "Globe",
                  "ShieldCheck",
                  "Handshake",
                  "LineChart",
                  "Award",
                  "Users",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "teamPage",
        label: "Team Page",
        path: "content/team",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "AboutPage", "Organization", "Person"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "teamMembers",
            label: "Team Members",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name || "Team Member" };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "bio",
                label: "Biography",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "image",
                label: "Photo",
                required: true,
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
              {
                type: "string",
                name: "phone",
                label: "Phone",
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL",
              },
            ],
          },
        ],
      },
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/contact",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "ContactPage", "Organization"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "offices",
            label: "Office Locations",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.city || "Office" };
              },
            },
            fields: [
              {
                type: "string",
                name: "city",
                label: "City",
                required: true,
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "phone",
                label: "Phone",
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
            ],
          },
          {
            type: "object",
            name: "contactForm",
            label: "Contact Form Settings",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Form Heading",
                required: true,
              },
              {
                type: "string",
                name: "subheading",
                label: "Form Subheading",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "successMessage",
                label: "Success Message",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
      {
        name: "updatesPage",
        label: "Updates Page",
        path: "content/updates",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
            description: "The title of the page (also used as the page title tag)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            description: "A brief description of the page for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "metaKeywords",
            label: "Meta Keywords",
            description: "Comma-separated keywords related to the page content",
            list: true,
          },
          {
            type: "string",
            name: "heroHeading",
            label: "Hero Heading",
            required: true,
          },
          {
            type: "string",
            name: "heroSubheading",
            label: "Hero Subheading",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "schemaMarkup",
            label: "Schema Markup (JSON-LD)",
            description: "Structured data for search engines",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Schema Type",
                options: ["WebPage", "CollectionPage", "Blog"],
                description: "The type of content",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                description: "The name of the page or entity (defaults to page title if empty)",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                description: "A description of the page or entity (defaults to meta description if empty)",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                description: "The canonical URL of the page",
              },
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "URL to an image representing the page or entity",
              }
            ],
          },
          {
            type: "object",
            name: "featuredCategories",
            label: "Featured Categories",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Category Name",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
    ],
  },
});
