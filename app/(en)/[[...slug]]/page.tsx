import { Article, articleMetadata } from '@/components/article';
import { enSource } from '@/lib/source';

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return enSource.getPages().map(page => ({ slug: page.slugs }));
}

export async function generateMetadata({ params }: Props) {
  const { slug = [] } = await params;
  return articleMetadata({ lang: 'en', slugs: slug });
}

export default async function Page({ params }: Props) {
  const { slug = [] } = await params;
  return <Article lang="en" slugs={slug} />;
}
