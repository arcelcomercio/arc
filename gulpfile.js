const fs = require('fs')
const gulp = require('gulp')
const multiDest = require('gulp-multi-dest')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

const buildSites = fs
  .readdirSync(__dirname + '/src/websites')
  .filter(file => file !== 'postcss.config.js')

const outputBrands = buildSites.map(brand => `./resources/dist/${brand}/js`)

gulp.task('default', () =>
  gulp
    .src('./src/appnexus/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(minify())
    .pipe(multiDest(outputBrands))
)
