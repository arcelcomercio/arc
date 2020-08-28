/* eslint-disable no-case-declarations */
import { AnalyticsScript, ScriptElement, ScriptHeader } from './scripts'
import ConfigParams from '../../../../utilities/config-params'
import StoryData from '../../../../utilities/story-data'
import { getResizedUrl } from '../../../../utilities/resizer'
import {
  countWords as countWordsHelper,
  nbspToSpace,
  isEmpty,
} from '../../../../utilities/helpers'
import recommederBySite from '../_children/recommeder-by-site'
import { ELEMENT_CUSTOM_EMBED } from '../../../../utilities/constants/element-types'
import {
  STORY_CORRECTION,
  STAMP_TRUST,
} from '../../../../utilities/constants/subtypes'
// import { getResultVideo } from '../../../../utilities/story/helpers'

/**
 *
 * Si piden que los videos vengan del CDN de Arc en lugar del
 * CDN de El Comercio, solo se debe comentar:
 *
 * import { getResultVideo } from '../../../../utilities/story/helpers'
 *
 * y descomentar la siguiente funcion
 */
const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
}

let hasRenderedContentVideo = false
const presets = 'resizedImage:840x0'

const buildIframeAdvertising = urlAdvertising => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`
}

const cleanTag = paragraph => {
  return nbspToSpace(paragraph.trim().replace(/<\/?(?:br|mark)[^<>]*>/, ''))
}

const clearHtml = paragraph => {
  return nbspToSpace(
    paragraph.replace(/(<([^>]+)>)/g, '').replace(/\s{2,}/g, ' ')
  )
}

const buildHeaderParagraph = (paragraph, level = '2') => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  if (level === 2 || level === 3 || level === 4 || level === 5 || level === 6) {
    result.processedParagraph =
      result.numberWords > 0 ? `<h2>${cleanTag(paragraph)}</h2>` : ''
  } else {
    result.processedParagraph =
      result.numberWords > 0
        ? `<h${level}>${cleanTag(paragraph)}</h${level}>`
        : ''
  }

  return result
}

const buildTexParagraph = paragraph => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph =
    result.numberWords > 0 ? `<p>${cleanTag(paragraph)}</p>` : ''

  return result
}

const CORRECTION_TYPE_CORRECTION = 'correction'

const buildCorrectionTexParagraph = (
  paragraph,
  type = CORRECTION_TYPE_CORRECTION
) => {
  const title =
    type === CORRECTION_TYPE_CORRECTION ? 'Corrección:' : 'Aclaración:'
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph =
    result.numberWords > 0
      ? `<blockquote><b>${title}</b> ${cleanTag(paragraph)}</blockquote>`
      : ''
  return result
}

const buildStampTrustTexParagraph = (paragraph, url, siteUrl = '') => {
  const result = { numberWords: 0, processedParagraph: '' }
  const urlTrust = url || `${siteUrl}/proyecto-confianza/`
  result.numberWords = countWordsHelper(clearHtml(paragraph))
  result.processedParagraph = `
      <blockquote>
        <h2>Conforme a los criterios de TRUST</h2>
        <div>
          <h4><a href="${urlTrust}">Saber más</a></h4>
        </div>
      </blockquote>
      `
  return result
}

const buildIntersticialParagraph = (paragraph, link) => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph =
    result.numberWords > 0
      ? `<p><b>[</b><a href="${link}">${cleanTag(paragraph)}</a><b>]</b></p>`
      : ''

  return result
}

const buildListLinkParagraph = (items, defaultImage, arcSite) => {
  const result = { numberWords: 0, processedParagraph: '' }

  result.processedParagraph =
    items.length > 0
      ? `<div>
          <div>Mira también:</div>
          ${items &&
            items.map(data => {
              const {
                url = '',
                content = '',
                image: { url: urlImg = '' } = {},
              } = data || {}
              result.numberWords += countWordsHelper(clearHtml(content))
              const { resizedImage } = getResizedUrl({
                url: urlImg,
                presets,
                arcSite,
              })
              return `
              <div>
                <figure>
                  <a href="${url}"><img src="${resizedImage ||
                urlImg ||
                defaultImage}" alt="${content}" /></a>
                </figure>
                <div>
                  <h2><a href="${url}">${content}</a></h2>
                </div>
              </div>`
            })}
        </div>`
      : ''

  return result
}

const analyzeParagraph = ({
  originalParagraph,
  type = '',
  subtype = '',
  numberWordMultimedia,
  level = null,
  opta,
  link,
  arcSite,
  defaultImage,
  streams = [],
  siteUrl = '',
}) => {
  // retorna el parrafo, el numero de palabras del parrafo y typo segunla logica

  const result = {
    originalParagraph,
    type,
    numberWords: 0,
    processedParagraph: '',
  }

  const processedParagraph = originalParagraph
  let textProcess = {}
  switch (type) {
    case ConfigParams.ELEMENT_TEXT:
    case ConfigParams.ELEMENT_BLOCKQUOTE:
      textProcess = buildTexParagraph(processedParagraph)

      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph

      break
    case ConfigParams.ELEMENT_INTERSTITIAL_LINK:
      textProcess = buildIntersticialParagraph(processedParagraph, link)

      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph

      break
    case ELEMENT_CUSTOM_EMBED:
      if (subtype === STORY_CORRECTION) {
        textProcess = buildCorrectionTexParagraph(
          processedParagraph,
          CORRECTION_TYPE_CORRECTION
        )
        result.numberWords = textProcess.numberWords
        result.processedParagraph = textProcess.processedParagraph
      }
      if (subtype === STAMP_TRUST) {
        textProcess = buildStampTrustTexParagraph(
          processedParagraph,
          link,
          siteUrl
        )
        result.numberWords = textProcess.numberWords
        result.processedParagraph = textProcess.processedParagraph
      }

      break
    case ConfigParams.ELEMENT_LINK_LIST:
      textProcess = buildListLinkParagraph(
        processedParagraph,
        defaultImage,
        arcSite
      )

      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph
        .split(',')
        .join('')

      break
    case ConfigParams.ELEMENT_HEADER:
      textProcess = buildHeaderParagraph(processedParagraph, level)

      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph

      break
    case ConfigParams.ELEMENT_LIST:
      const paramBuildListParagraph = {
        processedParagraph,
        numberWordMultimedia,
        opta,
        arcSite,
        defaultImage,
        siteUrl,
      }

      // eslint-disable-next-line no-use-before-define
      textProcess = buildListParagraph(paramBuildListParagraph)
      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph
      break
    case ConfigParams.ELEMENT_VIDEO:
      if (!hasRenderedContentVideo) {
        const urlVideo = getResultVideo(streams, arcSite, 'mp4')
        result.numberWords = numberWordMultimedia
        result.processedParagraph = `<figure class="op-interactive"><iframe width="560" height="315" src="${urlVideo}"></iframe></figure>`
        hasRenderedContentVideo = true
      }
      break

    case ConfigParams.ELEMENT_IMAGE:
      result.numberWords = numberWordMultimedia
      const { resizedImage } = getResizedUrl({
        url: processedParagraph,
        presets,
        arcSite,
      })
      result.processedParagraph = `<figure><img src="${resizedImage ||
        processedParagraph}" /></figure>`
      break

    case ConfigParams.ELEMENT_RAW_HTML:
      if (processedParagraph.includes('<iframe')) {
        // valida si el parrafo contiene un iframe con video youtube o foto

        result.processedParagraph = `<figure class="op-interactive">${processedParagraph.replace(
          /width=(?:"|')100%(?:"|')/g,
          `width="520"`
        )}</figure>`
      } else if (processedParagraph.includes('<img')) {
        // obtiene el valor del src de la imagen y el alt
        const imageUrl = processedParagraph.match(
          /img.+"(http(?:[s])?:\/\/[^"]+)/
        )
          ? processedParagraph.match(/img.+"(http(?:[s])?:\/\/[^"]+)/)[1]
          : ''

        const imageAlt = processedParagraph.match(/alt="([^"]+)?/)
          ? processedParagraph.match(/alt="([^"]+)?/)[1]
          : ''

        if (imageUrl !== '') {
          // eslint-disable-next-line no-shadow
          const { resizedImage } = getResizedUrl({
            url: imageUrl,
            presets,
            arcSite,
          })
          result.processedParagraph = `<figure class="op-interactive"><img width="560" height="315" src="${resizedImage ||
            imageUrl}" alt="${imageAlt}" /></figure>`
        } else {
          result.processedParagraph = ''
        }
      } else if (
        processedParagraph.includes('<blockquote class="instagram-media"') ||
        processedParagraph.includes('<blockquote class="twitter-tweet"')
      ) {
        // para twitter y para instagram
        result.processedParagraph = `<figure class="op-interactive"><iframe>${processedParagraph}</iframe></figure>`
      } else if (
        processedParagraph.includes('opta-widget') &&
        // eslint-disable-next-line camelcase
        typeof opta_settings === 'undefined'
      ) {
        const domainOriginIframeOpta = 'https://img.depor.com/opta/optawidget'
        const pattern = /^<opta-widget (.+)><\/opta-widget>$/
        const attributesWOpta = processedParagraph.match(pattern)[1].split(' ')

        let urlIframe = `${domainOriginIframeOpta}?`
        attributesWOpta.forEach((item, index) => {
          const attr = item.match(/(.+)="(.+)"/)
          const key = attr[1]
          const value = attr[2]
          urlIframe += `${key}=${value}${
            index < attributesWOpta.length - 1 ? '&' : ''
          }`
        })

        result.processedParagraph = `<iframe src="${urlIframe}" width="100%" height="500" style="max-height:500px" frameborder=0></iframe>`
      } else if (
        processedParagraph.includes('https://www.facebook.com/plugins')
      ) {
        // para facebook
        result.processedParagraph = `<figure class="op-interactive"><iframe>${processedParagraph}</iframe></figure>`
      } else if (processedParagraph.includes('cdn.jwplayer.com')) {
        const jwScript = processedParagraph.match(
          /https:\/\/cdn.jwplayer.com\/players\/(.+).js/
        )[0]
        result.processedParagraph = `<figure class="op-interactive"><iframe id='jwplayer_container'><script src="${jwScript}"></script></iframe></figure>`
      }
      result.numberWords = processedParagraph !== '' ? numberWordMultimedia : 0
      break

    default:
      result.numberWords = 0
      result.processedParagraph = ''
      break
  }

  return result
}

const buildListParagraph = ({
  processedParagraph: listParagraph,
  numberWordMultimedia,
  opta,
  arcSite,
  defaultImage,
  siteUrl = '',
}) => {
  const objTextsProcess = { processedParagraph: '', numberWords: 0 }
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(
    ({ type = '', payload = '', link = '', streams = [] }) => {
      const { processedParagraph, numberWords } = analyzeParagraph({
        originalParagraph: payload,
        type,
        numberWordMultimedia,
        opta,
        link,
        arcSite,
        defaultImage,
        streams,
        siteUrl,
      })
      objTextsProcess.processedParagraph += `<li>${processedParagraph}</li>`
      objTextsProcess.numberWords += numberWords
    }
  )

  objTextsProcess.processedParagraph = `<ul>${objTextsProcess.processedParagraph}</ul>`
  // objTextsProcess.totalwords = countwords
  return objTextsProcess
}

const ParagraphshWithAdds = ({
  paragraphsNews = [],
  firstAdd = 100,
  nextAdds = 350,
  numberWordMultimedia = 70,
  arrayadvertising = [],
  opta,
  siteUrl,
  arcSite,
  defaultImage = '',
}) => {
  let newsWithAdd = []
  let countWords = 0
  let IndexAdd = 0
  let lookAlso = []

  newsWithAdd = paragraphsNews
    .map(
      ({
        payload: originalParagraph,
        type,
        subtype = '',
        level,
        link = '',
        streams = [],
      }) => {
        let paragraphwithAdd = ''

        let { processedParagraph, numberWords } = analyzeParagraph({
          originalParagraph,
          type,
          subtype,
          numberWordMultimedia,
          level,
          opta,
          link,
          arcSite,
          defaultImage,
          streams,
          siteUrl,
        })

        if (ConfigParams.ELEMENT_STORY === type) {
          lookAlso.push(originalParagraph)
        }
        if (ConfigParams.ELEMENT_STORY !== type && lookAlso.length > 0) {
          let ulLookAlso = `<ul class="op-related-articles" title="Mira También">`
          lookAlso.forEach(value => {
            ulLookAlso += `<li><a href="${siteUrl}${value}"></a></li>`
          })
          processedParagraph = `${ulLookAlso}</ul>`
          numberWords = countWordsHelper(clearHtml(processedParagraph))
          lookAlso = []
        }

        countWords += numberWords

        if (IndexAdd === 0) {
          if (countWords >= firstAdd) {
            countWords = type !== ConfigParams.ELEMENT_HEADER ? 0 : countWords

            paragraphwithAdd = `${processedParagraph} ${
              arrayadvertising[IndexAdd] && type !== ConfigParams.ELEMENT_HEADER
                ? buildIframeAdvertising(arrayadvertising[IndexAdd])
                : ''
            }`
            IndexAdd += type !== ConfigParams.ELEMENT_HEADER ? 1 : 0
          } else {
            paragraphwithAdd = `${processedParagraph}`
          }
        } else {
          // a partir del segundo parrafo se inserta cada 350 palabras (nextAdds)
          // si el parrafo tiene contenido multimedia se cuenta como 70 palabras
          // eslint-disable-next-line no-lonely-if
          if (countWords >= nextAdds) {
            countWords = type !== ConfigParams.ELEMENT_HEADER ? 0 : countWords
            paragraphwithAdd = `${processedParagraph} ${
              arrayadvertising[IndexAdd] && type !== ConfigParams.ELEMENT_HEADER
                ? buildIframeAdvertising(arrayadvertising[IndexAdd])
                : ''
            }`
            IndexAdd += type !== ConfigParams.ELEMENT_HEADER ? 1 : 0
          } else {
            paragraphwithAdd = `${processedParagraph}`
          }
        }

        return `${paragraphwithAdd}`
      }
    )
    .join('')

  return newsWithAdd
}

const multimediaHeader = (
  { type = '', payload = '' },
  title,
  videoPrincipal,
  arcSite
) => {
  let result = ''
  const urlVideo = getResultVideo(videoPrincipal, arcSite, 'mp4')
  switch (type) {
    case ConfigParams.IMAGE:
      const { resizedImage } = getResizedUrl({
        url: payload,
        presets,
        arcSite,
      })
      result = `<figure><img src="${resizedImage || payload}" />${
        title ? `<figcaption>${title}</figcaption>` : ''
      }</figure>`
      break
    case ConfigParams.VIDEO:
      result = `<figure class="op-interactive"><iframe width="560" height="315" src="${urlVideo}"></iframe>${
        title ? `<figcaption>${title}</figcaption>` : ''
      }</figure>`
      break
    case ConfigParams.GALLERY:
      result = `<figure class="op-slideshow">${payload.map(url => {
        // eslint-disable-next-line no-shadow
        const { resizedImage } = getResizedUrl({
          url,
          presets,
          arcSite,
        })
        return `<figure><img src="${resizedImage || url}" /></figure>`
      })}${title ? `<figcaption>${title}</figcaption>` : ''}</figure>`
      break
    case ConfigParams.ELEMENT_YOUTUBE_ID:
      result = `<figure class="op-interactive"><iframe width="560" height="315" src="https://www.youtube.com/embed/${payload}"></iframe>${
        title ? `<figcaption>${title}</figcaption>` : ''
      }</figure>`
      break
    case ConfigParams.ELEMENT_PODCAST:
      result = `<figure class="op-interactive"><iframe width="150" height="100" scrolling="no" frameborder="0"><audio controls><source src="${payload}" type="audio/mpeg"></audio></iframe></figure>`
      break
    default:
      break
  }

  return result
}

const BuildHtml = ({
  scriptAnaliticaProps,
  propsScriptHeader,
  title,
  subTitle,
  canonical,
  oppublished,
  multimedia,
  paragraphsNews = [],
  author = '',
  fbArticleStyle = '',
  listUrlAdvertisings,
  websiteUrlsBytag,
  arcSite,
  section,
  opta,
  getPremiumValue,
  siteUrl,
  defaultImage,
  recommenderData,
  videoPrincipal = [],
}) => {
  const firstAdd = 100
  const nextAdds = 350
  const numberWordMultimedia = 70

  const paramsBuildParagraph = {
    paragraphsNews,
    firstAdd,
    nextAdds,
    numberWordMultimedia,
    arrayadvertising: listUrlAdvertisings,
    opta,
    siteUrl,
    arcSite,
    defaultImage,
  }
  const getContentType = ({ premium = '' } = {}) => {
    const premiumValue =
      getPremiumValue === 'vacio' ? 'metered' : getPremiumValue
    let contenType = premium ? 'locked' : premiumValue
    contenType = section.match(/publirreportaje|publireportaje/)
      ? 'free'
      : contenType

    contenType = arcSite === section.match(/mag/) ? 'free' : contenType
    return contenType
  }
  const { type } = multimedia || {}
  try {
    const element = `
  <html lang="es" prefix="op: http://media.facebook.com/op#">
  <head>
      <meta charset="utf-8" />
      <meta property="op:markup_version" content="v1.0" />
      <meta property="fb:article_style" content="${fbArticleStyle}" />
      <meta property="article:content_tier" content="${getContentType(
        propsScriptHeader
      )}"/>
      <link rel="canonical" href="${canonical}"/>
  </head>
  <body>
    <article>
      <figure class="op-tracker">
        <iframe>
          <script>${AnalyticsScript(scriptAnaliticaProps)}</script>
          <script type="text/javascript">${ScriptHeader(
            propsScriptHeader
          )}</script>
          <script defer src="//static.chartbeat.com/js/chartbeat_fia.js"></script>
          <script>${ScriptElement()}</script>
        </iframe>
      </figure>
    
      <header>
        <h1>${title}</h1>
        ${!isEmpty(subTitle) ? `<h2>${subTitle}</h2>` : ''}
        <time class="op-published" datetime="${oppublished}"> ${oppublished}</time>
      </header>
      ${multimediaHeader(multimedia, title, videoPrincipal, arcSite)}
      
      ${!isEmpty(author) ? `<p>${author}</p>` : ''}
      ${ParagraphshWithAdds(paramsBuildParagraph)}
      ${
        !(arcSite === 'ojo' && section === 'ojo-show')
          ? `
        ${
          type === ConfigParams.GALLERY
            ? `<p><a href="${canonical}?ref=fia">Ver nota completa</a></p>`
            : ''
        }
        ${
          websiteUrlsBytag.length > 1
            ? `<ul class="op-related-articles" title="Noticias relacionadas">
          ${websiteUrlsBytag
            .map(url =>
              url === canonical ? '' : `<li><a href="${url}"></a></li>`
            )
            .join('')}
          </ul>`
            : ''
        }
        ${recommederBySite({ data: recommenderData, arcSite })}
        `
          : ''
      }
    </article>
  </body>
</html>`
    return element
  } catch (ex) {
    console.error(ex)
    return null
  }
}

export default BuildHtml
