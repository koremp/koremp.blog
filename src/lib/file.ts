import { Dirent, lstatSync, readdirSync } from 'fs';
import path from 'path';

import { rootPostDir } from './consts';

// join slug
export const joinSlug = (slug: string[]) => slug.join('/');

// get path from slug
export const getDirPath = (slug: string[]) => (slug.length === 0
  ? rootPostDir
  : path.join(rootPostDir, joinSlug(slug)));

// get base href from url
export const getBaseHref = (slug: string[]) => (slug.length === 0
  ? '/blog'
  : slug[slug.length - 1]);

export const isSlugDir = (slug: string[]) => lstatSync(getDirPath(slug))
  .isDirectory();
export const isSlugFile = (slug: string[]) => lstatSync(path.join(getDirPath(slug), '.md'))
  .isFile();

export const hasReadmeInDir = (dirPath: string): boolean => {
  const files = readdirSync(dirPath);
  const idx = files.findIndex((file) => file.toLowerCase().startsWith('readme'));
  return idx !== -1;
};

export const isPathDir = (localPath: string) => lstatSync(localPath)
  .isDirectory();
export const isPathFile = (localPath: string) => lstatSync(localPath)
  .isFile();

// get dirent list in local env
// eslint-disable-next-line
export const getLocalDirents = (localPath: string) => readdirSync(localPath, { withFileTypes: true });

// find index of readme
export const findReadmeIdx = (dirents: Dirent[]) => dirents.findIndex((post) => post.name.toLowerCase() === 'readme.md');

export type DirectoryItem = {
  name: string
  path: string
  href: string
  isDir: boolean
}

export const getDirectoryInfo = (slug: string[]) => {
  const localPath = getDirPath(slug);
  const itemList = getLocalDirents(localPath);

  const directoryInfo = itemList.map(({ name }: Dirent): DirectoryItem => {
    const itemPath = path.join(localPath, name);
    const isDir = isPathDir(itemPath);

    return {
      name,
      path: itemPath,
      href: slug[slug.length - 1],
      isDir,
    };
  });

  return directoryInfo;
};
