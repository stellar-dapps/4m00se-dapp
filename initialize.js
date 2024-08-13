import 'dotenv/config';
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { sync as glob } from 'glob';

/* Based on the flow from https://developers.stellar.org/docs/build/apps/dapp-frontend and https://github.com/stellar/soroban-astro-template */

// Load environment variables starting with VITE_ into the environment,
// so we don't need to specify duplicate variables in .env
for (const key in process.env) {
  if (key.startsWith('VITE_')) {
    process.env[key.substring(5)] = process.env[key];
  }
}

console.log('###################### Initializing ########################');

// Get dirname (equivalent to the Bash version)
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

// Function to check if a command exists
function commandExists(command) {
  try {
    execSync(`command -v ${command}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Install Rust if not already installed
if (!commandExists('rustup')) {
  console.log('Installing Rust...');
  execSync('curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y', { stdio: 'inherit' });
  execSync('source $HOME/.cargo/env', { stdio: 'inherit' });
}

// Add the wasm32-unknown-unknown target if not already added
if (!execSync('rustup target list').toString().includes('wasm32-unknown-unknown')) {
  console.log('Adding wasm32-unknown-unknown target...');
  execSync('rustup target add wasm32-unknown-unknown', { stdio: 'inherit' });
}

// Install the Stellar CLI if not already installed
if (!commandExists('stellar')) {
  console.log('Installing Stellar CLI...');
  execSync('cargo install --locked stellar-cli --features opt', { stdio: 'inherit' });
  execSync('source $HOME/.cargo/env', { stdio: 'inherit' });
}

// Ensure the environment variables are sourced
execSync('source $HOME/.cargo/env', { stdio: 'inherit' });

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
  removeFiles(`${dirname}/target/wasm32-unknown-unknown/release/*.wasm`);
  removeFiles(`${dirname}/target/wasm32-unknown-unknown/release/*.d`);
  exe(`${cli} contract build`);
}

function filenameNoExtension(filename) {
  return path.basename(filename, path.extname(filename));
}

function deploy(wasm) {
  exe(`${cli} contract deploy --wasm ${wasm} --ignore-checks --alias ${filenameNoExtension(wasm)}`);
}

function deployAll() {
  const contractsDir = `${dirname}/.soroban/contract-ids`;
  mkdirSync(contractsDir, { recursive: true });

  const wasmFiles = glob(`${dirname}/target/wasm32-unknown-unknown/release/*.wasm`);

  wasmFiles.forEach(deploy);
}

function contracts() {
  const contractFiles = glob(`${dirname}/.soroban/contract-ids/*.json`);

  return contractFiles
    .map((path) => ({
      alias: filenameNoExtension(path),
      ...JSON.parse(readFileSync(path))
    }))
    .filter((data) => data.ids[process.env.SOROBAN_NETWORK_PASSPHRASE])
    .map((data) => ({ alias: data.alias, id: data.ids[process.env.SOROBAN_NETWORK_PASSPHRASE] }));
}

function bind({ alias, id }) {
  exe(`${cli} contract bindings typescript --contract-id ${id} --output-dir ${dirname}/packages/${alias} --overwrite`);
}

function bindAll() {
  contracts().forEach(bind);
}

function importContract({ id, alias }) {
  const outputDir = `${dirname}/src/contracts/`;

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
