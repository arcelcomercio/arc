// Configs
const entries = require("./entries")
const paths = require("./paths");
const rules = require("./rules");
const plugins = require("./plugins");

module.exports = env => {

  const mode = env.dev ? 'development' : 'production'

  return {
    mode,
    context: paths.base,
    entry: entries(),
    output: {
      path: paths.dist,
      publicPath: paths.dist,
      filename: '[name]/js/index.js',
    },
    // devtool: 'source-map',
    module: {
      rules: rules(mode)
    },
    plugins: plugins(env)
  }
}