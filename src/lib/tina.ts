import { createClient } from "tinacms";

export const client = createClient({
  branch: import.meta.env.VITE_TINA_BRANCH || "main",
  clientId: import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID || "",
  tinaGraphQLVersion: "v1",
  isLocalClient: false,
}); 