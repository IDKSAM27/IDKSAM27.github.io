import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TopicDocument from '@/components/engineering/TopicDocument';
import ServiceDocument from '@/components/engineering/ServiceDocument';
import DecisionDocument from '@/components/engineering/DecisionDocument';
import ServiceCatalog from '@/components/engineering/ServiceCatalog';
import { decisionBySlug, decisions } from '@/lib/engineering/decisions';
import { serviceBySlug, services } from '@/lib/engineering/services';
import { topicBySlug, topics } from '@/lib/engineering/topics';

type Params = Promise<{ slug: string[] }>;

// Every public documentation path is emitted by generateStaticParams. Unknown
// slugs should fail closed instead of triggering a runtime render in the Worker.
export const dynamic = 'force-static';
export const dynamicParams = false;

function resolve(slug: string[]) {
  const path = slug.join('/');
  if (path === 'homelab/services') return { kind: 'catalog' as const, title: 'Service catalog', description: 'Every documented service in the personal cloud.' };
  if (slug[0] === 'homelab' && slug[1] === 'services' && slug[2]) { const service = serviceBySlug.get(slug[2]); return service ? { kind: 'service' as const, service, title: service.name, description: service.summary } : null; }
  if (slug[0] === 'decisions' && slug[1]) { const decision = decisionBySlug.get(slug[1]); return decision ? { kind: 'decision' as const, decision, title: `${decision.id} · ${decision.title}`, description: decision.problem } : null; }
  const topic = topicBySlug.get(path); return topic ? { kind: 'topic' as const, topic, title: topic.title, description: topic.description } : null;
}
export function generateStaticParams() { return [...topics.map((topic) => ({ slug: topic.slug.split('/') })), { slug: ['homelab', 'services'] }, ...services.map((service) => ({ slug: ['homelab', 'services', service.slug] })), ...decisions.map((decision) => ({ slug: ['decisions', decision.slug] }))]; }
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> { const { slug } = await params; const page = resolve(slug); if (!page) return {}; const url = `/engineering/${slug.join('/')}`; return { title: page.title, description: page.description, alternates: { canonical: url }, openGraph: { title: page.title, description: page.description, url, type: 'article' }, twitter: { card: 'summary', title: page.title, description: page.description } }; }
export default async function EngineeringDocumentPage({ params }: { params: Params }) {
  const { slug } = await params; const page = resolve(slug); if (!page) notFound(); const path = slug.join('/');
  const jsonLd = [{ '@context': 'https://schema.org', '@type': 'TechArticle', headline: page.title, description: page.description, author: { '@type': 'Person', name: 'Sampreet Patil' }, dateModified: '2026-08-03', mainEntityOfPage: `https://sampreetpatil.com/engineering/${path}` }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: slug.map((part, index) => ({ '@type': 'ListItem', position: index + 1, name: part.replaceAll('-', ' '), item: `https://sampreetpatil.com/engineering/${slug.slice(0, index + 1).join('/')}` })) }];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c') }} />{page.kind === 'catalog' ? <ServiceCatalog /> : page.kind === 'service' ? <ServiceDocument service={page.service} /> : page.kind === 'decision' ? <DecisionDocument decision={page.decision} /> : <TopicDocument topic={page.topic} />}</>;
}
