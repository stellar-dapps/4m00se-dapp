#!/bin/bash

# Set execute permissions for the script
chmod +x $0

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Source the environment variables set by rustup
source $HOME/.cargo/env

# Add the wasm32-unknown-unknown target
rustup target add wasm32-unknown-unknown

# Install the Stellar CLI
cargo install --locked stellar-cli --features opt
