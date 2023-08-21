import { execSync } from 'child_process';
import { Compiler, RspackPluginInstance } from '@rspack/core';
export default class WasmPack implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tap('WasmPackWebpackPlugin', () => {
      execSync('wasm-pack build --release -t web ./data/', { stdio: 'inherit' });
    });
  }
}
