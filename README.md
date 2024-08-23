# 4m00se — form management platform

4m00se is a decentralized application (dApp) built on the Stellar network. It consists of a form builder and form submission reader functionality, tied together via embeddable form widgets. The application is server-rendered and decentralized, utilizing the Stellar network and Soroban for blockchain transaction management and IPFS for form configuration storage and submission collecting.

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

4m00se is designed to provide a seamless experience for creating and managing forms on the Stellar network. It leverages the power of decentralized storage and blockchain technology to ensure data integrity and security.

## Features

- **Form builder**: Create custom forms with ease.
- **Form submission reader**: Read and manage form submissions.
- **Decentralized storage**: All data is stored as transactions on the Stellar network or written to IPFS.
- **Embeddable widgets**: Easily embed forms into other applications.
- **Documentation**: Comprehensive documentation for users and developers.

## Technology Stack

- **Frontend**:

  - SvelteKit
  - TypeScript
  - Vite
  - PicoCSS (UI library)

- **Embeddable Widget**:

  - Svelte
  - TypeScript
  - Rollup

- **Smart Contracts**:

  - Soroban

- **Authentication**:

  - Freighter Wallet API

- **Data Storage**:
  - Stellar Network
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
git clone https://github.com/your-username/4m00se.git
cd 4m00se
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

6. Start the development server:

```bash
npm run dev
```

## Usage

### Form Builder

- Navigate to the form builder page.
- Create a new form by adding fields and configuring options.
- Save the form to the Stellar network.
- Get embeddable widget code and instructions.

### Form Submission Reader

- Navigate to the form submission reader page.
- View and manage form submissions stored on the Stellar network.

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
- `onSubmit` — optional, gives the possibility to use custom callback on form submission (by default, dedicate Freighter transaction signing flow is triggered)

### Examples

See `/static/demo/...` for real-life usage examples.

## Project Structure

```
4m00se-dapp/
├── contracts/
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── packages/
│   └── ...
├── src/
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
│   └── app.html
├── static/
│   ├── demo/
│   └── ...
├── Cargo.toml
├── initialize.js
├── package.json
├── rollup.config.js
├── svelte.config.js
├── vite.config.ts
└── ...
```

## Contributing

Contributions are welcome! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
