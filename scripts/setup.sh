#!/bin/bash

## THE RUST ENVIRONMENT SETUP FOR SOROBAN SMART CONTRACTS

# Set execute permissions for the script
chmod +x $0

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Add the wasm32-unknown-unknown target
rustup target add wasm32-unknown-unknown

# Install the Stellar CLI
cargo install --locked stellar-cli --features opt

# Call the Node script for initializing Soroban contract packages used in the client app
node scripts/initialize.js
