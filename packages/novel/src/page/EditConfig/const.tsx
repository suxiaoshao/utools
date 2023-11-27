import * as Yup from 'yup';

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
export const configSchema = Yup.object().shape({
  mainPageUrl: Yup.string().url().required('主页链接不能为空').label('主页链接'),
  name: Yup.string().required('小说源名不能为空').label('小说源名'),
  search: Yup.object()
    .required('搜索部分的配置不能为空')
    .label('搜索部分的配置')
    .shape({
      li: Yup.string().required('每项搜索结果不能为空').label('每项搜索结果'),
      novelId: Yup.string().required('小说链接的 a 标签不能为空').label('小说链接的 a 标签'),
      authorName: Yup.string().label('包含作者名的元素').required(),
      latestChapterId: Yup.string().required('最后章节链接的 a 标签不能为空').label('最后章节链接的 a 标签'),
      updateTime: Yup.string().label('包含最后更新时间的元素').required(),
      image: Yup.string().label('小说图片的 img 标签').required(),
      label: Yup.string().label('包含小说类型的元素').required(),
      desc: Yup.string().label('包含小说描述的元素').required(),
      encoding: Yup.string().label('这个页面的字符集').required(),
    }),
  novel: Yup.object()
    .required('小说页面的爬取结果不能为空')
    .label('小说页面的爬取结果')
    .shape({
      info: Yup.object()
        .required('小说信息页面的爬取结果不能为空')
        .label('小说信息页面的爬取结果')
        .shape({
          name: Yup.string().label('包含小说名的元素').required(),
          author: Yup.string().label('包含作者名的元素').required(),
          lastUpdateTime: Yup.string().label('包含最后更新时间的元素').required(),
          latestChapterId: Yup.string().required('最新章节的 a 标签不能为空').label('最新章节的 a 标签'),
          encoding: Yup.string().label('html 页面的字符集').required(),
          image: Yup.string().label('小说图片的 ima 标签').required(),
          desc: Yup.string().label('包含小说描述的元素').required(),
        }),
      directory: Yup.object()
        .required('章节页的配置不能为空')
        .label('章节页的配置')
        .shape({
          chapterId: Yup.string().required('包含小说章节的 a 标签不能为空').label('包含小说章节的 a 标签'),
          encoding: Yup.string().label('页面字符集').required(),
        }),
    }),
  url: Yup.object()
    .required('链接的配置不能为空')
    .label('链接的配置')

    .shape({
      search: Yup.string().required('小说搜索的链接不能为空').label('小说搜索的链接'),
      novelInfo: Yup.string().required('小说页面的链接不能为空').label('小说页面的链接'),
      directory: Yup.string().required('目录页面的链接不能为空').label('目录页面的链接'),
      chapter: Yup.string().required('小说章节的链接不能为空').label('小说章节的链接'),
      searchPlaceholder: Yup.string().label('搜索关键字占位符').required(),
      novelPlaceholder: Yup.string().label('小说 id 的占位符').required(),
      chapterPlaceholder: Yup.string().label('章节 id 的占位符').required(),
    }),
  content: Yup.object()
    .required('章节页面的配置不能为空')
    .label('章节页面的配置')
    .shape({
      encoding: Yup.string().required('页面字符集不能为空').label('页面字符集'),
      chapterName: Yup.string().required('包含章节名的元素不能为空').label('包含章节名的元素'),
      novelName: Yup.string().required('包含小说名的元素不能为空').label('包含小说名的元素'),
      preChapterId: Yup.string().required('上一章的 a 标签不能为空').label('上一章的 a 标签'),
      nextChapterId: Yup.string().required('下一章的 a 标签不能为空').label('下一章的 a 标签'),
      content: Yup.string().required('章节内容不能为空').label('章节内容'),
      contentSplit: Yup.string().nullable().label('分割章节内容的字符串'),
    }),
  regex: Yup.object()
    .required('用于从链接中解析数据的正则不能为空')
    .label('用于从链接中解析数据的正则')
    .shape({
      novel: Yup.string()
        .required('从小说链接获取小说 id 的正则表达式不能为空')
        .label('从小说链接获取小说 id 的正则表达式'),
      novelIdPlaceholder: Yup.string().label('小说 id 的分组占位符').required(),
      chapterIdPlaceholder: Yup.string().label('章节 id 的分组占位符').required(),
      chapter: Yup.string()
        .required('从章节链接获取章节 id 的正则表达式不能为空')
        .label('从章节链接获取章节 id 的正则表达式'),
    }),
});

export type TotalConfig = Yup.InferType<typeof configSchema>;

export const steps = ['基本信息', '搜索', '目录', '章节内容'];
