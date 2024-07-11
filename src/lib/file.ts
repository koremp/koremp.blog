import { Dirent, lstatSync, readdirSync } from 'fs';
import path from 'path';

import { rootPostDirectory } from './consts';

// join slug
export const joinSlug = (slug: string[]) => slug.join('/');

// get file path of env
export const getLocalPath = (slug: string[]) => (slug.length === 0
  ? rootPostDirectory
  : path.join(rootPostDirectory, joinSlug(slug)));

// get base href from url
export const getBaseHref = (slug: string[]) => (slug.length === 0
  ? '/blog'
  : slug[slug.length - 1]);

/* eslint-disable */
export const isSlugDirectory = (slug: string[]) => lstatSync(path.join(rootPostDirectory, joinSlug(slug))).isDirectory();
export const isSlugFile = (slug: string[]) => lstatSync(path.join(rootPostDirectory, joinSlug(slug), '.md')).isFile();
export const isPathDirectory = (localPath: string)=> lstatSync(path.join(rootPostDirectory, localPath)).isDirectory();
export const isPathFile= (localPath: string) => lstatSync(localPath).isDirectory();
/* eslint-enable */

// get dirent list in local env
// eslint-disable-next-line
export const getLocalDirents = (localPath: string) => readdirSync(localPath, { withFileTypes: true });

// find index of readme
export const findReadmeIdx = (dirents: Dirent[]) => dirents.findIndex((post) => post.name.toLowerCase() === 'readme.md');

export type DirectoryItem = {
  name: string
  path: string
  href: string
  isDirectory: boolean
}

export const getDirectoryInfo = (slug: string[]) => {
  const localPath = getLocalPath(slug);
  const itemList = getLocalDirents(localPath);

  const directoryInfo = itemList.map(({ name }: Dirent): DirectoryItem => {
    const itemPath = path.join(localPath, name, '.md');
    const isDirectory = isPathFile(itemPath);

    return {
      name,
      path: itemPath,
      href: slug[slug.length - 1],
      isDirectory,
    };
  });

  return directoryInfo;
};
