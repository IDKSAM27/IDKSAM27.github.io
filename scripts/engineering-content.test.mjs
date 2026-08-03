import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (name) => readFile(path.join(root, name), 'utf8');
const expectedServices = ['homepage','immich','jellyfin','navidrome','sonarr','radarr','prowlarr','qbittorrent','grafana','prometheus','alertmanager','loki','alloy','blackbox-exporter','node-exporter','cadvisor','uptime-kuma','portainer','dozzle','diun','stirling-pdf','valkey','postgresql','docker'];
const expectedDecisions = ['cloudflare-tunnel-over-reverse-proxy','compose-over-kubernetes','arch-linux-host','alloy-over-promtail','loki-over-elasticsearch','jellyfin-over-plex','navidrome-over-plexamp','immich-over-google-photos','prometheus-over-datadog','homepage-over-homarr','portainer-over-docker-desktop','single-shared-network','discord-alerts'];

async function filesUnder(relative) {
  const absolute = path.join(root, relative); const output = [];
  for (const entry of await readdir(absolute)) { const name = path.join(absolute, entry); const info = await stat(name); if (info.isDirectory()) output.push(...await filesUnder(path.relative(root, name))); else output.push(name); }
  return output;
}

test('all required service records and ADRs are present', async () => {
  const services = await read('lib/engineering/services.ts'); const decisions = await read('lib/engineering/decisions.ts');
  for (const slug of expectedServices) assert.match(services, new RegExp(`slug: '${slug.replaceAll('-', '\\-')}'`), `missing service ${slug}`);
  for (const slug of expectedDecisions) assert.match(decisions, new RegExp(`slug: '${slug.replaceAll('-', '\\-')}'`), `missing decision ${slug}`);
});

test('published engineering sources reject common secret shapes', async () => {
  const directories = ['app/engineering', 'components/engineering', 'content/engineering', 'lib/engineering', 'public/engineering'];
  const files = (await Promise.all(directories.map(filesUnder))).flat().filter((name) => !name.endsWith('.svg'));
  const forbidden = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /(?:discord(?:app)?\.com)\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/i, /(?:api[_-]?key|token|password)\s*[:=]\s*["'][^<\s][^"']{7,}["']/i, /cloudflared[^\n]{0,40}\.json/i];
  for (const file of files) { const body = await readFile(file, 'utf8'); for (const pattern of forbidden) assert.doesNotMatch(body, pattern, `${path.relative(root, file)} contains a secret-like value`); }
});

test('required local service marks and provenance labels exist', async () => {
  for (const icon of ['docker','grafana','homepage','immich','jellyfin','portainer','postgresql','prometheus','qbittorrent','radarr','sonarr','uptimekuma']) assert.ok((await stat(path.join(root, 'public/engineering/icons', `${icon}.svg`))).size > 100);
  const provenance = await read('components/engineering/Provenance.tsx'); for (const label of ['verified','inferred','proposed']) assert.match(provenance, new RegExp(label));
});

test('navigation, search, metadata, and sanitization are wired', async () => {
  assert.match(await read('app/api/search/route.ts'), /createSearchAPI\('simple'/);
  assert.match(await read('app/engineering/[...slug]/page.tsx'), /BreadcrumbList/);
  assert.match(await read('app/engineering/[...slug]/page.tsx'), /TechArticle/);
  assert.match(await read('.gitignore'), /^prompt\.txt$/m); assert.match(await read('.gitignore'), /^homelab\/$/m);
});

test('responsive and accessible documentation primitives are present', async () => {
  const css = await read('styles/engineering.css');
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /overflow-x:\s*auto/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /focus-visible/);
  const shell = await read('components/engineering/EngineeringShell.tsx');
  assert.match(shell, /aria-label="Engineering documentation"/);
  assert.match(shell, /aria-expanded=\{open\}/);
});
