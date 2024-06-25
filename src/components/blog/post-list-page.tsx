import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { getDirInfo, isPathDirectory, isPathPost, parsePost } from '@/utils/fs'

export const BlogPage = (slug: string[]) => {
  const path = slug.join('/')
  if (isPathDirectory(path)) {
    return <DirectoryPage slug={slug} />
  }
  else if (isPathPost(path)) {
    return <PostPage slug={slug} />
  }
}

export const DirectoryPage = ({ slug }: { slug: string[] }) => {
  if (isPathPost(slug.join('/'))) {
    return <PostPage slug={slug} />
  }

  const { dirList, postList, post } = getDirInfo({ slug });
  if (dirList === undefined) {
    return <div>error</div>
  }

  return (
    <div>
      {post && <PostPage slug={post.slug} />}
      <div className='flex flex-col gap-2'>
        {dirList.map(d => (
          <Link href={d.href}>
            <div>
              <div>
                {d.name}
              </div>
              <div>
                {d.localPath}
              </div>
              <div>
                {d.href}
              </div>
              <div>
                {d.subPostCount}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        {postList.map(p => (
          <Link href={p.href}>
            <div>
              {p.name}
            </div>
            <div>
              {p.localPath}
            </div>
            <div>
              {p.href}
            </div>
          </Link>
        ))}
      </div>
    </div >
  )
}

export const PostPage = ({ slug }: { slug: string[] }) => {
  const {
    dateString, content, readingMinutes
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

  )
}
