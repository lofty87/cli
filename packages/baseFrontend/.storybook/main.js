const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // ? using alias paths in tsconfig.json (like tsconfig-paths)
const CopyPlugin = require('copy-webpack-plugin'); // ? copy assets dir

const paths = require('../config/paths');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config) => {
    // * resolve
    const resolveModules = config.resolve.modules;
    config.resolve.modules = resolveModules.concat(paths.appPath);
    
    const resolvePlugins = config.resolve.plugins;
    config.resolve.plugins = resolvePlugins.concat(
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json', // ? cwd()
        extensions: [ '.tsx', '.ts', '.js' ],
      })
    );
    
    // * module
    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: paths.appPath,
    });
    
    // * plugins
    const plugins = config.plugins;
    config.plugins = plugins.concat(
      new CopyPlugin({
        patterns: [
          {
            from: paths.assetsDir,
            to: path.basename(paths.assetsDir)
          },
        ],
      })
    );
    
    return config;
  },
}
