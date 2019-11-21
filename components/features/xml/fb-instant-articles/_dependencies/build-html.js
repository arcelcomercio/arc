/* eslint-disable no-case-declarations */
import { AnalyticsScript, ScriptElement, ScriptHeader } from './scripts'
import ConfigParams from '../../../../utilities/config-params'
import StoryData from '../../../../utilities/story-data'
import {
  countWords as countWordsHelper,
  nbspToSpace,
  isEmpty,
} from '../../../../utilities/helpers'

const NUMBER_WORD_MULTIMEDIA = 70

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

  result.processedParagraph =
    result.numberWords > 0 ? `<h${level}>${clearBrTag(paragraph)}</h${level}>` : ''

  return result
}

const buildTexParagraph = paragraph => {
  const result = { numberWords: 0, processedParagraph: '' }
  result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph = result.numberWords > 0 ? `<p>${clearBrTag(paragraph)}</p>` : ''

  return result
}

const analyzeParagraph = ({
  originalParagraph,
  type = '',
  numberWordMultimedia,
  level = null,
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
      textProcess = buildTexParagraph(processedParagraph)

      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph

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
        }

      // eslint-disable-next-line no-use-before-define
      textProcess = buildListParagraph(paramBuildListParagraph)
      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph
      break
    case ConfigParams.ELEMENT_VIDEO:
      result.numberWords = numberWordMultimedia
      result.processedParagraph = `<figure class="op-interactive"><iframe src="https://d1tqo5nrys2b20.cloudfront.net/prod/powaEmbed.html?org=elcomercio&env=prod&api=prod&uuid=${processedParagraph}" width="640" height="400" data-category-id="sample" data-aspect-ratio="0.5625" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></figure>`
      break

    case ConfigParams.ELEMENT_IMAGE:
      result.numberWords = numberWordMultimedia
      result.processedParagraph = `<figure><img src="${processedParagraph}" /><figcaption></figcaption></figure>`
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
}) => {
  const objTextsProcess = { processedParagraph: '', numberWords: 0 }
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(({ type = '', payload = '' }) => {
    const { processedParagraph, numberWords } = analyzeParagraph({
      originalParagraph: payload,
      type,
      numberWordMultimedia,
    })
    objTextsProcess.processedParagraph += `<li>${processedParagraph}</li>`
    objTextsProcess.numberWords += numberWords
  })

  objTextsProcess.processedParagraph = `<ul>${
    objTextsProcess.processedParagraph
    }</ul>`
  // objTextsProcess.totalwords = countwords
  return objTextsProcess
}

const ParagraphshWithAdds = ({
  paragraphsNews = [],
  firstAdd = 100,
  nextAdds = 250,
  numberWordMultimedia = 70,
  arrayadvertising = [],
}) => {
  let newsWithAdd = []
  let countWords = 0
  let IndexAdd = 0
  // const numberWordMultimedia = NUMBER_WORD_MULTIMEDIA

  newsWithAdd = paragraphsNews
    .map(({ payload: originalParagraph, type, level }) => {
      let paragraphwithAdd = ''

      const { processedParagraph, numberWords } = analyzeParagraph({
        originalParagraph,
        type,
        numberWordMultimedia,
        level,
      })


      countWords += numberWords

      if (IndexAdd === 0) {
        if (countWords >= firstAdd) {
          countWords = type !== ConfigParams.ELEMENT_HEADER ? 0 : countWords

          paragraphwithAdd = `${processedParagraph} ${
            arrayadvertising[IndexAdd] && type !== ConfigParams.ELEMENT_HEADER
              ? buildIframeAdvertising(arrayadvertising[IndexAdd])
              : ''
            }`
          IndexAdd += 1
        } else {
          paragraphwithAdd = `${processedParagraph}`
        }
      } else {

        // a partir del segundo parrafo se inserta cada 250 palabras (nextAdds)
        // si el parrafo tiene contenido multimedia se cuenta como 70 palabras
        // eslint-disable-next-line no-lonely-if
        if (countWords >= nextAdds) {

          countWords = type !== ConfigParams.ELEMENT_HEADER ? 0 : countWords
          paragraphwithAdd = `${processedParagraph} ${
            arrayadvertising[IndexAdd] && type !== ConfigParams.ELEMENT_HEADER
              ? buildIframeAdvertising(arrayadvertising[IndexAdd])
              : ''
            }`
          IndexAdd += 1
        } else {
          paragraphwithAdd = `${processedParagraph}`
        }
      }

      return `${paragraphwithAdd}`
    })
    .join('')

  return newsWithAdd
}

const multimediaHeader = ({ type = '', payload = '' }, title) => {
  let result = ''
  switch (type) {
    case ConfigParams.IMAGE:
      result = `<figure><img src="${payload}" /><figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.VIDEO:
      result = `<figure class="op-interactive"><iframe src="https://d1tqo5nrys2b20.cloudfront.net/prod/powaEmbed.html?org=elcomercio&env=prod&api=prod&uuid=${payload}" width="640" height="400" data-category-id="sample" data-aspect-ratio="0.5625" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.GALLERY:
      result = `<figure class="op-slideshow">${payload.map(
        url => `<figure><img src="${url}" /></figure>`
      )}<figcaption>${title}</figcaption></figure>`
      break
    case ConfigParams.ELEMENT_YOUTUBE_ID:
      result = `<figure class="op-interactive"><iframe width="560" height="315" src="https://www.youtube.com/embed/${payload}"></iframe><figcaption>${title}</figcaption></figure>`
      break
    default:
      result = ''
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
  }

  try {
    const element = `
  <html lang="es" prefix="op: http://media.facebook.com/op#">
  <head>
      <meta charset="utf-8" />
      <meta property="op:markup_version" content="v1.0" />
      <meta property="fb:article_style" content="${fbArticleStyle}" />
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
      ${multimediaHeader(multimedia, title)}
      
      ${!isEmpty(author) ? `<p>${author}</p>` : ''}
      ${ParagraphshWithAdds(paramsBuildParagraph)}
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
