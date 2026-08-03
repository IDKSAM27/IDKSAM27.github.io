import { execSync } from 'node:child_process';
import { createMDX } from 'fumadocs-mdx/next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

try {
  execSync('node scripts/compile-posts.mjs', { stdio: 'inherit' });
} catch (error) {
  console.error('[Build Config] Unable to precompile blog posts.', error);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

initOpenNextCloudflareForDev();
