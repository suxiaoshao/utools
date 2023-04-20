import { defineConfig } from '@rspack/cli';

const isProduction = process.env.NODE_ENV === 'production';

const config = defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: './build/web',
    publicPath: isProduction ? './' : undefined,
  },
  builtins: {
    html: [
      {
        template: './index.html',
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
});
export default config;
