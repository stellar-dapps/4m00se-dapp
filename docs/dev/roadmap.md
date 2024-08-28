# 4m00se roadmap (TODO-list)

## Product

- Progressive decentralization flow adjustments
- Dogfood by collecting dapp feedback with a pop-up widget
- Hosted forms ([Fleek](https://fleek.co/) possibly)
- Using for blog-like website comments
- Embeddings tracking — info for customers where their form is used and how
- CSV/JSON export of form submissions
- i18n for main target audience
- a11y requirements
- Personas and main user stories for testing and implementation (admin / customer / user)
- Play around blockchain data immutability (metadata as flags specifically)
- More meaningful template list

## UI

- Implement and polish UI with due respect to the Figma mockups
- Full-screen modal component for form preview and template selection
- Extend available form control set and additional helper elements
- Make search work
- Proper loading / errors display
- Smoothen interactions and transitions, especially auth
- Polish alfa version alert and logged-in alert banners, show conditionally with adjusted content
- Profile page and avatar autogeneration
- Dark/light mode switcher
- Drag-n-drop for form builder
- Pagination
- Styling tab for form builder
- Custom 404 page
- ~~Footer processing — no need for it inside the app~~

## Soroban smart contracts

- Flexible smart contract with parameters allowing for paid/sponsored submission
- Consider providing more sophisticated deployer contract
- Monetization (consider possibilities for product/customers/users) with stuff like form creation fees, limits for number of submissions, custom asset names, etc.

## Stellar flow

- CID/submission duplication prevention for transactions

## JSON IPFS storage

- Optimize Pinata / consider alternatives
- Consider creating IPFS node and custom SDK for it

## AuthN / AuthZ

- [Multi-wallet](https://stellarwalletskit.dev/) access
- [Passkey](https://kalepail.com/blockchain/the-passkey-powered-future-of-web3) access

## Security

- Additional content encryption
- Proper form sanitizing everywhere

## Widget

- Generic protection from CORS issues
- Style and font customizations, and also dark/light mode settings, or a flag to ignore/override system settings
- Optimize the build size (stylesheet trimming, minimal custom markdown parser)
- Client side result screen / server side url redirect
- Webhooks / email collection for form submissions
- Opt-out (default) and customizable (customer's) branding
- Possibility to expand the form widget to full-screen modal (focus mode)
- Customizable loader state
- Multiple instances per page (multiple base ids)
- Customizable spam protection
- Progressive web2 degradation flow (support for direct config setting instead of config URLs)

## CI/CD

- GitHub actions for pre-PR and build checks
- Set up a11y testing pipeline
- Consider git flow and staging env

## Bundling and deployment

- Optimize Render deployment / consider alternatives
- Widget: Use CDN for script distribution
- Widget: Package to npm/JSR
- Release and changelog flow

## Development and tech debt

- Clean up temporary and unused stuff (clean up TODOs — move here if necessary)
- Analyze how Svelte stores work on client now and won't there be any issues/leaks with them — consider migration to signals or something
- Stellar mainnet integration adjustments
- Thorough error processing
- Consider proper monitoring and error tracking
- Proper TypeScript types everywhere
- Add unit tests for major business logic
- Build component library with StoryBook for isolated development and testing the most important components
- Add e2e/component tests for specific features / components
- Automated performance benchmarking, especially for the widget
- Commit indicators for the deployed app
- Migrate to Svelte 5
- Integrate headless components
- Proper parametrized routing
- Check asset name uniqueness on creation
- API docs autogeneration
- ~~Disable Render self-ping~~

## Documentation

- Add architecture description
- Add tutorial
- Annotate project structure
- Interactive onboarding flow
- More meaningful documentation page topbar
- ~~Consider separate documentation page~~
- ~~Polish documentation display on the website~~

## Repository

- Isolate local and CI/CD scripts inside package.json
- Move script files to a separate folder
- Add custom labels and automation for them
- Add simple code style guide
- ~~Add [changelog](https://xavd.id/blog/post/effective-changelogs) following common [practices](https://keepachangelog.com/en/1.1.0/)~~

## Marketing and demos

- Polish disclaimer to give more generic context on the dapp nature
- Emphasize "progressive decentralization" approach of the app
- Guest book as a demo form with interactive results
- Open source starter template as a promo, tutorial for that
- Comparison with other onchain/offchain solutions
- SEO meta, like [described here](https://rodneylab.com/sveltekit-seo/)
- Dynamic stackblitz/codesandbox/glitch examples
- ~~Blog page, like [described here](https://rodneylab.com/sveltekit-blog-starter/), for instance~~
