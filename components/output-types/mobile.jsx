import React from 'react'
import ENV from 'fusion:environment'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'
import ChartbeatBody from './_children/chartbeat-body'
import {
  skipAdvertising,
  storyTagsBbc,
  addSlashToEnd,
  deleteQueryString,
  createMarkup,
} from '../utilities/helpers'
import ConfigParams from '../utilities/config-params'

export default ({
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
    socialName: siteProperties.social.facebook,
    siteAssets: siteProperties.assets,
    metaValue,
    deployment,
  }

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    promo_items: { basic_gallery: basicGallery = 0 } = {},
    taxonomy: {
      primary_section: { path: nameSeccion = '' } = {},
      tags = [],
    } = {},
    subtype = '',
    page_number: pageNumber = 1,
    recent_stories: { content_elements: recentStories = [] } = {},
  } = globalContent || {}

  const isStory =
    metaValue('id') === 'meta_story' ||
    requestUri.match(`^/preview/([A-Z0-9]{26})/?`) ||
    ''

  const isBlogPost = requestUri.match(`^(/blogs?/.*.html)`)

  let classBody = isStory
    ? `story ${basicGallery && 'basic_gallery'} ${arcSite} ${
        nameSeccion.split('/')[1]
      } ${subtype} `
    : ''
  classBody = isBlogPost ? 'blogPost' : classBody

  if (arcSite === 'depor') {
    if (requestUri.match('^/depor-play')) classBody = `${classBody} depor-play`
    if (requestUri.match('^/muchafoto')) classBody = `${classBody} muchafoto`
  }

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: false,
    isMobile: true,
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
    let description = `Últimas noticias, fotos, y videos de Perú y el mundo en ${
      siteProperties.siteName
    }.`
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
          description = `Archivo de noticias de ${
            siteProperties.siteName
          }. Noticias actualizadas del Perú y el Mundo con fotos, videos y galerías sobre actualidad, deportes, economía y otros.`
        }
      }
    }
    return description
  }

  const description = getDescription()

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : `Noticias, ${
          siteProperties.siteName
        }, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión`

  const twitterCardsData = {
    twitterUser: siteProperties.social.twitter.user,
    title,
    siteUrl: siteProperties.siteUrl,
    contextPath,
    arcSite,
    description,
    twitterCreator: siteProperties.social.twitter.user,
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

  const { googleFonts = '' } = siteProperties || {}

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

  const staticVariables = `window.MobileContent=${JSON.stringify({
    recentStories: recentStories.map(
      ({ canonical_url: canonicalUrl }) => canonicalUrl
    ),
  })}`
  const parameters = {
    googleTagManagerId: siteProperties.googleTagManagerMobile,
    arcSite,
  }

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
        {arcSite === ConfigParams.SITE_ELCOMERCIOMAG && (
          <link
            rel="alternate"
            href={`${siteProperties.siteUrlAlternate}${link}`}
            hrefLang="es"
          />
        )}
        <title>{title}</title>
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
        <link rel="dns-prefetch" href="//www.facebook.com/" />
        <link rel="dns-prefetch" href="//connect.facebook.net/" />
        <link rel="dns-prefetch" href="//tags.bluekai.com/" />
        <link rel="dns-prefetch" href="//tags.bkrtx.com/" />
        <link rel="dns-prefetch" href="//static.chartbeat.com/" />
        <link rel="dns-prefetch" href="//scomcluster.cxense.com/" />
        <link rel="dns-prefetch" href="//sb.scorecardresearch.com/" />
        <link rel="dns-prefetch" href="//ping.chartbeat.net/" />
        <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
        <link rel="dns-prefetch" href="//cdn.cxense.com/" />
        <link rel="dns-prefetch" href="//arc-subs-sdk.s3.amazonaws.com/" />
        <link rel="dns-prefetch" href="//acdn.adnxs.com/" />
        {googleFonts && (
          <link
            href={`https://fonts.googleapis.com/css?family=${googleFonts}&display=swap`}
            rel="stylesheet"
          />
        )}

        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        {arcSite === 'elcomerciomag' && (
          <meta property="fb:pages" content="530810044019640" />
        )}
        {isStory ? '' : <meta name="keywords" content={keywords} />}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}

        <Resource path={`resources/dist/${arcSite}/css/dmobile.css`}>
          {({ data }) => {
            return data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={createMarkup(
                  data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', '')
                )}
              />
            ) : null
          }}
        </Resource>
      </head>
      <body className={classBody}>
        <noscript>
          <iframe
            title="Google Tag Manager - No Script"
            src={`https://www.googletagmanager.com/ns.html?id=${
              siteProperties.googleTagManagerMobile
            }`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <div id="fusion-app" role="application">
          {children}
        </div>

        <script
          defer
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/js/index.js`
          )}
        />

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

        <script dangerouslySetInnerHTML={{ __html: staticVariables }} />
        <script
          async
          src={deployment(`${contextPath}/resources/assets/js/lazyload.js`)}
        />
        <script
          src={deployment(
            `${contextPath}/resources/assets/mobile/dist/bundle.js`
          )}
        />
      </body>
    </html>
  )
}
