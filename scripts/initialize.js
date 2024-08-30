/**
 * Initialization script for using Soroban smart contracts as packages in the consuming Node (SvelteKit here) app code
 * Based on the flow from https://developers.stellar.org/docs/build/apps/dapp-frontend and https://github.com/stellar/soroban-astro-template
 * */
import 'dotenv/config';
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { sync as glob } from 'glob';

// Load environment variables starting with VITE_ into the environment,
// so we don't need to specify duplicate variables in .env
for (const key in process.env) {
  if (key.startsWith('VITE_')) {
    process.env[key.substring(5)] = process.env[key];
  }
}

console.log('###################### Initializing ########################');

// Get the root directory of the project
const __dirname = process.cwd();

// variable for later setting pinned version of soroban in "$(dirname/target/bin/soroban)"
const cli = 'stellar';

// Function to execute and log shell commands
function exe(command) {
  console.log(command);
  execSync(command, { stdio: 'inherit' });
}

function fundAll() {
  exe(`${cli} keys generate ${process.env.SOROBAN_ACCOUNT}`);
}

function removeFiles(pattern) {
  console.log(`remove ${pattern}`);
  glob(pattern).forEach((entry) => rmSync(entry));
}

function buildAll() {
  removeFiles(`${__dirname}/target/wasm32-unknown-unknown/release/*.wasm`);
  removeFiles(`${__dirname}/target/wasm32-unknown-unknown/release/*.d`);
  exe(`${cli} contract build`);
}

function filenameNoExtension(filename) {
  return path.basename(filename, path.extname(filename));
}

function deploy(wasm) {
  exe(`${cli} contract deploy --wasm ${wasm} --ignore-checks --alias ${filenameNoExtension(wasm)}`);
}

function deployAll() {
  const contractsDir = `${__dirname}/.soroban/contract-ids`;
  mkdirSync(contractsDir, { recursive: true });

  const wasmFiles = glob(`${__dirname}/target/wasm32-unknown-unknown/release/*.wasm`);

  wasmFiles.forEach(deploy);
}

function contracts() {
  const contractFiles = glob(`${__dirname}/.soroban/contract-ids/*.json`);

  return contractFiles
    .map((path) => ({
      alias: filenameNoExtension(path),
      ...JSON.parse(readFileSync(path))
    }))
    .filter((data) => data.ids[process.env.SOROBAN_NETWORK_PASSPHRASE])
    .map((data) => ({ alias: data.alias, id: data.ids[process.env.SOROBAN_NETWORK_PASSPHRASE] }));
}

function bind({ alias, id }) {
  exe(
    `${cli} contract bindings typescript --contract-id ${id} --output-dir ${__dirname}/packages/${alias} --overwrite`
  );
}

function bindAll() {
  contracts().forEach(bind);
}

function importContract({ id, alias }) {
  const outputDir = `${__dirname}/src/contracts/`;

  mkdirSync(outputDir, { recursive: true });

  const importContent =
    `import * as Client from '${alias}';\n` +
    `import { rpcUrl } from './util';\n\n` +
    `export default new Client.Client({\n` +
    `  ...Client.networks.${process.env.SOROBAN_NETWORK},\n` +
    `  rpcUrl,\n` +
    `${process.env.SOROBAN_NETWORK === 'local' || 'standalone' ? `  allowHttp: true,\n` : null}` +
    `});\n`;

  const outputPath = `${outputDir}/${alias}.ts`;

  writeFileSync(outputPath, importContent);

  console.log(`Created import for ${alias}`);
}

function importAll() {
  contracts().forEach(importContract);
}

// Calling the functions (equivalent to the last part of your bash script)
fundAll();
buildAll();
deployAll();
bindAll();
importAll();
