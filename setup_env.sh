#!/bin/bash

# Set execute permissions for the script
chmod +x $0

# Install Rust if not already installed
if ! command -v rustup &> /dev/null; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
fi

# Add the wasm32-unknown-unknown target if not already added
if ! rustup target list | grep -q wasm32-unknown-unknown; then
    echo "Adding wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

# Install the Stellar CLI if not already installed
if ! command -v stellar &> /dev/null; then
    echo "Installing Stellar CLI..."
    cargo install --locked stellar-cli --features opt
    source $HOME/.cargo/env
fi

# Ensure the environment variables are sourced
source $HOME/.cargo/env

# Call the Node.js script
node initialize.js