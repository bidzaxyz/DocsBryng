import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsProvider } from '@/components/docs-provider';
import { LanguageSwitch } from '@/components/language-switch';
import { sourceFor, type DocsLocale } from '@/lib/source';
import { asset } from '@/lib/paths';
import '@/app/global.css';

export function DocsDocument({ children, lang }: { children: ReactNode; lang: DocsLocale }) {
  const ka = lang === 'ka';
  const title = (
    <span className="bryng-brand">
      <img className="logo-light" src={asset('/images/bryng-logo-light.svg')} alt="Bryng" />
      <img className="logo-dark" src={asset('/images/bryng-logo-dark.svg')} alt="Bryng" />
      <span>{ka ? 'გიდები' : 'Docs'}</span>
    </span>
  );
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#nd-page">{ka ? 'შინაარსზე გადასვლა' : 'Skip to content'}</a>
        <DocsProvider lang={lang}>
          <DocsLayout
            tree={sourceFor(lang).pageTree}
            nav={{ title, url: ka ? '/ka' : '/' }}
            links={[
              { text: ka ? 'მხარდაჭერა' : 'Support', url: 'mailto:help@bryng.xyz', external: true },
              { text: ka ? 'გახსენი Bryng' : 'Open Bryng', url: 'https://bryng.xyz/home', external: true },
            ]}
            sidebar={{ footer: <LanguageSwitch lang={lang} /> }}
          >
            {children}
          </DocsLayout>
        </DocsProvider>
      </body>
    </html>
  );
}
