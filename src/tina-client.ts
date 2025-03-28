import { createClient } from 'tinacms/dist/client';
import { queries } from '../tina/__generated__/types';

// Initialize the Tina client
// Always use Tina Cloud client
export const client = createClient({
  url: 'https://content.tinajs.io/content/3db951f1-1013-495b-976f-b111359664bc/github/main',
  token: process.env.TINA_TOKEN || '95f1cd687bb4738130614315066031cf884e72ac',
  queries,
});

export default client;
