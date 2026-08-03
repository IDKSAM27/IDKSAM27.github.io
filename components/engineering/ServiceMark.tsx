const localMarks = new Set(['cloudflare', 'docker', 'grafana', 'homepage', 'immich', 'jellyfin', 'portainer', 'postgresql', 'prometheus', 'qbittorrent', 'radarr', 'sonarr', 'uptimekuma']);
const aliases: Record<string, string> = { 'docker-engine': 'docker', alertmanager: 'prometheus', 'blackbox-exporter': 'prometheus', 'node-exporter': 'prometheus', cadvisor: 'docker' };

export default function ServiceMark({ slug, name }: { slug: string; name: string }) {
  const icon = aliases[slug] ?? slug;
  return <figure className="eng-service-mark">{localMarks.has(icon) ? <Image src={`/engineering/icons/${icon}.svg`} alt={`${name} project mark`} width={72} height={72} unoptimized /> : <span aria-label={`${name} text monogram`}>{name.split(/\s+/).map((word) => word[0]).join('').slice(0, 3).toUpperCase()}</span>}<figcaption>{localMarks.has(icon) ? 'Locally bundled project mark' : 'Text monogram; no bundled project mark'}</figcaption></figure>;
}
import Image from 'next/image';
