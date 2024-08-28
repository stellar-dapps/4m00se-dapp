# Form data flow 101

**4m00se** dapp provides the following flow for data inside and outside of the application:

- A Customer (**4m00se** user) logs in with their Freighter wallet and the public key is used further as the unique customer ID.
- The Customer creates a form in the builder, and the form config gets written as a JSON file to IPFS via Pinata pinning service, and gets created as a Stellar blockchain asset with unique asset id. Both the JSON file and the asset are linked together, the asset is stored in the Customer's Freighter wallet.
- **4m00se** generates an embeddable HTML code snippet with unique IPFS url for the form config the Customer had created.
- The Customer includes the embedding into their web page and exposes the resulting page to their Users. The script in the embedding allows to collect responses enforcing signing them via Users' Freighter wallets too.
- When the form is filled up and submitted (and signed) by a User, its FormData gets included into the IPFS-stored Customer's form config metadata, along with the transaction id.
- Now when the Customer opens **4m00se**, their forms will be available as assets on the main app's page, fetched via checking the Customer's Freighter balance for the assets marked as **4m00se** assets. The JSON data for the assets is fetched from the IPFS sequentially.
- When the Customer selects a specific form page in **4m00se**, they can go to the corresponding "Responses" subpage where the responses are fetched from the IPFS-stored form config metadata (generated via the Pinata pinning service).

Thus, the whole flow doesn't require any additional complex and centralized storage and authentication/authorization flows, except for the trusted and proven Stellar blockchain and decentralized IPFS.
