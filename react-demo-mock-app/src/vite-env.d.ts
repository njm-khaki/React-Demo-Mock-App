/// <reference types="vite/client" />

interface ImpoerMetaEnv {
  readonly VITE_APP_USE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImpoerMetaEnv;
}
