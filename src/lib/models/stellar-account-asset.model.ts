// Manually extracted interface (I need only the last two)
export interface StellarAccountAsset {
  balance?: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
  last_modified_ledger?: number;
  is_authorized?: boolean;
  is_authorized_to_maintain_liabilities?: boolean;
  asset_type?: string;
  asset_code: string;
  asset_issuer: string;
}
