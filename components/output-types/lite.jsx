import React from 'react'
import ENV from 'fusion:environment'

import { deleteQueryString } from '../utilities/parse/queries'
import { addSlashToEnd } from '../utilities/parse/strings'
import { storyTagsBbc } from '../utilities/tags'
import { SITE_ELCOMERCIOMAG } from '../utilities/constants/sitenames'
import { getAssetsPath } from '../utilities/assets'
import StoryData from '../utilities/story-data'

import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'
import LiteAds from './_children/lite-ads'

const LiteOutput = ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  Resource,
  siteProperties,
  requestUri,
  metaValue,
}) => {
  const metaPageData = {
    globalContent,
    requestUri,
    contextPath,
    arcSite,
    siteName: siteProperties.siteName,
    siteUrl: siteProperties.siteUrl,
    socialName: siteProperties.social && siteProperties.social.facebook,
    siteAssets: siteProperties.assets,
    metaValue,
    deployment,
  }
  const CURRENT_ENVIRONMENT =
    ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: { basic_gallery: basicGallery = 0 } = {},
    taxonomy: {
      primary_section: { path: nameSeccion = '' } = {},
      tags = [],
    } = {},
    subtype = '',
    page_number: pageNumber = 1,
  } = globalContent || {}

  const isStory =
    metaValue('id') === 'meta_story' ||
    requestUri.match(`^/preview/([A-Z0-9]{26})/?`) ||
    ''

  const classBody = isStory
    ? `story ${basicGallery && 'basic_gallery'} ${arcSite} ${
        nameSeccion.split('/')[1]
      } ${subtype} `
    : ''

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: false,
    isLite: true,
  }

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const getTitle = () => {
    let title = `${seoTitle} | ${siteProperties.siteName}`
    if (isStory) {
      title = `${storyTitleRe} ${seoTitle} | ${siteProperties.siteName}`
    } else if (
      pageNumber > 1 &&
      (metaValue('id') === 'meta_tag' || metaValue('id') === 'meta_author')
      /*  || metaValue('id') === "meta_search" */
    ) {
      title = `${seoTitle} | Página ${pageNumber} | ${siteProperties.siteName}`
    } else if (metaValue('id') === 'meta_archive') {
      const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
      const hasSection =
        /\/archivo\/([\w\d-]+)/.test(requestUri) &&
        !/\/archivo\/todas/.test(requestUri)
      if (!hasDate && !hasSection) {
        title = `Archivo de Noticias | ${siteProperties.siteName}`
      }
    }
    return title
  }

  const title = getTitle()

  const getDescription = () => {
    let description = `Últimas noticias, fotos, y videos de Perú y el mundo en ${siteProperties.siteName}.`
    if (
      metaValue('description') &&
      !metaValue('description').match(/content/)
    ) {
      description = `${metaValue('description')}`
      if (
        (pageNumber > 1 && metaValue('id') === 'meta_tag') ||
        metaValue('id') === 'meta_author'
        /*  || metaValue('id') === "meta_search" */
      ) {
        description = `${metaValue('description')} Página ${pageNumber}.`
      } else if (metaValue('id') === 'meta_archive') {
        const hasDate = /\d{4}-\d{2}-\d{2}/.test(requestUri)
        const hasSection =
          /\/archivo\/([\w\d-]+)/.test(requestUri) &&
          !/\/archivo\/todas/.test(requestUri)
        if (!hasDate && !hasSection) {
          description = `Archivo de noticias de ${siteProperties.siteName}. Noticias actualizadas del Perú y el Mundo con fotos, videos y galerías sobre actualidad, deportes, economía y otros.`
        }
      }
    }
    return description
  }

  const description = getDescription()

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : `Noticias, ${siteProperties.siteName}, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`

  const twitterCardsData = {
    twitterUser:
      siteProperties.social &&
      siteProperties.social.twitter &&
      siteProperties.social.twitter.user,
    title,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description,
    twitterCreator:
      siteProperties.social &&
      siteProperties.social.twitter &&
      siteProperties.social.twitter.user,
    story: isStory, // check data origin - Boolean
    deployment,
    globalContent,
  }
  const openGraphData = {
    fbAppId: siteProperties.fbAppId,
    title,
    description,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    requestUri,
    siteName: siteProperties.siteName,
    story: isStory, // check data origin - Boolean
    deployment,
    globalContent,
  }

  const structuredTaboola = ` 
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});`

  const structuredBBC = `
  !function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
  (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
  s_bbcws('partner', 'elcomercio.pe');
          s_bbcws('language', 'mundo');
  s_bbcws('track', 'pageView');`

  const {
    website_url: url = '',
    content_restrictions: { content_code: contentCode = '' } = {},
  } = globalContent || {}

  const isPremium = contentCode === 'premium' || false

  const htmlAmpIs = isPremium ? '' : true

  let link = deleteQueryString(requestUri)
  link = link.replace(/\/homepage[/]?$/, '/')

  const parameters = {
    googleTagManagerId: siteProperties.googleTagManagerMobile,
    arcSite,
  }

  const {
    videoSeo,
    promoItems: { basic_html: { content = '' } = {} } = {},
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })
  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] ? 1 : false

  const scriptVideo = `
 const videoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const uuid = target.getAttribute('data-uuid')
      const preroll = target.getAttribute('data-preroll')
      const api = target.getAttribute('data-api')
      const poster = target.getAttribute('data-poster')
      const streams = target.getAttribute('data-streams')
      const reziser = target.getAttribute('data-reziser')
      const dataVideo = '<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${CURRENT_ENVIRONMENT}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${CURRENT_ENVIRONMENT}" data-preload=none ></div>'
      target.innerHTML = dataVideo.replace(/{uuid}/mg,uuid).replace(/{stream}/mg,streams)
      if (window.powaBoot) window.powaBoot()
      setTimeout(function(){  
        if (window.PoWaSettings) {
          window.preroll = preroll
          window.PoWaSettings.advertising = {
            adBar: false,
            adTag: preroll,
          }
        }
      }, 1000);
      window.addEventListener('powaRender',
        function () {
          Array.from(document.getElementsByClassName('s-multimedia__p-default')).forEach(function (contShare) {
            contShare.classList.remove("s-multimedia__p-default")
        });
        }
     )
      observer.unobserve(target)
    }
  })
}
if ('IntersectionObserver' in window) {
  const options = {
    rootMargin: '0px 0px 0px 0px',
  }
  const videosc = Array.from(document.querySelectorAll('.s-multimedia__lL-video'))
  const videos = Array.from(document.querySelectorAll('.story-contents__lL-video')).concat(videosc)
  videos.forEach(video => {
      const observer = new IntersectionObserver(videoObserver, options)
      observer.observe(video)
  })
}
`

  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/lite-story.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteProperties.siteDomain}/dist/${arcSite}/css/lite-story.css`
  }
  if (arcSite === 'elcomerciomag' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/lite-story.css`
  }
  if (arcSite === 'peru21g21' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/lite-story.css`
  }

  const styless = ` <link
  rel="preload"
  href=${deployment(styleUrl)}
  onload="this.onload=null;this.rel='stylesheet'"
  as="style"
  />`

  return (
    <html lang="es">
      <head>
        <TagManager {...parameters} />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isStory && htmlAmpIs && (
          <link
            rel="amphtml"
            href={`${siteProperties.siteUrl}${addSlashToEnd(
              url
            )}?outputType=amp`}
          />
        )}
        {arcSite === SITE_ELCOMERCIOMAG && (
          <link
            rel="alternate"
            href={`${siteProperties.siteUrlAlternate}${link}`}
            hrefLang="es"
          />
        )}
        <title>{title}</title>
        {/**
         * dns-prefetch hace solo DNS lookup.
         * preconnect hace DNS lookup, TLS negotiation, y TCP handshake.
         * -----------------
         * Si el la conexion se hace SIEMPRE, vale la pena usar preconnect
         * (con dns-prefetch como fallback). Si la conexion no se hace siempre,
         * sino algunas veces, es mejor usar solo dns-prefetch para evitar la
         * TLS negotiation, y TCP handshake adicionales sin necesidad.
         *
         * https://web.dev/preconnect-and-dns-prefetch/
         */}
        <link rel="preconnect" href={`//cdnc.${siteProperties.siteDomain}`} />
        <link rel="dns-prefetch" href={`//cdnc.${siteProperties.siteDomain}`} />
        <link
          rel="preconnect"
          href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
        />
        <link
          rel="dns-prefetch"
          href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
        />
        <link rel="preconnect" href="//www.googletagmanager.com/" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
        <link rel="preconnect" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="//static.chartbeat.com/" />
        <link rel="dns-prefetch" href="//static.chartbeat.com/" />
        <link rel="preconnect" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//tags.bkrtx.com/" />
        <link rel="dns-prefetch" href="//tags.bluekai.com/" />
        <link rel="preconnect" href="//cdn.cxense.com/" />
        <link rel="dns-prefetch" href="//cdn.cxense.com/" />
        <link rel="preconnect" href="//scdn.cxense.com/" />
        <link rel="dns-prefetch" href="//scdn.cxense.com/" />
        <link rel="preconnect" href="//scomcluster.cxense.com/" />
        <link rel="dns-prefetch" href="//scomcluster.cxense.com/" />
        <link rel="preconnect" href="//sb.scorecardresearch.com/" />
        <link rel="dns-prefetch" href="//sb.scorecardresearch.com/" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {isStory && (
          <>
            <link rel="dns-prefetch" href="//www.facebook.com/" />
            <link rel="dns-prefetch" href="//connect.facebook.net/" />
            <link rel="preconnect" href="//cds.taboola.com/" />
            <link rel="dns-prefetch" href="//cds.taboola.com/" />
          </>
        )}
        <link rel="dns-prefetch" href="//acdn.adnxs.com/" />

        <LiteAds />

        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        {arcSite === 'elcomerciomag' && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {isStory ? '' : <meta name="keywords" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}

        <Resource path={`resources/dist/${arcSite}/css/dlite-story.css`}>
          {({ data }) => {
            return data ? (
              <style
                dangerouslySetInnerHTML={{
                  __html: data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', ''),
                }}
              />
            ) : null
          }}
        </Resource>

        {contenidoVideo && (
          <>
            <script
              src={`https://d1tqo5nrys2b20.cloudfront.net/${CURRENT_ENVIRONMENT}/powaBoot.js?org=elcomercio`}
              async></script>
          </>
        )}
      </head>
      <body className={classBody}>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerMobile}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <div id="fusion-app" role="application">
          {children}
        </div>

        {isStory && (
          <script
            type="text/javascript"
            defer
            dangerouslySetInnerHTML={{ __html: structuredTaboola }}
          />
        )}
        {isStory && storyTagsBbc(tags) && (
          <>
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: structuredBBC }}
            />
            <noscript>
              <img
                src="//a1.api.bbc.co.uk/hit.xiti?&x8=[synd_v5.7.0_nojs]&s=598346"
                height="1"
                width="1"
                border="0"
                alt=""
              />
            </noscript>
          </>
        )}

        {contenidoVideo && (
          <>
            <script
              type="text/javascript"
              defer
              dangerouslySetInnerHTML={{ __html: scriptVideo }}
            />
          </>
        )}
        <script
          defer
          src={deployment(
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/assets/js/lazyload.js`
          )}
        />
        {isStory && (
          <>
            <i
              dangerouslySetInnerHTML={{
                __html: styless,
              }}></i>
            <noscript>
              <link rel="stylesheet" href={deployment(styleUrl)} />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}

LiteOutput.fallback = false

export default LiteOutput
