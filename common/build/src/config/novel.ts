/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-10-18 16:57:14
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-09 19:33:57
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/common/build/src/config/novel.ts
 */
import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import { RspackOptions, RspackPluginInstance } from '@rspack/core';
import PackUpx from '../plugin/PackUpx';
import WasmPack from '../plugin/novel/WasmPack';
import { isProduction } from '../const';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import HtmlPlugin from '@rspack/plugin-html';

const config: RspackOptions = defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: './build/web',
    publicPath: isProduction ? './' : undefined,
    clean: isProduction ? true : undefined,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.png$/,
        type: 'asset',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: !isProduction,
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  devServer: {
    port: 8082,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  devtool: isProduction ? false : undefined,
  plugins: [
    ...(isProduction ? [new WasmPack(), new PackUpx('novel')] : [new ReactRefreshPlugin()]),
    new MonacoWebpackPlugin({}) as unknown as RspackPluginInstance,
    new HtmlPlugin({
      template: './index.html',
      chunks: ['main'],
    }),
  ],
  resolve: {
    tsConfig: {
      configFile: resolve(__dirname, '../../../../tsconfig.json'),
      references: 'auto',
    },
  },
  experiments: {
    rspackFuture: {
      newResolver: true,
      disableTransformByDefault: true,
    },
  },
});
export default config;
