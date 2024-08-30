/** Copy widget bundle to make it statically available as a script for consumers */
import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

// Get the root directory of the project
const __dirname = process.cwd();

const sourcePath = join(__dirname, 'dist', 'widget', '4m00s.js');
const destPath = join(__dirname, 'static', 'widget', '4m00s.js');

mkdirSync(dirname(destPath), { recursive: true });

copyFileSync(sourcePath, destPath);

console.log('File copied successfully!');
