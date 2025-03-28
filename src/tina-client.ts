import { createClient } from 'tinacms/dist/client';
import { queries } from '../tina/__generated__/types';

// Initialize the Tina client
// For local development, use the local client
// For production, use the Tina Cloud client
export const client = createClient({
  url: typeof window !== 'undefined' && window.location.hostname === 'capitol-insights.com'
    ? 'https://content.tinajs.io/content/3db951f1-1013-495b-976f-b111359664bc/github/main'
    : 'http://localhost:4001/graphql',
  token: process.env.TINA_TOKEN || '95f1cd687bb4738130614315066031cf884e72ac',
  queries,
});

export default client;
