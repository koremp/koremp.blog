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
export const isPathPost = (givenPath: string) => existsSync(givenPath) && lstatSync(path.join(rootPostDirectory, givenPath)).isFile()
export const getDirPathFromSlug = (slug: string[]) => {
  if(slug.length === 0)
  {
    return rootPostDirectory;
  }
  return path.join(rootPostDirectory, slug.join('/'));
}

// return dir-list, post-list and isReadmeExist
export const getDirInfo = ({ slug }: { slug: string[] })=> {
  const givenPath = slug.join('/');

  // if slug is post link, return readme
  if(isPathPost(givenPath)) {
    return {
      dirList: undefined,
      postList: undefined,
      readme: parsePost(slug)
    };
  }

  const localPath
    = (slug.length === 0)
     ? rootPostDirectory
     : path.join(rootPostDirectory, givenPath);
  const postDirPath =
    (slug.length === 0)
      ? '/blog'
      : slug[slug.length - 1];

  const dirents: Dirent[] = readdirSync(localPath, { withFileTypes: true });
  const dirList = getDirListFromDirents({ dirents, givenPath });
  const postList = getPostListFromDirents({ dirents, postDirPath });

  const readmeIndex = postList
    .findIndex(post => post.name.toLowerCase() === 'readme.md');

  // if readme is exist, return readme
  if(readmeIndex !== -1) {
    return {
      dirList,
      postList,
      readme: { slug: [...slug, postList[readmeIndex].name] }
    }
  }

  // if readme is undefined, return undefined
  return { dirList, postList, readme: undefined };
}

/*

files: posts/cs/1/2/3/test.md

when url blog/cs/1
slug: cs/1/2/3 (parent dir + current dir)
givenpath = cs/1
dirents = dir names in slug
subdir in givenpath: rootPostDir/givenPath/d.name
href =

*/
export const getDirListFromDirents = ({ dirents, givenPath }:
  { dirents: Dirent[], givenPath: string }) => {
  const dirList = dirents
    .filter(d => d.isDirectory())
    .map(d => {
      const subDirPath = path.join(rootPostDirectory, givenPath, d.name)
      const subPostCount = sync(`${subDirPath}/**/*.{md,mdx}`).length;
      return {
        name: d.name,
        // localPath: path.join(`${rootPostDirectory}/${givenPath}/${d.name}`),
        localPath: `${d.parentPath}/${d.name}`,
        href: path.join(givenPath, d.name),
        subPostCount
      };
    })
    .filter(d => d.subPostCount !== 0);

  return dirList;
}

export const getPostListFromDirents = ({ dirents, postDirPath }:
  {dirents: Dirent[], postDirPath: string}) => {
  const postList = dirents
    .filter(d => d.isFile())
    .map(post => {
      console.log(post)
      return {
        name: post.name,
        localPath: path.join(post.parentPath, postDirPath, post.name),
        href: path.join(postDirPath, post.name),
      }
    });

  return postList;
}

export const parsePost = (slug: string[]) => {
  const postPath
    = (slug.length === 0)
    ? rootPostDirectory
    : path.join(rootPostDirectory, slug.join('/'));
  console.log(postPath)
  const post = readFileSync(postPath, 'utf-8');
  const { data, content } = matter(post);
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');
  return { ...grayMatter, dateString, content, readingMinutes };
}