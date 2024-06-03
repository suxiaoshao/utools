/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-01 00:17:15
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-03-07 23:52:02
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/http/rsbuild.config.ts
 */
import { defineConfig } from '@rsbuild/core';
import { resolve } from 'path';
import {
  pluginReact,
  pluginBuildInstall,
  pluginPackUpx,
  pluginServerConfig,
  pluginLightningcss,
  codeInspectorPlugin,
  RsdoctorRspackPlugin,
} from 'build';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBuildInstall(),
    pluginPackUpx('http'),
    pluginServerConfig(),
    pluginNodePolyfill(),
    pluginLightningcss(),
  ],
  server: {
    port: 8083,
  },
  dev: {
    lazyCompilation: true,
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    distPath: {
      root: './build/web',
    },
    assetPrefix: './',
  },
  tools: {
    rspack: {
      resolve: {
        tsConfig: {
          configFile: resolve(__dirname, '../../tsconfig.json'),
          references: 'auto',
        },
      },
    },
    bundlerChain: (chain) => {
      if (process.env.RSDOCTOR) {
        chain.plugin('rsdoctor').use(new RsdoctorRspackPlugin());
      }
      if (process.env.NODE_ENV === 'development') {
        chain.plugin('code-inspector').use(codeInspectorPlugin({ bundler: 'rspack' }));
      }
    },
  },
});
