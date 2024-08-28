# 4m00se — web3-enabled form widgets builder

See [the official website](https://4m.lol) for the details on the application, its architecture, philosophy, and also the user guides and the developer guides.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

4m00se is a decentralized application designed to provide a seamless experience for creating and managing forms, both on the blockchain, and outside of it (pure habitual web2 flow). It leverages the power of decentralized storage (IPFS via Pinata) and blockchain technology (Stellar/Soroban) to ensure data integrity and security, but also allows to work with JSON directly and use HTML widgets with custom user-provided callbacks.

## Major features

- **Form builder**: Create custom forms with ease via WYSIWYG interface.
- **Form submission reader**: Read and manage form responses for each of the forms.
- **Decentralized storage**: All form data (both config and user responses) can be stored as transactions on the Stellar network and linked to IPFS for JSON storage itself.
- **Embeddable widgets**: Easily embed forms into other web pages and applications via simple unique HTML code snippets.

## Technology Stack

- **Frontend**:

  - SvelteKit
  - TypeScript
  - Vite
  - VitePress (documentation)
  - MDsveX (blog)
  - PicoCSS

- **Embeddable Widget**:

  - Svelte
  - TypeScript
  - markdown-it
  - PicoCSS
  - Rollup

- **Smart Contracts**:

  - Rust
  - Soroban

- **Authentication**:

  - Freighter Wallet API

- **Data Storage**:
  - Stellar Network API/SDK
  - IPFS (via Pinata API/SDK)

## Installation

### Prerequisites

- Rust environment for Soroban smart contracts, and Stellar CLI, see [the official guide](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup) for reference
- Node.js v20 or later (with `npm`), you can use [NVM](https://github.com/nvm-sh/nvm) with the included `.nvmrc`
- Reading the starter guides from the official Stellar documentation for [writing smart contracts](https://developers.stellar.org/docs/build/smart-contracts/overview) and [building dapp frontends](https://developers.stellar.org/docs/build/apps/dapp-frontend) gives good context for working with the technologies
- The approach of building Soroban contract TS clients is shortly described [here](https://github.com/stellar-dapps/stellar-contracts-with-astro?tab=readme-ov-file#how-it-works)

### Steps

1. Clone the repository:

```bash
git clone git@github.com:stellar-dapps/4m00se-dapp.git
cd 4m00se-dapp
```

2. Install dependencies:

```bash
npm install
```

3. Copy and populate required environment variables

```bash
cp .env.example .env
```

4. Initialize environment for smart contracts, as mentioned above, if it's not there yet

```bash
./setup_env.sh
```

5. Initiate the contracts and their TS clients for the dapp to work with

```bash
npm run init
```

6. Build the documentation pages

```bash
npm run docs:build
```

7. Start the development server

```bash
npm run dev
```

## Usage

### Form Builder

- Navigate to the form builder page and log in via browser's Freighter wallet extension (use testnet).
- Create a new form by adding fields and configuring options.
- Preview and save the form.
- Get embeddable widget code and instructions.

### Form Responses

- Navigate to the form responses subpage.
- View and manage form submissions.

### Embeddable Widget

1. Include the widget from CDN in your application by adding the following script tag

```html
<script src="https://4m.lol/widget/4m00s.js"></script>
```

2. Initialize the widget with the desired configuration

```html
<div id="4m00se-widget-container"></div>
...
<script>
  formWidgetSDK.initFormWidget({
    <!-- see the "Form configuration" guide -->
  });
</script>
```

3. Form configuration

You can configure the following parameters of a form widget:

- `configUrl` — required, generated when a form is built
- `container` — optional, gives the possibility to use custom container id instead of the default `4m00se-widget-container`
- `onSubmit` — optional, gives the possibility to use custom callback on form submission (by default, dedicated Freighter transaction signing flow is triggered)

### Examples

See `/static/demo/...` for real-life usage example(s).

## Project Structure

```
4m00se-dapp/
├── contracts/
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── docs/
│   └── ...
├── packages/
│   └── ...
├── src/
│   └── blogposts/
│   │   └── ...
│   └── contracts/
│   │   ├── ...
│   │   └── util.ts
│   ├── lib/
│   │   ├── api/
│   │   ├── components/
│   │   ├── content/
│   │   ├── models/
│   │   ├── stores/
│   │   └── utils/
│   ├── routes/
│   │   ├── ...
│   │   ├── api/
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   └── widget/
│   │   ├── FormWidget.svelte
│   │   ├── init-form-widget.ts
│   │   └── ...
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   └── env.d.ts
├── static/
│   ├── demo/
│   └── ...
├── Cargo.toml
├── initialize.js
├── package.json
├── rollup.config.js
├── setup_env.sh
├── svelte.config.js
├── vite.config.ts
└── ...
```

## Contributing

Contributions are welcome! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the Apache-2.0 license. See the [LICENSE](LICENSE) file for details.
