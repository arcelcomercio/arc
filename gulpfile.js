const gulp = require('gulp')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

gulp.task('default', () =>
  gulp
    .src('./src/appnexus/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(minify())
    .pipe(gulp.dest('./resources/assets/js'))
)
