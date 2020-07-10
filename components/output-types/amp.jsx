import React from 'react'
import PropTypes from 'prop-types'
import { Html, BaseMarkup } from '@arc-core-components/amp-document-boilerplate'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import renderMetaPage from './_children/render-meta-page'
import AmpTagManager from './_children/amp-tag-manager'
import { addSlashToEnd } from '../utilities/parse/strings'
import {
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_GESTION,
} from '../utilities/constants/sitenames'
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
    socialName: siteProperties.social && siteProperties.social.facebook,
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

  const title = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteProperties.siteTitle.toUpperCase()}`

  const description =
    metaValue('description') && !metaValue('description').match(/content/)
      ? `${metaValue('description')} `
      : 'Últimas noticias en Perú y el mundo'

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
    twitterCreator: siteProperties.social && siteProperties.social.twitter.user,
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
    contentElementsHtml,
  } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })

  let rawHtmlContent = contentElementsHtml

  const isJwVideo = rawHtmlContent.includes('cdn.jwplayer.com')
  /**
   * Se reemplaza los .mp4 de JWplayer para poder usar el fallback de
   * isPowaVideo `.includes('.mp4')
   */
  if (isJwVideo)
    rawHtmlContent = rawHtmlContent.replace(
      /content.jwplatform.com\/videos\/(.+).mp4/g,
      ''
    )

  const isPowaVideo =
    content.includes('id="powa-') ||
    videoSeo[0] ||
    rawHtmlContent.includes('.mp4')
      ? 1
      : false

  return (
    <Html lang="es">
      <head>
        <BaseMarkup
          canonicalUrl={`${siteProperties.siteUrl}${addSlashToEnd(
            canonicalUrl
          )}`}
        />
        <title>{title}</title>
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />

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
                dangerouslySetInnerHTML={{
                  __html: data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', ''),
                }}
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
        {arcSite === SITE_GESTION && (
          <script
            async
            custom-element="amp-next-page"
            src="https://cdn.ampproject.org/v0/amp-next-page-0.1.js"
          />
        )}
        <script
          async
          custom-element="amp-youtube"
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
        />
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
        />
        {(arcSite === SITE_DEPOR || arcSite === SITE_ELBOCON) && isJwVideo && (
          <script
            async
            custom-element="amp-jwplayer"
            src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js"
          />
        )}
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
        <script
          async
          custom-element="amp-fx-flying-carpet"
          src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"
        />

        {arcSite === SITE_DEPOR && (
          <script
            async
            custom-element="amp-soundcloud"
            src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"></script>
        )}
        {isPowaVideo && (
          <>
            <script
              async
              custom-element="amp-ima-video"
              src="https://cdn.ampproject.org/v0/amp-ima-video-0.1.js"></script>

            <script
              async
              custom-element="amp-video-docking"
              src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.js"
            />
          </>
        )}
        <script
          async
          custom-element="amp-fit-text"
          src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
        />
        <script
          async
          custom-element="amp-social-share"
          src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
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
