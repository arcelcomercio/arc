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
    // Solo activar si se define estrategia para rutas
    // navigationPreload: true,
    skipWaiting: true,
    // clientsClaim: false,
    // cacheId: 'siteId',
    // babelPresetEnvTargets,
    sourcemap: true,
    runtimeCaching: [
      {
        // Estrategia para imagenes redimensionadas
        urlPattern: ({ url, request }) =>
          /^\/resizer\//.test(url.pathname) && request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'resized-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 5 * 60, // 5 mins
          },
        },
      },
      {
        // Estrategia para imagenes estaticas en resources
        urlPattern: ({ url, request }) =>
          /^(\/pf)?\/resources\/dist\//.test(url.pathname) &&
          request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'resources-images',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
          },
        },
      },
      {
        // Estrategia para estilos estaticos en resources
        urlPattern: ({ url, request }) =>
          /^(\/pf)?\/resources\/dist\//.test(url.pathname) &&
          request.destination === 'style',
        handler: 'CacheFirst',
        options: {
          cacheName: 'resources-styles',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 hour
          },
        },
      },
      {
        // Estrategia para webfonts
        urlPattern: ({ url, request }) =>
          url.origin === 'https://fonts.gstatic.com' ||
          request.destination === 'font',
        handler: 'CacheFirst',
        options: {
          cacheName: 'webfonts',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
          },
        },
      },
      {
        // Estrategia para assets estaticos en resources
        // cambiar por cacheFirst cuando se verifique
        // que los assets tengan ?d=
        urlPattern: /^(\/pf)?\/resources\/assets\//,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'resources-assets',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
          },
        },
      },
      {
        // Estrategia para pages y templates de ARC
        urlPattern: /^(\/pf)?\/dist\/(template|page)\//,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'arc-templates',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 5 * 60, // 5 mins
          },
        },
      },
      {
        // Estrategia para bundle de outputType y React de ARC
        urlPattern: /^(\/pf)?\/dist\/(engine|components)\/?/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'arc-bundles',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
          },
        },
      },
    ],
  })
})
