const { execSync } = require('child_process');

try {
  console.log('[Build Config] Precompiling blog posts to JSON...');
  execSync('node scripts/compile-posts.mjs', { stdio: 'inherit' });
} catch (e) {
  console.error('[Build Config] Error precompiling blog posts:', e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

