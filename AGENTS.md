# AGENTS.md — complete project handoff

This file is the primary context handoff for anyone working in this repository. Read it before inspecting or changing code. It records the product intent, user preferences, technical architecture, documentation model, known infrastructure facts, implementation status, validation results, security constraints, and remaining work.

## Project identity

- Repository: `IDKSAM27.github.io`
- Workspace path in the current Windows environment: `D:\IDKSAM27.github.io`
- Owner/portfolio subject: Sampreet Patil
- Production origin used by metadata: `https://sampreetpatil.com`
- Existing sitemap previously used `https://www.sampreetpatil.com`; the new generated sitemap consistently uses the non-`www` canonical origin.
- Deployment target: Cloudflare Workers through `@opennextjs/cloudflare`.
- This is an existing personal portfolio, not a greenfield documentation website.

## Owner’s non-negotiable product direction

The `/engineering` area is an additive extension to the existing portfolio.

- Preserve the existing homepage, blog, diagrams, portfolio content, section order, Header, Footer, Logo, theme behavior, animations, HomeLab widget, error pages, typography, colors, and mobile behavior.
- Do not redesign existing routes to match the documentation.
- Do not replace the portfolio with a documentation site.
- Do not add the future homepage Engineering showcase yet. The owner explicitly deferred the fancy homepage entry section until the documentation extension is complete and reviewed.
- When that future homepage section is requested, it should be a visually strong, portfolio-native entry point into `/engineering`, not a generic documentation card.
- `/engineering` should use the existing website’s visual language: BBH Sans Hegarty headings, Inter body copy, Pacifico accent/logo usage, the existing light/dark palette, existing Header and Footer, and the existing theme toggle.
- Documentation body text must remain comfortably readable even though the portfolio uses oversized display typography.
- The UI must be professional, editorial, and documentation-oriented.
- Avoid “AI-looking” UI: no repetitive rounded cards, dashboard grids, glassmorphism, excessive borders, generic gradients, giant empty hero cards, or decorative animation without purpose.
- Prefer typography, whitespace, thin rules, index rows, restrained navigation, and small colored annotations.
- Mobile behavior is a first-class requirement, not an afterthought.
- Use official or project-maintained SVG marks, bundle them locally, and never hotlink logos at runtime.
- Be conservative about personal expertise claims. A dependency or experiment is not automatically evidence of mastery.
- Be extremely careful with factual claims, current-state claims, security statements, and sensitive configuration.

## Current implementation status

The Engineering documentation extension has been implemented but not deployed or committed by the agent.

The current working tree is intentionally dirty. All uncommitted Engineering-related changes are part of the active implementation. Do not reset, checkout, delete, or overwrite them.

Implemented:

- Hybrid Next.js architecture: existing Pages Router remains; `/engineering` uses TypeScript and App Router.
- Next.js 16.2.12, React 19.2.8, Tailwind CSS 4.3.3, TypeScript 6.0.3, ESLint 9.39.5.
- Fumadocs Core/UI 16.14.0 and Fumadocs MDX 15.2.2.
- OpenNext Cloudflare 1.20.2.
- Self-hosted Fumadocs/Orama search endpoint at `/api/search`.
- Editorial responsive documentation shell.
- Engineering landing page.
- Homelab, Development, Infrastructure, Uses, and Decisions sections.
- Twenty-four typed service records and individual service pages.
- Thirteen ADR-style decision records and individual decision pages.
- More than 50 typed topic pages.
- Ninety-plus generated Engineering routes; the production build currently generates 114 total routes across App and Pages routers.
- Typed provenance labels: `verified`, `inferred`, and `proposed`.
- Lazy, theme-aware Mermaid rendering with strict security and source fallback.
- Canonical metadata, OpenGraph/Twitter metadata, `TechArticle` and `BreadcrumbList` JSON-LD.
- Generated App Router sitemap and robots routes.
- Locally bundled project SVG marks and a license/source note.
- Automated documentation integrity and secret-pattern tests.
- Windows-safe combined Next/OpenNext build script.

Explicitly not implemented:

- The future homepage Engineering showcase/entry point.
- Deployment or publishing.
- Any change to the actual homelab.
- Credential rotation; the owner must rotate any live credentials that existed in the private snapshot.
- Cloudflare Access policies; their configuration was not supplied.
- Runtime backup jobs, systemd timers, hardening changes, or infrastructure mutations.

## Repository architecture

### Existing portfolio

- `pages/` contains the pre-existing Pages Router site.
- `components/` contains the existing portfolio UI.
- `styles/globals.css` is the shared legacy/global styling foundation.
- `posts/`, `data/posts.json`, and `scripts/compile-posts.mjs` power the existing blog.
- Existing custom error routes live below `pages/errors/`.
- Existing visual diagrams live below `pages/diagrams/`.
- Existing components are JavaScript and should remain operationally unchanged unless a compatibility fix is necessary.

### Engineering extension

- `app/layout.tsx`: App Router root, fonts, Fumadocs root provider, theme/search integration.
- `app/engineering/layout.tsx`: Engineering metadata, shared shell, and scoped Engineering CSS.
- `app/engineering/page.tsx`: Engineering landing page.
- `app/engineering/[...slug]/page.tsx`: static route resolution for topics, services, service catalog, and decisions.
- `app/api/search/route.ts`: Fumadocs simple/Orama search API.
- `app/sitemap.ts`: combines existing public routes with all Engineering navigation routes.
- `app/robots.ts`: generated robots response; allows public pages and disallows `/api/` indexing.
- `components/engineering/EngineeringShell.tsx`: desktop sidebar, mobile slide-over, shared portfolio Header/Footer, search trigger.
- `components/engineering/DocumentFrame.tsx`: breadcrumbs, article header, TOC, section wrappers, notices, definition lists, previous/next links, last-reviewed footer.
- `components/engineering/TopicDocument.tsx`: canonical renderer for topic pages.
- `components/engineering/ServiceDocument.tsx`: canonical detailed service template.
- `components/engineering/DecisionDocument.tsx`: ADR renderer.
- `components/engineering/ServiceCatalog.tsx`: editorial, grouped service index.
- `components/engineering/MermaidDiagram.tsx`: client-only Mermaid renderer.
- `components/engineering/Provenance.tsx`: provenance label and descriptions.
- `components/engineering/SearchButton.tsx`: opens Fumadocs search UI.
- `components/engineering/ServiceMark.tsx`: local project SVG or text-monogram fallback.
- `styles/engineering.css`: Engineering layout, typography, responsiveness, accessibility, tables, diagrams, navigation, and dark mode.
- `lib/engineering/services.ts`: canonical sanitized service metadata.
- `lib/engineering/topics.ts`: canonical long-form topic content and Mermaid sources.
- `lib/engineering/decisions.ts`: canonical ADR data.
- `lib/engineering/navigation.ts`: full ordered documentation tree.
- `lib/engineering/index.ts`: search index records and exports.
- `lib/engineering/types.ts`: typed content model.
- `source.config.ts`: typed Fumadocs MDX collection schema.
- `content/engineering/index.mdx`: collection landing/methodology content.
- `mdx-components.tsx`: Fumadocs MDX component integration.
- `public/engineering/icons/`: locally bundled Simple Icons SVGs and `LICENSE.md`.
- `scripts/engineering-content.test.mjs`: content, secrets, metadata, navigation, local marks, accessibility, and responsive primitive checks.

## Important framework/configuration changes

- `jsconfig.json` was replaced by strict `tsconfig.json` with JavaScript compatibility enabled.
- `next.config.js` was replaced by `next.config.mjs`.
- `postcss.config.js` was replaced by `postcss.config.mjs`.
- `eslint.config.mjs` is the new flat ESLint configuration.
- Tailwind 3 directives were migrated to Tailwind 4 imports and sources in `styles/globals.css`.
- `tailwind.config.js` retains the established portfolio tokens and now includes `app`, `content`, and `lib` paths.
- `next.config.mjs` retains blog precompilation, wraps the config with Fumadocs MDX, initializes OpenNext development support, uses a single worker/CPU for reliable builds, and sets `output: 'standalone'`.
- The build uses webpack deliberately on Windows because Turbopack’s OpenNext trace contains symlinks that Windows rejects without elevated symlink support.

### Cloudflare Free-tier runtime safeguards

The production site runs on the Cloudflare Workers Free plan, whose per-request CPU budget is much smaller than a typical Next.js server runtime. The Engineering extension is therefore deliberately build-heavy and runtime-light:

- `open-next.config.ts` uses OpenNext's read-only `staticAssetsIncrementalCache` with `enableCacheInterception: true`. Prerendered page and RSC responses are bundled as Workers Static Assets instead of being rendered repeatedly inside the Worker.
- `app/engineering/[...slug]/page.tsx` exports `dynamic = 'force-static'` and `dynamicParams = false`. Every valid documentation slug must come from `generateStaticParams`; unknown slugs fail closed instead of triggering on-demand rendering.
- Every internal Next.js `Link` inside the Engineering documentation passes `prefetch={false}`. This is intentional. The dense navigation tree previously caused bursts of concurrent `?_rsc=...` prefetch requests that could exceed the Free-plan CPU limit. Navigation still uses normal client transitions when a visitor clicks.
- `EngineeringShell` also passes `prefetch={false}` into the shared `Header` and `MobileNav`; their default behavior elsewhere is unchanged. This prevents the Engineering shell from repeatedly prefetching `/`, `/blog`, and `/engineering` through its portfolio navigation.
- Search is static and client-side. `app/api/search/route.ts` exports `server.staticGET` with `revalidate = false`, while `app/layout.tsx` configures Fumadocs search as `type: 'static'` with `preload: false`. The search index is generated once at build time, fetched only when search is opened, and queried in the browser.
- `public/_headers` gives immutable Next.js build assets a one-year cache lifetime.
- No R2 bucket, Durable Object, cache queue, or paid Workers plan is required for this read-only site configuration.
- `scripts/engineering-content.test.mjs` rejects accidental removal of the static cache adapter, static route constraints, static search mode, or Engineering link prefetch suppression.

The validated OpenNext build packages 112 prerender-cache files, including `/engineering/development/cloud` and `/api/search`, under `.open-next/cache` and reports `Bundling cache assets` before producing `.open-next/worker.js`.

On Windows, a running `npm run dev` process can keep `.open-next/assets` open through the OpenNext development integration. Stop the repository's development server before running the production OpenNext build, otherwise packaging can fail with `EBUSY: resource busy or locked, rmdir '.open-next/assets'`. This is a local file-lock issue, not an application compilation failure.

Current scripts:

```text
npm run check:deps # validate the pinned framework/peer dependency contract
npm run dev        # Next development server
npm run build      # next build --webpack, then OpenNext --skipBuild
npm run build:next # standard Next.js webpack production build
npm run test:docs  # engineering content/security tests
npm run lint       # ESLint flat config
npm run verify     # dependency contract, docs tests, TypeScript, and ESLint
npm run preview    # build then OpenNext/Workers preview
npm run deploy     # build then Cloudflare deploy
npm run upload     # build then Cloudflare upload
```

Do not casually switch the production build back to Turbopack on Windows. The earlier direct OpenNext/Turbopack build completed all Next.js pages but failed at the final bundle stage with an `EPERM` symlink error. The webpack + standalone + `--skipBuild` path completes successfully.

### Dependency/install contract

- Core framework packages are deliberately exact-pinned, not caret-ranged.
- The compatible matrix is Next.js 16.2.12, React/React DOM 19.2.8, Fumadocs Core/UI 16.14.0, Fumadocs MDX 15.2.2, OpenNext Cloudflare 1.20.2, and ESLint Config Next 16.2.12.
- `.npmrc` enables exact saves, strict engine checks, and strict peer resolution; it explicitly does not enable legacy peer behavior.
- `packageManager` records npm 10.9.4 and `engines` accepts Node 20.9 through Node 22.
- `scripts/check-dependency-contract.mjs` compares the critical versions in `package.json` and the root of `package-lock.json` and rejects mixed-generation edits.
- `predev` and `prebuild` run that contract automatically.
- A normal `npm install` must succeed. Never normalize `--force` or `--legacy-peer-deps` as project setup instructions.
- Prefer `npm ci` for clean CI/deployment installs and `npm install` only when intentionally changing the lockfile.

## Existing Header compatibility change

`components/Header.js` and `components/HeaderButton.js` were minimally updated for hybrid routing:

- `Header` accepts `homeHref` and `smoothScroll` props.
- Existing Pages Router behavior keeps `smoothScroll=true` by default.
- Engineering passes `smoothScroll={false}` because the legacy `ScrollLink` uses `next/router`, which cannot run under App Router.
- The rendered appearance and default legacy behavior remain unchanged.
- Do not replace the shared Header or Footer with a separate documentation imitation.

## Visual design system

Existing portfolio palette retained:

- Text light: `#020617`
- Text dark: `#E2E8F0`
- Accent light: `#4E5C58`
- Accent dark: `#FDE047`
- Main light background: `#F9F6F1`
- Main dark background: `#212121`
- Secondary light mint: `#BFD8D2`
- Skills light rose: `#E7CCCC`
- Projects light blue: `#A2C4F2`
- Contact light violet: `#D9C8E2`
- Homelab light: `#E2ECE9`
- Dark equivalents remain in `tailwind.config.js`.

Fonts:

- Heading: BBH Sans Hegarty from `@fontsource/bbh-sans-hegarty`.
- Body: Inter through `next/font/google`.
- Accent/logo: Pacifico through `next/font/google`.

Engineering layout behavior:

- Desktop: restrained left navigation rail, readable central article, lightweight right TOC where space permits.
- Narrow desktop/tablet: navigation rail plus full-width article; inline TOC replaces right TOC.
- Mobile below 768px: single-column content, sticky action bar, slide-over docs navigation, horizontal inline TOC, scrollable tables/code/diagrams.
- Primary touch controls target at least 44px.
- Visible focus rings are provided.
- `prefers-reduced-motion` disables nonessential Engineering transitions.
- Mermaid canvases are horizontally pannable, and source is available in `<details>`.
- Tables and long code values scroll or wrap without forcing page-wide horizontal overflow.
- Dark mode uses the same global class-based theme as the portfolio.
- Service project marks are offset below the Architecture section heading rather than crowding its underline.
- Definition lists reserve a wider key column, a responsive 2–3.25rem column gap, and safe key wrapping so long domain names cannot collide with their values.

Do not convert this into a card-grid dashboard. The current design intentionally uses large editorial headlines, index rows, whitespace, thin separators, and small provenance dots.

## Documentation architecture

Top-level routes:

- `/engineering`
- `/engineering/homelab`
- `/engineering/development`
- `/engineering/infrastructure`
- `/engineering/uses`
- `/engineering/decisions`

### Homelab topics

- Architecture overview
- Host infrastructure
- Docker network
- Cloudflare Tunnel
- Domain map
- Container communication
- Service dependency graph
- Monitoring stack
- Logging stack
- Media stack
- Photo stack
- Music stack
- Automation stack
- Storage layout
- Filesystem layout
- Backup strategy
- Recovery strategy
- Operations
- Custom scripts
- Security model
- Performance
- Roadmap
- Service catalog

### Development topics

- Languages
- Frameworks
- Backend engineering
- AI and machine learning
- Security engineering
- Tooling
- Editor setup
- Linux development
- Docker development
- Cloud
- Development workflow

### Infrastructure topics

- Cloudflare
- Docker
- Monitoring
- Observability
- Security
- Automation

### Uses topics

- ThinkPad T480
- Hardware
- Arch Linux
- i3 and Hyprland
- Vim and Alacritty
- Software
- CLI tools

### Decision records

The 13 implemented ADRs are:

1. Use Cloudflare Tunnel instead of opening inbound ports.
2. Use Docker Compose instead of Kubernetes.
3. Use Arch Linux for the host.
4. Use Grafana Alloy instead of Promtail.
5. Use Loki instead of Elasticsearch.
6. Use Jellyfin instead of Plex.
7. Use Navidrome instead of Plexamp.
8. Use Immich instead of Google Photos as the primary library.
9. Use Prometheus instead of Datadog.
10. Use Homepage instead of Homarr.
11. Use Portainer instead of Docker Desktop on the server.
12. Use a shared homelab bridge network.
13. Use Discord for operational alerts.

ADR rationale is labeled as reconstructed/inferred, never as a direct historical quote from the owner.

## Provenance model

Every current-state or recommendation claim should be classifiable as one of:

- `verified`: directly supported by supplied configuration, the existing portfolio, an explicit owner statement, or a primary upstream reference.
- `inferred`: derived from an upstream default, a cautious reconstruction, or a clearly labeled representative assumption.
- `proposed`: a recommendation, target state, future improvement, or runbook that is not evidence of a deployed control.

Rules:

- Do not silently convert inferred material into verified material.
- Do not describe backup, recovery, hardening, monitoring additions, or roadmap work as implemented unless new evidence is supplied.
- Operational pages should distinguish current state from proposed runbooks.
- Exact app-internal settings remain unverified when their databases/configuration were not provided.
- Cloudflare Tunnel routing can be verified from the tunnel configuration. Cloudflare Access cannot be verified from that file because Access policies live elsewhere.
- Application authentication may be called inferred only when upstream defaults support it and local configuration does not override it.
- Each changing technical page records a last-reviewed date; the current review date is 2026-08-03.

## Private research sources and security rules

The repository root contains or may contain these intentionally ignored private inputs:

- `prompt.txt`
- `homelab/`

They are excluded in `.gitignore` and must never be committed.

The raw `homelab/` snapshot contains private configuration, runtime databases/logs, and secret-bearing values. It is research input only.

Strict rules:

- Never publish API keys, access tokens, usernames, passwords, webhooks, salts, private database contents, log contents, tunnel credentials, credential paths, cookies, or `.env` values.
- Never copy raw Compose/configuration files into public assets or MDX without deliberate sanitization.
- Never add `prompt.txt` or `homelab/` to Git.
- Never put raw private content into generated search data.
- Do not probe live services to infer deployed security state.
- Do not claim internet research verifies the owner’s running deployment. Internet research only verifies upstream documented behavior/defaults.
- Any previously exposed live secrets in the snapshot must be rotated by the owner separately. Documentation only guarantees non-publication.
- Variable names may be documented where useful; values must be omitted or written as `<redacted>`.
- The automated test scans the published Engineering sources for common private key, webhook, credential, and tunnel credential patterns.
- Before committing future documentation changes, run `npm run test:docs`.

## Verified homelab architecture

The following facts came from the supplied configuration or explicit owner context and are intentionally represented in the typed registries:

- Single Arch Linux host.
- Docker Engine and multiple independent Docker Compose projects.
- `cloudflared` runs as a native systemd service, not as a container.
- No Nginx, Caddy, Traefik, or other local reverse proxy is documented.
- Cloudflare Tunnel routes public hostnames to host loopback/host-published ports.
- The shared external Docker bridge is named `homelab`.
- Its stated subnet is `172.26.0.0/16`; the network creation command was not supplied.
- Immich also uses its Compose-managed `immich_default` network.
- Homepage joins both `homelab` and `immich_default`.
- Immich services join both `immich_default` and `homelab`.
- Immich machine learning is disabled/commented out.
- `dev.sampreetpatil.com`, `code.sampreetpatil.com`, and `public.sampreetpatil.com` are only partially documented because their service definitions were absent.
- Exact Uptime Kuma monitors are not supplied.
- Exact Grafana dashboards and data-source runtime state are not fully supplied.
- Application-internal settings stored in runtime databases remain unverified.
- Backup schedules/jobs were not supplied.
- systemd unit/timer definitions for custom scripts were not supplied.
- No backup or recovery process may be called active based on the current evidence.

## Domain and host-port map

The supplied Cloudflare Tunnel map is documented as follows:

- `code.sampreetpatil.com` → `127.0.0.1:8080`; service definition absent.
- `public.sampreetpatil.com` → `127.0.0.1:8081`; service definition absent.
- `dev.sampreetpatil.com` → `127.0.0.1:8787`; service definition absent.
- `music.sampreetpatil.com` → Navidrome on host port 4533.
- `photos.sampreetpatil.com` → Immich on host port 2283.
- `dash.sampreetpatil.com` → Homepage on host port 3000.
- `pdf.sampreetpatil.com` → Stirling PDF, host 8082 to container 8080.
- `jellyfin.sampreetpatil.com` → Jellyfin on host/container 8096.
- `qb.sampreetpatil.com` → qBittorrent, host 8083 to container 8080.
- `prowlarr.sampreetpatil.com` → Prowlarr on 9696.
- `tv.sampreetpatil.com` → Sonarr on 8989.
- `movies.sampreetpatil.com` → Radarr on 7878.
- `kuma.sampreetpatil.com` → Uptime Kuma on 3001.
- `grafana.sampreetpatil.com` → Grafana, host 3002 to container 3000.
- `prometheus.sampreetpatil.com` → Prometheus on 9090.
- `alerts.sampreetpatil.com` → Alertmanager on 9093.
- `loki.sampreetpatil.com` → Loki on 3100.
- `blackbox.sampreetpatil.com` → Blackbox Exporter on 9115.
- `portainer.sampreetpatil.com` → Portainer on 9000.
- `logs.sampreetpatil.com` → Dozzle, host 8088 to container 8080.
- Tunnel configuration ends in an HTTP 404 catch-all.

These routes verify reachability intent, not Cloudflare Access policy presence.

## Service inventory

There are 24 typed service/platform pages below `/engineering/homelab/services/`:

1. Homepage
2. Immich
3. Jellyfin
4. Navidrome
5. Sonarr
6. Radarr
7. Prowlarr
8. qBittorrent
9. Grafana
10. Prometheus
11. Alertmanager
12. Loki
13. Grafana Alloy
14. Blackbox Exporter
15. Node Exporter
16. cAdvisor
17. Uptime Kuma
18. Portainer
19. Dozzle
20. Diun
21. Stirling PDF
22. Valkey
23. PostgreSQL
24. Docker Engine

The `ServiceDoc` template requires:

- Overview
- Purpose
- Rationale
- Architecture/features
- Project mark or monogram
- Runtime/container
- Image
- Ports
- Volumes
- Environment variable names
- Storage
- Networks
- Internal DNS
- Public URL
- Dependencies
- Dependents
- Monitoring
- Logging
- Security
- Performance
- Known issues
- Troubleshooting
- Alternatives
- Future improvements
- Primary upstream reference

Do not create bespoke, structurally inconsistent service pages. Extend the type and canonical renderer when a field is genuinely missing.

## Critical service-specific facts

### Prometheus configuration drift

- The supplied Prometheus Compose service appears to mount Alloy configuration/data/socket/log paths rather than the supplied `prometheus.yml` and alert rules.
- The expected `/prometheus` TSDB persistence mount is also absent.
- Document this as apparent configuration drift.
- Do not claim the supplied scrape configuration or alert rules are active.
- Scrape interval in the supplied Prometheus configuration is 15 seconds, but activity remains dependent on correcting/verifying the mount.
- Prometheus has a public tunnel route.
- Prometheus does not provide an application login by default, and upstream warns against public exposure of its HTTP endpoints.
- Proposed hardening: remove the public hostname or protect it with verified identity enforcement.

### Loki

- Loki is pinned to version 3.5.5 in the supplied service record.
- `auth_enabled` is false.
- Loki has no built-in authentication layer.
- Retention is 48 hours.
- Storage is local filesystem/TSDB on the host.
- Replication factor is one.
- A public tunnel route points at port 3100.
- Do not present Loki logs as a backup or durable audit archive.

### Alloy

- Collects Docker logs, systemd journal entries, Docker event logs, and cleanup logs.
- Docker discovery refreshes every five seconds.
- Journald collection starts with a 24-hour maximum age.
- Custom files include Docker event and cleanup logs.
- Adds operational labels before forwarding to Loki.
- Docker socket and journal mounts are broad read access even when mounted read-only.
- The Alloy UI is host-published at 12345 but no public tunnel hostname was supplied.
- The existing relabel/discovery wiring should be verified in Alloy diagnostics; do not assert labels work without runtime evidence.

### Immich

- Immich server is active.
- Immich machine-learning service is commented out/disabled.
- Dependencies are Valkey and PostgreSQL.
- Immich uses `immich_default` and `homelab`.
- PostgreSQL storage and Immich asset storage must be recovered consistently.
- Do not imply photos are backed up because Immich is running.
- Upstream warns Immich should not be the only copy of photos/videos.

### PostgreSQL

- Immich’s durable metadata database.
- Not host-published.
- Credentials come from the private excluded environment file.
- Data checksums are enabled at initialization in the documented configuration.
- No `postgres_exporter` is configured.
- No verified database backup job exists.

### Valkey

- Used as Immich’s queue/cache backend.
- Not host-published.
- Joins both `immich_default` and `homelab` in the supplied configuration.
- No persistence or explicit memory limit is documented.

### Media stack

- Prowlarr supplies indexer coordination to Sonarr and Radarr.
- Sonarr manages television acquisition.
- Radarr manages movie acquisition.
- qBittorrent performs downloads.
- Completed media is consumed by Jellyfin.
- Media paths and ownership must remain consistent across containers.
- Jellyfin was chosen instead of Plex in the reconstructed ADR.

### Navidrome

- Music-specific server with Subsonic-compatible clients.
- Source music library is mounted read-only.
- Hourly scans are documented.
- Session lifetime is 48 hours in the supplied config.
- Application database/data directory requires backup; the raw database must not be published.

### Management and observability surfaces

- Portainer has application authentication but Docker socket access is effectively root-equivalent.
- Dozzle has no authentication provider evidenced in the supplied Compose config.
- Prometheus, Alertmanager, Loki, Blackbox Exporter, and some exporter/management APIs should not be assumed safe merely because they are behind a tunnel.
- Blackbox Exporter accepts probe targets through request parameters and can be abused for network requests when exposed.
- Cloudflare Access is a proposed control unless policy exports are later supplied.

### Docker logging

- Docker JSON-file logs are collected by Alloy.
- Selected services explicitly rotate at 10 MiB × 3 files.
- Other services rely on daemon or image defaults where no rotation configuration was supplied.
- Do not generalize the explicit rotation limit to every service.

### Automation

- Diun checks image updates on a six-hour schedule and sends Discord notifications.
- The private snapshot contained a secret Discord webhook. It is not published and should be rotated/externalized.
- Diun notifies; it does not automatically deploy updates.
- Custom scripts capture Docker lifecycle events and perform targeted cleanup.
- Their systemd units/timers are absent, so execution schedules remain unverified.

## Uses/engineering profile

Owner-confirmed hardware:

- Lenovo ThinkPad T480.
- 24 GB RAM.
- 256 GB SSD.

Representative assumption, explicitly labeled inferred:

- Intel Core i5-8250U.
- Intel UHD Graphics 620.

Do not claim a specific display, battery capacity, camera, fingerprint reader, WWAN module, keyboard backlight, discrete GPU, or other optional T480 component. Lenovo sold multiple configurations.

Environment explicitly supplied by the owner:

- Arch Linux
- i3
- Hyprland
- Vim
- Alacritty
- A keyboard-driven, explicit-configuration workflow

Development evidence comes from the existing portfolio, public projects referenced by it, blog topics, and repository dependencies. Current documentation conservatively covers:

- Python
- JavaScript and TypeScript
- Rust
- Dart
- Java
- C++
- SQL
- Familiarity with Go
- Backend/API engineering
- Applied AI/ML
- PyTorch and TensorFlow
- RAG and GraphRAG
- LangChain and LLM APIs
- Pandas, NumPy, scikit-learn
- OpenCV and object tracking
- Web and mobile development
- Linux, Docker, security-oriented projects, cloud tooling, and CLI work

Use language such as “portfolio evidence includes,” “used in projects,” or “familiar with” unless the portfolio provides stronger evidence. Do not inflate proficiency.

## Documentation and research standards

The content model follows:

- Diátaxis for separating explanation, reference, how-to/runbook, and tutorial intent.
- Google developer documentation style for clarity, directness, headings, and terminology.
- Primary upstream documentation for technical facts.
- A last-reviewed date for facts likely to change.

Important primary references already used:

- Fumadocs manual/search docs: `https://www.fumadocs.dev/docs/`
- OpenNext Cloudflare compatibility: `https://opennext.js.org/cloudflare`
- Docker docs: `https://docs.docker.com/`
- Cloudflare Tunnel docs: `https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/`
- Prometheus security model: `https://prometheus.io/docs/operating/security/`
- Loki authentication: `https://grafana.com/docs/loki/latest/operations/authentication/`
- Grafana Alloy docs: `https://grafana.com/docs/alloy/latest/`
- Immich docs: `https://docs.immich.app/`
- Lenovo T480 PSREF: `https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_T480/ThinkPad_T480_Spec.PDF`
- ArchWiki: `https://wiki.archlinux.org/`
- i3 guide: `https://i3wm.org/docs/userguide.html`
- Hyprland Wiki: `https://wiki.hypr.land/`
- Vim help: `https://vimhelp.org/`
- Alacritty config docs: `https://alacritty.org/config-alacritty.html`

For future research:

- Browse current official documentation because versions, defaults, and security guidance change.
- Prefer official project documentation, specifications, and repositories over blogs or SEO summaries.
- Internet research can establish upstream defaults but not the state of the private deployment.
- Never probe the owner’s public service URLs.

## Search behavior

Fumadocs self-hosted simple/Orama search indexes:

- Page titles
- Descriptions
- Topic body content
- Section headings
- Service names
- Container names
- Image names
- Environment variable names
- Dependencies and dependents
- Domain names and URLs
- Security/performance/issues/alternatives/future fields
- ADR context, alternatives, rationale, tradeoffs, consequences, and revisit conditions

Search API: `/api/search?query=<term>`.

A verified local query for `loki` returned the Loki service, Loki ADR, logging stack, Alloy, domain map, observability, dependency graph, and related pages.

Do not add private values to `indexedPages`.

## Mermaid behavior

- Mermaid is dynamically imported client-side.
- `securityLevel: 'strict'` is mandatory.
- Theme follows `next-themes` resolved theme.
- Diagrams have accessible titles and descriptions.
- Source is always available as a readable fallback.
- Current diagrams cover overall architecture, network topology, monitoring, logging, media, photos, music, and public/request relationships.
- Avoid diagrams that merely repeat a two-item list; use them for actual multi-component relationships.

## Local project marks

- SVG marks are copied from the locally installed `simple-icons` package.
- They live under `public/engineering/icons/`.
- `public/engineering/icons/LICENSE.md` records provenance and CC0 catalog licensing context.
- Bundled marks include Cloudflare, Docker, Grafana, Homepage, Immich, Jellyfin, Portainer, PostgreSQL, Prometheus, qBittorrent, Radarr, Sonarr, and Uptime Kuma.
- Prometheus-family exporters may reuse the Prometheus ecosystem mark.
- cAdvisor may use Docker as an ecosystem identifier.
- Services without a legitimate bundled mark use a text monogram.
- Do not invent fake brand logos or hotlink remote SVGs.

## Validation already completed

Successful production build:

```text
npm run build
```

Result:

- Next.js 16.2.12 webpack production build passed.
- TypeScript passed during build.
- 114 routes generated.
- Existing Pages Router homepage, blog, diagrams, and error routes built.
- Engineering landing and 90-plus Engineering static paths built.
- Search remains a dynamic route handler.
- OpenNext Cloudflare bundle completed.
- Worker generated at `.open-next/worker.js`.

Successful automated tests:

```text
npm run test:docs
```

Current result: 5/5 passing.

Tests cover:

- All required service records.
- All 13 ADR slugs.
- Common secret patterns across published Engineering sources/assets.
- Required local marks.
- All provenance labels.
- Search API wiring.
- `TechArticle` and `BreadcrumbList` metadata wiring.
- Git exclusion of private source material.
- Mobile breakpoint CSS.
- 44px touch targets.
- Horizontal overflow primitives.
- Reduced-motion support.
- Focus-visible styles.
- Accessible navigation labels and state.

Other successful validation:

- `npx tsc --noEmit`
- `npm run lint` with zero errors.
- HTTP 200 checks for `/`, `/blog`, `/engineering`, representative service/Uses/ADR routes, `/api/search`, `/sitemap.xml`, and `/robots.txt`.
- `git diff --check` returned no patch whitespace errors.
- Existing homepage source contains no new Engineering entry point.

Known lint warnings are pre-existing or outside the new Engineering implementation:

- One missing effect dependency in `HomeLabWidget.js`.
- Existing raw `<img>` warnings in Skills and diagram pages.
- Anonymous default export warnings in OpenNext and PostCSS config.

Do not opportunistically rewrite legacy animation components merely to remove new React lint warnings unless the owner asks. The flat config intentionally disables newly introduced React rules for legacy JS where changing behavior would create regression risk.

## Browser/visual QA status

An interactive in-app browser was requested for viewport QA, but the browser runtime exposed no available browser backend in the implementation session. Do not claim screenshots or true browser-based visual verification were completed.

Static responsive/accessibility checks and HTTP route checks passed, but before deployment a real browser pass should still cover approximately:

- 360px light and dark
- 390px light and dark
- 768px light and dark
- 1024px light and dark
- 1440px light and dark

Manual/browser checklist:

- Homepage visual regression.
- Blog and diagrams visual regression.
- Engineering desktop navigation rail.
- Tablet inline TOC behavior.
- Mobile slide-over open/close/backdrop behavior.
- Search trigger and keyboard shortcut.
- Search result navigation.
- Theme switching without hydration/layout issues.
- Mermaid rendering in both themes.
- Mermaid horizontal pan/source fallback.
- Tables and code blocks on narrow screens.
- Long domain names and image names.
- Heading anchor scrolling.
- Previous/next links.
- Keyboard focus order and visible focus.
- 44px touch targets.
- Screen-reader landmarks and accessible names.
- Reduced motion.
- Horizontal page overflow.
- Broken or invisible SVGs.
- Cumulative layout shift.
- Search dialog contrast.

## Build warnings and dependency audit context

The successful build still reports these non-blocking warnings:

- Existing nested reserved page warning for `/errors/_error`; this predates Engineering.
- Fumadocs MDX webpack cache cannot statically parse one dynamic import for dependency invalidation.
- OpenNext warns that Windows support is not guaranteed; the generated bundle nevertheless completes with the webpack workflow.

Dependency audit:

- The repository is pinned to the latest stable Next.js available during implementation: 16.2.12.
- npm’s advisory database still reports high-severity advisories whose affected range includes the current latest stable Next.js and its bundled PostCSS/Sharp stack, plus brace-expansion in OpenNext build tooling.
- `npm audit fix` updated to the latest stable packages but cannot make the audit clean without moving beyond supported stable releases or forcing risky overrides.
- Do not use `npm audit fix --force` blindly.
- Recheck the audit when a newer stable Next.js/OpenNext release is available, then rebuild and retest.

## Git and generated files

Ignored private/generated entries include:

- `prompt.txt`
- `homelab/`
- `.source/`
- `*.tsbuildinfo`
- Standard Next/OpenNext build outputs already covered by existing ignore rules.

The old static `public/sitemap.xml` and `public/robots.txt` were deliberately removed and replaced by typed App Router routes. Do not restore both static and dynamic versions because they would conflict.

`next-env.d.ts` is newly generated and should normally be committed in a Next.js TypeScript project.

Do not commit `.next`, `.open-next`, `.source`, private snapshots, logs, databases, or environment files.

## Safe workflow for the next agent/chat

1. Read this file fully.
2. Run `git status --short` before editing; preserve the current dirty Engineering implementation.
3. Read the specific canonical registry/component relevant to the requested change.
4. Do not reread or publish private snapshot secrets unless the owner explicitly asks for a configuration audit; even then, sanitize all outputs.
5. Run `npm run test:docs` after any content/metadata/navigation change.
6. Run `npx tsc --noEmit` after TypeScript changes.
7. Run `npm run lint` after component/config changes.
8. Run `npm run build` before handoff if routing, dependencies, MDX, metadata, or build configuration changed.
9. Browser-test real breakpoints when a browser backend is available.
10. Do not deploy, commit, push, or create a PR unless the owner explicitly asks.

## Likely next request

The most likely follow-up is a visual review/fix pass followed by the deferred homepage Engineering showcase.

When implementing that showcase:

- Keep all existing homepage sections and order unless the owner explicitly approves a placement change.
- Use the portfolio’s expressive visual language, not the Engineering sidebar/page layout copied onto the homepage.
- Create a distinct, polished entry into `/engineering` with a concise explanation of the personal cloud/engineering field notes.
- Reuse existing animation practices with reduced-motion support.
- Avoid a generic card grid.
- Test the homepage at all existing responsive widths.
- Do not expose infrastructure details, domains, or security warnings directly in a promotional homepage teaser unless deliberately selected.

## Definition of done for this extension

The Engineering documentation is ready for deployment only when:

- All current typed routes build.
- Search returns relevant results.
- No secrets are present in source, search output, generated assets, or bundle-visible content.
- No unsupported current-state claims are introduced.
- All internal links and project marks work.
- Existing portfolio routes remain unchanged in appearance and behavior.
- Mobile navigation, search, tables, code, diagrams, and theme switching pass real browser testing.
- Light/dark contrast and focus states are acceptable.
- The owner reviews the documentation tone and approves the content.
- Current dependency advisories are reviewed against the latest stable releases.

Until the owner explicitly requests it, deployment and the homepage Engineering showcase remain out of scope.
