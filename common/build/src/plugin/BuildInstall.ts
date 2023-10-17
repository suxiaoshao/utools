import { execSync } from 'child_process';
import { Compiler, RspackPluginInstance } from '@rspack/core';
import { resolve } from 'path';
export default class BuildInstall implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap('BuildInstallWebpackPlugin', () => {
      execSync('npm install', { stdio: 'inherit', cwd: resolve(process.cwd(), './build') });
    });
  }
}
