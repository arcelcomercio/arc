const fs = require('fs')
const paths = require('./paths')

module.exports = () => {
    const entries = {}
    const buildSites = fs.readdirSync(paths.src).filter(file => file !== 'postcss.config.js');
    buildSites.forEach(site => {
        entries[site] = `./src/websites/${site}/index.js`
    })

    return entries
}