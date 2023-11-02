import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import ServerConfig from '../plugin/http/ServerConfig';
import PackUpx from '../plugin/PackUpx';
import { isProduction } from '../const';
import BuildInstall from '../plugin/BuildInstall';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

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
  builtins: {
    html: [
      {
        template: './index.html',
        chunks: ['main'],
      },
    ],
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
    ...(isProduction ? [new PackUpx('http')] : [new ServerConfig()]),
    new BuildInstall(),
    new MonacoWebpackPlugin() as unknown as RspackPluginInstance,
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
    },
  },
});
export default config;
