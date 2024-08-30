/** Copy VitePress docs for static serving inside SvelteKit */
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Get the root directory of the project
const __dirname = process.cwd();

const sourceDir = join(__dirname, 'docs', '.vitepress', 'dist');
const destDir = join(__dirname, 'static', 'docs');

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(sourceDir, destDir);

console.log('Documentation files copied successfully!');
