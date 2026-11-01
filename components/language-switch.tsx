"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function LanguageSwitch({ lang }: { lang: string }) {
  const pathname = usePathname();
  const path = pathname.replace(/^\/ka(?=\/|$)/, '') || '/';
  return <nav aria-label={lang === 'ka' ? 'დოკუმენტაციის ენა' : 'Documentation language'} className="language-switch">
    <Link href={path} lang="en" aria-current={lang === 'en' ? 'page' : undefined}>English</Link>
    <Link href={path === '/' ? '/ka' : `/ka${path}`} lang="ka" aria-current={lang === 'ka' ? 'page' : undefined}>ქართული</Link>
  </nav>;
}
