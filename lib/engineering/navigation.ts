import type { NavItem } from './types';
import { decisions } from './decisions';
import { services } from './services';

const child = (title: string, slug: string): NavItem => ({ title, href: `/engineering/${slug}` });

export const engineeringNavigation: NavItem[] = [
  { title: 'Engineering overview', href: '/engineering' },
  {
    title: 'Homelab', href: '/engineering/homelab', children: [
      child('Architecture overview', 'homelab/architecture'),
      child('Host infrastructure', 'homelab/infrastructure'),
      child('Docker network', 'homelab/docker-network'),
      child('Cloudflare Tunnel', 'homelab/cloudflare-tunnel'),
      child('Domain map', 'homelab/domain-map'),
      child('Container communication', 'homelab/container-communication'),
      child('Dependency graph', 'homelab/service-dependency-graph'),
      child('Monitoring stack', 'homelab/monitoring-stack'),
      child('Logging stack', 'homelab/logging-stack'),
      child('Media stack', 'homelab/media-stack'),
      child('Photo stack', 'homelab/photo-stack'),
      child('Music stack', 'homelab/music-stack'),
      child('Automation stack', 'homelab/automation-stack'),
      child('Storage layout', 'homelab/storage-layout'),
      child('Filesystem layout', 'homelab/filesystem-layout'),
      child('Backup strategy', 'homelab/backup-strategy'),
      child('Recovery strategy', 'homelab/recovery-strategy'),
      child('Operations', 'homelab/operations'),
      child('Custom scripts', 'homelab/custom-scripts'),
      child('Security model', 'homelab/security-model'),
      child('Performance', 'homelab/performance'),
      child('Roadmap', 'homelab/roadmap'),
      {
        title: 'Services', href: '/engineering/homelab/services',
        children: services.map((service) => child(service.name, `homelab/services/${service.slug}`)),
      },
    ],
  },
  {
    title: 'Development', href: '/engineering/development', children: [
      child('Languages', 'development/languages'), child('Frameworks', 'development/frameworks'), child('Backend engineering', 'development/backend'),
      child('AI and machine learning', 'development/ai-ml'), child('Security engineering', 'development/security'), child('Tooling', 'development/tooling'),
      child('Editor setup', 'development/editor'), child('Linux', 'development/linux'), child('Docker development', 'development/docker'),
      child('Cloud', 'development/cloud'), child('Development workflow', 'development/workflow'),
    ],
  },
  {
    title: 'Infrastructure', href: '/engineering/infrastructure', children: [
      child('Cloudflare', 'infrastructure/cloudflare'), child('Docker', 'infrastructure/docker'), child('Monitoring', 'infrastructure/monitoring'),
      child('Observability', 'infrastructure/observability'), child('Security', 'infrastructure/security'), child('Automation', 'infrastructure/automation'),
    ],
  },
  {
    title: 'Uses', href: '/engineering/uses', children: [
      child('ThinkPad T480', 'uses/thinkpad-t480'), child('Hardware', 'uses/hardware'), child('Arch Linux', 'uses/arch-linux'),
      child('i3 and Hyprland', 'uses/i3-hyprland'), child('Vim and Alacritty', 'uses/vim-alacritty'), child('Software', 'uses/software'), child('CLI tools', 'uses/cli-tools'),
    ],
  },
  {
    title: 'Decisions', href: '/engineering/decisions',
    children: decisions.map((decision) => child(`${decision.id} · ${decision.title}`, `decisions/${decision.slug}`)),
  },
];

export function flattenNavigation(items: NavItem[] = engineeringNavigation): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenNavigation(item.children) : [])]);
}
