import type { BlogDataFromFileSystem, BlogPostListItem } from '$lib/models/blog.model.ts';

export const prerender = true;

export async function load() {
  const posts = import.meta.glob('./*.md', { eager: true });

  // TODO tweak sorting
  const postList: BlogPostListItem[] = Object.keys(posts).map((path) => {
    const file = posts[path] as BlogDataFromFileSystem;
    const slug = path.split('/').pop()?.replace('.md', '') as string;
    return {
      slug,
      title: file.metadata.title,
      description: file.metadata.description,
      createdAt: file.metadata.createdAt
    };
  });

  return { posts: postList };
}
