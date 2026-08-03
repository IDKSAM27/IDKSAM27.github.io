import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MermaidDiagram from '@/components/engineering/MermaidDiagram';
import Provenance from '@/components/engineering/Provenance';
import { services } from '@/lib/engineering/services';

const architecture = `flowchart LR
  Internet[Internet] --> Cloudflare[Cloudflare Tunnel]
  Cloudflare --> Host[Arch Linux host]
  Host --> Docker[Docker and Compose]
  Docker --> Apps[Personal cloud services]
  Apps --> Observe[Metrics and logs]
  Observe --> Grafana[Operational feedback]`;

const routes = [
  ['Homelab', '/engineering/homelab', 'Architecture, networks, storage, service operations, security, recovery, and every running workload.'],
  ['Development', '/engineering/development', 'Languages, frameworks, backend work, AI/ML, Linux, editors, tooling, and workflow.'],
  ['Infrastructure', '/engineering/infrastructure', 'Cloudflare, Docker, observability, security, and automation synthesized across the system.'],
  ['Uses', '/engineering/uses', 'The representative ThinkPad T480, Arch Linux desktop, terminal, editors, software, and CLI.'],
  ['Decisions', '/engineering/decisions', 'Thirteen ADR-style records reconstructing why this architecture took its present shape.'],
] as const;

export default function EngineeringPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: 'Engineering field notes', description: 'Documentation of Sampreet Patil’s homelab, development environment, infrastructure, and decisions.', author: { '@type': 'Person', name: 'Sampreet Patil' }, dateModified: '2026-08-03', mainEntityOfPage: 'https://sampreetpatil.com/engineering' };
  return <div className="eng-landing">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c') }} />
    <section className="eng-landing-hero"><p className="eng-eyebrow">Engineering · documented in public</p><h1>The systems behind<br /><span>the work.</span></h1><p className="eng-dek">A careful, source-aware record of a personal cloud, the development practice around it, and the decisions that keep both understandable.</p><div className="eng-landing-meta"><Provenance value="verified" compact /><span>{services.length} documented services</span><span>13 decision records</span><time dateTime="2026-08-03">Reviewed August 2026</time></div></section>
    <section className="eng-philosophy" aria-labelledby="philosophy"><p className="eng-section-number">01</p><div><h2 id="philosophy">Engineering philosophy</h2><p>Useful infrastructure is legible infrastructure. I favor explicit configuration, observable boundaries, reversible changes, and documentation that admits what it does not know. This section separates present configuration from inference and proposed work so a future operator can act on evidence instead of folklore.</p></div></section>
    <section className="eng-map" aria-labelledby="documentation-map"><div className="eng-section-heading"><p className="eng-section-number">02</p><h2 id="documentation-map">Documentation map</h2></div><div className="eng-route-index">{routes.map(([title, href, copy], index) => <Link href={href} prefetch={false} key={href}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight aria-hidden="true" /></Link>)}</div></section>
    <section className="eng-relationship" aria-labelledby="system-relationship"><div className="eng-section-heading"><p className="eng-section-number">03</p><div><h2 id="system-relationship">One system, several planes</h2><p>Public ingress, container workloads, durable data, and observability are documented separately—but operated as one connected system.</p></div></div><MermaidDiagram chart={architecture} title="Featured infrastructure relationship" description="Traffic crosses Cloudflare Tunnel to an Arch Linux host, Docker workloads, observability, and operator feedback." /></section>
    <section className="eng-method" aria-labelledby="method"><p className="eng-section-number">04</p><div><h2 id="method">How to read these notes</h2><div className="eng-provenance-list"><Provenance value="verified" /><Provenance value="inferred" /><Provenance value="proposed" /></div><p>Security-sensitive source material is excluded from the repository. Public pages contain sanitized facts and safe excerpts only. Operational recommendations never masquerade as controls that already exist.</p><Link className="eng-text-link" href="/engineering/homelab/security-model" prefetch={false}>Read the security model <ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
