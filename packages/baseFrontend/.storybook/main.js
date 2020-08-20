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
    config.resolve.modules.concat(paths.appPath);
    config.resolve.plugins.concat(
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json', // ? cwd()
        extensions: [ '.tsx', '.ts', '.js' ],
      })
    );
    config.plugins.concat(
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
