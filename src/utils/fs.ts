import dayjs from 'dayjs';
import { Dirent, existsSync, lstatSync, readFileSync, readdirSync } from 'fs';
import { sync } from 'glob'
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const postDirectory = '/posts';
const rootPostDirectory = path.join(process.cwd(), postDirectory);

export const joinSlug = (slug: string[]) => slug.join('/');

export const getLocalPath = (slug: string[]) =>
  slug.length === 0
    ? rootPostDirectory
    : path.join(rootPostDirectory, joinSlug(slug));

export const getBaseHref = (slug: string[]) =>
  slug.length === 0
    ? '/blog'
    : slug[slug.length - 1]

export const isPathDirectory = (slug: string[]) => lstatSync(path.join(rootPostDirectory, joinSlug(slug))).isDirectory();
export const isPathPost = (slug: string[]) => lstatSync(path.join(rootPostDirectory, joinSlug(slug))).isFile();

export const findIndexFromPostList = (postList: Dirent[]) => postList.findIndex((post) => post.name.toLowerCase() === 'readme.md');

export const isDirectoryContainsReadme = (slug: string[]) => {
  if(!isPathDirectory(slug)) {
    return false;
  }

  const localPath = getLocalPath(slug)
  const postList = readdirSync(localPath , { withFileTypes: true })

  return postList.findIndex((post) => post.name.toLowerCase() === 'readme.md');
}

export const getDirPathFromSlug = (slug: string[]) => slug.length !== 0
    ? path.join(rootPostDirectory, joinSlug(slug))
    : rootPostDirectory;

// return dir-list, post-list and isReadmeExist
export const getDirInfo = ({ slug }: { slug: string[] })=> {

  // if slug is post link, return readme
  if(isPathPost(slug)) {
    return {
      dirList: undefined,
      postList: undefined,
      post: parsePost(slug)
    };
  }

  const localPath = getLocalPath(slug);
  const baseHref = getBaseHref(slug);

  const dirents: Dirent[] = readdirSync(localPath, { withFileTypes: true });
  const dirList = getDirListFromDirents({ dirents, slug });
  const postList = getPostListFromDirents({ dirents, baseHref });

  const readmeIndex = postList
    .findIndex(post => post.name.toLowerCase() === 'readme.md');

  // if readme is exist, return readme
  if(readmeIndex !== -1) {
    return {
      dirList,
      postList,
      post: { slug: [...slug, postList[readmeIndex].name] }
    }
  }


  // if readme is undefined, return undefined
  return { dirList, postList, post: undefined };
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
export const getDirListFromDirents = ({ dirents, slug }:
  { dirents: Dirent[], slug: string[] }) => {
  const basePath
    = slug.length === 0
      ? '/blog'
      : slug[slug.length - 1];

  console.log(basePath)

  const dirList = dirents
    .filter(d => d.isDirectory())
    .map(d => {
      const subDirPath = path.join(rootPostDirectory, slug.join('/'), d.name)
      const subPostCount = sync(`${subDirPath}/**/*.{md,mdx}`).length;
      console.log(subDirPath, subPostCount)
      console.log(d)
      return {
        name: d.name,
        localPath: subDirPath,
        href: path.join(basePath, d.name),
        subPostCount
      };
    })
    .filter(d => d.subPostCount !== 0);

  console.log(dirList[0])

  return dirList;
}

export const getPostListFromDirents = ({ dirents, baseHref }:
  {dirents: Dirent[], baseHref: string }) => {
  const postList = dirents
    .filter(d => d.isFile())
    .map(post => {
      return {
        name: post.name,
        localPath: path.join(post.parentPath, baseHref, post.name),
        href: path.join(baseHref, post.name),
      }
    });

  return postList;
}

export const parsePost = (slug: string[]) => {
  const postPath
    = (slug.length === 0)
    ? rootPostDirectory
    : path.join(rootPostDirectory, slug.join('/'));
  const post = readFileSync(postPath, 'utf-8');
  const { data, content } = matter(post);
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');
  return { ...grayMatter, dateString, content, readingMinutes };
}