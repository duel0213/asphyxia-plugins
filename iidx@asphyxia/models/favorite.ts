export interface extra_favorite {
  collection: "extra_favorite";
  version: number;
  folder_id: number;

  sp_mlist: string | Buffer;
  sp_clist: string | Buffer;
  dp_mlist: string | Buffer;
  dp_clist: string | Buffer;
}
