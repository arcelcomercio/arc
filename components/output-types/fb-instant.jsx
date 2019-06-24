// import Consumer from 'fusion:consumer'
import React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'
import StoryData from '../utilities/story-data'
import md5 from 'md5'

const NewElement = props => {
  const {
    nameElement = 'Element',
    propsNewElement = {},
    children: childrenElement = [],
  } = props
  const Element = React.createElement(
    nameElement,
    propsNewElement,
    childrenElement
  )
  return Element
}

const AnalyticsScript = scriptAnaliticaProps => {
  const { link, siteDomain, idGoogleAnalitics } = scriptAnaliticaProps

  const scripttemplate = `(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', '${idGoogleAnalitics}', '${siteDomain}');
    ga('require', 'displayfeatures');
    ga('set', 'campaignSource', 'm.facebook.com');
    ga('set', 'campaignMedium', 'referral');
    ga('set', 'campaignName', 'FbIA');
    ga('set', 'dimension6', 'FbIA');
    ga('send', 'pageview', '/instant-articles${link}');`
  return scripttemplate
}

const ScriptHeader = propsScriptHeader => {
  const {
    siteDomain = '',
    title = '',
    sections = [],
    tags = [],
    author = '',
    typeNews,
  } = propsScriptHeader

  const listTag = tags.map(tg => ` '${tg.text}'`)

  const listSec = sections.map(seccionName => ` '${seccionName}'`)

  let TipoNota = ''

  switch (typeNews) {
    case 'basic_video':
      TipoNota = 'Articulo Nota Video'
      break
    case 'basic_gallery':
      TipoNota = 'Articulo Nota Fotogaleria'
      break
    default:
      TipoNota = 'Articulo Nota Simple'
      break
  }

  const scriptTemplate = `
          var _sf_async_config = {}; /** CONFIGURATION START **/
          _sf_async_config.uid = 57773;
          _sf_async_config.domain = '${siteDomain}';
          _sf_async_config.title = '${title}';
          _sf_async_config.sections = ${listSec}, ${listTag};
          _sf_async_config.authors = '${author}';
          _sf_async_config.type = '${TipoNota}' TODO AQUI;
          _sf_async_config.useCanonical = true; /** CONFIGURATION END **/
          window._sf_endpt = (new Date()).getTime();
          `
  return scriptTemplate
}

const ScriptElement = () => {
  const scriptTemplat = `var _comscore = _comscore || [];
  _comscore.push({
      c1: "2",
      c2: "8429002",
      options: {
          url_append: "comscorekw=fbia"
      }
  });
  (function() {
      var s = document.createElement("script"),
          el = document.getElementsByTagName("script")[0];
      s.async = true;
      s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
      el.parentNode.insertBefore(s, el);
  })();`
  return scriptTemplat
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
  } = BuildHtmlProps

  const StringAnalyticsScript = AnalyticsScript(scriptAnaliticaProps)
  const scriptHeader = ScriptHeader(propsScriptHeader)
  const scriptElement = ScriptElement()

  const templateStringHtml = `
  <html lang="es" prefix="op: http://media.facebook.com/op#">
      <head>
        <meta charset="utf-8" />
        <meta property="op:markup_version" content="v1.0" />
        <meta property="fb:article_style" content="LogoElcomercio" />
      </head>
      <body>
        <article>
          <figure class="op-tracker">
            <iframe>
              <script>{StringAnalyticsScript}</script>
              <script type="text/javascript">{scriptHeader}</script>
              <script defer src="//static.chartbeat.com/js/chartbeat_fia.js" />
              <script>{scriptElement}</script>
            </iframe>
          </figure>
        </article>
        <header>
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </header>

        <figure>
          <img src={multimedia} />
          <figcaption>{title}</figcaption>
        </figure>
        <p>{author}</p>
        <figure class="op-interactive">
          <iframe frameborder="0" />
        </figure>
        {paragraphsNews.map(parrafo => (
          <p>{parrafo}</p>
        ))}
      </body>
    </html>
    `
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
            <script>${StringAnalyticsScript}</script>
            <script type="text/javascript">${scriptHeader}</script>
            <script defer src="//static.chartbeat.com/js/chartbeat_fia.js" />
            <script>${scriptElement}</script>
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
      ${paragraphsNews.map(parrafo =>`<p>${parrafo}</p>`)}
    </body>
    </html>
    `
  return element
}

const ListItemNews = (contentElements, buildProps) => {
  const {
    deployment = '',
    contextPath = {},
    arcSite = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    siteUrl,
    fbArticleStyle = '',
  } = buildProps

  const elements = contentElements.map(story => {
    const storydata = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })
    storydata.__data = story

    const propsScriptHeader = {
      siteDomain,

      title: storydata.title,
      sections: storydata.allSections,
      tags: storydata.tags,
      author: storydata.author,
      typeNews: storydata.multimediaType,
    }

    const scriptAnaliticaProps = {
      link: storydata.link,
      siteDomain,
      idGoogleAnalitics,
    }

    const BuildHtmlProps = {
      scriptAnaliticaProps,
      propsScriptHeader,
      title: storydata.title,
      subTitle: storydata.subTitle,
      multimedia: storydata.multimedia,
      author: storydata.author,
      paragraphsNews: storydata.paragraphsNews,
      fbArticleStyle,
    }

    const htmlString = BuildHtml(BuildHtmlProps)
    const codigoGUID = md5(storydata.id)

    const ItemDataXml = {
      siteUrl,
      siteDomain,
      title: storydata.title,
      date: storydata.date,
      author: storydata.author,
      codigoGUID,
      htmlString,
    }
    return (
      <NewElement nameElement="item">
        <NewElement nameElement="title">{ItemDataXml.title}</NewElement>
        <NewElement nameElement="pubDate">{ItemDataXml.date}</NewElement>
        <NewElement nameElement="lnktmp">{`${ItemDataXml.siteUrl}${
          storydata.link
        }`}</NewElement>
        <NewElement nameElement="guid"> {ItemDataXml.codigoGUID} </NewElement>
        <NewElement nameElement="author"> {ItemDataXml.author} </NewElement>
        <NewElement nameElement="content:encoded">
          {ItemDataXml.htmlString}
        </NewElement>
        <NewElement nameElement="slash:comments">{'0'} </NewElement>

        <NewElement nameElement="slash:printss">
          {propsScriptHeader.sections.map((seccionName, index) =>
            index < propsScriptHeader.sections.length - 1
              ? `${seccionName}, `
              : `${seccionName}`
          )}
        </NewElement>
      </NewElement>
    )
  })

  return elements
}
const FbInstantOutputType = ({
  deployment = {},
  contextPath = '',
  arcSite = '',
  globalContent = [],
  siteProperties = {},
}) => {
  const { content_elements: contentElements } = globalContent || []
  const {
    siteName = '',
    siteUrl = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    fbArticleStyle = '',
  } = siteProperties

  const stories = contentElements

  const propsXml = {
    version: '2.0',
    'xmlns:atom': 'http://www.w3.org/2005/Atom',
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
  }

  const chanelProps = {
    siteName,
    siteUrl,
    fechaIso: new Date().toISOString(),
    descripcion: 'Todas las Noticias',
  }

  const buildProps = {
    siteUrl,
    deployment,
    contextPath,
    arcSite,
    siteDomain,
    idGoogleAnalitics,
    fbArticleStyle,
  }

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <NewElement nameElement="channel">
        <NewElement nameElement="language">es</NewElement>
        <NewElement nameElement="title">{chanelProps.siteName}</NewElement>
        <NewElement nameElement="description">
          {chanelProps.descripcion}
        </NewElement>
        <NewElement nameElement="lastBuildDate">
          {chanelProps.fechaIso}
        </NewElement>
        <NewElement nameElement="lnktmp">{chanelProps.siteUrl}</NewElement>
        {ListItemNews(stories, buildProps)}
      </NewElement>
    </NewElement>
  )
}

FbInstantOutputType.contentType = 'text/xml'

export default FbInstantOutputType

// FbInstantOutputType.contentType = 'application/rss+xml'

// FbInstantOutputType.fallback = ['amp', 'default']
/* FbInstantOutputType.transform = {
  arcio({ context, data }) {

    return {
      contentType: 'application/rss+xml',
      data: {
        tree: context.tree,
        globalContent: context.globalContent,
        featureContent: data,
      },
    }
  },
}
 */

{
  /* {React.createElement('link', { allowInvalidVoidElementChildren: true }, 'https://reactjs.org/blog/')} */
}
{
  /* <link allowInvalidVoidElementChildren={true} dangerouslySetInnerHTML={{ __html: 'https://reactjs.org/blog/' }} /> */
}

{
  /* <link dangerouslySetInnerHTML={{ __html: `<link>
http://elcomercio.pe/mundo/latinoamerica/colombia-deroga-norma-obligaba-presentar-esposa-amigos-vecinos-noticia-646213
</link>` }} /> */
}
