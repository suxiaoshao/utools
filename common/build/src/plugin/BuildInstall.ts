/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-07 01:40:01
 * @FilePath: /utools/common/build/src/plugin/BuildInstall.ts
 */
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core';

export function pluginBuildInstall(): RsbuildPlugin {
  return {
    name: 'plugin-build-install',
    setup(api) {
      api.onBeforeCreateCompiler(() => {
        execSync('npm install', { stdio: 'inherit', cwd: resolve(process.cwd(), './build') });
      });
    },
  };
}
