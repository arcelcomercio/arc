const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CreateFileWebpack = require('create-file-webpack')
const glob = require('glob')
const webpack = require('webpack')
const paths = require('./paths')

const APP_DEFAULT = 'index'
const APP_AMP = 'amp'
const APP_MOBILE = 'mobile'
const APP_DMOBILE = 'dmobile'
const generalStylesPath = `${paths.generalStyles}/components`

module.exports = type => {
  const addCssBase = () => {
    let cssBaseFeature = []
    let cssBaseGlobalComponent = []
    if (type === APP_AMP) {
      cssBaseFeature = [
        '/features/layout/navbar/navbar-somos',
        '/features/story/content/related-content',
        '/features/story/header/story-gallery',
      ]
      cssBaseGlobalComponent = [
        '/global-components/icons',
        '/global-components/story-table',
      ]
    }
    return { feature: cssBaseFeature, globalComponent: cssBaseGlobalComponent }
  }
  const getListStyleComponents = dir => {
    let pathStyle = `${generalStylesPath}/*(${dir})/**/**/_!(amp-|mobile-|dmobile-)*.scss`
    if (type === APP_AMP) {
      pathStyle = `${generalStylesPath}/*(${dir})/**/**/_amp-*.scss`
    }

    if (type === APP_MOBILE) {
      pathStyle = `${generalStylesPath}/*(${dir})/**/**/_mobile-*.scss`
    }
    if (type === APP_DMOBILE) {
      pathStyle = `${generalStylesPath}/*(${dir})/**/**/_dmobile-*.scss`
    }
    let entryStyles = glob.sync(pathStyle)
    entryStyles = entryStyles.map(el => {
      return el.split(generalStylesPath).join('')
    })
    return entryStyles
  }

  const writeImportCss = contentArr => {
    const contentImportsCss = contentArr.map(element => {
      const elementFormatter = element.replace(/_(.+).scss/g, '$1')
      return `@import '.${elementFormatter}';`
    }, '')
    return contentImportsCss.join(`\r\n`)
  }

  const getOptionsIndexStyleWebpack = nameFile => {
    const cssBase = addCssBase()
    const styleGlobalComponent = getListStyleComponents(
      'global-components'
    ).concat(cssBase.globalComponent)
    const styleFeatures = getListStyleComponents('features').concat(
      cssBase.feature
    )
    const cssGlobalComponents = writeImportCss(styleGlobalComponent)
    const cssFeatures = writeImportCss(styleFeatures)
    const importListCss = `/******* Globals *******/\r\n${cssGlobalComponents}\r\n/******* Features *******/\r\n${cssFeatures}`
    return {
      path: generalStylesPath,
      fileName: nameFile,
      content: importListCss,
    }
  }

  const plugins = [
    new MiniCssExtractPlugin({
      filename: `[name]/css/${type === 'index' ? 'style' : type}.css`,
    }),
    // Aquí se reemplaza ;[path]; por el nombre del sitio web
    new webpack.LoaderOptionsPlugin({
      options: {
        customInterpolateName: url => {
          return url.replace(/;.+;/, url.match(/;.+websites\/(\w+).*;/)[1])
        },
      },
    }),
  ]

  // Genera el _index.scss de todo los estilos de los features a utilizar
  if (type === APP_DEFAULT) {
    plugins.unshift(
      new CreateFileWebpack(getOptionsIndexStyleWebpack('_index.scss'))
    )
  } else if (type === APP_AMP) {
    plugins.unshift(
      new CreateFileWebpack(getOptionsIndexStyleWebpack('_amp.scss'))
    )
  } else if (type === APP_DMOBILE) {
    plugins.unshift(
      new CreateFileWebpack(getOptionsIndexStyleWebpack('_dmobile.scss'))
    )
  } else if (type === APP_MOBILE) {
    plugins.unshift(
      new CreateFileWebpack(getOptionsIndexStyleWebpack('_mobile.scss'))
    )
  }

  if (type !== APP_AMP && type !== APP_MOBILE && type !== APP_DMOBILE) {
    plugins.push(
      new CleanWebpackPlugin([paths.dist], {
        verbose: true,
        root: paths.base,
      })
    )
  }

  return plugins
}
