/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAPID_API_ARTICLE_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
