import React from 'react'
import PropTypes from 'prop-types'
import { Html, BaseMarkup } from '@arc-core-components/amp-document-boilerplate'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import renderMetaPage from './_children/render-meta-page'
import AmpTagManager from './_children/amp-tag-manager'
import { createMarkup, addSlashToEnd } from '../utilities/helpers'
import StoryData from '../utilities/story-data'

const AmpOutputType = ({
  children,
  contextPath,
  deployment,
  arcSite,
  globalContent,
  siteProperties,
  requestUri,
  metaValue,
  Resource,
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
    isAmp: true,
    deployment,
  }
  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
  } = globalContent || {}

  const isStory = requestUri.match(`^(/(.*)/.*-noticia)`)

  const metaSiteData = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
    isStory,
    isAmp: true,
  }

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const title = `${storyTitleRe} ${seoTitle} | ${siteProperties.siteName}`

  const description =
    metaValue('description') && !metaValue('description').match(/content/)
      ? `${metaValue('description')} `
      : 'Últimas noticias en Perú y el mundo'

  const keywords =
    metaValue('keywords') && !metaValue('keywords').match(/content/)
      ? metaValue('keywords')
      : 'Noticias, El Comercio, Peru, Mundo, Deportes, Internacional, Tecnologia, Diario, Cultura, Ciencias, Economía, Opinión'

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
  const {
    canonical_url: canonicalUrl = '',
    taxonomy: { sections } = {},
    credits: { by: autors } = {},
  } = globalContent || {}
  const parametros = {
    sections,
    autors,
    siteProperties,
    arcSite,
    globalContent,
    requestUri,
  }
  const {
    videoSeo,
    promoItems: { basic_html: { content = '' } = {} } = {},
    contentElementsHtml: dataElement,
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })
  const contenidoVideo =
    content.includes('id="powa-') || videoSeo[0] || dataElement.includes('.mp4')
      ? 1
      : false

  return (
    <Html>
      <head>
        <BaseMarkup
          canonicalUrl={`${siteProperties.siteUrl}${addSlashToEnd(
            canonicalUrl
          )}`}
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{title}</title>
        <link rel="dns-prefetch" href="//ecoid.pe" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="amp-experiments-opt-in" content="amp-next-page" />
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}

        {/* add additional head elements here */}

        {/* add additional head elements here */}

        <Resource path={`resources/dist/${arcSite}/css/amp.css`}>
          {({ data }) => {
            return data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={createMarkup(
                  data.replace('@charset "UTF-8";', '')
                )}
              />
            ) : null
          }}
        </Resource>
        {
          //* TODO habilitar subscriptions en AMP
          // isPremium && ( <script async custom-element="amp-subscriptions" src="https://cdn.ampproject.org/v0/amp-subscriptions-0.1.js"  /> )*/
        }
        <script
          async
          custom-element="amp-analytics"
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
        />
        <script
          async
          custom-element="amp-sidebar"
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
        />
        <script
          async
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
        />
        <script
          async
          custom-element="amp-sticky-ad"
          src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"
        />
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
        <script
          async
          custom-element="amp-next-page"
          src="https://cdn.ampproject.org/v0/amp-next-page-0.1.js"
        />

        <script
          async
          custom-element="amp-youtube"
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
        />
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
        />

        <script
          async
          custom-element="amp-twitter"
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
        />
        <script
          async
          custom-element="amp-instagram"
          src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
        />
        <script
          async
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
        />
        {contenidoVideo && (
          <>
            <script
              async
              custom-element="amp-video"
              src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
            />
            <script
              async
              custom-element="amp-video-docking"
              src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.js"
            />
          </>
        )}
      </head>
      <body className="">
        <AmpTagManager {...parametros} />
        {children}
      </body>
    </Html>
  )
}

// If no amp.jsx file exists, this feature will not render.
AmpOutputType.fallback = false

AmpOutputType.propTypes = {
  children: PropTypes.node,
  arcSite: PropTypes.string,
  isAmp: PropTypes.bool,
}

export default AmpOutputType
