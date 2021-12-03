/* eslint-disable no-nested-ternary */
import AmpImage from '@arc-core-components/element_image'
import StoryContent, {
  AmpOembed,
  RawHtml,
  Text,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import StoryGoogleNews from '../../../global-components/google-news'
import StoryContentChildTable from '../../../global-components/story-table'
import { env, originByEnv } from '../../../utilities/arc/env'
import { METERED } from '../../../utilities/constants/content-tiers'
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CUSTOM_EMBED,
  ELEMENT_GALLERY,
  ELEMENT_HEADER,
  ELEMENT_IMAGE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LINK_LIST,
  ELEMENT_LIST,
  ELEMENT_OEMBED,
  ELEMENT_QUOTE,
  ELEMENT_RAW_HTML,
  ELEMENT_TABLE,
  ELEMENT_TEXT,
  ELEMENT_VIDEO,
} from '../../../utilities/constants/element-types'
import {
  SITE_DEPOR,
  SITE_DIARIOCORREO,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'
import {
  GALLERY_VERTICAL,
  STAMP_TRUST,
  STORY_CORRECTION,
  VIDEO_JWPLAYER,
  VIDEO_JWPLAYER_MATCHING,
} from '../../../utilities/constants/subtypes'
import { formatDateTime, getDateSeo } from '../../../utilities/date-time/dates'
import { formatHtmlToText } from '../../../utilities/parse/strings'
import { createResizedParams } from '../../../utilities/resizer/resizer'
import { ampHtml } from '../../../utilities/story/helpers-amp'
import StoryData from '../../../utilities/story-data'
import { cleanLegacyAnchor, replaceTags } from '../../../utilities/tags'
import StorySocialChildAmpSocial from '../social/_children/amp-social'
import AmpStoriesChild from '../title/_children/amp-stories'
import StoryContentsChildJwplayerRecommender from './_children/amp-jwplayer-recommender'
import StoryContentChildVideo from './_children/amp-video'
import StoryContentChildVideoJwplayer from './_children/amp-video-jwplayer'
import StoryContentChildBlockQuote from './_children/blockquote'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildLinkList from './_children/link-list'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import customFields from './_dependencies/custom-fields'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  textClasses: 'amp-story-content__news-text ',
  blockquoteClass:
    'amp-story-content__blockquote text-lg secondary-font text-gray-300 text-xl line-h-md ml-15 mt-25 mb-25 pl-10 pr-30',
  authorTimeContainer:
    'pt-15 mt-15 pb-15 mb-15 border-t-1 border-b-1 border-solid border-gray',
  author: 'amp-story-content__author mb-5 secondary-font',
  datetime: 'secondary-font text-md',
  image: 'amp-story-content__image mt-10 mb-10',
  social: 'amp-story-content__social',
  // TODO: Revisar video y imgTag
  relatedTitle:
    'related-content__title font-bold uppercase pt-20 pb-20 secondary-font',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
  rawHtmlClasses: 'story-content__embed',
  listClasses: 'story-contents__paragraph-list',
}

@Consumer
class StoryContentAmp extends React.PureComponent {
  render() {
    const {
      contextPath,
      requestUri,
      arcSite,
      deployment,
      customFields: dataCustomFields,
      siteProperties: {
        siteUrl,
        activePaywall,
        activeRulesCounter,
        jwplayersMatching,
      },
      globalContent: data = {},
    } = this.props

    const activeAds = Object.keys(dataCustomFields).filter((prop) =>
      prop.match(/ampAdLoadBlock(\d)/)
    )

    const {
      source,
      content_restrictions: { content_code: contentCode = '' } = {},
    } = data
    const {
      contentPosicionPublicidadAmp,
      authorLink,
      displayDate,
      publishDate: updateDate,
      primarySection,
      primarySectionLink,
      author,
      subtype,
      canonicalUrl,
      authorsList,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
      customFields: dataCustomFields,
    })

    const isMetered = contentCode === METERED
    const envOrigin = originByEnv(arcSite)
    const encodedStoryUrl = encodeURIComponent(`${envOrigin}${canonicalUrl}`)
    const isComercio = arcSite === SITE_ELCOMERCIO
    const isMag = arcSite === SITE_ELCOMERCIOMAG

    const isLegacy =
      source.source_id &&
      (arcSite === SITE_ELBOCON || arcSite === SITE_DIARIOCORREO)

    const imgTag = 'amp-img'

    const processedAdsAmp = (content) => {
      let entryHtml = ''

      const res = content.split('<div class="live-event2-comment">')
      res.forEach((entry, i) => {
        const divContent = i === 0 ? '' : '<div class="live-event2-comment">'
        let publicidad = ''
        activeAds.forEach((el) => {
          if (i === dataCustomFields[el]) {
            const matches = el.match(/([0-9])+/)
            publicidad = dataCustomFields[`freeHtml${matches[0]}`]
          }
        })

        entryHtml = `${entryHtml} ${divContent} ${entry}  ${
          publicidad &&
          `<div class='text-center ad-amp-movil'>${publicidad} </div>`
        }`
      })

      return entryHtml
    }

    const magStoryDatetime = () => {
      const formattedDisplayDate = formatDateTime(displayDate)
      const formattedUpdateDate = formatDateTime(updateDate)

      return `${formattedDisplayDate} ${
        formattedDisplayDate !== formattedUpdateDate
          ? `| Actualizado ${formattedUpdateDate}`
          : ''
      }`
    }
    // separar principal y jwplayer
    return (
      <>
        <div className={classes.content}>
          {subtype !== GALLERY_VERTICAL && (
            <div
              className={isMag ? classes.authorTimeContainer : 'pt-15 pb-15'}>
              {isMag ? (
                <p className={classes.author}>
                  Por{' '}
                  <a href={authorLink} className="font-bold">
                    {author}
                  </a>{' '}
                  en{' '}
                  <a href={primarySectionLink} className="font-bold">
                    {primarySection}
                  </a>
                </p>
              ) : // Validamos si es EC
              isComercio ? (
                authorsList.map((authorData) => (
                  <p className={classes.author}>
                    <a href={authorData.urlAuthor}>{authorData.nameAuthor}</a>
                  </p>
                ))
              ) : (
                <p className={classes.author}>
                  <a href={authorLink}>{author}</a>
                </p>
              )}
              <time
                dateTime={getDateSeo(displayDate)}
                className={classes.datetime}>
                {isMag
                  ? magStoryDatetime()
                  : `Actualizado el ${formatDateTime(displayDate)}`}
              </time>
            </div>
          )}
          {isMetered &&
          activeRulesCounter &&
          activePaywall &&
          arcSite === SITE_GESTION ? (
            // Contador de paywall para AMP
            <amp-iframe
              width="1"
              height="1"
              sandbox="allow-scripts allow-same-origin"
              layout="fixed"
              frameborder="0"
              src={deployment(
                `${envOrigin}${contextPath}/resources/pages/paywall-counter-external.html?env=${env}&site=${arcSite}&story=${encodedStoryUrl}`
              )}
            />
          ) : null}
          {contentPosicionPublicidadAmp && (
            <StoryContent
              data={contentPosicionPublicidadAmp}
              elementClasses={classes}
              renderElement={(element) => {
                const {
                  type,
                  subtype: sub,
                  embed: customEmbed,
                  raw_oembed: rawOembed,
                  content_elements: innerContentElements,
                  content,
                  level,
                  publicidad = '',
                  url = '',
                  list_type: listType = 'unordered',
                  items = [],
                } = element
                if (type === ELEMENT_OEMBED) {
                  return (
                    <AmpOembed
                      rawOembed={rawOembed}
                      subtype={sub}
                      className={classes}
                    />
                  )
                }
                if (type === ELEMENT_RAW_HTML) {
                  if (content.includes('id="powa-'))
                    return (
                      <StoryContentChildVideo
                        data={content}
                        className={classes.newsImage}
                      />
                    )
                  return isLegacy ? (
                    <p> - </p>
                  ) : (
                    <RawHtml
                      content={ampHtml(
                        processedAdsAmp(content),
                        arcSite,
                        source.source_id
                      )}
                      className={classes.rawHtmlClasses}
                    />
                  )
                }
                if (type === ELEMENT_HEADER) {
                  if (level === 1)
                    return (
                      <h2>
                        <RawHtml
                          content={
                            isLegacy ? cleanLegacyAnchor(content) : content
                          }
                        />
                      </h2>
                    )
                  if (isLegacy)
                    return <RawHtml content={cleanLegacyAnchor(content)} />
                }
                if (type === ELEMENT_QUOTE) {
                  return <StoryContentChildBlockQuote data={element} />
                }
                if (type === ELEMENT_TABLE) {
                  return <StoryContentChildTable data={element} type={type} />
                }

                // Condicion para mag sin lista - components/features/story/title/amp.jsx
                if (type === ELEMENT_LIST) {
                  const ListType = listType === 'ordered' ? 'ol' : 'ul'
                  return (
                    <ListType className={classes.listClasses}>
                      {items.map((item) => (
                        <li
                          dangerouslySetInnerHTML={{
                            __html: item.content
                              ? item.content.replace(/<a/g, '<a itemprop="url"')
                              : '',
                          }}
                        />
                      ))}
                    </ListType>
                  )
                }

                if (type === ELEMENT_GALLERY) {
                  return (
                    <AMPCarousel
                      data={innerContentElements}
                      width="500"
                      height="300"
                    />
                  )
                }
                if (type === ELEMENT_IMAGE) {
                  return (
                    <AmpImage
                      {...element}
                      url={
                        createResizedParams({
                          url: element.url,
                          presets: 'large:400x0',
                          arcSite,
                        }).large || {}
                      }
                      ImgTag={imgTag}
                      imgClassName={classes.image}
                      layout="responsive"
                      resizer="true"
                      sizePreset="content"
                    />
                  )
                }
                if (type === ELEMENT_CUSTOM_EMBED) {
                  if (sub === STORY_CORRECTION) {
                    const {
                      config: {
                        content: contentCorrectionConfig = '',
                        type_event: typeConfig = 'correction',
                      } = {},
                    } = customEmbed || {}
                    return (
                      <StoryContentsChildCorrection
                        content={contentCorrectionConfig}
                        isAmp
                        type={typeConfig}
                      />
                    )
                  }

                  if (sub === STAMP_TRUST) {
                    const {
                      config: {
                        url: urlConfig = '',
                        url_img: urlImgConfig = '',
                      } = {},
                    } = customEmbed || {}
                    return (
                      <StoryContentsChildStampTrust
                        url={urlConfig}
                        urlImg={urlImgConfig}
                        isAmp
                        siteUrl={siteUrl}
                      />
                    )
                  }

                  if (sub === 'image_link') {
                    const { config: customEmbedConfig = {} } = customEmbed || {}
                    return (
                      <a
                        href={customEmbedConfig.link}
                        title={customEmbedConfig.title}>
                        <AmpImage
                          width={customEmbedConfig.width || 560}
                          height={customEmbedConfig.height || 315}
                          caption={
                            customEmbedConfig.alt || customEmbedConfig.title
                          }
                          url={
                            createResizedParams({
                              url: customEmbedConfig.photo,
                              presets: 'large:400x0',
                              arcSite,
                            }).large || {}
                          }
                          ImgTag={imgTag}
                          imgClassName={classes.image}
                          layout="responsive"
                          resizer="true"
                          sizePreset="content"
                        />
                      </a>
                    )
                  }
                }
                if (type === ELEMENT_TEXT) {
                  return (
                    <>
                      <Text
                        content={
                          isLegacy
                            ? formatHtmlToText(
                                replaceTags(cleanLegacyAnchor(content))
                              )
                            : ampHtml(
                                replaceTags(content),
                                arcSite,
                                !!source.source_id
                              )
                        }
                        className={classes.textClasses}
                      />
                      {publicidad && (
                        <div
                          className={classes.adsAmp}
                          dangerouslySetInnerHTML={{
                            __html: publicidad,
                          }}
                        />
                      )}
                      {element?.activateStories &&
                      (arcSite === SITE_ELCOMERCIO ||
                        (arcSite === SITE_DEPOR &&
                          (/^\/mexico\//.test(requestUri) ||
                            /^\/colombia\//.test(requestUri)))) ? (
                        <AmpStoriesChild arcSite={arcSite} />
                      ) : null}
                    </>
                  )
                }
                if (type === ELEMENT_BLOCKQUOTE) {
                  return (
                    <blockquote
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                      className={classes.blockquoteClass}
                    />
                  )
                }
                if (type === ELEMENT_INTERSTITIAL_LINK) {
                  return (
                    <StoryContentsChildInterstitialLink
                      url={url}
                      content={content}
                      arcSite={arcSite}
                      isAmp
                    />
                  )
                }
                if (type === ELEMENT_LINK_LIST) {
                  return <StoryContentsChildLinkList items={items} isAmp />
                }

                if (type === ELEMENT_VIDEO) {
                  const dataVideo = updateDate && updateDate.split('T')[0]
                  if (
                    element.embed_html.includes('id="powa-') &&
                    dataVideo >= '2021-01-22'
                  ) {
                    return ''
                  }

                  return <StoryContentChildVideo data={element} />
                }
                if (type === ELEMENT_CUSTOM_EMBED) {
                  if (sub === VIDEO_JWPLAYER) {
                    const { embed: { config: videJplayer = {} } = {} } = element
                    return <StoryContentChildVideoJwplayer data={videJplayer} />
                  }
                  if (sub === VIDEO_JWPLAYER_MATCHING) {
                    const { videoId = '', playerId = '' } =
                      jwplayersMatching || {}
                    return (
                      <StoryContentsChildJwplayerRecommender
                        videoId={videoId}
                        playerId={playerId}
                      />
                    )
                  }
                }
                return undefined
              }}
            />
          )}

          {dataCustomFields.shareLinksAMP && (
            <div className={classes.social}>
              <StorySocialChildAmpSocial isContent />
            </div>
          )}
          {isComercio && <StoryGoogleNews />}
        </div>
      </>
    )
  }
}

StoryContentAmp.propType = {
  customFields,
}

StoryContentAmp.static = true
StoryContentAmp.propTypes = {
  customFields,
}
export default StoryContentAmp
