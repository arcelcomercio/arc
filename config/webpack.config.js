// Configs
const entries = require('./entries')
const paths = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')

module.exports = env => {
  const mode = env.dev ? 'development' : 'production'
  const type = env.amp ? 'amp' : 'index'
  const ext = env.amp ? 'css' : 'js'

  console.log('==============================')
  console.log('test')
  console.log('==============================')

  return {
    mode,
    context: paths.base,
    entry: entries(type),
    output: {
      path: paths.dist,
      publicPath: paths.dist,
      filename: `[name]/${ext}/${type === 'amp' ? 'dump' : type}.${ext}`,
    },
    devtool: env.dev && type !== 'amp' ? 'source-map' : 'none',
    module: {
      rules: rules(mode, type),
    },
    plugins: plugins(type),
  }
}
