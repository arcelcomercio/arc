import { AnalyticsScript, ScriptElement, ScriptHeader } from './scripts'

const buildIframeAdvertising = urlAdvertising => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlAdvertising}"></iframe></figure>`
}

const buildParagraph = paragraph => {
  let result = null

  if (paragraph.includes('<iframe')) {
    // valida si el parrafo contiene un iframe con video o foto

    result = `<figure class="op-interactive">${paragraph}</figure>`
  } else if (paragraph.includes('<img')) {
    const imageUrl = paragraph.match(/img.+"(http(?:[s])?:\/\/[^"]+)/)[1]
    const imageAlt = paragraph.match(/alt="([^"]+)/)[1]
    
    result = `<figure class="op-interactive"><img frameborder="0" width="560" height="315" src="${imageUrl}" alt="${imageAlt}" /></figure>`
  
  } else if (paragraph.includes('<blockquote class="instagram-media"')) {
    // valida blockquote de instagram
    const instagramUrl = paragraph.match(
      /https:\/\/www\.instagram\.com\/p\/(?:[\w\d]+)\/?/
    )

    result = `<figure class="op-interactive"><iframe frameborder="0" width="560" height="315" src="${instagramUrl}embed"></iframe></figure>`
  } else if (paragraph.includes('<blockquote class="twitter-tweet"')) {
    // valida blockquote de twitter
    const twitterUrl = paragraph.match(
      /https:\/\/twitter\.com\/(?:[\/\w\d\?\=\%]+)?/
    )

    result = `<figure class="op-interactive"><iframe frameborder="0" width="560" height="315" src="${twitterUrl}"></iframe></figure>`
  } else {
    // si no comple con las anteriores condiciones es un parrafo de texto y retorna el contenido en etiquetas p
    result = `<p>${paragraph}</p>`
  }
  return result
}

const ParagraphshWithAdds = ({
  paragraphsNews = [],
  numwords = 250,
  arrayadvertising = [],
}) => {
  const newsWithAdd = []
  let countWords = 0
  let IndexAdd = 0
  let resultParagraph = ''

  paragraphsNews.forEach((paragraphItem, index) => {
    let paragraph = paragraphItem.trim().replace(/<\/?br[^<>]+>/, '')
    // paragraph = paragraph.replace(/<\/?br[^<>]+>/, '')
    // el primer script de publicidad se inserta despues del segundo parrafo

    if (index <= 1) {
      if (index === 1) {
        newsWithAdd.push(`${buildParagraph(paragraph)} 
            ${
              arrayadvertising[IndexAdd]
                ? buildIframeAdvertising(arrayadvertising[IndexAdd])
                : ''
            }`)
        IndexAdd += 1
      } else {
        newsWithAdd.push(`${buildParagraph(paragraph)}`)
      }
    } else {
      // al segundo parrafo se inserta cada 250 palabras (numwords)
      let paragraphwithAdd = ''
      const paragraphOriginal = paragraph

      paragraph = paragraph.replace(/(<([^>]+)>)/gi, '')

      const arrayWords = paragraph.split(' ')
      if (arrayWords.length <= numwords) {
        countWords += arrayWords.length
      }

      if (countWords >= numwords) {
        countWords = 0
        paragraphwithAdd = `${buildParagraph(paragraphOriginal)} ${
          arrayadvertising[IndexAdd]
            ? buildIframeAdvertising(arrayadvertising[IndexAdd])
            : ''
        }`
        IndexAdd += 1
      } else {
        paragraphwithAdd = `${buildParagraph(paragraphOriginal)}`
      }
      newsWithAdd.push(`${paragraphwithAdd.trim()}`)
    }
  })
  resultParagraph = newsWithAdd.map(item => item).join('')
  return resultParagraph
}

const BuildHtml = BuildHtmlProps => {
  const {
    scriptAnaliticaProps,
    propsScriptHeader,
    title,
    subTitle,
    multimedia,
    paragraphsNews = [],
    author = '',
    fbArticleStyle = '',
    listUrlAdvertisings,
  } = BuildHtmlProps

  const numwords = 250

  const paramsBuildParagraph = {
    paragraphsNews,
    numwords,
    arrayadvertising: listUrlAdvertisings,
  }

  const element = `
          <html lang="es" prefix="op: http://media.facebook.com/op#">
          <head>
              <meta charset="utf-8" />
              <meta property="op:markup_version" content="v1.0" />
              <meta property="fb:article_style" content="${fbArticleStyle}" />
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
              <h2>${subTitle}</h2>
            </header>
            <figure>
                <img src="${multimedia}" />
                <figcaption>${title}</figcaption>
            </figure>
            <p>${author}</p>
            ${ParagraphshWithAdds(paramsBuildParagraph)}
            </article>
            </body>
          </html>
          `
  return element
}

export default BuildHtml
