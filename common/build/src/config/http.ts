import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import type { RspackOptions } from '@rspack/core';
import ServerConfig from '../plugin/http/ServerConfig';
import PackUpx from '../plugin/PackUpx';

const isProduction = process.env.NODE_ENV === 'production';

const config: RspackOptions = defineConfig({
  entry: {
    main: './src/main.tsx',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },
  output: {
    path: './build/web',
    publicPath: isProduction ? './' : undefined,
    globalObject: 'self',
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
  plugins: [...(isProduction ? [new PackUpx('http')] : [new ServerConfig()])],
  resolve: {
    alias: {
      '@http': resolve(process.cwd(), './src'),
    },
  },
});
export default config;
