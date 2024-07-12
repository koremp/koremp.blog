import dayjs from 'dayjs';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { getLocalPath } from './file';

export const parsePost = (slug: string[]) => {
  const postPath = getLocalPath(slug);
  const post = readFileSync(postPath, 'utf-8');
  const { data, content } = matter(post);
  const grayMatter = data;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');

  return {
    ...grayMatter, dateString, content, readingMinutes,
  };
};

export const a = 1;
