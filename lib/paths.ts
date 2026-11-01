export const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';
export function asset(path: string) { return `${basePath}${path}`; }
