export default {
  nodeEnv: process.env.REACT_APP_NODE_ENV || 'development',
  isDev: process.env.REACT_APP_NODE_ENV !== 'production',
  timezone: process.env.REACT_APP_TIMEZONE as string,
  apiUrl: process.env.REACT_APP_API_URL as string,
  assetsUrl: process.env.REACT_APP_ASSETS_URL as string,
  imagesUrl: `${process.env.REACT_APP_ASSETS_URL}/images`,
};
