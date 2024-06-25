import { BedroomParentSharp } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Dirent, existsSync, lstatSync, readFileSync, readdirSync } from 'fs';
import { sync } from 'glob'
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const postDirectory = '/posts';
const rootPostDirectory = path.join(process.cwd(), postDirectory);

export const isPathDirectory = (givenPath: string) => existsSync(givenPath) && lstatSync(path.join(rootPostDirectory, givenPath)).isDirectory();
export const isPathFile = (givenPath: string) => existsSync(givenPath) && lstatSync(path.join(rootPostDirectory, givenPath)).isFile()

// return dir-list, post-list and readme if readme exist
export const getDirInfo = ({ givenPath }: { givenPath: string }) => {
  const localPath = path.join(rootPostDirectory, givenPath);
  console.log(localPath)

  const dirents: Dirent[] = readdirSync(localPath, { withFileTypes: true });
  const dirList = getDirListFromDirents({ dirents, givenPath });
  const postList = getPostListFromDirents({ dirents, givenPath });

  const readmeIndex = postList
    .findIndex(post => post.name.toLowerCase() === 'readme.md');

  console.log(givenPath)
  // console.log(dirList, postList)

  // if readme is exist
  if(readmeIndex !== -1) {
    const readme = [...postList][readmeIndex];
    postList.splice(readmeIndex, 1);
    console.log(readme)

    return {
      dirList,
      postList,
      readme: parsePost(path.join(readme.name))
    }
  }

  // if readme is undefined
  return { dirList, postList, readme: undefined };
}

export const getDirListFromDirents = ({ dirents, givenPath }: {dirents: Dirent[], givenPath: string}) => {
  const dirList = dirents
    .filter(d => d.isDirectory())
    .map(d => {
      const subPostCount = sync(`${rootPostDirectory}/${givenPath}/${d.name}/**/*.{md,mdx}`).length;
      return {
        name: d.name,
        localPath:
          givenPath === '/'
            ? path.join(rootPostDirectory, d.parentPath)
            : path.join(d.parentPath, d.name),
        href: path.join(givenPath, d.name),
        subPostCount
      };
    })
    .filter(d => d.subPostCount !== 0);

  return dirList;
}

export const getPostListFromDirents = ({ dirents, givenPath }:{dirents: Dirent[], givenPath: string}) => {
  const postList = dirents
    .filter(d => d.isFile())
    .map(post => {
      return {
        name: post.name,
        localPath: path.join(rootPostDirectory, post.parentPath),
        href: path.join(givenPath, post.name),
      }
    });

  return postList;
}

export const parsePost = (postPath: string) => {
  const post = readFileSync(postPath, 'utf-8');
  const { data, content } = matter(post);
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');
  return { ...grayMatter, dateString, content, readingMinutes };
}