/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-11-10 18:37:14
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-10 18:46:49
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/novel/src/types/config.ts
 */
import { TotalConfig } from '@novel/page/EditConfig/const';

export type ContentConfig = TotalConfig['content'];
export type RegexConfig = TotalConfig['regex'];
export type SearchConfig = TotalConfig['search'];
export type UrlConfig = TotalConfig['url'];
export type NovelInfoConfig = TotalConfig['novel'];

export type DirectoryConfig = NovelInfoConfig['directory'];

export type InfoConfig = NovelInfoConfig['info'];
