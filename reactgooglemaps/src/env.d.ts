/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // Інші змінні середовища можна додавати тут
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
