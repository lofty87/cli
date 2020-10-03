import { basename } from 'path';

import { BannerPlugin, Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // ? clean build dir
import nodeExternals from 'webpack-node-externals'; // ? exclude node_modules
import CopyPlugin from 'copy-webpack-plugin'; // ? copy packages dir
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'; // ? using alias paths in tsconfig.json (like tsconfig-paths)
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; // ? build performance
import WebpackHookPlugin from 'webpack-hook-plugin'; // ? on build end

import paths, { resolveApp } from './paths';
import { buildEndScript } from './scripts';

const SHEBANG = '#!/usr/bin/env node'; // ! required for bin
const packagesCopyDir = basename(paths.packagesDir);

const config: Configuration = {
  mode: 'production',
  target: 'node',
  context: paths.rootDir,
  entry: paths.entry,
  output: {
    path: paths.buildDir,
    filename: paths.outputFilename,
  },
  watch: true,
  devtool: 'source-map',
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
          paths.typesDir,
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
      resolveApp('node_modules'),
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
          './@types/**/*.{ts,tsx}',
          './config/**/*.{ts,tsx}',
          './src/**/*.{ts,tsx}'
        ], // ? cwd()
      },
    }),
    new BannerPlugin({
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
