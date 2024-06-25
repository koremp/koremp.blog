import { DirectoryPage } from '@/components/blog/post-list-page'

export const dynamicParams = false;

const BlogRootPage = async () => {
  return (
    <DirectoryPage slug={[]} />
  )
}

export default BlogRootPage;