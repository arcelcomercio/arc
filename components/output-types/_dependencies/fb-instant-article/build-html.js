/* eslint-disable no-case-declarations */
import { AnalyticsScript, ScriptElement, ScriptHeader } from './scripts'
import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'
import {
  countWords as countWordsHelper,
  nbspToSpace,
  isEmpty,
} from '../../../utilities/helpers'
import { getResultVideo } from '../../../utilities/story/helpers'

// const NUMBER_WORD_MULTIMEDIA = 70

const buildIframeAdvertising = urlAdvertising => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`
}

const clearBrTag = paragraph => {
  return nbspToSpace(paragraph.trim().replace(/<\/?br[^<>]+>/, ''))
}

const clearHtml = paragraph => {
  return nbspToSpace(
    clearBrTag(
      paragraph
        .trim()
        .replace(/(<([^>]+)>)/gi, '')
        .replace('   ', ' ')
        .replace('  ', ' ')
    )
  )
}

const buildHeaderParagraph = (paragraph, level = '2') => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  if (level === 2 || level === 3 || level === 4 || level === 5 || level === 6) {
    result.processedParagraph =
      result.numberWords > 0 ? `<h2>${clearBrTag(paragraph)}</h2>` : ''
  } else {
    result.processedParagraph =
      result.numberWords > 0
        ? `<h${level}>${clearBrTag(paragraph)}</h${level}>`
        : ''
  }

  return result
}

const buildTexParagraph = paragraph => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph =
    result.numberWords > 0 ? `<p>${clearBrTag(paragraph)}</p>` : ''

  return result
}

const buildIntersticialParagraph = (paragraph, link) => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph =
    result.numberWords > 0
      ? `<p><b>[</b><a href="${link}">${clearBrTag(paragraph)}</a><b>]</b></p>`
      : ''

  return result
}

const buildListLinkParagraph = (items, defaultImage) => {
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
                image: { url: urlImg = defaultImage } = {},
              } = data || {}
              result.numberWords += countWordsHelper(clearHtml(content))
              return `
              <div>
                <figure>
                  <a href="${url}"><img src="${urlImg}" alt="${content}" /></a>
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
  numberWordMultimedia,
  level = null,
  link,
  defaultImage,
  arcSite,
  streams,
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
    case ConfigParams.ELEMENT_LINK_LIST:
      textProcess = buildListLinkParagraph(processedParagraph, defaultImage)

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
        defaultImage,
      }

      // textProcess = buildListParagraph(processedParagraph)
      // eslint-disable-next-line no-use-before-define
      textProcess = buildListParagraph(paramBuildListParagraph)
      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph
      break
    case ConfigParams.ELEMENT_VIDEO:
      const urlVideo = getResultVideo(streams, arcSite, 'mp4')
      result.numberWords = numberWordMultimedia
      result.processedParagraph = `<figure><video><source src="${urlVideo}" type="video/mp4"></video></figure>`
      break

    case ConfigParams.ELEMENT_IMAGE:
      result.numberWords = numberWordMultimedia
      result.processedParagraph = `<figure><img src="${processedParagraph}" /></figure>`
      break

    case ConfigParams.ELEMENT_RAW_HTML:
      if (processedParagraph.includes('<iframe')) {
        // valida si el parrafo contiene un iframe con video youtube o foto

        result.processedParagraph = `<figure class="op-interactive">${processedParagraph}</figure>`
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
          result.processedParagraph = `<figure class="op-interactive"><img width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>`
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
        processedParagraph.includes('https://www.facebook.com/plugins')
      ) {
        // para facebook
        result.processedParagraph = `<figure class="op-interactive"><iframe>${processedParagraph}</iframe></figure>`
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
  defaultImage,
}) => {
  const objTextsProcess = { processedParagraph: '', numberWords: 0 }
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(
    ({ type = '', payload = '', link = '', streams = [] }) => {
      const { processedParagraph, numberWords } = analyzeParagraph({
        originalParagraph: payload,
        type,
        numberWordMultimedia,
        link,
        defaultImage,
        streams,
        // numberWordMultimedia: NUMBER_WORD_MULTIMEDIA,
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
        level,
        link = '',
        streams = [],
      }) => {
        let paragraphwithAdd = ''

        let { processedParagraph, numberWords } = analyzeParagraph({
          originalParagraph,
          type,
          numberWordMultimedia,
          level,
          link,
          paragraphsNews,
          defaultImage,
          arcSite,
          streams,
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
      result = `<figure><img src="${payload}" /><figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.VIDEO:
      result = `<figure > <video> <source src="${urlVideo}" type="video/mp4" />  </video><figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.GALLERY:
      result = `<figure class="op-slideshow">${payload.map(
        url => `<figure><img src="${url}" /></figure>`
      )}<figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.ELEMENT_YOUTUBE_ID:
      result = `<figure class="op-interactive"><iframe width="560" height="315" src="https://www.youtube.com/embed/${payload}"></iframe><figcaption>${title}</figcaption></figure>`
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
  getPremiumValue,
  videoPrincipal = [],
  siteUrl,
  defaultImage,
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
        !(
          (arcSite === 'ojo' && section === 'ojo-show') ||
          (arcSite === 'publimetro' && section === 'actualidad') ||
          (arcSite === 'publimetro' && section === 'redes-sociales') ||
          (arcSite === 'publimetro' && section === 'entretenimiento')
        )
          ? `
        ${
          type === ConfigParams.GALLERY
            ? `<p><a href="${canonical}?ref=fia">Ver nota completa</a></p>`
            : ''
        }
        ${
          websiteUrlsBytag.length > 0
            ? `<ul class="op-related-articles" title="Noticias relacionadas">
          ${websiteUrlsBytag
            .map(url =>
              url === canonical ? '' : `<li><a href="${url}"></a></li>`
            )
            .join('')}
          </ul>`
            : ''
        }
        `
          : ''
      }
    </article>
  </body>
</html>`
    return element
  } catch (ex) {
    console.log(ex)
    return null
  }
}

export default BuildHtml
