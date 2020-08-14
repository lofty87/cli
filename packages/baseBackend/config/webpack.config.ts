import { basename } from 'path';

import chalk from 'chalk';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // ? clean build dir
import nodeExternals from 'webpack-node-externals'; // ? exclude node_modules
import CopyPlugin from 'copy-webpack-plugin'; // ? copy assets dir
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'; // ? using alias paths in tsconfig.json (like tsconfig-paths)
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; // ? build performance
import WebpackHookPlugin from 'webpack-hook-plugin'; // ? on build end

import env from './env';
import paths, { resolve } from './paths';
import { checkEnvVar, checkNodemonInstall } from './checks';
import { buildEndScript } from './scripts';

checkEnvVar();
checkNodemonInstall();

console.log(chalk.green(`\n----- build start (mode: ${chalk.greenBright(env.nodeEnv)}) -----\n`));

const assetsCopyDir = basename(paths.assetsDir);

const config: Configuration = {
  mode: env.nodeEnv as Configuration['mode'],
  target: 'node',
  context: paths.appDir,
  entry: paths.entry,
  output: {
    path: paths.buildDir,
    filename: paths.outputFilename,
  },
  watch: env.isDev,
  devtool: env.isDev ? 'inline-source-map' : undefined,
  module: {
    rules: [
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
      paths.appDir
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
          from: paths.assetsDir,
          to: assetsCopyDir,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackHookPlugin({
      onBuildEnd: env.isDev ? [ buildEndScript ] : undefined
    })
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
