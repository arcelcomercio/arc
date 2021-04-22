const path = require('path')

const baseDir = path.resolve(__dirname, '..')

module.exports = {
  base: baseDir,
  config: path.resolve(baseDir, 'config'),
  dist: path.resolve(baseDir, 'resources', 'dist'),
  src: path.resolve(baseDir, 'src', 'websites'),
  generalStyles: path.resolve(baseDir, 'src', 'general-styles'),
  resources: path.resolve(baseDir, 'resources'),
}
