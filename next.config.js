const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  basePath: isProd ? '/gtms' : '',
  assetPrefix: isProd ? '/gtms' : '',
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    basePath: isProd ? '/gtms' : ''
  }
}