import { Article, articleMetadata } from '@/components/article';
import { kaSource } from '@/lib/source';

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return kaSource.getPages().map(page => ({ slug: page.slugs }));
}

export async function generateMetadata({ params }: Props) {
  const { slug = [] } = await params;
  return articleMetadata({ lang: 'ka', slugs: slug });
}

export default async function Page({ params }: Props) {
  const { slug = [] } = await params;
  return <Article lang="ka" slugs={slug} />;
}
