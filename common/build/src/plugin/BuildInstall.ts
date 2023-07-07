import { execSync } from 'child_process';
import { Compiler, RspackPluginInstance } from '@rspack/core';
export default class BuildInstall implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap('BuildInstallWebpackPlugin', () => {
      execSync('cd ./build && yarn && cd ..', { stdio: 'inherit' });
    });
  }
}
