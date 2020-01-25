const config = {
  base: {
    srcPath: __dirname,
    apiURL: 'http://localhost:3000',
    appURL: 'http://localhost:8080',
  },

  development: {
    becomeDevUser: false,
  },

  test: {},

  production: {
    apiURL: 'https://boxd-api.ivorreic.com',
    appURL: 'https://boxd.ivorreic.com',
  },
};

export default {
  ...config.base,
  ...config[process.env.NODE_ENV],
};
