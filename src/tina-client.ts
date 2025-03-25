import { createClient } from 'tinacms/dist/client';
import { ExperimentalGetTinaClient } from '../tina/__generated__/types';

// Initialize the Tina client
export const client = ExperimentalGetTinaClient();

export default client;
