import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { sourceFor, type DocsLocale } from '@/lib/source';
import { docsOrigin, isProductionDeployment } from '@/lib/site-policy.mjs';
import { getMDXComponents } from '@/mdx-components';

export type ArticleProps = { lang: DocsLocale; slugs?: string[] };

function getArticle({ lang, slugs = [] }: ArticleProps) {
  const page = sourceFor(lang).getPage(slugs);
  if (!page) notFound();
  return page;
}

export function articleMetadata(props: ArticleProps): Metadata {
  const page = getArticle(props);
  const languages = Object.fromEntries(['en', 'ka'].flatMap(locale => {
    const translated = sourceFor(locale as DocsLocale).getPage(props.slugs ?? []);
    return translated ? [[locale, `${docsOrigin}${translated.url}`]] : [];
  }));
  return {
    title: `${page.data.title} | Bryng Docs`,
    description: page.data.description,
    robots: isProductionDeployment() ? undefined : { index: false, follow: false },
    alternates: { canonical: `${docsOrigin}${page.url}`, languages },
  };
}

export function Article(props: ArticleProps) {
  const page = getArticle(props);
  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ style: 'clerk' }} tabIndex={-1}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody><MDX components={getMDXComponents()} /></DocsBody>
    </DocsPage>
  );
}
