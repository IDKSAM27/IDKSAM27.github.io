import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const lockfile = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));

const expected = {
  dependencies: {
    '@next/third-parties': '16.2.12',
    '@opennextjs/cloudflare': '1.20.2',
    'fumadocs-core': '16.14.0',
    'fumadocs-mdx': '15.2.2',
    'fumadocs-ui': '16.14.0',
    next: '16.2.12',
    react: '19.2.8',
    'react-dom': '19.2.8',
  },
  devDependencies: {
    eslint: '9.39.5',
    'eslint-config-next': '16.2.12',
    tailwindcss: '4.3.3',
    typescript: '6.0.3',
    wrangler: '4.118.0',
  },
};

for (const [group, packages] of Object.entries(expected)) {
  for (const [name, version] of Object.entries(packages)) {
    assert.equal(
      manifest[group]?.[name],
      version,
      `${name} must be pinned to ${version}; found ${manifest[group]?.[name] ?? 'missing'} in ${group}`,
    );
    assert.equal(
      lockfile.packages?.['']?.[group]?.[name],
      version,
      `${name} in package-lock.json does not match package.json; run npm install after resolving the manifest`,
    );
  }
}

assert.equal(manifest.packageManager, 'npm@10.9.4', 'Use the repository npm version recorded in packageManager');

const [nodeMajor, nodeMinor] = process.versions.node.split('.').map(Number);
assert.ok(
  (nodeMajor === 20 && nodeMinor >= 9) || nodeMajor === 21 || nodeMajor === 22,
  `Node ${process.versions.node} is unsupported; use Node >=20.9 and <23`,
);

console.log('Dependency contract is consistent: Next 16, React 19, Fumadocs 16, and OpenNext 1.20.2.');
