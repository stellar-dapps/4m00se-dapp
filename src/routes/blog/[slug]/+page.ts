export async function load({ params }) {
  const postPath = `../${params.slug}.md`;
  const post = await import(postPath);

  return {
    content: post.default,
    metadata: post.metadata
  };
}
