import { createClient } from 'tinacms/dist/client';
import { ExperimentalGetTinaClient } from '../tina/__generated__/types';

// Initialize the Tina client
// For local development, use the local client
// For production, use the Tina Cloud client
export const client = ExperimentalGetTinaClient();

export default client;
