import Link from 'next/link';
import type { ServiceDoc } from '@/lib/engineering/types';
import { serviceBySlug, services } from '@/lib/engineering/services';
import { DocumentFrame, DefinitionList, Notice, Section } from './DocumentFrame';
import ServiceMark from './ServiceMark';

const ids = ['overview', 'architecture', 'configuration', 'storage', 'networking', 'relationships', 'observability', 'security', 'performance', 'troubleshooting', 'alternatives', 'future', 'references'];
const titles = ['Overview and rationale', 'Architecture and features', 'Runtime configuration', 'Storage', 'Networking and access', 'Dependencies and dependents', 'Monitoring and logging', 'Security', 'Performance', 'Known issues and troubleshooting', 'Alternatives', 'Future improvements', 'References'];
const sections = ids.map((id, index) => ({ id, title: titles[index] }));
const hrefForName = (name: string) => services.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
const securityReference: Record<string, [string, string]> = {
  prometheus: ['Prometheus security model', 'https://prometheus.io/docs/operating/security/'],
  alertmanager: ['Prometheus and Alertmanager security model', 'https://prometheus.io/docs/operating/security/'],
  'blackbox-exporter': ['Prometheus exporter security model', 'https://prometheus.io/docs/operating/security/'],
  loki: ['Loki authentication guidance', 'https://grafana.com/docs/loki/latest/operations/authentication/'],
};

export default function ServiceDocument({ service }: { service: ServiceDoc }) {
  const position = services.findIndex((entry) => entry.slug === service.slug);
  const relations = (names: string[]) => names.length ? <ul>{names.map((name) => { const target = hrefForName(name); return <li key={name}>{target ? <Link href={`/engineering/homelab/services/${target.slug}`}>{name}</Link> : name}</li>; })}</ul> : <p>None documented.</p>;
  return (
    <DocumentFrame title={service.name} description={service.summary} section={`Homelab · ${service.category}`} provenance={service.provenance ?? 'verified'} sections={sections} previous={position > 0 ? { href: `/engineering/homelab/services/${services[position - 1].slug}`, title: services[position - 1].name } : { href: '/engineering/homelab/services', title: 'Service catalog' }} next={position < services.length - 1 ? { href: `/engineering/homelab/services/${services[position + 1].slug}`, title: services[position + 1].name } : undefined}>
      <Section id="overview" title="Overview and rationale"><p className="eng-lead">{service.purpose}</p><p>{service.rationale}</p></Section>
      <Section id="architecture" title="Architecture and features"><ServiceMark slug={service.slug} name={service.name} /><DefinitionList items={[["Runtime", service.container], ["Image", <code key="image">{service.image}</code>], ["Purpose", service.purpose], ["Category", service.category]]} /></Section>
      <Section id="configuration" title="Runtime configuration"><h3>Ports</h3>{service.ports.length ? <div className="eng-table-scroll"><table><thead><tr><th>Host</th><th>Container</th><th>Protocol</th><th>Purpose</th></tr></thead><tbody>{service.ports.map((port, i) => <tr key={`${port.container}-${i}`}><td>{port.host ?? 'Not published'}</td><td><code>{port.container}</code></td><td>{port.protocol ?? 'TCP'}</td><td>{port.purpose}</td></tr>)}</tbody></table></div> : <p>No application port is published to the host.</p>}<h3>Environment</h3>{service.environment.length ? <ul className="eng-code-list">{service.environment.map((value) => <li key={value}><code>{value}</code></li>)}</ul> : <p>No environment overrides are documented.</p>}<Notice title="Sanitized configuration"><p>Secret values, credentials, webhooks, and private paths that disclose credentials are intentionally absent. A variable name does not imply its value is public.</p></Notice></Section>
      <Section id="storage" title="Storage">{service.volumes.length ? <div className="eng-table-scroll"><table><thead><tr><th>Source</th><th>Container target</th><th>Mode</th><th>Purpose</th></tr></thead><tbody>{service.volumes.map((volume, i) => <tr key={`${volume.target}-${i}`}><td><code>{volume.source}</code></td><td><code>{volume.target}</code></td><td>{volume.mode ?? 'runtime default'}</td><td>{volume.purpose}</td></tr>)}</tbody></table></div> : <p>No persistent volume is declared in the supplied configuration.</p>}</Section>
      <Section id="networking" title="Networking and access"><DefinitionList items={[["Docker networks", service.networks.join(', ')], ["Internal DNS", <code key="dns">{service.internalDns}</code>], ["Public URL", service.publicUrl ? <a key="url" href={service.publicUrl} rel="noreferrer" target="_blank">{service.publicUrl}</a> : 'Not publicly routed in the supplied tunnel map']]} />{service.publicUrl && <Notice kind="warning" title="A tunnel route is not an access policy"><p>Cloudflare Tunnel routing is verified from configuration. Cloudflare Access is configured separately, so its presence remains unverified.</p></Notice>}</Section>
      <Section id="relationships" title="Dependencies and dependents"><div className="eng-columns"><div><h3>Depends on</h3>{relations(service.dependencies)}</div><div><h3>Used by</h3>{relations(service.dependents)}</div></div></Section>
      <Section id="observability" title="Monitoring and logging"><h3>Monitoring</h3><p>{service.monitoring}</p><h3>Logging</h3><p>{service.logging}</p></Section>
      <Section id="security" title="Security"><p>{service.security}</p>{securityReference[service.slug] && <p><a href={securityReference[service.slug][1]} rel="noreferrer" target="_blank">{securityReference[service.slug][0]}</a></p>}{/no auth|without auth|not evidenced|public/i.test(service.security) && <Notice kind="warning" title="Management-plane exposure"><p>This service deserves explicit identity enforcement or removal of its public hostname. This is a proposed hardening action, not a claim about the current Cloudflare Access policy.</p></Notice>}</Section>
      <Section id="performance" title="Performance"><p>{service.performance}</p></Section>
      <Section id="troubleshooting" title="Known issues and troubleshooting">{service.issues.length ? <ol>{service.issues.map((issue) => <li key={issue}>{issue}</li>)}</ol> : <p>No configuration-backed issue is recorded.</p>}<p>Start with container state, recent Docker logs, internal DNS resolution, the host-published port, and then the tunnel route. Avoid changing multiple layers before isolating the failing boundary.</p></Section>
      <Section id="alternatives" title="Alternatives"><ul>{service.alternatives.map((item) => <li key={item}>{item}</li>)}</ul></Section>
      <Section id="future" title="Future improvements"><Notice kind="proposal" title="Proposed, not implemented"><ul>{service.future.map((item) => <li key={item}>{item}</li>)}</ul></Notice></Section>
      <Section id="references" title="References"><p><a href={service.officialUrl} rel="noreferrer" target="_blank">Official {service.name} documentation</a></p><p><Link href="/engineering/homelab/security-model">Canonical security model</Link> · <Link href="/engineering/homelab/docker-network">Canonical network model</Link> · <Link href="/engineering/homelab/storage-layout">Canonical storage model</Link></p></Section>
    </DocumentFrame>
  );
}
