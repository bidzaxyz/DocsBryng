import { english, georgian } from '../.source/server';
import { loader } from 'fumadocs-core/source';
export const enSource = loader({ baseUrl: '/', source: english.toFumadocsSource() });
export const kaSource = loader({ baseUrl: '/ka', source: georgian.toFumadocsSource() });
export type DocsLocale = 'en' | 'ka';
export function sourceFor(lang: DocsLocale) {
  return lang === 'ka' ? kaSource : enSource;
}
