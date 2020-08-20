export default {
  nodeEnv: process.env.REACT_APP_NODE_ENV || 'development',
  isDev: process.env.REACT_APP_NODE_ENV !== 'production',
  apiUrl: process.env.REACT_APP_API_URL as string,
  imagesUrl: process.env.REACT_APP_IMAGES_URL as string,
};
