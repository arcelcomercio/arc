import React from 'react'
import PropTypes from 'prop-types'
import { Html, BaseMarkup } from '@arc-core-components/amp-document-boilerplate'
import MetaSite from './_children/meta-site'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
import TagManager from './_children/tag-manager'
import renderMetaPage from './_children/render-meta-page'

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
    metaValue,
    deployment,
  }

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

  const title =
    metaValue('title') && !metaValue('title').match(/content/)
      ? `${metaValue('title')} | ${siteProperties.siteName}`
      : siteProperties.siteName

  const description =
    metaValue('description') && !metaValue('description').match(/content/)
      ? `${metaValue('description')} en ${siteProperties.siteName}`
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

  return (
    <Html>
      <head>
        <TagManager {...siteProperties} />
        <BaseMarkup canonicalUrl="/" />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{title}</title>
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="news_keywords" content={keywords} />
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        {renderMetaPage(metaValue('id'), metaPageData)}

        {/* add additional head elements here */}
        <script
          async
          custom-element="amp-sidebar"
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
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
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
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
        <link
          href="https://fonts.googleapis.com/css?family=Exo|Judson|Lato|Noticia+Text|Noto+Serif|Roboto&display=swap"
          rel="stylesheet"
        />
        <Resource path={`resources/dist/${arcSite}/css/amp.css`}>
          {({ data }) => {
            return data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={{
                  __html: `${data}`,
                }}
              />
            ) : null
          }}
        </Resource>
      </head>
      <body>{children}</body>
    </Html>
  )
}

// If no amp.jsx file exists, this feature will not render.
AmpOutputType.fallback = false

AmpOutputType.propTypes = {
  children: PropTypes.node,
  arcSite: PropTypes.string,
}

export default AmpOutputType
