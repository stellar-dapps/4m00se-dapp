# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) project guidelines, and thoughtful ideas from [this awesome article](https://xavd.id/blog/post/effective-changelogs).

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.12.0

_released `2024-12-02`_

The application is migrated to Svelte 5, the docs are updated and the scaffold is simplified (including removing unnecessary/unused stuff).

### Changed

- Render deploys only the Node part from now, until the planned smart contracts are integrated
- Svelte is migrated to v5 providing new approaches to reactive frontend development

## 0.11.0

_released `2024-08-28`_

Slightly polished functionality from the `0.11.0-alpha` release

### Added

- This changelog for tracking updates between versions
- New blog page built with MDsveX

### Changed

- New docs page built with Vitepress, old docs are restructured
- Branded favicon

### Fixed

- Automated navigation flow on Freighter wallet detection

### Removed

- Render self-ping API route

## 0.11.0-alpha

_released `2024-08-19`_

Basic skeleton and functionality for **4m00se** project, built for Build with Stellar challenge and described [here](https://dev.to/fyodorio/create-embeddable-forms-widgets-for-decentralized-internet-1dni), including:

- Land on main dapp page with 4m00se overview
- Get basic documentation from README
- "Log in" with Freighter wallet
- Create a basic form (text fields and checkboxes) in WYSIWYG builder UI, store the resulting form config on IPFS and sign it with Freighter wallet on Stellar testnet to further gather submissions for it
- Get form embedding HTML code snippet for the created, stored and signed form config
- Working example of 4m00se form widget integration into a web page allowing to submit a form and sign the submission with Freighter wallet on Stellar testnet
- Get and analyse the list of Freigher-signed submissions made for the form snippet for the user-created form config
