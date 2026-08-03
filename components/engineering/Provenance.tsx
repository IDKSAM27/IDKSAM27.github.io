import type { Provenance as ProvenanceType } from '@/lib/engineering/types';

const copy: Record<ProvenanceType, string> = {
  verified: 'Backed by the supplied configuration, portfolio, or an explicit owner statement.',
  inferred: 'Derived from upstream defaults or a clearly labeled representative assumption.',
  proposed: 'A recommendation or future runbook; not evidence of a deployed control.',
};

export default function Provenance({ value, compact = false }: { value: ProvenanceType; compact?: boolean }) {
  return <span className="eng-provenance" data-kind={value} title={copy[value]}><span aria-hidden="true" />{value}{compact ? '' : ` — ${copy[value]}`}</span>;
}
