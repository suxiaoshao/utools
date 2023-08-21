import { defineConfig } from '@rspack/cli';
import { resolve } from 'path';
import { RspackOptions } from '@rspack/core';
import PackUpx from '../plugin/PackUpx';
import WasmPack from '../plugin/novel/WasmPack';

const isProduction = process.env.NODE_ENV === 'production';

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
  plugins: [...(isProduction ? [new WasmPack(), new PackUpx('novel')] : [])],
  resolve: {
    alias: {
      '@novel': resolve(process.cwd(), './src'),
    },
  },
});
export default config;
