"use client";
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { basePath } from '@/lib/paths';
import { georgianTranslations } from '@/lib/translations';
export function DocsProvider({ children, lang }: { children: ReactNode; lang: string }) {
  return <RootProvider theme={{ defaultTheme: 'dark' }} i18n={{ locale: lang, translations: lang === 'ka' ? georgianTranslations : {} }} search={{ options: { api: `${basePath}/api/search` } }}>
    {children}
  </RootProvider>;
}
