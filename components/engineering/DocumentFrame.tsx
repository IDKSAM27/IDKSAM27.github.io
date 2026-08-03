import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Provenance from './Provenance';
import type { Provenance as ProvenanceType } from '@/lib/engineering/types';

export interface DocSection { id: string; title: string }

export function DocumentFrame({ title, description, section, provenance, sections, children, previous, next, reviewed = '3 August 2026' }: { title: string; description: string; section: string; provenance: ProvenanceType; sections: DocSection[]; children: React.ReactNode; previous?: { href: string; title: string }; next?: { href: string; title: string }; reviewed?: string }) {
  return (
    <div className="eng-document-grid">
      <article className="eng-article">
        <nav className="eng-breadcrumbs" aria-label="Breadcrumb"><Link href="/engineering">Engineering</Link><span>/</span><span>{section}</span></nav>
        <header className="eng-article-header"><p className="eng-eyebrow">{section}</p><h1>{title}</h1><p className="eng-dek">{description}</p><Provenance value={provenance} /></header>
        <nav className="eng-inline-toc" aria-label="On this page"><span>On this page</span>{sections.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}</nav>
        <div className="eng-article-body">{children}</div>
        <footer className="eng-article-meta"><p>Last reviewed: <time dateTime="2026-08-03">{reviewed}</time></p><p>Facts may change with configuration updates; links point to canonical local pages.</p></footer>
        {(previous || next) && <nav className="eng-page-turn" aria-label="Previous and next pages">{previous ? <Link href={previous.href}><ArrowLeft size={17} /><span><small>Previous</small>{previous.title}</span></Link> : <span />}{next ? <Link href={next.href}><span><small>Next</small>{next.title}</span><ArrowRight size={17} /></Link> : <span />}</nav>}
      </article>
      <aside className="eng-toc" aria-label="On this page"><p>On this page</p>{sections.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}<a href="#references">References <ExternalLink size={12} /></a></aside>
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) { return <section id={id} className="eng-doc-section"><h2><a href={`#${id}`}>{title}</a></h2>{children}</section>; }
export function Notice({ kind = 'note', title, children }: { kind?: 'note' | 'warning' | 'proposal'; title: string; children: React.ReactNode }) { return <aside className="eng-notice" data-kind={kind}><strong>{title}</strong><div>{children}</div></aside>; }
export function DefinitionList({ items }: { items: Array<[string, React.ReactNode]> }) { return <dl className="eng-definitions">{items.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>; }
