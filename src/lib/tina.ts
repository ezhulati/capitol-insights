import { createClient } from "tinacms";

export const client = createClient({
  branch: import.meta.env.VITE_TINA_BRANCH || "main",
  clientId: "3db951f1-1013-495b-976f-b111359664bc",
  tinaGraphQLVersion: "v1",
  isLocalClient: false,
}); 