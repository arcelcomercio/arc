import ConfigParams from '../../../../utilities/config-params'

/* const buildIframeAdvertising = urlAdvertising => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`
} */

const buildParagraph = (paragraph, type = '', imageCaption = '') => {
  let result = ''

  if (type === ConfigParams.ELEMENT_TEXT) {
    // si no cumple con las anteriores condiciones es un parrafo de texto y retorna el contenido en etiquetas p
    result = `<p>${paragraph}</p>`
  }

  if (type === ConfigParams.ELEMENT_VIDEO) {
    result = `<figure class="op-interactive"><iframe src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaEmbed.html?org=elcomercio&env=sandbox&api=sandbox&uuid=${paragraph}" width="640" height="400" data-category-id="sample" data-aspect-ratio="0.5625" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></figure>`
  }

  if (type === ConfigParams.ELEMENT_IMAGE) {
    result = `<figure data-feedback="fb:likes, fb:comments"><img src="${paragraph}" alt="${imageCaption}" title="${imageCaption}" /><figcaption>${imageCaption}</figcaption></figure>`
  }

  if (type === ConfigParams.ELEMENT_RAW_HTML) {
    if (paragraph.includes('src="https://www.youtube.com/embed')) {
      // para videos youtube, se reemplaza por una imagen y link del video
      const srcVideo = paragraph.match(/src="([^"]+)/)
        ? paragraph.match(/src="([^"]+)/)[1]
        : ''

      const videoId = srcVideo.match(/\w+$/) // OLD regex /embed\/([\w+\-+]+)["?]/
        ? srcVideo.match(/\w+$/)[0]
        : ''

      if (srcVideo !== '')
        result = `<div><img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" title="video youtube" alt="video youtube"><a href="${srcVideo}" title="video youtube">Ver Video Aquí</a></div>`
    } else if (paragraph.includes('<iframe')) {
      // valida si el parrafo contiene un iframe con video o foto

      result = `<figure class="op-interactive">${paragraph}</figure>`
    } else if (paragraph.includes('<img')) {
      const imageUrl = paragraph.match(/img.+"(http(?:[s])?:\/\/[^"]+)/)
        ? paragraph.match(/img.+"(http(?:[s])?:\/\/[^"]+)/)[1]
        : ''

      const imageAlt = paragraph.match(/alt="([^"]+)?/)
        ? paragraph.match(/alt="([^"]+)?/)[1]
        : ''

      /* 
      Nunca se esta ejecutando esto.
      if (imageUrl !== '') 
        result = `<figure class="op-interactive"><img width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>` */

      result = `<figure class="op-interactive"><img frameborder="0" width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>`
    } else if (
      paragraph.includes('<blockquote class="instagram-media"') ||
      paragraph.includes('<blockquote class="twitter-tweet"')
    ) {
      // para twitter y para instagram
      result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
    } else if (paragraph.includes('https://www.facebook.com/plugins')) {
      result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
    } else {
      result = paragraph
    }
  }

  return result
}

const ParagraphshWithAdds = ({ paragraphsNews = [] }) => {
  const newsWithAdd = []
  let resultParagraph = ''

  paragraphsNews.forEach(
    ({ payload: paragraphItem, type, caption: imageCaption }) => {
      const paragraph = paragraphItem.trim().replace(/<\/?br[^<>]+>/, '')
      // el primer script de publicidad se inserta despues de las primeras 50 palabras (firstAdd)

      let paragraphwithAdd = ''
      const originalParagraph = paragraph
      // paragraph = paragraph.replace(/(<([^>]+)>)/gi, '')

      paragraphwithAdd = `${buildParagraph(
        originalParagraph,
        type,
        imageCaption
      )}`
      newsWithAdd.push(`${paragraphwithAdd}`)
    }
  )
  resultParagraph = newsWithAdd.map(item => item).join('')
  return resultParagraph
}

const htmlToText = (html = '') => {
  const htmlData = html.toString()
  return htmlData.replace(/<[^>]*>/g, '').replace(/"/g, '“')
}

const multimediaItems = ({ gallery = [], video = [], typeNota = '' }) => {
  let cadena = ''
  switch (typeNota) {
    case 'basic_video':
      cadena = video
        .map(
          ({
            url,
            caption,
            urlImage,
            resized_urls: { amp_new: resizedImage } = {} /** , date */,
          } = {}) =>
            `<video title="${caption}" poster="${resizedImage ||
              urlImage}" data-description="${caption}"><source src="${url}" type="video/mp4"></source></video>`
        )
        .toString()
        .replace(/>,/g, '>')
      /**
       * ...
       * <video title="" poster="" data-description="">
       *  <source src="" type="video/mp4"></source>
       * </video>
       * ...
       */
      break
    case 'basic_gallery':
      cadena = `${cadena}<div class="slideshow">${gallery
        .map(image => {
          const {
            resized_urls: { amp_new: resizedImage } = {},
            caption,
            subtitle = '',
            url = '',
          } = image || {}
          return `<figure><img src="${resizedImage || url}" alt="${caption ||
            subtitle}" title="${htmlToText(caption || subtitle)}" /></figure>`
        })
        .toString()
        .replace(/>,/g, '>')}</div>`
      /**
       * <div class="slideshow">
       * ...
       *  <figure>
       *    <img src="" alt="" title="" />
       *  </figure>
       * ...
       * </div>
       */
      break
    default: {
      const {
        resized_urls: { amp_new: resizedImage } = {},
        caption,
        subtitle = '',
        url = '',
      } = gallery || {}
      cadena = `${cadena}<figure><img src="${resizedImage ||
        url}" alt="${caption || subtitle}" title="${htmlToText(
        caption || subtitle
      )}" /></figure>`
      /**
       *  <figure>
       *    <img src="" alt="" title="" />
       *  </figure>
       */
      break
    }
  }
  return cadena
}

const BuildHtml = BuildHtmlProps => {
  const {
    subTitle,
    author = '',
    paragraphsNews = [],
    gallery = [],
    video = [],
    typeNota = '',
  } = BuildHtmlProps

  const paramsBuildParagraph = {
    paragraphsNews,
  }

  const paramsGallery = {
    gallery,
    video,
    typeNota,
  }
  try {
    const element = `
        <h2>${subTitle}</h2>
        <figure>
          ${multimediaItems(paramsGallery)}
        </figure>
        <p>${author}</p>
        ${ParagraphshWithAdds(paramsBuildParagraph)}
      `
    return element
  } catch (ex) {
    console.error(ex)
    return null
  }
}

export default BuildHtml
