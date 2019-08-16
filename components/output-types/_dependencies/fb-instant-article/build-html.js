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
    // ára twitter y para instagram
    result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
  } else if (paragraph.includes('https://www.facebook.com/plugins')) {
    result = `<figure class="op-interactive"><iframe>${paragraph}</iframe></figure>`
  } else {
    // si no comple con las anteriores condiciones es un parrafo de texto y retorna el contenido en etiquetas p
    result = `<p>${paragraph}</p>`
  }
  return result
}

const validateMultimediaParagraph = paragraph => {
  let result = false
  if (
    paragraph.includes('<iframe') ||
    paragraph.includes('<img') ||
    paragraph.includes('<blockquote class="instagram-media"') ||
    paragraph.includes('<blockquote class="twitter-tweet"')
  ) {
    result = true
  }
  return result
}

const ParagraphshWithAdds = ({
  paragraphsNews = [],
  firstAdd = 50,
  nextAdds = 250,
  arrayadvertising = [],
}) => {
  const newsWithAdd = []
  let countWords = 0
  let IndexAdd = 0
  let resultParagraph = ''

  
  paragraphsNews.forEach(paragraphItem => {
    let paragraph = paragraphItem.trim().replace(/<\/?br[^<>]+>/, '')
    // el primer script de publicidad se inserta despues de las primeras 50 palabras (firstAdd)

    let paragraphwithAdd = ''
    const originalParagraph = paragraph
    paragraph = paragraph.replace(/(<([^>]+)>)/gi, '')
    const arrayWords = paragraph.split(' ')

    if (IndexAdd === 0) {
      if (arrayWords.length <= firstAdd) {
        countWords += arrayWords.length
      }

      if (countWords >= firstAdd) {
        countWords = 0

        paragraphwithAdd = `${buildParagraph(originalParagraph)} ${
          arrayadvertising[IndexAdd]
            ? buildIframeAdvertising(arrayadvertising[IndexAdd])
            : ''
        }`
        IndexAdd += 1
      } else {
        paragraphwithAdd = `${buildParagraph(originalParagraph)}`
      }

      newsWithAdd.push(`${paragraphwithAdd}`)
    } else {
      // a partir del segundo parrafo se inserta cada 250 palabras (nextAdds)

      // si el parrafo tiene contenido multimedia se cuenta como 70 palabras
      if (arrayWords.length <= nextAdds) {
        if (validateMultimediaParagraph(originalParagraph)) {
          countWords += 70
        } else {
          countWords += arrayWords.length
        }
      }

      if (countWords >= nextAdds) {
        countWords = 0
        paragraphwithAdd = `${buildParagraph(originalParagraph)} ${
          arrayadvertising[IndexAdd]
            ? buildIframeAdvertising(arrayadvertising[IndexAdd])
            : ''
        }`
        IndexAdd += 1
      } else {
        paragraphwithAdd = `${buildParagraph(originalParagraph)}`
      }
      newsWithAdd.push(`${paragraphwithAdd}`)
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

  const firstAdd = 50
  const nextAdds = 250

  const paramsBuildParagraph = {
    paragraphsNews,
    firstAdd,
    nextAdds,
    arrayadvertising: listUrlAdvertisings,
  }
  try {
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
</html>`
    return element
  } catch (ex) {
    console.log(ex)
    return null
  }
}

export default BuildHtml
