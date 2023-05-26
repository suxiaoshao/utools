import { defineConfig, definePlugin } from '@rspack/cli';
import { spawn } from 'child_process';

const isProduction = process.env.NODE_ENV === 'production';

const plugin = definePlugin({
  apply: (compiler) => {
    compiler.hooks.environment.tap('ConsoleLogOnBuildWebpackPlugin', () => {
      console.log('afterEnvironment');
      const child = spawn('cargo', ['watch', '-C', './server', '-x', 'run --release']);
      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    });
  },
});

const config = defineConfig({
  entry: {
    main: './src/main.tsx',
    jsonWorker: './node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
    cssWorker: './node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
    htmlWorker: './node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
    tsWorker: './node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
    editorWorker: './node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
  },
  output: {
    path: './build/web',
    publicPath: isProduction ? './' : undefined,
  },
  builtins: {
    html: [
      {
        template: './index.html',
        chunks: ['main'],
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.png$/,
        type: 'asset',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
      },
    ],
  },
  devServer: {
    port: 8083,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  devtool: isProduction ? false : undefined,
  externals: {
    fs: 'fs',
    path: 'path',
    crypto: 'crypto',
  },
  plugins: [plugin],
});
export default config;
