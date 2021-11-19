/* eslint-disable react/jsx-props-no-spreading */
import { BaseMarkup, Html } from '@arc-core-components/amp-document-boilerplate'
import PropTypes from 'prop-types'
import * as React from 'react'

import { originByEnv } from '../utilities/arc/env'
import { PREMIUM } from '../utilities/constants/content-tiers'
import { SITE_DEPOR, SITE_GESTION } from '../utilities/constants/sitenames'
import { addSlashToEnd } from '../utilities/parse/strings'
import RedirectError from '../utilities/redirect-error'
import { publicidadAmpMovil0 } from '../utilities/story/helpers-amp'
import StoryData from '../utilities/story-data'
import AmpTagManager from './_children/amp-tag-manager'
import MetaSite from './_children/meta-site'
import MetaStory from './_children/meta-story'
import OpenGraph from './_children/open-graph'
import Styles from './_children/styles'
import TwitterCards from './_children/twitter-cards'

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
    canonical_url: canonicalUrl = '',
    taxonomy: { sections } = {},
    credits: { by: autors } = {},
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
    content_restrictions: { content_code: contentCode = '' } = {},
    // _id: storyId,
  } = globalContent || {}

  const envOrigin = originByEnv(arcSite)

  const isPremium = contentCode === PREMIUM
  // Redirecciona a la version original si noticia es premium
  if (isPremium) throw new RedirectError(`${envOrigin}${canonicalUrl}`, 301)

  const isStory = /^\/.*\/.*-noticia/.test(requestUri)

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

  const siteTitleSuffix = siteProperties.siteTitle.toUpperCase()
  const sectionName = requestUri.split('/')[1].toUpperCase()
  const siteTitleSuffixR = siteTitleSuffix.replace('NOTICIAS ', '')
  const title = `${storyTitleRe} | ${sectionName} | ${siteTitleSuffixR}`

  let description =
    metaValue('description') && !metaValue('description').includes('content')
      ? `${metaValue('description')} `
      : 'Últimas noticias en Perú y el mundo'

  if (isStory) {
    description =
      globalContent?.description?.basic ||
      (metaValue('description') && !metaValue('description').includes('content')
        ? `${metaValue('description')} `
        : 'Últimas noticias en Perú y el mundo')
  }

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
    isAmp: true,
  }
  const parametros = {
    sections,
    autors,
    siteProperties,
    arcSite,
    globalContent,
    requestUri,
  }
  const { subtype = '' } = new StoryData({
    data: globalContent,
    arcSite,
    contextPath,
  })

  let lang = 'es'
  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) lang = 'es-us'
  }
  const namePublicidad = arcSite !== 'peru21g21' ? arcSite : 'peru21'
  const dataSlot = `/28253241/${namePublicidad}/amp/post/default/zocalo`
  const parameters = {
    arcSite,
    dataSlot,
    prebidSlot: `19186-${namePublicidad}-amp-zocalo`,
  }
  const isTrivia = /^\/trivias\//.test(requestUri)
  return (
    <Html lang={lang}>
      <head>
        <BaseMarkup
          canonicalUrl={`${envOrigin}${addSlashToEnd(canonicalUrl)}`}
        />
        <title>{title}</title>
        <Styles {...metaSiteData} />
        <MetaSite {...metaSiteData} />
        <meta name="description" content={description} />
        {arcSite === SITE_GESTION && (
          <meta name="amp-experiments-opt-in" content="amp-next-page" />
        )}
        <TwitterCards {...twitterCardsData} />
        <OpenGraph {...openGraphData} />
        <MetaStory {...metaPageData} />
        {/* add additional head elements here */}

        {/* add additional head elements here */}

        <Resource
          path={`resources/dist/${arcSite}/css/${
            isTrivia ? 'amp-trivias' : 'amp'
          }.css`}>
          {({ data }) =>
            data ? (
              <style
                amp-custom="amp-custom"
                dangerouslySetInnerHTML={{
                  __html: data
                    .replace('@charset "UTF-8";', '')
                    .replace('-----------', ''),
                }}
              />
            ) : null
          }
        </Resource>
      </head>
      <body className={subtype}>
        {!isTrivia && (
          <>
            <AmpTagManager {...parametros} />
            <amp-sticky-ad
              layout="nodisplay"
              class="ad-amp-movil"
              dangerouslySetInnerHTML={publicidadAmpMovil0(parameters)}
            />
          </>
        )}
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
