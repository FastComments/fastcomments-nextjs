#!/usr/bin/env node
// Builds the fastcomments-nextjs example as a static export.
// BUILD_DEMO=1 toggles example/next.config.mjs to set output: 'export'
// and basePath: '/commenting-system-for-nextjs'.
import { execSync } from 'node:child_process';
import { rmSync, renameSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const EXAMPLE = resolve(ROOT, 'example');
const OUT = resolve(ROOT, 'demo-dist');

const sh = (cmd, cwd = ROOT, env = {}) => {
    console.log('$', cmd, `(${cwd})`);
    execSync(cmd, { stdio: 'inherit', cwd, env: { ...process.env, ...env } });
};

// Library is consumed by the example via file:.. — build it first.
sh('npm ci');
sh('npm run build');

sh('npm ci', EXAMPLE);
sh('npx next build', EXAMPLE, { BUILD_DEMO: '1' });

rmSync(OUT, { recursive: true, force: true });
renameSync(resolve(EXAMPLE, 'out'), OUT);
console.log('Built fastcomments-nextjs demo at', OUT);
