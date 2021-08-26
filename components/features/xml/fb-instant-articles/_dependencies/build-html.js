/* eslint-disable no-case-declarations */
import ConfigParams from '../../../../utilities/config-params'
import { ELEMENT_CUSTOM_EMBED } from '../../../../utilities/constants/element-types'
import { JWPLAYER } from '../../../../utilities/constants/multimedia-types'
import {
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
  STAMP_TRUST,
  STORY_CORRECTION,
  VIDEO_JWPLAYER,
} from '../../../../utilities/constants/subtypes'
import {
  countWords as countWordsHelper,
  isEmpty,
  nbspToSpace,
} from '../../../../utilities/helpers'
import { createResizedParams } from '../../../../utilities/resizer/resizer'
import {
  getResultJwplayer,
  getResultVideo,
  stripTags,
} from '../../../../utilities/story/helpers'
import StoryData from '../../../../utilities/story-data'
import { storyTagsBbc } from '../../../../utilities/tags'
import recommederBySite from '../_children/recommeder-by-site'
import {
  AnalyticsScript,
  ScriptElement,
  ScriptElementBbc,
  ScriptHeader,
} from './scripts'

/**
 *
 * Si piden que los videos vengan del CDN de Arc en lugar del
 * CDN de El Comercio, solo se debe comentar:
 *
 * import { getResultVideo } from '../../../../utilities/story/helpers'
 *
 * y descomentar la siguiente funcion
 */
/* const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
} */

const presets = 'resizedImage:840x0'

const buildIframeAdvertising = (urlAdvertising) =>
  `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`

const cleanTag = (paragraph) =>
  nbspToSpace(paragraph.trim().replace(/<\/?(?:br|mark)[^<>]*>/, ''))

const clearHtml = (paragraph) =>
  nbspToSpace(paragraph.replace(/(<([^>]+)>)/g, '').replace(/\s{2,}/g, ' '))

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

const buildTexParagraph = (paragraph) => {
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
  const urlTrust = url || `${siteUrl}/buenas-practicas/`
  const urlImgTrust = paragraph || `${siteUrl}/buenas-practicas/#trust-project`
  // result.numberWords = countWordsHelper(clearHtml(paragraph))

  result.processedParagraph = `
      <blockquote>
        <h2>Conforme a los criterios de <a href="${urlImgTrust}">TRUST</a></h2>
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
          ${
            items &&
            items.map((data) => {
              const {
                url = '',
                content = '',
                image: { url: urlImg = '' } = {},
              } = data || {}
              result.numberWords += countWordsHelper(clearHtml(content))
              const { resizedImage } = createResizedParams({
                url: urlImg,
                presets,
                arcSite,
              })
              return `
              <div>
                <figure>
                  <a href="${url}"><img src="${
                resizedImage || urlImg || defaultImage
              }" alt="${content}" /></a>
                </figure>
                <div>
                  <h2><a href="${url}">${content}</a></h2>
                </div>
              </div>`
            })
          }
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
  typeConfig = '',
  subtypeTheme = '',
  hasAds = '',
  jwplayers,
  account,
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
        const typeCorrection = typeConfig || CORRECTION_TYPE_CORRECTION
        textProcess = buildCorrectionTexParagraph(
          processedParagraph,
          typeCorrection
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
      if (subtype === VIDEO_JWPLAYER) {
        let ulrJwplayer = ''
        let jwplayerId = ''
        if (originalParagraph) {
          ulrJwplayer = getResultJwplayer(originalParagraph)
          const playerId = jwplayers[account] || jwplayers.gec
          jwplayerId = hasAds ? playerId.playerAds : playerId.player
          const gulrJwplay = ulrJwplayer.match(
            /videos\/(([0-9a-zA-Z])\w+)-([0-9a-zA-Z])\w+.mp4/
          )
          ulrJwplayer = gulrJwplay?.[1] || []
        }
        result.processedParagraph = `<figure class="op-interactive"><iframe width="560" height="315" frameborder="0" scrolling="auto" title="mag" style="position:absolute;" allowfullscreen src="https://cdn.jwplayer.com/players/${ulrJwplayer}-${jwplayerId}.html"></iframe></figure>`
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
        jwplayers,
      }

      // eslint-disable-next-line no-use-before-define
      textProcess = buildListParagraph(paramBuildListParagraph)
      result.numberWords = textProcess.numberWords
      result.processedParagraph = textProcess.processedParagraph
      break
    case ConfigParams.ELEMENT_VIDEO:
      const urlVideo = getResultVideo(streams, arcSite, 'mp4')
      result.numberWords = numberWordMultimedia
      result.processedParagraph = `<figure><video data-fb-disable-autoplay ><source src="${urlVideo}" type="video/mp4" /></video></figure>`
      break

    case ConfigParams.ELEMENT_IMAGE:
      result.numberWords = numberWordMultimedia
      const { resizedImage } = createResizedParams({
        url: processedParagraph,
        presets,
        arcSite,
      })
      result.processedParagraph = `<figure><img src="${
        resizedImage || processedParagraph
      }" /></figure>`
      break

    case ConfigParams.ELEMENT_RAW_HTML:
      if (subtypeTheme === MINUTO_MINUTO) {
        const res = processedParagraph.split(
          '<div class="live-event2-comment">'
        )
        let bloqueHtml = ''
        res.forEach((entry, i) => {
          let entryHtml = ''

          if (i !== 0) {
            entryHtml = `<div class="live-event2-comment">${entry.replace(
              /<div id="(.+?)" class="flex justify-center"><\/div>/g,
              ''
            )}<div`

            entryHtml = entryHtml
              .replace(/(>{"@type":(.*)<\/script>:)/gm, '')
              .replace(/(:<script.*)/, '')
              .replace(/(:fijado:|:icon:)/g, '')

            if (
              entryHtml.includes('<blockquote class="instagram-media"') ||
              entryHtml.includes('<blockquote class="twitter-tweet"') ||
              entryHtml.includes('<blockquote class="tiktok-embed"')
            ) {
              // para twitter y para instagram
              const arrayTwitter = entryHtml.match(
                /<blockquote .+?>(.+?||(.+\n||(.+\n)+?.+?).+?)<\/blockquote>(.+?||)<script.+?><\/script>/g
              )
              entryHtml = `<xxfigure class="op-interactive"><iframe>${
                arrayTwitter[0]
              }</iframe></xxfigure> ${entryHtml.replace(arrayTwitter[0], '')}`
            } else if (entryHtml.includes('https://www.facebook.com/plugins')) {
              // para facebook

              const arrayFacebook = entryHtml.match(
                /(<iframe(.+?||(.+\n||(.+\n)+?.+?).+?)src="(.+?||(.+\n||(.+\n)+?.+?).+?)"(.+?||(.+\n||(.+\n)+?.+?).+?)><\/iframe>)/g
              )
              entryHtml = `<xxfigure class="op-interactive"><iframe>${
                arrayFacebook[0]
              }</iframe></xxfigure> ${entryHtml.replace(arrayFacebook[0], '')}`
            } else if (entryHtml.includes('<iframe')) {
              // valida si el parrafo contiene un iframe con video youtube o foto
              entryHtml = `<figure class="op-interactive">${processedParagraph.replace(
                /width=(?:"|')100%(?:"|')/g,
                `width="520"`
              )}</figure>`
            }

            entryHtml = stripTags(
              entryHtml,
              '<xxfigure><iframe><div><p><a><img><strong><blockquote><script>'
            )
            if (entryHtml.includes('<img')) {
              // para twitter y para instagram
              const imageHtml = entryHtml.match(
                /<img class="([A-Za-z0-9-]*[A-Za-z0-9-])" src="((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)">/g
              )

              entryHtml = `${imageHtml[0]} ${entryHtml.replace(
                imageHtml[0],
                ''
              )}`
              entryHtml = entryHtml.replace(
                /<img class="([A-Za-z0-9-]*[A-Za-z0-9-])" src="((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)">/g,
                '<figure><img width="560" height="315" src="$2" /></figure>'
              )
            }

            entryHtml = entryHtml.replace(
              /<div class="live-event2-comment">(.+?||(.+\n||(.+\n)+?.+?).+?)<\/div><div/gm,
              '<blockquote>$1</blockquote>'
            )
          }
          bloqueHtml = `${bloqueHtml}${entryHtml.replace(
            /<div class="live-event2-comment">(.+?||(.+\n||(.+\n)+?.+?).+?)<\/div><\/div>/g,
            '<blockquote>$1</blockquote>'
          )}`
        })
        result.processedParagraph = bloqueHtml.replace(/xxfigure/g, 'figure')
      } else if (processedParagraph.includes('<iframe')) {
        // valida si el parrafo contiene un iframe con video youtube o foto

        result.processedParagraph = `<figure class="op-interactive">${processedParagraph.replace(
          /width=(?:"|')100%(?:"|')/g,
          `width="520"`
        )}</figure>`
      } else if (processedParagraph.includes('<mxm-event')) {
        const liveBlog = processedParagraph
          .replace(/(>{"@type":(.*)<\/script>:)/gm, '')
          .replace(/(:<script.*)/, '')
          .replace(
            /<div class="live-event-minute">([A-Za-z0-9:-]*[A-Z:a-z0-9-])<\/div>/gm,
            '<xtrong>$1</xtrong>'
          )
        const liveBlogStrong = liveBlog.replace(
          /<xtrong>([A-Za-z0-9:-]*[A-Z:a-z0-9-])<\/xtrong>(.+?)<p>/gm,
          '<p><strong>$1 </strong> '
        )
        const liveBlogTags = stripTags(liveBlogStrong, '<p><a><img><strong>')

        const liveBlogResult = liveBlogTags.replace(
          /<img class="([A-Za-z0-9-]*[A-Za-z0-9-])" src="((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?)">/gm,
          '<figure><img img width="560" height="315" src="$2" /></figure>'
        )

        result.processedParagraph = liveBlogResult
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
          const { resizedImage } = createResizedParams({
            url: imageUrl,
            presets,
            arcSite,
          })
          result.processedParagraph = `<figure class="op-interactive"><img width="560" height="315" src="${
            resizedImage || imageUrl
          }" alt="${imageAlt}" /></figure>`
        } else {
          result.processedParagraph = ''
        }
      } else if (
        processedParagraph.includes('<blockquote class="instagram-media"') ||
        processedParagraph.includes('<blockquote class="twitter-tweet"') ||
        processedParagraph.includes('<blockquote class="tiktok-embed"')
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
        const attributesWOpta =
          processedParagraph.match(pattern)[1].split(' ') || []

        let urlIframe = `${domainOriginIframeOpta}?`
        attributesWOpta.forEach((item, index) => {
          const attr = item.match(/(.+)="(.+)"/)
          if (attr[1]) {
            const key = attr[1]
            const value = attr[2]
            urlIframe += `${key}=${value}${
              index < attributesWOpta.length - 1 ? '&' : ''
            }`
          }
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
  subtypeTheme,
  jwplayers,
}) => {
  const objTextsProcess = { processedParagraph: '', numberWords: 0 }
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(
    ({
      type = '',
      payload = '',
      link = '',
      streams = [],
      type_config: typeConfig = '',
      subtype = '',
      hasAds = '',
      account,
    }) => {
      const { processedParagraph, numberWords } = analyzeParagraph({
        originalParagraph: payload,
        type,
        subtype,
        numberWordMultimedia,
        opta,
        link,
        arcSite,
        defaultImage,
        streams,
        siteUrl,
        typeConfig,
        subtypeTheme,
        hasAds,
        account,
        jwplayers,
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
  subtypeTheme = '',
  defaultImage = '',
  jwplayers,
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
        type_config: typeConfig = '',
        hasAds,
        account,
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
          typeConfig,
          subtypeTheme,
          hasAds,
          account,
          jwplayers,
        })

        if (ConfigParams.ELEMENT_STORY === type) {
          lookAlso.push(originalParagraph)
        }
        if (ConfigParams.ELEMENT_STORY !== type && lookAlso.length > 0) {
          let ulLookAlso = `<ul class="op-related-articles" title="Mira También">`
          lookAlso.forEach((value) => {
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
  arcSite,
  subtype,
  contentElementGallery,
  promoItemJwplayer,
  jwplayers
) => {
  let result = ''
  const urlVideo = getResultVideo(videoPrincipal, arcSite, 'mp4')

  switch (type) {
    case ConfigParams.IMAGE:
      const { resizedImage } = createResizedParams({
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
    case JWPLAYER:
      let ulrJwplayer = ''
      let jwplayerId = ''
      if (promoItemJwplayer && promoItemJwplayer.key) {
        ulrJwplayer = getResultJwplayer(promoItemJwplayer.conversions)
        const playerId = jwplayers[promoItemJwplayer?.account] || jwplayers.gec
        jwplayerId = promoItemJwplayer?.has_ads
          ? playerId.playerAds
          : playerId.player
        const gulrJwplay = ulrJwplayer.match(
          /videos\/(([0-9a-zA-Z])\w+)-([0-9a-zA-Z])\w+.mp4/
        )
        ulrJwplayer = gulrJwplay?.[1] || []
      }

      result = `<figure class="op-interactive"><iframe width="560" height="315" frameborder="0" scrolling="auto" title="mag" style="position:absolute;" allowfullscreen src="https://cdn.jwplayer.com/players/${ulrJwplayer}-${jwplayerId}.html"></iframe>${
        title ? `<figcaption>${title}</figcaption>` : ''
      }</figure>`

      break
    case ConfigParams.GALLERY:
      if (subtype === GALLERY_VERTICAL) {
        const { content_elements: contentElements } = contentElementGallery
        result = `${contentElements.map(
          ({ caption = '', url, subtitle = '' }, i) => {
            // eslint-disable-next-line no-shadow
            const { resizedImage } = createResizedParams({
              url,
              presets,
              arcSite,
            })
            return `<p>Foto ${i + 1} de ${
              contentElements.length
            }</p><figure><img src="${resizedImage || url}" /> ${
              title
                ? `<figcaption><strong>${subtitle}</strong>${caption}</figcaption>`
                : ''
            } </figure>`
          }
        )}`
        break
      } else {
        result = `<figure class="op-slideshow">${payload.map((url) => {
          // eslint-disable-next-line no-shadow
          const { resizedImage } = createResizedParams({
            url,
            presets,
            arcSite,
          })
          return `<figure><img src="${resizedImage || url}" /></figure>`
        })}${title ? `<figcaption>${title}</figcaption>` : ''}</figure>`
        break
      }
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
  subtype,
  contentElementGallery,
  promoItemJwplayer,
  tags = [],
  jwplayers,
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
    subtypeTheme: subtype,
    arcSite,
    defaultImage,
    jwplayers,
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
  const isProvecho = canonical.match(/\/provecho\//)
  const headerProvecho = `<figure>
    <img src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/PC5JSZKFKZEAFJEY7BF4XAPSII.png" />
  </figure>`
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
          <noscript>
            <img src="http://b.scorecardresearch.com/p?c1=2&c2=8429002&cv=2.0&cj=1&comscorekw=fbia" />
          </noscript>
        </iframe>
      </figure>
      ${
        storyTagsBbc(tags) &&
        `<figure class="op-tracker">
            <iframe>
              <script>${ScriptElementBbc()}</script>
              <noscript>
                <img
                  src="//a1.api.bbc.co.uk/hit.xiti?library_version=synd_v5.7.0_nojs&s=598346"
                  height="1"
                  width="1"
                  border="0"
                  alt=""
                />
              </noscript>
            </iframe>
          </figure>
          `
      }
    
      <header>
        ${isProvecho ? headerProvecho : ''}
        <h1>${title}</h1>
        ${!isEmpty(subTitle) ? `<h2>${subTitle}</h2>` : ''}
        <time class="op-published" datetime="${oppublished}"> ${oppublished}</time>
      </header>
      ${multimediaHeader(
        multimedia,
        title,
        videoPrincipal,
        arcSite,
        subtype,
        contentElementGallery,
        promoItemJwplayer,
        jwplayers
      )}
      
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
            .map((url) =>
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
