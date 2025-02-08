import { object, string, pipe, url, type InferInput, nullish } from 'valibot';

export const configSchema = object({
  mainPageUrl: pipe(string(), url()),
  name: string(),
  search: object({
    li: string(),
    novelId: string(),
    authorName: string(),
    latestChapterId: string(),
    updateTime: string(),
    image: string(),
    label: string(),
    desc: string(),
    encoding: string(),
  }),
  novel: object({
    info: object({
      name: string(),
      author: string(),
      lastUpdateTime: string(),
      latestChapterId: string(),
      encoding: string(),
      image: string(),
      desc: string(),
    }),
    directory: object({
      chapterId: string(),
      encoding: string(),
    }),
  }),
  url: object({
    search: pipe(string(), url()),
    novelInfo: pipe(string(), url()),
    directory: pipe(string(), url()),
    chapter: pipe(string(), url()),
    searchPlaceholder: string(),
    novelPlaceholder: string(),
    chapterPlaceholder: string(),
  }),
  content: object({
    encoding: string(),
    chapterName: string(),
    novelName: string(),
    preChapterId: string(),
    nextChapterId: string(),
    content: string(),
    contentSplit: nullish(string()),
  }),
  regex: object({
    novel: string(),
    novelIdPlaceholder: string(),
    chapterIdPlaceholder: string(),
    chapter: string(),
  }),
});

export const defaultCode = `{
    "mainPageUrl": "",
    "name": "",
    "search": {
        "li": "",
        "novelId": "",
        "authorName": "",
        "latestChapterId": "",
        "updateTime": "",
        "image": "",
        "label": "",
        "desc": "",
        "encoding": ""
    },
    "novel": {
        "info": {
            "name": "",
            "author": "",
            "lastUpdateTime": "",
            "latestChapterId": "",
            "encoding": "",
            "image": "",
            "desc": ""
        },
        "directory": {
            "chapterId": "",
            "encoding": ""
        }
    },
    "url": {
        "search": "",
        "novelInfo": "",
        "directory": "",
        "chapter": "",
        "searchPlaceholder": "",
        "novelPlaceholder": "",
        "chapterPlaceholder": ""
    },
    "content": {
        "encoding": "",
        "chapterName": "",
        "novelName": "",
        "preChapterId": "",
        "nextChapterId": "",
        "content": "",
        "contentSplit": ""
    },
    "regex": {
        "novel": "",
        "novelIdPlaceholder": "",
        "chapterIdPlaceholder": "",
        "chapter": ""
    }
}`;

export type TotalConfig = InferInput<typeof configSchema>;

export const steps = ['基本信息', '搜索', '目录', '章节内容'];
