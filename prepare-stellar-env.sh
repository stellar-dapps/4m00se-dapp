#!/bin/bash

# ------------------------------------------------------------------------------
# Script: install_rust.sh
# Purpose: This script installs Rust, adds the necessary Rust target, and installs
#          the Stellar CLI. It is designed to be run during the Heroku deployment
#          process to ensure that the required tools are available for the build.
#
# Usage: This script is automatically executed by the Heroku build process via
#        the `prepare-stellar-env` script in the `package.json` file.
#
# Notes for Contributors:
# - This script checks for the presence of the necessary tools before installing
#   them to optimize the deployment process.
# - The script sources the environment variables set by `rustup` to ensure that
#   the Rust environment is properly configured in the current shell session.
# ------------------------------------------------------------------------------

# Set execute permissions for the script
chmod +x $0

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Rust is installed
if ! command_exists rustup; then
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
fi

# Check if the wasm32-unknown-unknown target is added
if ! rustup target list | grep -q wasm32-unknown-unknown; then
    echo "Adding wasm32-unknown-unknown target..."
    rustup target add wasm32-unknown-unknown
fi

# Check if the Stellar CLI is installed
if ! command_exists stellar; then
    echo "Installing Stellar CLI..."
    cargo install --locked stellar-cli --features opt
    source $HOME/.cargo/env
fi

# Ensure the environment variables are sourced
source $HOME/.cargo/env
