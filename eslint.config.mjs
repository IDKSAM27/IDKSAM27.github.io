import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  globalIgnores(['.next/**', '.open-next/**', '.wrangler/**', 'node_modules/**', 'homelab/**', 'prompt.txt']),
]);
