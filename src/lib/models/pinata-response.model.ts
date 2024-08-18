export interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface PinataFile {
  id: string;
  ipfs_pin_hash: string;
  size: number;
  user_id: string;
  date_pinned: string;
  date_unpinned: any;
  metadata: { name: string; keyvalues: any };
  regions: Object[];
  mime_type: string;
  number_of_files: number;
}
