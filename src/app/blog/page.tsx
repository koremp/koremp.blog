import { DirectoryPage } from '@/components/blog/post-list-page';

export const dynamicParams = false;

export default function BlogIndexPage() {
  return (
    <DirectoryPage slug={[]} />
  );
}
