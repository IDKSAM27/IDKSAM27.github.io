import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import styles from '../styles/HomeLabShowcase.module.css';

const marks = {
  cloudflare: ['cloudflare', '#F38020'],
  docker: ['docker', '#2496ED'],
  homepage: ['homepage', '#009BD5'],
  immich: ['immich', '#4250AF'],
  jellyfin: ['jellyfin', '#00A4DC'],
  sonarr: ['sonarr', '#2596BE'],
  radarr: ['radarr', '#FFCB3D'],
  qbittorrent: ['qbittorrent', '#2F67BA'],
  grafana: ['grafana', '#F46800'],
  prometheus: ['prometheus', '#E6522C'],
  uptimekuma: ['uptimekuma', '#5CDD8B'],
  portainer: ['portainer', '#13BEF9'],
  postgresql: ['postgresql', '#4169E1'],
};

const serviceGroups = [
  {
    title: 'Personal cloud',
    services: [
      ['Homepage', 'homepage', 'One launch surface for the lab.', 'homepage'],
      ['Immich', 'immich', 'Self-hosted photo and video library.', 'immich'],
      ['Jellyfin', 'jellyfin', 'Private media streaming.', 'jellyfin'],
      ['Navidrome', 'navidrome', 'Subsonic-compatible music server.'],
      ['Stirling PDF', 'stirling-pdf', 'Private browser-based PDF tools.'],
    ],
  },
  {
    title: 'Media automation',
    services: [
      ['Sonarr', 'sonarr', 'Television library automation.', 'sonarr'],
      ['Radarr', 'radarr', 'Movie library automation.', 'radarr'],
      ['Prowlarr', 'prowlarr', 'Indexer coordination.'],
      ['qBittorrent', 'qbittorrent', 'Automated download client.', 'qbittorrent'],
    ],
  },
  {
    title: 'Observability',
    services: [
      ['Grafana', 'grafana', 'Metrics and log dashboards.', 'grafana'],
      ['Prometheus', 'prometheus', 'Time-series metrics.', 'prometheus'],
      ['Alertmanager', 'alertmanager', 'Alert routing and grouping.', 'prometheus'],
      ['Loki', 'loki', 'Centralized log storage.', 'grafana'],
      ['Grafana Alloy', 'alloy', 'Host and container telemetry.', 'grafana'],
      ['Blackbox Exporter', 'blackbox-exporter', 'Independent endpoint probes.', 'prometheus'],
      ['Node Exporter', 'node-exporter', 'Linux host metrics.', 'prometheus'],
      ['cAdvisor', 'cadvisor', 'Container resource metrics.', 'docker'],
      ['Uptime Kuma', 'uptime-kuma', 'Availability monitoring.', 'uptimekuma'],
    ],
  },
  {
    title: 'Operations and data',
    services: [
      ['Docker', 'docker', 'Runtime for every Compose stack.', 'docker'],
      ['Portainer', 'portainer', 'Container operations and visibility.', 'portainer'],
      ['Dozzle', 'dozzle', 'Focused container log access.'],
      ['Diun', 'diun', 'Image update notifications.'],
      ['PostgreSQL', 'postgresql', 'Durable Immich metadata.', 'postgresql'],
      ['Valkey', 'valkey', 'Queues and background-job cache.'],
    ],
  },
];

const architecture = [
  ['Ingress', 'Cloudflare Tunnel', 'cloudflare'],
  ['Platform', 'Docker Compose', 'docker'],
  ['Workloads', 'Personal cloud', 'immich'],
  ['Feedback', 'Metrics + logs', 'grafana'],
];

function ProjectMark({ mark, name }) {
  const config = mark ? marks[mark] : undefined;
  if (!config) {
    return <span className={styles.monogram} aria-hidden="true">{name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2)}</span>;
  }

  const [icon, color] = config;
  return (
    <span
      className={styles.mark}
      aria-hidden="true"
      style={{
        '--mark-color': color,
        '--mark-url': `url(/engineering/icons/${icon}.svg)`,
      }}
    />
  );
}

export default function HomeLabShowcase() {
  return (
    <section id="homelab" className={`${styles.showcase} homelab-showcase`} aria-labelledby="homelab-showcase-title">
      <div className={styles.intro}>
        <div>
          <p className={styles.kicker}>homelab · personal cloud</p>
          <h3 id="homelab-showcase-title" className={styles.title}>Self-hosted.<br /><span>Seriously operated.</span></h3>
        </div>
        <div className={styles.summary}>
          <p>One Arch Linux host running a documented personal cloud—with its own automation, monitoring, and operational playbook.</p>
          <div className={styles.actions}>
            <Link href="/engineering/homelab" prefetch={false} className={styles.primaryAction}>
              Explore the homelab <span className={styles.actionIcon} aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.8} /></span>
            </Link>
            <Link href="/engineering" prefetch={false} className={styles.secondaryAction}>
              Engineering notes <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.architecture} aria-label="Homelab architecture">
        {architecture.map(([label, value, mark]) => (
          <div key={label}>
            <span className={styles.architectureMark}><ProjectMark mark={mark} name={label} /></span>
            <div className={styles.architectureText}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>

      <details className={styles.directory}>
        <summary>
          <span><small>Inside the stack</small>Explore 24 services &amp; tools</span>
          <span className={styles.toggle} aria-hidden="true"><Plus size={24} strokeWidth={1.7} /></span>
        </summary>
        <div className={styles.groups}>
          {serviceGroups.map((group) => (
            <section key={group.title} className={styles.group} aria-labelledby={`homelab-${group.title.toLowerCase().replaceAll(' ', '-')}`}>
              <h4 id={`homelab-${group.title.toLowerCase().replaceAll(' ', '-')}`}>{group.title}</h4>
              <div className={styles.serviceGrid}>
                {group.services.map(([name, slug, description, mark]) => (
                  <Link key={slug} href={`/engineering/homelab/services/${slug}`} prefetch={false} className={styles.service}>
                    <span className={styles.serviceVisual}><ProjectMark mark={mark} name={name} /></span>
                    <span className={styles.serviceCopy}><strong>{name}</strong><small>{description}</small></span>
                    <span className={styles.serviceArrow} aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.7} /></span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className={styles.directoryFooter}>
          <p>Architecture, storage, dependencies, risks, and runbooks—documented service by service.</p>
          <Link href="/engineering/homelab/services" prefetch={false}>Full service catalog <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></Link>
        </div>
      </details>
    </section>
  );
}
