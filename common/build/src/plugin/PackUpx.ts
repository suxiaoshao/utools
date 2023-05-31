import { createPackage } from '@electron/asar';
import { Compiler, RspackPluginInstance } from '@rspack/core';
import * as fs from 'fs';
import { pipeline } from 'stream';
import * as zlib from 'zlib';
import { promisify } from 'util';

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

export default class PackUpx implements RspackPluginInstance {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  apply(compiler: Compiler) {
    compiler.hooks.afterDone.tap('PackUpxWebpackPlugin', async () => {
      console.log('afterDone');
      await createPackage('build', `dist/${this.name}.asar`);
      console.log('afterDone done');
      await compressFile(`dist/${this.name}.asar`, `dist/${this.name}.upx`);
    });
  }
}
