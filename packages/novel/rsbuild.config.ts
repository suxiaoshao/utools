/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-01 00:17:15
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-01 02:31:11
 * @FilePath: /tauri/Users/weijie.su/Documents/code/self/utools/packages/http/rsbuild.config.ts
 */
import { defineConfig } from '@rsbuild/core';
import { resolve } from 'path';
import { MonacoWebpackPlugin, PackUpx, pluginReact, WasmPack } from 'build';
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 8082,
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
      if (isProd) {
        chain.plugin('upx-pack').use(PackUpx, ['novel']);
        chain.plugin('wasm-pack').use(WasmPack);
      }
    },
  },
});
