const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/saas' : ''

module.exports = {
  basePath,
  assetPrefix: basePath,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    basePath
  }
}