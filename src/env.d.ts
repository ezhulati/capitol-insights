/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINA_PUBLIC_CLIENT_ID: string
  readonly VITE_TINA_TOKEN: string
  readonly VITE_TINA_BRANCH: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 