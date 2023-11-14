/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2023-10-18 16:57:14
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2023-11-14 18:56:37
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/common/build/src/config/http.ts
 */
import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import ServerConfig from '../plugin/http/ServerConfig';
import PackUpx from '../plugin/PackUpx';
import { isProduction } from '../const';
import BuildInstall from '../plugin/BuildInstall';
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
    globalObject: 'self',
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
    port: 8083,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  devtool: isProduction ? false : undefined,
  externals: {
    fs: 'fs',
    path: 'path',
    crypto: 'crypto',
  },
  plugins: [
    ...(isProduction ? [new PackUpx('http')] : [new ServerConfig(), new ReactRefreshPlugin()]),
    new BuildInstall(),
    new MonacoWebpackPlugin() as unknown as RspackPluginInstance,
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
