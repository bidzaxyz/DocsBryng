import defaultComponents from 'fumadocs-ui/mdx';
import { Cards, Card as FumaCard } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';
import { Steps, Step as FumaStep } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Code, Store, Box, Globe, CircleHelp, Link as LinkIcon, CreditCard } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
const icons = { code: Code, store: Store, box: Box, globe: Globe, 'circle-question': CircleHelp, link: LinkIcon, 'credit-card': CreditCard };
function Card({ title, href, icon, children }: { title: string; href: string; icon?: keyof typeof icons; children?: ReactNode }) {
  const Icon = icon ? icons[icon] : undefined;
  return <FumaCard title={title} href={href} icon={Icon ? <Icon /> : undefined}>{children}</FumaCard>;
}
function Step({ title, children }: { title: string; children: ReactNode }) {
  return <FumaStep><h3>{title}</h3>{children}</FumaStep>;
}
export function getMDXComponents(): MDXComponents {
  return { ...defaultComponents, Card, Columns: ({ children }) => <Cards>{children}</Cards>, Steps, Step,
    Note: ({ children }) => <Callout>{children}</Callout>,
    Info: ({ children }) => <Callout type="info">{children}</Callout>,
    Warning: ({ children }) => <Callout type="warn">{children}</Callout>,
    Accordion, AccordionGroup: Accordions,
  };
}
