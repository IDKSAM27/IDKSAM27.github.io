import Link from 'next/link';
import { services } from '@/lib/engineering/services';
import { DocumentFrame, Section } from './DocumentFrame';

export default function ServiceCatalog() {
  const groups = services.reduce((catalog, service) => catalog.set(service.category, [...(catalog.get(service.category) ?? []), service]), new Map<string, typeof services>());
  return <DocumentFrame title="Service catalog" description="Every documented workload, dependency, and platform service in the supplied homelab configuration." section="Homelab" provenance="verified" sections={[{ id: 'catalog', title: 'All services' }, { id: 'reading', title: 'How to read service pages' }, { id: 'references', title: 'References' }]}>
    <p className="eng-lead">This catalog is the front door to 24 typed service records. Each page uses the same operational template, so facts can be compared without hiding differences behind cards.</p>
    <Section id="catalog" title="All services"><div className="eng-index">{Array.from(groups.entries()).map(([category, entries]) => <div className="eng-index-group" key={category}><h3>{category}</h3>{entries.map((service) => <Link href={`/engineering/homelab/services/${service.slug}`} prefetch={false} key={service.slug}><span>{service.name}</span><small>{service.summary}</small><b aria-hidden="true">↗</b></Link>)}</div>)}</div></Section>
    <Section id="reading" title="How to read service pages"><p>Ports distinguish host publication from container listeners. Storage records mount modes. Relationships link only when another canonical service page exists. Current behavior, upstream-default inference, and proposed work remain separate.</p></Section>
    <Section id="references" title="References"><p><Link href="/engineering/homelab/architecture" prefetch={false}>Architecture overview</Link> · <Link href="/engineering/homelab/domain-map" prefetch={false}>Domain map</Link> · <Link href="/engineering/homelab/security-model" prefetch={false}>Security model</Link></p></Section>
  </DocumentFrame>;
}
