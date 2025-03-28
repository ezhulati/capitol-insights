# Capitol Insights

A modern, responsive website for Capitol Insights, a government relations and lobbying firm based in Texas.

## Features

- Responsive design optimized for all devices
- Fast performance with React and Vite
- SEO optimization with structured data (JSON-LD)
- Blog/updates section with categorization
- Team member profiles
- Service offerings
- Case studies and results showcase
- Contact form

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Deployment**: Netlify

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/capitol-insights.git
cd capitol-insights
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Content Management

### File-Based Content
Content is managed through markdown files in the content directory. The site uses a file-based content structure where:

- Blog posts are stored in `content/posts/`
- Page content is stored in dedicated folders like `content/home/`, `content/team/`, etc.

### Decap CMS (Netlify CMS)
The site now includes Decap CMS (formerly Netlify CMS) for content management:

- Access the CMS at `/admin/` (e.g., https://capitol-insights.com/admin/)
- Content editors need to be invited through Netlify Identity
- The CMS is configured to work with the existing content structure
- All CMS configuration is in `public/admin/config.yml`

To modify content:
1. Either edit the markdown files directly in the content directory
2. Or use the CMS interface at `/admin/`
3. The changes will be reflected in the site after rebuilding or publishing via the CMS

## Deployment

The site is configured for deployment on Netlify. Push to the main branch to trigger a deployment.

## Security Considerations

This project implements several security best practices:

1. **Environment Variables**: Sensitive information like API keys, tokens, and email addresses are stored as environment variables rather than hardcoded in the codebase.

2. **Security Headers**: Comprehensive security headers are implemented in both `netlify.toml` and `public/_headers`:
   - Content-Security-Policy (CSP)
   - Strict-Transport-Security (HSTS)
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Referrer-Policy
   - Permissions-Policy

3. **CORS Configuration**: Controlled Cross-Origin Resource Sharing (CORS) settings to prevent unauthorized access.

4. **Privacy Protection**: Options to anonymize IP addresses and prevent sending personally identifiable information (PII) to analytics services.

5. **Form Security**: Netlify forms are configured with honeypot fields to prevent spam.

To maintain these security measures:
- Always use environment variables for sensitive information
- Keep dependencies updated
- Review security headers periodically
- Follow the principle of least privilege

## License

All rights reserved. This code is proprietary and confidential.
