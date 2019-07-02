import ListAdvertisings from './list-advertising'

import {
  AnalyticsScript,
  ScriptElement,
  ScriptHeader,
} from './scripts'

const buildIframeAdvertising = (urlSite, urlAdvertising) => {
  return `<figure class="op-ad"><iframe width="300" height="250" style="border:0; margin:0;" src="${urlSite}${urlAdvertising}"></iframe></figure>`
}

const buildParagraph = ({
  paragraphsNews = [],
  numwords = 250,
  arrayadvertising = [],
  urlSite = '',
}) => {
  const newsWithAdd = []
  let countWords = 0
  let IndexAdd = 0
  let resultParagraph = ''

  paragraphsNews.forEach((parrrafo, index) => {
    if (index <= 1) {
      if (index === 1) {
        newsWithAdd.push(`<p>${parrrafo.trim()}</p> 
        ${
          arrayadvertising[IndexAdd]
            ? buildIframeAdvertising(urlSite, arrayadvertising[IndexAdd])
            : ''
        }`)
        IndexAdd += 1
      } else {
        newsWithAdd.push(`<p>${parrrafo.trim()}</p>`)
      }
    } else {
      let parrafoConPublicidad = ''
      parrrafo.split(' ').forEach(palabra => {
        countWords += 1
        let wordsTemplate = palabra
        if (countWords === numwords) {
          countWords = 0
          wordsTemplate += ` ${
            arrayadvertising[IndexAdd]
              ? buildIframeAdvertising(urlSite, arrayadvertising[IndexAdd])
              : ''
          }`
          IndexAdd += 1
        }
        parrafoConPublicidad += `${wordsTemplate} `
      })
      parrafoConPublicidad = `<p>${parrafoConPublicidad.trim()}</p>`
      newsWithAdd.push(parrafoConPublicidad)
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
    urlAddfbInstantArticle = '',
  } = BuildHtmlProps

  const numwords = 250

  const paramsBuildParagraph = {
    paragraphsNews,
    numwords,
    arrayadvertising: ListAdvertisings(),
    urlSite: urlAddfbInstantArticle,
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
                  <script defer src="//static.chartbeat.com/js/chartbeat_fia.js" />
                  <script>${ScriptElement()}</script>
                </iframe>
              </figure>
            </article>
            <header>
              <h1>${title}</h1>
              <h2>${subTitle}</h2>
            </header>
            <figure>
                <img src=${multimedia} />
                <figcaption>${title}</figcaption>
            </figure>
            <p>${author}</p>
            <figure class="op-interactive">
                <iframe frameborder="0" />
            </figure>
            ${buildParagraph(paramsBuildParagraph)}
          </body>
          </html>
          `
  return element
}

export default BuildHtml
