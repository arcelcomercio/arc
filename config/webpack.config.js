// Configs
const entries = require('./entries')
const paths = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')

function setConfig(listOutputs, mode) {
  return listOutputs.map(([type, ext]) => ({
    mode,
    context: paths.base,
    entry: entries(type, ext),
    output: {
      path: paths.dist,
      publicPath: paths.dist,
      filename: `[name]/${ext}/${ext === 'css' ? 'dump' : type}.${ext}`,
    },
    devtool: mode === 'development' ? 'eval-source-map' : undefined,
    module: {
      rules: rules(mode, type),
    },
    plugins: plugins(type),
  }))
}

function destructuring(outputs) {
  return outputs.split(',').map((output) => {
    const outputList = output.trim().split(':')
    return outputList.length === 2 ? outputList : [...outputList, 'js']
  })
}

module.exports = (env) => {
  const { outputs = 'index' } = env
  const mode = env.dev ? 'development' : 'production'
  // const type = env.amp ? 'amp' : 'index'
  // const ext = env.amp ? 'css' : 'js'

  return [...setConfig(destructuring(outputs), mode)]

  // return {
  //   mode,
  //   context: paths.base,
  //   entry: entries(type),
  //   output: {
  //     path: paths.dist,
  //     publicPath: paths.dist,
  //     filename: `[name]/${ext}/${type === 'amp' ? 'dump' : type}.${ext}`,
  //   },
  //   devtool: env.dev && type !== 'amp' ? 'source-map' : 'none',
  //   module: {
  //     rules: rules(mode, type),
  //   },
  //   plugins: plugins(type),
  // }
}
