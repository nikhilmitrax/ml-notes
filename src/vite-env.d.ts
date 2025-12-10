/// <reference types="vite/client" />
/// <reference types="@react-three/fiber" />

interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob<T>(pattern: string, options?: { eager?: boolean }): Record<string, T>;
}
