import {
  Dirent, lstatSync, readFileSync, readdirSync,
} from 'fs';
import { sync } from 'glob';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import dayjs from 'dayjs';

export const postDirectory = '/posts';
export const rootPostDirectory = path.join(process.cwd(), postDirectory);

export const parsePost = (slug: string[]) => {
  const postPath = (slug.length === 0)
    ? rootPostDirectory
    : path.join(rootPostDirectory, slug.join('/'));
  const post = readFileSync(postPath, 'utf-8');
  const { data, content } = matter(post);
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');
  return {
    ...grayMatter, dateString, content, readingMinutes,
  };
};

// eslint-disable-next-line max-len
export const isPathDirectory = (givenPath: string): boolean => lstatSync(path.join(rootPostDirectory, givenPath)).isDirectory();
// eslint-disable-next-line max-len
export const isPathPost = (givenPath: string): boolean => lstatSync(path.join(rootPostDirectory, givenPath)).isFile();

export const getDirPathFromSlug = (slug: string[]) => {
  if (slug.length === 0) {
    return rootPostDirectory;
  }
  return path.join(rootPostDirectory, slug.join('/'));
};

// return dir list
export const getDirListFromDirents = ({ dirents, slug }:
  { dirents: Dirent[], slug: string[] }) => {
  const basePath = slug.length === 0
    ? '/blog'
    : slug[slug.length - 1];

  const dirList = dirents
    .filter((d) => d.isDirectory())
    .map((d) => {
      const subDirPath = path.join(rootPostDirectory, slug.join('/'), d.name);
      const subPostCount = sync(`${subDirPath}/**/*.{md,mdx}`).length;
      return {
        name: d.name,
        localPath: subDirPath, // file path
        href: path.join(basePath, d.name), // link href
        subPostCount,
      };
    })
    .filter((d) => d.subPostCount !== 0);

  return dirList;
};

export const getPostListFromDirents = ({ dirents, baseHref }:
  { dirents: Dirent[], baseHref: string }) => {
  const postList = dirents
    .filter((d) => d.isFile())
    .map((post) => ({
      name: post.name,
      localPath: path.join(post.parentPath, baseHref, post.name),
      href: path.join(baseHref, post.name),
    }));

  return postList;
};

// return dir-list, post-list and isReadmeExist
export const getDirInfo = ({ slug }: { slug: string[] }) => {
  const givenPath = slug.join('/');

  // if slug is post link, return readme
  if (isPathPost(givenPath)) {
    return {
      dirList: undefined,
      postList: undefined,
      post: parsePost(slug),
    };
  }

  const localPath = (slug.length === 0)
    ? rootPostDirectory
    : path.join(rootPostDirectory, givenPath);
  const baseHref = (slug.length === 0)
    ? '/blog'
    : slug[slug.length - 1];

  const dirents: Dirent[] = readdirSync(localPath, { withFileTypes: true });
  const dirList = getDirListFromDirents({ dirents, slug });
  const postList = getPostListFromDirents({ dirents, baseHref });

  const readmeIndex = postList
    .findIndex((post) => post.name.toLowerCase() === 'readme.md');

  // if readme is exist, return readme
  if (readmeIndex !== -1) {
    return {
      dirList,
      postList,
      post: { slug: [...slug, postList[readmeIndex].name] },
    };
  }

  // if readme is undefined, return undefined
  return { dirList, postList, post: undefined };
};
