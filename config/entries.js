const fs = require('fs')
const path = require('path')
const paths = require('./paths')

module.exports = (type = 'index', _ext = 'js') => {
  const ext = _ext === 'css' ? 'scss' : _ext
  // const ext = type === 'amp' ? 'scss' : 'js'
  const entries = {}
  const buildSites = fs
    .readdirSync(paths.src)
    .filter(file => file !== 'postcss.config.js')
  buildSites.forEach(site => {
    if (fs.existsSync(`${path.resolve(paths.src, site, `${type}.${ext}`)}`))
      entries[site] = `./src/websites/${site}/${type}.${ext}`
  })
  return entries
}
