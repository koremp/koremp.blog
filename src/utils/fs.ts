import {PathLike, readdirSync, readFileSync} from 'fs'
import path from 'path';
import matter from 'gray-matter';

const getDirectoryInfo = (path: PathLike) => {
  const dirents = readdirSync(path, {withFileTypes : true})
  const dirs = dirents
    .filter(dirent => dirent.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  const files = dirents
    .filter(dirent => dirent.isFile())
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    dirs,
    files
  }
}


export function getSortedPostsData(href: string) {
  const postsDirectory = path.join(process.cwd(), href);

  const fileNames = readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export {
  getDirectoryInfo
}

