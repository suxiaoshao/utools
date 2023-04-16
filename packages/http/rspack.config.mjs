import { defineConfig } from '@rspack/cli';

const config = defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: './build/react',
    publicPath: process.env.production ? './' : undefined,
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
});
export default config;
