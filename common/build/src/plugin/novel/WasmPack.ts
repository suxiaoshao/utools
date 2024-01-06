/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-07 02:03:32
 * @FilePath: /utools/common/build/src/plugin/novel/WasmPack.ts
 */
import { execSync } from 'child_process';
import { RsbuildPlugin } from '@rsbuild/core';

export function pluginWasmPack(): RsbuildPlugin {
  return {
    name: 'plugin-wasm-pack',
    setup(api) {
      api.onBeforeCreateCompiler(async () => {
        execSync('wasm-pack build --release -t web ./data/', { stdio: 'inherit' });
      });
    },
  };
}
