const ScriptHeader = ({
  siteDomain = '',
  title = '',
  sections = [],
  tags = [],
  author = '',
  typeNews,
}) => {
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
            _sf_async_config.type = '${TipoNota}';
            _sf_async_config.useCanonical = true; /** CONFIGURATION END **/
            window._sf_endpt = (new Date()).getTime();
            `
  return scriptTemplate
}

const AnalyticsScript = ({
  link = '',
  siteDomain = '',
  idGoogleAnalitics = '',
}) => `(function(i, s, o, g, r, a, m) {
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

const ScriptElement = () =>
  `var _comscore = _comscore || [];
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

  // const StringAnalyticsScript = AnalyticsScript(scriptAnaliticaProps)
  const scriptHeader = ScriptHeader(propsScriptHeader)
  const scriptElement = ScriptElement()

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
            ${paragraphsNews.map(parrafo => `<p>${parrafo}</p>`)}
          </body>
          </html>
          `
  return element
}

export default BuildHtml
