import { basename } from 'path';

import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // ? clean build dir
import nodeExternals from 'webpack-node-externals'; // ? exclude node_modules
import CopyPlugin from 'copy-webpack-plugin'; // ? copy packages dir
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'; // ? using alias paths in tsconfig.json (like tsconfig-paths)
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; // ? build performance
import WebpackHookPlugin from 'webpack-hook-plugin'; // ? on build end

import paths, { resolve } from './paths';
import { buildEndScript } from './scripts';

const SHEBANG = '#!/usr/bin/env node'; // ! required for bin
const packagesCopyDir = basename(paths.packagesDir);

const config: webpack.Configuration = {
  mode: 'production',
  target: 'node',
  context: paths.rootDir,
  entry: paths.entry,
  output: {
    path: paths.buildDir,
    filename: paths.outputFilename,
  },
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        options: {
          fix: false,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: [
          paths.configDir,
          paths.srcDir
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: [
      resolve('node_modules'),
      paths.rootDir
    ], // ? absolute path is recommended
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json', // ? cwd()
        extensions: [ '.tsx', '.ts', '.js' ],
      }),
    ],
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.packagesDir,
          to: packagesCopyDir,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: [
          './config/**/*.{ts,tsx}',
          './src/**/*.{ts,tsx}'
        ], // ? cwd()
      },
    }),
    new webpack.BannerPlugin({
      banner: SHEBANG,
      raw: true,
    }),
    new WebpackHookPlugin({
      onBuildEnd: [
        buildEndScript
      ],
    }),
  ],
  stats: {
    builtAt: false,
    cached: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    entrypoints: false,
    hash: false,
    version: false,
  },
};

export default config;
