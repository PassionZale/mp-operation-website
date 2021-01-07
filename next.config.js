const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/gtms' : ''

module.exports = {
  basePath,
  assetPrefix: basePath,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    basePath
  }
}