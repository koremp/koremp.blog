import Link from 'next/link'
import path from 'path'

import { getDirectoryInfo } from '@/utils/fs'

export function Directory({ href }: { href: string }) {
  const { dirs, files } = getDirectoryInfo(href)
  const isReadmeExist = path.join(href, 'README.md')

  return (
    <div>
      {
        isReadmeExist && (
          <div></div>
        )
      }
      <div>
        {href}
        {
          dirs.map((dir) => (
            <Directory href={path.join(href, dir)} key={dir} />
          ))
          // dirs.map((dir) => <Directory href={dir.name} key={dir.name} />)
        }
      </div>
      <div>
        {
          files.map((file) => (
            <File href={path.join(href, file)} key={file} />
          ))
          // files.map((file) => <File href={file.name} key={file.name} />)
        }
      </div>
    </div>
  )
}

export function File({ href }: { href: string }) {
  return (
    <li>
      <Link href={path.join('blog', href)}>{href}</Link>
    </li>
  )
}