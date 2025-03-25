# Capitol Insights

A modern web application for Capitol Insights, built with React, Vite, and Tina CMS. Deployed on Netlify.

## Development

To run the development server:

```bash
npm run dev
```

## Build

To build the project:

```bash
npm run build
```

## Deployment

This project is deployed on Netlify. To deploy:

1. Push your changes to GitHub
2. Netlify will automatically build and deploy the site

### Environment Variables

The following environment variables need to be set in Netlify:

- `TINA_CLIENT_ID`: The client ID for Tina CMS
- `TINA_TOKEN`: The token for Tina CMS (get this from tina.io)
- `VITE_SUPABASE_ANON_KEY`: The anonymous key for Supabase
- `VITE_SUPABASE_URL`: The URL for the Supabase project

## Technologies

- React
- TypeScript
- Vite
- Tina CMS
- Tailwind CSS
- Supabase
