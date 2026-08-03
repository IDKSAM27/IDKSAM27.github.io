// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default {
	...defineCloudflareConfig({
		// The portfolio and Engineering documents are prerendered at build time.
		// Serve that read-only cache from Workers Static Assets so those requests
		// do not spend the Free-plan CPU budget rendering pages at runtime.
		incrementalCache: staticAssetsIncrementalCache,
		enableCacheInterception: true,
	}),
	buildCommand: "npx next build",
};
