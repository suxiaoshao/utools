/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-01 00:17:15
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-07 02:01:33
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/http/rsbuild.config.ts
 */
import { defineConfig } from '@rsbuild/core';
import { resolve } from 'path';
import { MonacoWebpackPlugin, pluginReact, pluginBuildInstall, pluginPackUpx, pluginServerConfig } from 'build';
export default defineConfig({
  plugins: [pluginReact(), pluginBuildInstall(), pluginPackUpx('http'), pluginServerConfig()],
  server: {
    port: 8083,
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
    bundlerChain: (chain, { isProd }) => {
      chain.plugin('monaco').use(MonacoWebpackPlugin);
    },
  },
});
