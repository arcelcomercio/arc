const fs = require('fs')
const paths = require('./paths')

module.exports = (name = 'index') => {
  const entries = {}
  const buildSites = fs
    .readdirSync(paths.src)
    .filter(file => file !== 'postcss.config.js')
  buildSites.forEach(site => {
    entries[site] = `./src/websites/${site}/${name}.js`
  })

  return entries
}
