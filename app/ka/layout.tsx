import { DocsDocument } from '@/components/docs-document';
import type { ReactNode } from 'react';
import { asset } from '@/lib/paths';
export const metadata = { icons: { icon: asset('/images/favicon.ico') } };
export default function Layout({ children }: { children: ReactNode }) {
  return <DocsDocument lang='ka'>{children}</DocsDocument>;
}
