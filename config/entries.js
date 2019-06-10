const fs = require('fs')
const paths = require('./paths')

module.exports = (type = 'index') => {
  const ext = type === 'amp' ? 'scss' : 'js'
  const entries = {}
  const buildSites = fs
    .readdirSync(paths.src)
    .filter(file => file !== 'postcss.config.js')
  buildSites.forEach(site => {
    entries[site] = `./src/websites/${site}/${type}.${ext}`
  })
  return entries
}
