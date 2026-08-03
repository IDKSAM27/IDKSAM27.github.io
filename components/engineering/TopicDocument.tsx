import Link from 'next/link';
import type { TopicDoc } from '@/lib/engineering/types';
import { flattenNavigation } from '@/lib/engineering/navigation';
import MermaidDiagram from './MermaidDiagram';
import { DefinitionList, DocumentFrame, Notice, Section } from './DocumentFrame';

const usefulLinks: Record<string, Array<[string, string]>> = {
  Homelab: [['Docker documentation', 'https://docs.docker.com/'], ['Cloudflare Tunnel documentation', 'https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/'], ['Grafana observability documentation', 'https://grafana.com/docs/']],
  Development: [['MDN Web Docs', 'https://developer.mozilla.org/'], ['Python documentation', 'https://docs.python.org/3/'], ['Next.js documentation', 'https://nextjs.org/docs'], ['PyTorch documentation', 'https://docs.pytorch.org/docs/stable/']],
  Infrastructure: [['Docker networking', 'https://docs.docker.com/engine/network/'], ['Prometheus documentation', 'https://prometheus.io/docs/'], ['Grafana Alloy documentation', 'https://grafana.com/docs/alloy/latest/']],
  Uses: [['ArchWiki', 'https://wiki.archlinux.org/'], ['i3 user guide', 'https://i3wm.org/docs/userguide.html'], ['Hyprland Wiki', 'https://wiki.hypr.land/'], ['Vim help', 'https://vimhelp.org/'], ['Alacritty documentation', 'https://alacritty.org/config-alacritty.html'], ['Lenovo ThinkPad T480 PSREF', 'https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_T480/ThinkPad_T480_Spec.PDF']],
  Decisions: [['Architecture decision records', 'https://adr.github.io/'], ['Diátaxis', 'https://diataxis.fr/']],
};

export default function TopicDocument({ topic }: { topic: TopicDoc }) {
  const sections = [
    ...(topic.facts?.length ? [{ id: 'current-state', title: 'Current state' }] : []),
    ...(topic.diagram ? [{ id: 'diagram', title: 'Architecture diagram' }] : []),
    ...topic.sections.map((item, index) => ({ id: `section-${index + 1}`, title: item.title })),
    { id: 'related', title: 'Related documentation' }, { id: 'references', title: 'References' },
  ];
  const nav = flattenNavigation(); const current = nav.findIndex((item) => item.href === `/engineering/${topic.slug}`);
  return (
    <DocumentFrame title={topic.title} description={topic.description} section={topic.section} provenance={topic.provenance} sections={sections} previous={current > 0 ? nav[current - 1] : undefined} next={current >= 0 && current < nav.length - 1 ? nav[current + 1] : undefined}>
      <p className="eng-lead">{topic.intro}</p>
      {topic.provenance === 'proposed' && <Notice kind="proposal" title="Proposed runbook"><p>This page describes a desired operational state. It must not be read as evidence that the control, schedule, or automation is active.</p></Notice>}
      {topic.facts?.length ? <Section id="current-state" title="Current state"><DefinitionList items={topic.facts} /></Section> : null}
      {topic.diagram ? <Section id="diagram" title="Architecture diagram"><MermaidDiagram chart={topic.diagram} title={`${topic.title} diagram`} description={topic.description} /></Section> : null}
      {topic.sections.map((item, index) => <Section key={item.title} id={`section-${index + 1}`} title={item.title}><p>{item.body}</p>{item.items?.length ? <ul>{item.items.map((entry) => <li key={entry}>{entry}</li>)}</ul> : null}</Section>)}
      <Section id="related" title="Related documentation"><div className="eng-related">{(topic.related?.length ? topic.related : ['engineering']).map((slug) => <Link key={slug} href={slug === 'engineering' ? '/engineering' : `/engineering/${slug}`}>{slug.split('/').at(-1)?.replaceAll('-', ' ')}</Link>)}</div></Section>
      <Section id="references" title="References"><p>Technical statements are reconciled against the private configuration snapshot and primary upstream documentation. Recommendations are explicitly labeled proposed. Links were last reviewed on 3 August 2026.</p><ul>{(usefulLinks[topic.section] ?? usefulLinks.Homelab).map(([label, href]) => <li key={href}><a href={href} rel="noreferrer" target="_blank">{label}</a></li>)}<li><a href="https://developers.google.com/style" rel="noreferrer" target="_blank">Google developer documentation style guide</a></li></ul></Section>
    </DocumentFrame>
  );
}
