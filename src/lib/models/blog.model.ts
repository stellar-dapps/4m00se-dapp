// TODO check types at Mdsvex docs

export interface BlogDataFromFileSystem {
  default: any;
  metadata: any;
}

export interface BlogPostListItem {
  slug: string;
  title: string;
}

export interface BlogPageData {
  posts: BlogPostListItem[];
}

export interface BlogPost {
  metadata: any;
  content: any;
}
