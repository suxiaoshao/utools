import { defineConfig } from '@rspack/cli';

const isProduction = process.env.NODE_ENV === 'production';

const config = defineConfig({
  entry: {
    main: './src/main.tsx',
    jsonWorker: './node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
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
    port: 8082,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
  },
  devtool: isProduction ? false : undefined,
});
export default config;
