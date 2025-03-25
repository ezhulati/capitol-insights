import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '95f1cd687bb4738130614315066031cf884e72ac', queries,  });
export default client;
  