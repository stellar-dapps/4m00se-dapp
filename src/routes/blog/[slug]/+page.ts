import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/utils/slug-from-path.ts';

export const load: PageLoad = async ({ params }) => {
  const modules = import.meta.glob(`/src/blogposts/*.{md,svx,svelte.md}`);

  let match: { path?: string; resolver?: App.MdsvexResolver } = {};
  for (const [path, resolver] of Object.entries(modules)) {
    if (slugFromPath(path) === params.slug) {
      match = { path, resolver: resolver as unknown as App.MdsvexResolver };
      break;
    }
  }

  const post = await match?.resolver?.();

  return {
    component: post?.default,
    frontmatter: post?.metadata
  };
};
