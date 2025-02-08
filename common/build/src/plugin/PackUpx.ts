// eslint-disable no-console
/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-07 02:02:58
 * @FilePath: /utools/common/build/src/plugin/PackUpx.ts
 */
import { createPackage } from '@electron/asar';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import zlib from 'node:zlib';
import { promisify } from 'node:util';
import type { RsbuildPlugin } from '@rsbuild/core';

const pipelineAsync = promisify(pipeline);
const unlinkAsync = promisify(fs.unlink);

async function compressFile(inputFilePath: string, outputFilePath: string): Promise<void> {
  try {
    // 创建可读流来读取输入文件
    const readStream = fs.createReadStream(inputFilePath);

    // 创建 Gzip 压缩流
    const gzip = zlib.createGzip();

    // 创建可写流来写入压缩后的数据到输出文件
    const writeStream = fs.createWriteStream(outputFilePath);

    // 使用 promisify 将 pipeline 转换为返回 Promise 的函数
    await pipelineAsync(readStream, gzip, writeStream);

    console.log('文件压缩完成。');

    // 删除输入文件
    await unlinkAsync(inputFilePath);
  } catch (error) {
    console.error('文件压缩失败:', error);
  }
}

export function pluginPackUpx(name: string): RsbuildPlugin {
  return {
    name: 'plugin-pack-upx',
    setup(api) {
      api.onAfterBuild(async () => {
        console.log('afterDone');
        await createPackage('build', `dist/${name}.asar`);
        console.log('afterDone done');
        await compressFile(`dist/${name}.asar`, `dist/${name}.upx`);
      });
    },
  };
}
