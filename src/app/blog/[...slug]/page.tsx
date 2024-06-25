import { DirectoryPage } from '@/components/blog/post-list-page';

export const dynamicParams = false;

const BlogSlugPage = async ({ params }: { params: { slug: string[] } }
) => {
  return (
    <DirectoryPage slug={params.slug} />
  )
}

export default BlogSlugPage;