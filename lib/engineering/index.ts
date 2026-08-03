import { decisions } from './decisions';
import { flattenNavigation } from './navigation';
import { services } from './services';
import { topics } from './topics';

export { decisions, decisionBySlug } from './decisions';
export { engineeringNavigation, flattenNavigation } from './navigation';
export { services, serviceBySlug } from './services';
export { topics, topicBySlug } from './topics';
export type * from './types';

export const indexedPages = [
  {
    title: 'Engineering', description: 'Sampreet Patil’s engineering notes, personal cloud, development practices, uses, and decisions.',
    url: '/engineering', content: 'Engineering homelab personal cloud development infrastructure uses decisions Docker Arch Linux observability', keywords: 'engineering homelab portfolio', breadcrumbs: ['Engineering'],
  },
  ...topics.map((entry) => ({
    title: entry.title, description: entry.description, url: `/engineering/${entry.slug}`,
    content: [entry.intro, ...entry.sections.flatMap((section) => [section.title, section.body, ...(section.items ?? [])]), ...(entry.facts?.flat() ?? [])].join(' '),
    keywords: `${entry.section} ${entry.title}`, breadcrumbs: ['Engineering', entry.section],
  })),
  ...services.map((service) => ({
    title: service.name, description: service.summary, url: `/engineering/homelab/services/${service.slug}`,
    content: [service.purpose, service.container, service.image, service.publicUrl ?? '', service.internalDns, ...service.environment, ...service.dependencies, ...service.dependents, service.monitoring, service.logging, service.security, service.performance, ...service.issues, ...service.alternatives, service.rationale, ...service.future].join(' '),
    keywords: `${service.category} ${service.container} ${service.name}`, breadcrumbs: ['Engineering', 'Homelab', 'Services'],
  })),
  ...decisions.map((decision) => ({
    title: `Decision ${decision.id}: ${decision.title}`, description: decision.problem, url: `/engineering/decisions/${decision.slug}`,
    content: [decision.context, decision.problem, ...decision.alternatives, decision.rationale, ...decision.tradeoffs, ...decision.consequences, ...decision.revisit].join(' '),
    keywords: `ADR architecture decision ${decision.id}`, breadcrumbs: ['Engineering', 'Decisions'],
  })),
];

export const allEngineeringHrefs = new Set(flattenNavigation().map((item) => item.href));
