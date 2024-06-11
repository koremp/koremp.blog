import { PathLike, readdirSync, readFileSync, existsSync } from 'fs'
import path  from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const getDirectoryInfo = (path: PathLike) => {
  const dirents = readdirSync(path, {withFileTypes : true})
  const dirs = dirents
    .filter(dirent => dirent.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((dir) => dir.name)

  const files = dirents
    .filter(dirent => dirent.isFile())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((file)=> file.name)

  return {
    dirs,
    files
  }
}

const isReadmeExist = (href: string) => {
  const fileName = path.join(href, 'README.md')

  if(existsSync(fileName)){
    const content = readFileSync(
      fileName.replace(/\.md$/, '')
      ,'utf-8')
    const matterResult = matter(content)

    return matterResult
  }

  return undefined
}

const getPostData = async (href: string) => {
  const matterResult = matter(readFileSync(href, 'utf-8'))

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return contentHtml
}

export {
  getDirectoryInfo,
  isReadmeExist,
  getPostData
}

