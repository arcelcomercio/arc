export const AnalyticsScript = ({
  siteDomain = '',
  idGoogleAnalitics = '',
  newsId = '',
  name = '',
  section = '',
  subsection = '',
  author = '',
  pageview = '',
  newsType = '',
  newsTitle = '',
  nucleoOrigen = '',
  formatOrigen = '',
  contentOrigen = '',
  genderOrigen = '',
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
        ga('set', 'dataSource', 'FbIA');
        ga('require', 'displayfeatures');
        ga('set', 'campaignSource', 'm.facebook.com');
        ga('set', 'campaignMedium', 'referral');
        ga('set', 'campaignName', 'FbIA');
        ga('set', 'dimension3', '${name}');
        ${
          section !== false && section !== null
            ? `ga('set', 'dimension4','${section}');`
            : ''
        }
        ${
          subsection !== false && subsection !== null
            ? `ga('set', 'dimension5','${subsection}');`
            : ''
        }
        ga('set', 'dimension6', 'FbIA');
        ga('set', 'dimension7', '${newsType}');
        ga('set', 'dimension8', '${newsId}');
        ga('set', 'dimension15', '${author}');
        ga('send', 'pageview', '${pageview}');
        ga('send', 'pageview', {title: '${newsTitle}'});
        ga('set', 'dimension16', '${nucleoOrigen}');
        ga('set', 'dimension19', '${formatOrigen}');
        ga('set', 'dimension20', '${contentOrigen}');
        ga('set', 'dimension21', '${genderOrigen}');
        `

export const ScriptElement = () =>
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

export const ScriptHeader = ({
  siteDomain = '',
  title = '',
  sections = [],
  tags = [],
  author = '',
  typeNews,
}) => {
  const listTag = tags.map(tg => tg.text && ` '${tg.text}'`).join(', ')

  const listSec = sections
    .map(seccionName => seccionName && ` '${seccionName}'`)
    .join(',')

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
                      _sf_async_config.sections = ${listSec}${
    listSec === '' ? '' : ','
  } ${listTag};
                      _sf_async_config.authors = '${author}';
                      _sf_async_config.type = '${TipoNota}';
                      _sf_async_config.useCanonical = true; /** CONFIGURATION END **/
                      window._sf_endpt = (new Date()).getTime();
                      `
  return scriptTemplate
}
