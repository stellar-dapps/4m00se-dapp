import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/utils/slug-from-path.ts';

export const prerender = true;

const MAX_POSTS = 10;

export const load: PageLoad = async ({ params }) => {
  const modules = import.meta.glob(`/src/blogposts/*.{md,svx,svelte.md}`);

  const postPromises = Object.entries(modules).map(([path, resolver]) =>
    resolver().then(
      (post) =>
        ({
          slug: slugFromPath(path),
          ...(post as unknown as App.MdsvexFile).metadata
        }) as App.BlogPost
    )
  );

  const posts = await Promise.all(postPromises);

  const publishedPosts = posts.filter((post) => post.published).slice(0, MAX_POSTS);

  publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return { posts: publishedPosts };
};
