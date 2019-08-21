import { AnalyticsScript, ScriptElement, ScriptHeader } from './scripts'
import ConfigParams from '../../../utilities/config-params'

const buildIframeAdvertising = urlAdvertising => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`
}

const buildParagraph = (paragraph, type = '') => {
  let result = ''

  if (type === ConfigParams.ELEMENT_TEXT) {
    // si no cumple con las anteriores condiciones es un parrafo de texto y retorna el contenido en etiquetas p
    result = `<p>${paragraph}</p>`
  }

  if (type === ConfigParams.ELEMENT_VIDEO) {
    result = `<figure class="op-interactive"><iframe src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaEmbed.html?org=elcomercio&env=sandbox&api=sandbox&uuid=${paragraph}" width="640" height="400" data-category-id="sample" data-aspect-ratio="0.5625" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></figure>`
  }

  if (type === ConfigParams.ELEMENT_IMAGE) {
    result = `<figure data-feedback="fb:likes, fb:comments"><img src="${paragraph}" /><figcaption>Inspectores de la Municipalidad de La Molina</figcaption></figure>`
  }

  if (type === ConfigParams.ELEMENT_RAW_HTML) {
    if (paragraph.includes('src="https://www.youtube.com/embed')){
      // para videos youtube, se reemplaza por una imagen y link del video
      const srcVideo = paragraph.match(/src="([^"]+)?/)
        ? paragraph.match(/src="([^"]+)?/)[1]
        : ''

      const videoId = paragraph.match(/embed\/([\w+\-+]+)[\"\?]/)
        ? paragraph.match(/embed\/([\w+\-+]+)[\"\?]/)[1]
        : ''  

      if (srcVideo !== '') { 
        result = `<div><img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" title="video youtube" alt="video youtube"><a href="${srcVideo}" title="video youtube">Ver Video Aquí</a></div>`
      }else {
        result = ''
      }
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

      if (imageUrl !== '') {
        result = `<figure class="op-interactive"><img width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>`
      } else {
        result = ''
      }

      result = `<figure class="op-interactive"><img frameborder="0" width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>`
    } else if (
      paragraph.includes('<blockquote class="instagram-media"') ||
      paragraph.includes('<blockquote class="twitter-tweet"')
    ) {
      // para twitter y para instagram
      result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
    } else if (paragraph.includes('https://www.facebook.com/plugins')) {
      result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
    }else{
      result = paragraph
    }
  }

  return result
}

const ParagraphshWithAdds = ({
  paragraphsNews = []
}) => {
  const newsWithAdd = []
  let resultParagraph = ''

  paragraphsNews.forEach(({ payload: paragraphItem, type }) => {
    let paragraph = paragraphItem.trim().replace(/<\/?br[^<>]+>/, '')
    // el primer script de publicidad se inserta despues de las primeras 50 palabras (firstAdd)

    let paragraphwithAdd = ''
    const originalParagraph = paragraph
    paragraph = paragraph.replace(/(<([^>]+)>)/gi, '')
    
    paragraphwithAdd = `${buildParagraph(originalParagraph, type)}`
    newsWithAdd.push(`${paragraphwithAdd}`)

  })
  resultParagraph = newsWithAdd.map(item => item).join('')
  return resultParagraph
}

const htmlToText = (html = '') => {
  const htmlData = html.toString()
  return htmlData.replace(/<[^>]*>/g, '').replace(/"/g, '“')
}

const multimediaItems = ({
  gallery = [], 
  video = [],
  typeNota = ''
}) => { 
  let cadena = ''
  cadena = ``
  switch (typeNota) {
    case 'basic_video':      
      video.map(({ url, caption, urlImage, date } = {}) => {
        cadena = cadena + `<video title="${caption}" poster="${urlImage}" data-description="${caption}"><source src="${url}" type="video/mp4"></source></video>`
      })
      break
    case 'basic_gallery':
      cadena = cadena + `<div class="slideshow">`
      gallery.map((image, i) => {
        let { subtitle = false, url = '' } = image || {}    
        cadena = cadena + `<figure><img src="${url}" alt="${subtitle}" title="${htmlToText(subtitle)}" /></figure>`
      })
      cadena = cadena + `</div>`
      break
    default:    
      let { subtitle = false, url = '' } = gallery || {}
      cadena = cadena + `<figure><img src="${url}" alt="${subtitle}" title="${htmlToText(subtitle)}" /></figure>`
      break
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
    typeNota = ''
  } = BuildHtmlProps

  const paramsBuildParagraph = {
    paragraphsNews
  }

  const paramsGallery = {
    gallery,
    video,
    typeNota
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
    console.log(ex)
    return null
  }
}

export default BuildHtml
