import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import { RspackOptions, RspackPluginInstance } from '@rspack/core';
import PackUpx from '../plugin/PackUpx';
import WasmPack from '../plugin/novel/WasmPack';
import { isProduction } from '../const';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const config: RspackOptions = defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: './build/web',
    publicPath: isProduction ? './' : undefined,
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
    port: 8082,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  devtool: isProduction ? false : undefined,
  plugins: [
    ...(isProduction ? [new WasmPack(), new PackUpx('novel')] : []),
    new MonacoWebpackPlugin({}) as unknown as RspackPluginInstance,
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
