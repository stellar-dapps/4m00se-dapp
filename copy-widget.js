/** Copy widget to make it statically available and usable in demo */
import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sourcePath = join(__dirname, 'dist', 'widget', '4m00s.js');
const destPath = join(__dirname, 'static', 'widget', '4m00s.js');

mkdirSync(dirname(destPath), { recursive: true });

copyFileSync(sourcePath, destPath);

console.log('File copied successfully!');
