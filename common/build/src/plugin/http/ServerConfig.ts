import { spawn } from 'child_process';
import { Compiler, RspackPluginInstance } from '@rspack/core';
export default class ServerConfig implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.environment.tap('ServerConfigWebpackPlugin', () => {
      console.log('afterEnvironment');
      const child = spawn('cargo', ['watch', '-C', './server', '-x', 'run --release']);
      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    });
  }
}
