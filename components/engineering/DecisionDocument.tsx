import Link from 'next/link';
import type { DecisionDoc } from '@/lib/engineering/types';
import { decisions } from '@/lib/engineering/decisions';
import { DocumentFrame, Notice, Section } from './DocumentFrame';

const sections = ['Context', 'Problem', 'Alternatives considered', 'Reconstructed rationale', 'Tradeoffs', 'Consequences', 'Revisit conditions', 'References'].map((title) => ({ id: title.toLowerCase().replaceAll(' ', '-'), title }));
export default function DecisionDocument({ decision }: { decision: DecisionDoc }) {
  const position = decisions.findIndex((entry) => entry.slug === decision.slug);
  return <DocumentFrame title={`${decision.id} · ${decision.title}`} description={decision.problem} section="Architecture decision record" provenance="inferred" sections={sections} previous={position > 0 ? { href: `/engineering/decisions/${decisions[position - 1].slug}`, title: decisions[position - 1].title } : { href: '/engineering/decisions', title: 'Decision index' }} next={position < decisions.length - 1 ? { href: `/engineering/decisions/${decisions[position + 1].slug}`, title: decisions[position + 1].title } : undefined}>
    <Notice title="Rationale provenance"><p>This rationale is reconstructed from configuration and project choices. It is not presented as a verbatim historical statement by the owner.</p></Notice>
    <Section id="context" title="Context"><p>{decision.context}</p></Section><Section id="problem" title="Problem"><p>{decision.problem}</p></Section>
    <Section id="alternatives-considered" title="Alternatives considered"><ul>{decision.alternatives.map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section id="reconstructed-rationale" title="Reconstructed rationale"><p>{decision.rationale}</p></Section>
    <Section id="tradeoffs" title="Tradeoffs"><ul>{decision.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section id="consequences" title="Consequences"><ul>{decision.consequences.map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section id="revisit-conditions" title="Revisit conditions"><ul>{decision.revisit.map((item) => <li key={item}>{item}</li>)}</ul></Section>
    <Section id="references" title="References"><p><Link href="/engineering/decisions">All engineering decisions</Link> · <Link href="/engineering/homelab/architecture">Current architecture</Link></p></Section>
  </DocumentFrame>;
}
