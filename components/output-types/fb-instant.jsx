// import Consumer from 'fusion:consumer'
import React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'
import StoryData from '../utilities/story-data'

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
    ga('create', ${idGoogleAnalitics}', '${siteDomain}');
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

const FbInstantOutputType = ({
  deployment,
  contextPath,
  arcSite,
  globalContent,
  siteProperties,
}) => {
  const { content_elements: contentElements } = globalContent || []
  const {
    siteName = '',
    siteUrl = '',
    siteDomain = '',
    idGoogleAnalitics = '',
  } = siteProperties

  const stories = contentElements

  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  storydata.__data = stories[1]

  const propsXml = {
    version: '2.0',
    'xmlns:atom': 'http://www.w3.org/2005/Atom',
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
    'xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
  }
  const ItemDataXml = {
    siteName,
    siteUrl,
    siteDomain,
  }

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

  const BuildHtml = () => {
    const element = (
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
                <script>{AnalyticsScript(scriptAnaliticaProps)}</script>
                <script type="text/javascript">
                  {ScriptHeader(propsScriptHeader)}
                </script>
                <script
                  defer
                  src="//static.chartbeat.com/js/chartbeat_fia.js"
                />
                <script>{ScriptElement()}</script>
              </iframe>
            </figure>
          </article>
          <header>
            <h1>{storydata.title}</h1>
            <h2>{storydata.subTitle}</h2>
          </header>

          <figure>
            <img src={storydata.multimedia} />
            <figcaption>{storydata.title}</figcaption>
          </figure>
          <p>// TODO Por: El Tiempo | GDA</p>
          <figure class="op-interactive">
            <iframe frameborder="0" />

            {storydata.paragraphsNews.map(parrafo => (
              <p>{parrafo}</p>
            ))}
          </figure>
        </body>
      </html>
    )
    return reactElementToJSXString(element)
  }

  return (
    <NewElement nameElement="rss" propsNewElement={propsXml}>
      <NewElement nameElement="channel">
        <NewElement nameElement="language">es</NewElement>
        <NewElement nameElement="title">{ItemDataXml.siteName}</NewElement>
        <NewElement nameElement="description">Todas las Noticias</NewElement>
        <NewElement nameElement="lastBuildDate">
          {new Date().toISOString()}
        </NewElement>
        <NewElement nameElement="lnktmp">{ItemDataXml.siteUrl}</NewElement>

        <NewElement nameElement="item">
          <NewElement nameElement="title">{storydata.title}</NewElement>
          <NewElement nameElement="pubDate">{storydata.date}</NewElement>
          <NewElement nameElement="lnktmp">{`${ItemDataXml.siteUrl}${
            storydata.link
          }`}</NewElement>
          <NewElement nameElement="guid"> {'//TODO'} </NewElement>
          <NewElement nameElement="author"> {storydata.author} </NewElement>
          <NewElement nameElement="content:encoded">{BuildHtml()}</NewElement>
          <NewElement nameElement="slash:comments">{'0'} </NewElement>

          <NewElement nameElement="slash:printss">
            {/* {JSON.stringify(stories[1])} */}

            {propsScriptHeader.sections.map((seccionName, index) =>
              index < propsScriptHeader.sections.length - 1
                ? `${seccionName}, `
                : `${seccionName}`
            )}
          </NewElement>
        </NewElement>
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
