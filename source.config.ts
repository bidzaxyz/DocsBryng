import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
export const english = defineDocs({ dir: 'content/docs/en' });
export const georgian = defineDocs({ dir: 'content/docs/ka' });
export default defineConfig();
