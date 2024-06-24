import dayjs from 'dayjs';
import { Dirent, readdirSync } from 'fs';
import {sync} from 'glob'
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const postDirectory = '/posts';
const rootPostDirectory = path.join(process.cwd(), postDirectory);

export const getUrl = (dirPath: string) => path.join('blog', dirPath);

export const getDirInfo = (dirPath?: string) => {
  const folder = (dirPath !== undefined)
    ? path.join(rootPostDirectory, dirPath)
    : rootPostDirectory;
  console.log(folder)
  const dirents: Dirent[] = readdirSync(folder, {withFileTypes : true});
  const dirList = getDirList(dirents);
  const postList = getPostList(dirents);

  return {
    dirList,
    postList,
  }
}

export interface IDirectory {
  name: string
  path: string
  url: string
  count: number
}

export const getDirList= (dirents: Dirent[]): IDirectory[] => {
  return dirents
    .filter(d => d.isDirectory())
    .map(d => {
      const dirPath = path.join(rootPostDirectory, d.name)
      return {
         name: d.name,
         path: dirPath,
         url: getUrl(d.name),
         count: getPostCount(dirPath)
      }
    });
}

export const getPostList = (dirents: Dirent[]): string[] => {
  return dirents
    .filter(d => d.isFile())
    .map(d => d.name);
}

export const getPostCount = (dirPath: string): number => {
  return sync(`${dirPath}/**/*.{md,mdx}`).length;
}