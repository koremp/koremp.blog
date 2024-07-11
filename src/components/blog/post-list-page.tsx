import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { getDirectoryInfo } from '@/lib/file';
import { parsePost } from '@/lib/post';

export function DirectoryPage({ slug }: { slug: string[] }) {
  const directoryInfo = getDirectoryInfo(slug);

  const directoryList = directoryInfo.filter((item) => item.isDirectory);
  const postList = directoryInfo.filter((item) => !item.isDirectory);
  const readme = directoryInfo.find((item) => item.name === 'readme');

  return (
    <div>
      <div>
        Directories
        <div>
          {
            directoryList.map(((directory) => (
              <div>
                <div>{directory.name}</div>
                <div>{directory.path}</div>
                <div>{directory.href}</div>
              </div>
            )))
          }
        </div>
      </div>
      {
        readme && (
          <div>
            {readme.name}
            {readme.path}
            {readme.href}
          </div>
        )
      }
      <div>
        Posts
        <div>
          {
            postList.map((post) => (
              <div>
                {post.name}
                {post.path}
                {post.href}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export function PostPage({ slug }: { slug: string[] }) {
  const {
    dateString, content, readingMinutes,
  } = parsePost(slug);

  return (
    <div>
      <MDXRemote source={content} />
      <div>
        datestring
        {dateString}
      </div>
      <div>
        readingMinutes
        {readingMinutes}
      </div>
    </div>

  );
}
