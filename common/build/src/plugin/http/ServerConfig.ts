// eslint-disable no-console
/*
 * @Author: suxiaoshao suxiaoshao@gmail.com
 * @Date: 2024-01-06 01:37:31
 * @LastEditors: suxiaoshao suxiaoshao@gmail.com
 * @LastEditTime: 2024-01-07 02:03:22
 * @FilePath: /utools/common/build/src/plugin/http/ServerConfig.ts
 */
import { spawn } from 'node:child_process';
import type { RsbuildPlugin } from '@rsbuild/core';

export function pluginServerConfig(): RsbuildPlugin {
  return {
    name: 'plugin-server-config',
    setup(api) {
      api.onBeforeStartDevServer(() => {
        console.log('afterDone');
        const child = spawn('cargo', ['watch', '-C', './server', '-x', 'run --release']);
        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
      });
    },
  };
}
