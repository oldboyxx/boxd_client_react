const config = {

  base: {
    srcPath: __dirname,
    apiURL: 'http://localhost:3000',
    appURL: 'http://localhost:8080',
  },

  development: {
    becomeDevUser: false
  },

  test: {
  },

  production: {
    apiURL: 'http://boxd-api.ivorreic.com',
    appURL: 'http://boxd.ivorreic.com'
  }
}

export default {
  ...config.base,
  ...config[process.env.NODE_ENV]
}
