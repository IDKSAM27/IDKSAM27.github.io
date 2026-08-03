export type Provenance = 'verified' | 'inferred' | 'proposed';

export interface PortSpec {
  host?: string;
  container: string;
  protocol?: 'TCP' | 'UDP';
  purpose: string;
}

export interface VolumeSpec {
  source: string;
  target: string;
  mode?: 'read-only' | 'read-write';
  purpose: string;
}

export interface ServiceDoc {
  slug: string;
  name: string;
  category: string;
  summary: string;
  purpose: string;
  container: string;
  image: string;
  publicUrl?: string;
  internalDns: string;
  ports: PortSpec[];
  volumes: VolumeSpec[];
  environment: string[];
  networks: string[];
  dependencies: string[];
  dependents: string[];
  monitoring: string;
  logging: string;
  security: string;
  performance: string;
  issues: string[];
  alternatives: string[];
  rationale: string;
  future: string[];
  officialUrl: string;
  provenance?: Provenance;
}

export interface TopicSection {
  title: string;
  body: string;
  items?: string[];
}

export interface TopicDoc {
  slug: string;
  title: string;
  description: string;
  section: string;
  provenance: Provenance;
  intro: string;
  facts?: Array<[string, string]>;
  sections: TopicSection[];
  related?: string[];
  diagram?: string;
}

export interface DecisionDoc {
  id: string;
  slug: string;
  title: string;
  context: string;
  problem: string;
  alternatives: string[];
  rationale: string;
  tradeoffs: string[];
  consequences: string[];
  revisit: string[];
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}
