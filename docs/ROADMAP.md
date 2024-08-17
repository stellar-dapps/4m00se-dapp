# 4m00se roadmap (TODO-list)

## Product

- [ ] Hosted forms
- [ ] Using for blog-like website comments
- [ ] Embeddings tracking — info for customers where their form is used and how
- [ ] CSV/JSON export of form submissions
- [ ] i18n for main target audience
- [ ] a11y requirements
- [ ] Personas and main user stories for testing and implementation (admin / customer / user)

## UI

- [ ] Implement and polish UI with due respect to the Figma mockups
- [ ] Extend available form control set and additional helper elements
- [ ] Make search work
- [ ] Proper loading / errors display
- [ ] Smoothen interactions and transitions, especially auth
- [ ] Polish alfa version alert and logged-in alert banners, show conditionally with adjusted content
- [ ] Profile page
- [ ] Dark/light mode switcher

## Soroban smart contracts

- [ ] Flexible smart contract with parameters allowing for paid/sponsored submission
- [ ] Monetization (consider possibilities for product/customers/users) with stuff like form creation fees, limits for number of submissions, custom asset names, etc.

## Stellar flow

- [ ] CID/submission duplication prevention for transactions

## JSON IPFS storage

- [ ] Optimize Pinata / consider alternatives

## AuthN / AuthZ

- [ ] [Multi-wallet](https://stellarwalletskit.dev/) access
- [ ] [Passkey](https://kalepail.com/blockchain/the-passkey-powered-future-of-web3) access

## Security

- [ ] Additional content encryption

## Widget

- [ ] Style and font customizations, and also dark/light mode settings, or a flag to ignore/override system settings
- [ ] Optimize the build size (stylesheet trimming, minimal custom markdown parser)
- [ ] Client side result screen / server side url redirect
- [ ] Webhooks / email collection for form submissions
- [ ] Opt-out (default) and customizable (customer's) branding
- [ ] Possibility to expand the form widget to full-screen modal (focus mode)
- [ ] Customizable loader state
- [ ] Multiple instances per page (multiple base ids)
- [ ] Customizable spam protection

## CI/CD

- [ ] GitHub actions for pre-PR and build checks
- [ ] Set up a11y testing pipeline

## Bundling and deployment

- [ ] Optimize Render deployment / consider alternatives
- [ ] Widget: Use CDN for script distribution
- [ ] Widget: Package to npm
- [ ] Release and changelog flow

## Development and tech debt

- [ ] **_Mainnet adjustments_**
- [ ] Thorough error processing
- [ ] Consider proper monitoring and error tracking
- [ ] Add unit tests for major business logic
- [ ] Add e2e/component tests for specific features / components
- [ ] Automated performance benchmarking, especially for the widget
- [ ] Commit indicators for the deployed app

## Documentation

- [ ] Polish README documentation display on the website
- [ ] Consider separate documentation page
- [ ] Annotate project structure
- [ ] Interactive onboarding flow

## Repository

- [ ] Isolate local and CI/CD scripts

## Marketing and demos

- [ ] Blog page
- [ ] Guest book as a demo form with interactive results
- [ ] Open source starter template as a promo
- [ ] Comparison with other onchain/offchain solutions
