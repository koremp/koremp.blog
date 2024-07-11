import { DirectoryPage, PostPage } from '@/components/blog/post-list-page';
import { isSlugDirectory, isSlugFile } from '../../../lib/file';

export const dynamicParams = false;

export function BlogSlugPage({ params }: { params: { slug: string[] } }) {
  if (isSlugFile(params.slug)) {
    return <PostPage slug={params.slug} />;
  }

  if (isSlugDirectory(params.slug)) {
    return <DirectoryPage slug={params.slug} />;
  }

  // else show 404
}

export default BlogSlugPage;
