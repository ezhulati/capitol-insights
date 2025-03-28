# Capitol Insights

A modern, responsive website for Capitol Insights, a government relations and lobbying firm based in Texas.

## Features

- Responsive design optimized for all devices
- Fast performance with React and Vite
- Content management with TinaCMS
- SEO optimization with structured data (JSON-LD)
- Blog/updates section with categorization
- Team member profiles
- Service offerings
- Case studies and results showcase
- Contact form

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Content Management**: TinaCMS
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

4. Start TinaCMS
```bash
npm run tina
```

## Content Management

This site uses TinaCMS for content management. To access the CMS:

1. Set up environment variables for TinaCMS:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     TINA_CLIENT_ID=your_client_id_from_tina_io
     TINA_TOKEN=your_token_from_tina_io
     ```
   - You can obtain these credentials from the Tina.io dashboard

2. Start the TinaCMS server: `npm run tina`
3. Navigate to `http://localhost:3000/admin` in your browser
4. Edit content through the user-friendly interface

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
