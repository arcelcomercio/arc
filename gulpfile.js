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

      
// TODO: esperar parametros para `mode` "production" o "development"
/**
 * @see workbox-build https://developers.google.com/web/tools/workbox/guides/generate-service-worker/workbox-build
 * @see module-workbox-build https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.getManifest
 * @see common-recipes https://developers.google.com/web/tools/workbox/guides/common-recipes
 */
gulp.task('service-worker', () => {
  // eslint-disable-next-line global-require
  const workboxBuild = require('workbox-build')
  // const mode = process.env.NODE_ENV
  return workboxBuild.generateSW({
    // globDirectory: 'build',
    // globIgnores: [],
    // globPatterns: [
    //   '**/*.{html,json,js,css}',
    // ],
    // ignoreURLParametersMatching: [],
    swDest: 'resources/sw.js',
    inlineWorkboxRuntime: true,
    mode: 'production',
    navigationPreload: true,
    skipWaiting: true,
    // clientsClaim: false,
    // cacheId: 'siteId',
    // babelPresetEnvTargets,
    sourcemap: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === 'script' || request.destination === 'style',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'scripts-styles',
        },
      },
      {
        urlPattern: ({ url, request }) =>
          url.origin === 'https://fonts.gstatic.com' ||
          request.destination === 'font',
        handler: 'CacheFirst',
        options: {
          cacheName: 'webfonts',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
          },
        },
      },
      {
        urlPattern: ({ url, request }) => 
          request.destination === 'document' && url.origin === self.location.origin,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'routes',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 1 * 24 * 60 * 60, // 1 Day
          },
          cacheableResponse: {
            statuses: [0,200]
          }
        },
      },
    ],
  })
})
