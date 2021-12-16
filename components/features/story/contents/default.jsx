// file path: StoryContentContent.js
import ArcStoryContent, {
  Oembed,
} from '@arc-core-components/feature_article-body'
import Consumer from 'fusion:consumer'
import * as React from 'react'

import Ads from '../../../global-components/ads'
import Image from '../../../global-components/image'
import LiteYoutube from '../../../global-components/lite-youtube'
import StoryContentsChildTable from '../../../global-components/story-table'
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
import { OPTA_CSS_LINK, OPTA_JS_LINK } from '../../../utilities/constants/opta'
import {
  // SITE_DEPOR,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  // SITE_ELCOMERCIOMAG,
  SITE_PERU21,
} from '../../../utilities/constants/sitenames'
import {
  BIG_IMAGE,
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
  SPECIAL,
  SPECIAL_BASIC,
  STAMP_TRUST,
  STORY_CORRECTION,
  VIDEO_JWPLAYER,
  VIDEO_JWPLAYER_MATCHING,
} from '../../../utilities/constants/subtypes'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { processedAds } from '../../../utilities/story/helpers'
import StoryData from '../../../utilities/story-data'
import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildAuthorTrust from './_children/author-trust'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildIcon from './_children/icon-list'
import StoryContentsChildImage from './_children/image'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildJwplayerRecommender from './_children/jwplayer-recommender'
import StoryContentsChildLinkList from './_children/link-list'
import StoryContentsChildLinkedImage from './_children/linked-image'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import StoryContentsChildVideo from './_children/video'
import StoryContentsChildVideoNativo from './_children/video-nativo'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content: 'story-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary mb-25 title-xs line-h-md mt-20 secondary-font pr-20',
  blockquoteClass:
    'story-content__blockquote text-gray-300 line-h-sm ml-15 mt-40 mb-40 pl-10 pr-30',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed embed-script',
  tags: 'story-content',
  section: 'w-full',
  listClasses: 'story-content__paragraph-list',
  alignmentClasses: 'story-content__alignment',
  bbcHead: 'bbc-head p-10',
  premiumWrapper: `premium__wrapper bg-primary flex justify-center items-center mb-10`,
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}
@Consumer
class StoryContents extends React.PureComponent {
  render() {
    const {
      globalContent,
      arcSite,
      contextPath,
      deployment,
      requestUri,
      siteProperties: {
        ids: { opta },
        isDfp = false,
        siteUrl,
        jwplayers = {},
        jwplayersMatching = {},
      },
    } = this.props

    const {
      publishDate: date,
      promoItems,
      displayDate: updatedDate,
      createdDate,
      authorImage,
      authorLink,
      author,
      role: authorRole,
      locality,
      primarySection,
      authorEmail,
      primarySectionLink,
      subtype,
      isPremium,
      multimedia,
      tags,
      contentPosicionPublicidad,
      contentElementsHtml,
      authorImageSecond,
      authorLinkSecond,
      authorSecond,
      authorEmailSecond,
      roleSecond: authorRoleSecond,
      promoItemJwplayer,
      authorsList,
    } = new StoryData({
      data: globalContent,
      contextPath,
      deployment,
      arcSite,
    })

    const params = {
      authorImage,
      author,
      authorRole,
      authorLink,
      updatedDate: getDateSeo(updatedDate || createdDate),
      date,
      locality,
      primarySectionLink,
      authorEmail,
      primarySection,
      subtype,
      ...promoItems,
      multimedia,
      primaryImage: true,
      authorImageSecond,
      authorLinkSecond,
      authorSecond,
      authorEmailSecond,
      authorRoleSecond,
      promoItemJwplayer,
      authorsList,
    }

    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/bbc-footer.png'

    const { basic_gallery: basicGallery = {} } = promoItems

    const skipElementsRecipe = requestUri.includes('/recetas/')
      ? [
          '[inicio-ingredientes]',
          '[fin-ingredientes]',
          '[inicio-instrucciones]',
          '[fin-instrucciones]',
        ]
      : []
    const contentPosicionPublicidadFilter =
      contentPosicionPublicidad && requestUri.includes('/recetas/')
        ? contentPosicionPublicidad.filter(
            ({ type: typeElem, content: el }) =>
              !(
                typeElem === ELEMENT_TEXT &&
                skipElementsRecipe &&
                skipElementsRecipe.includes(el)
              )
          )
        : contentPosicionPublicidad

    const rawHtmlContent = contentElementsHtml
    const isJwVideo = rawHtmlContent.includes('cdn.jwplayer.com')
    const isPreview = /^\/preview\//.test(requestUri)

    return (
      <>
        <div className={classes.news}>
          {isPremium &&
            SITE_ELCOMERCIO === arcSite &&
            requestUri.includes('/archivo-elcomercio/') &&
            !basicGallery && (
              <div className={classes.premiumWrapper}>
                <p itemProp="description" className={classes.premiumText}>
                  Suscriptor Digital
                </p>
              </div>
            )}
          {primarySectionLink === '/impresa/' ||
          primarySectionLink === '/malcriadas/' ||
          storyTagsBbc(tags, 'portada-trome')
            ? promoItems?.basic && (
                <StoryContentsChildImpresa
                  url={promoItems.basic.url}
                  subtitle={promoItems.basic.subtitle}
                />
              )
            : promoItems &&
              subtype !== BIG_IMAGE &&
              subtype !== SPECIAL_BASIC &&
              subtype !== SPECIAL && (
                <StoryContentsChildMultimedia data={params} />
              )}
          {subtype !== GALLERY_VERTICAL && (
            <>
              {SITE_ELCOMERCIO === arcSite ? (
                <StoryContentsChildAuthorTrust {...params} />
              ) : (
                <StoryContentsChildAuthor {...params} />
              )}
            </>
          )}
          <div
            className={`${classes.content} ${
              isPremium && !isPreview
                ? 'story-content__nota-premium paywall no_copy'
                : ''
            }`}
            style={isPremium && !isPreview ? { display: 'none' } : {}}
            id="contenedor">
            {!requestUri.includes('/recetas/') && subtype !== MINUTO_MINUTO && (
              <StoryContentsChildIcon />
            )}
            {!isDfp && (
              <>
                <div id="ads_d_inline" />
                <div id="ads_m_movil_video" />
                <div id="ads_m_movil3" />
              </>
            )}
            {contentPosicionPublicidadFilter && (
              <ArcStoryContent
                data={contentPosicionPublicidadFilter}
                elementClasses={classes}
                renderElement={(element) => {
                  const {
                    type,
                    subtype: sub,
                    embed: customEmbed,
                    raw_oembed: rawOembed,
                    content,
                    level,
                    alignment = '',
                    headlines: { basic: captionVideo = '' } = {},
                    publicidad = false,
                    nameAds,
                    url = '',
                    items = [],
                    list_type: listType = 'unordered',
                  } = element
                  if (type === ELEMENT_IMAGE) {
                    return (
                      <StoryContentsChildImage
                        customHeight={0}
                        customWidth={620}
                        {...element}
                      />
                    )
                  }
                  if (type === ELEMENT_VIDEO) {
                    const dataVideo = updatedDate && updatedDate.split('T')[0]
                    if (
                      element.embed_html.includes('id="powa-') &&
                      dataVideo >= '2021-01-22'
                    ) {
                      return ''
                    }
                    return (
                      <>
                        {element && element.embed_html ? (
                          <StoryContentsChildVideo
                            data={element.embed_html}
                            {...element}
                            className={classes.newsImage}
                            description={captionVideo}
                            contentElemtent
                          />
                        ) : (
                          <StoryContentsChildVideoNativo
                            streams={element && element.streams}
                          />
                        )}
                      </>
                    )
                  }
                  if (type === ELEMENT_CUSTOM_EMBED) {
                    if (sub === VIDEO_JWPLAYER) {
                      const {
                        embed: {
                          config: {
                            key: mediaId = '',
                            has_ads: hasAds = 0,
                            account = 'gec',
                            title = '',
                            description: descriptionTxt,
                            thumbnail_url: image = '',
                          } = {},
                        } = {},
                      } = element
                      const playerId = jwplayers[account] || jwplayers.gec
                      const jwplayerId = hasAds
                        ? playerId.playerAds
                        : playerId.player
                      return (
                        <>
                          <div
                            className="jwplayer-lazy"
                            id={mediaId}
                            data-hasAds={hasAds}
                            data-playerId={jwplayerId}>
                            <div className="jwplayer-lazy-icon-play" />
                            <Image
                              id={`image_${mediaId}`}
                              src={image}
                              width={580}
                              height={326}
                              alt={title}
                              style={{
                                width: '100%',
                              }}
                              loading="lazy"
                            />
                          </div>
                          <figcaption
                            className="story-content__caption"
                            dangerouslySetInnerHTML={{
                              __html: descriptionTxt,
                            }}
                          />
                        </>
                      )
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
                  if (type === ELEMENT_GALLERY) {
                    return (
                      <StoryHeaderChildGallery
                        contentElementGallery={element}
                        type={type}
                      />
                    )
                  }
                  if (type === ELEMENT_TEXT) {
                    const alignmentClass = alignment
                      ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                      : classes.textClasses

                    return (
                      <>
                        <p
                          itemProp="description"
                          className={alignmentClass}
                          dangerouslySetInnerHTML={{
                            __html: replaceTags(content),
                          }}
                        />

                        {publicidad &&
                          isDfp &&
                          !(
                            subtype === GALLERY_VERTICAL && nameAds === 'caja3'
                          ) && (
                            <Ads
                              adElement={nameAds}
                              isDesktop={false}
                              isMobile
                              isLite={false}
                              isDfp={isDfp}
                            />
                          )}

                        {(arcSite === 'elcomercio' ||
                          arcSite === 'gestion' ||
                          (arcSite === 'depor' &&
                            (/^\/mexico\//.test(requestUri) ||
                              /^\/colombia\//.test(requestUri)))) &&
                        nameAds === 'caja3' ? (
                          <div id="spc_post_stories" />
                        ) : null}
                      </>
                    )
                  }
                  if (type === ELEMENT_TABLE) {
                    return (
                      <StoryContentsChildTable data={element} type={type} />
                    )
                  }
                  if (type === ELEMENT_QUOTE) {
                    return <StoryContentsChildBlockQuote data={element} />
                  }
                  if (type === ELEMENT_INTERSTITIAL_LINK) {
                    return (
                      <StoryContentsChildInterstitialLink
                        url={url}
                        content={content}
                        isAmp={false}
                      />
                    )
                  }
                  if (
                    type === ELEMENT_CUSTOM_EMBED &&
                    sub === STORY_CORRECTION
                  ) {
                    const {
                      config: {
                        content: contentCorrectionConfig = '',
                        type_event: typeConfig = 'correction',
                      } = {},
                    } = customEmbed || {}
                    return (
                      <StoryContentsChildCorrection
                        content={contentCorrectionConfig}
                        isAmp={false}
                        type={typeConfig}
                      />
                    )
                  }
                  if (type === ELEMENT_CUSTOM_EMBED && sub === STAMP_TRUST) {
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
                        isAmp={false}
                        siteUrl={siteUrl}
                      />
                    )
                  }
                  if (type === ELEMENT_LINK_LIST) {
                    return <StoryContentsChildLinkList items={items} />
                  }
                  if (type === ELEMENT_LIST) {
                    if (items && items.length > 0) {
                      const ListType = listType === 'ordered' ? 'ol' : 'ul'
                      return (
                        <ListType className={classes.listClasses}>
                          {items.map((item) => (
                            <li
                              dangerouslySetInnerHTML={{
                                __html: item.content
                                  ? item.content.replace(
                                      /<a/g,
                                      '<a itemprop="url"'
                                    )
                                  : '',
                              }}
                            />
                          ))}
                        </ListType>
                      )
                    }
                  }
                  if (type === ELEMENT_OEMBED) {
                    if (sub === 'youtube') {
                      const { html: youtubeIframe } = rawOembed || {}
                      const [, videoId] =
                        youtubeIframe.match(/\/embed\/([\w-]+)/) || []
                      if (videoId)
                        return <LiteYoutube videoId={videoId} loading="lazy" />
                    }
                    return (
                      <Oembed
                        rawOembed={rawOembed}
                        subtype={sub}
                        className={classes.newsEmbed}
                      />
                    )
                  }

                  if (type === ELEMENT_HEADER && level === 1) {
                    return (
                      <h2
                        itemProp="name"
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    )
                  }

                  if (type === ELEMENT_BLOCKQUOTE) {
                    return (
                      <>
                        <blockquote
                          dangerouslySetInnerHTML={{
                            __html: content,
                          }}
                          className={classes.blockquoteClass}
                        />
                      </>
                    )
                  }

                  if (type === ELEMENT_RAW_HTML) {
                    if (content.includes('<mxm')) {
                      return (
                        <StoryContentChildRawHTML
                          content={processedAds(content)}
                        />
                      )
                    }

                    if (
                      content.includes('opta-widget') &&
                      // eslint-disable-next-line camelcase
                      typeof opta_settings === 'undefined'
                    ) {
                      return (
                        <>
                          {/* <script
                            dangerouslySetInnerHTML={{
                              __html: `
                                var opta_settings={
                                  subscription_id: '${opta}',
                                  language: 'es_CO',
                                  timezone: 'America/Lima'
                                };`,
                            }}></script> */}
                          <StoryContentChildRawHTML content={content} />
                          <script
                            dangerouslySetInnerHTML={{
                              __html: `(function(){window.addEventListener('load', function(){
                                requestIdle(function(){
                                  if(!window.optaReady){
                                    var os=document.createElement('script')
                                    os.textContent=\`
                                      var opta_settings={
                                        subscription_id: '${opta}',
                                        language: 'es_CO',
                                        timezone: 'America/Lima'
                                      };\`
                                    document.head.append(os)
                                    var s=document.createElement('script')
                                    s.src='${OPTA_JS_LINK}'
                                    s.defer=true
                                    s.type='text/javascript'
                                    document.head.append(s)
                                    var n=document.createElement('link')
                                    n.rel='stylesheet'
                                    n.href='${OPTA_CSS_LINK}'
                                    document.head.append(n)
                                    window.optaReady=true
                                  }
                                })
                              })
                              })()`,
                            }}
                          />
                        </>
                      )
                    }
                    if (content.includes('id="powa-')) {
                      let contentVideo = content
                      if (arcSite === SITE_PERU21) {
                        contentVideo = content.replace(
                          /peru21.pe\/upload/gi,
                          'img.peru21.pe/upload'
                        )
                      }
                      return (
                        <>
                          <StoryContentsChildVideo
                            data={contentVideo}
                            htmlContent="html"
                            className={classes.newsImage}
                            {...element}
                          />
                        </>
                      )
                    }

                    if (
                      /twitter-(?:tweet|timeline|follow-button)|instagram-media/.test(
                        content
                      )
                    ) {
                      return (
                        <>
                          <div
                            data-type={
                              /twitter-(?:tweet|timeline|follow-button)/.test(
                                content
                              )
                                ? 'twitter'
                                : 'instagram'
                            }
                            className={classes.newsEmbed}
                            dangerouslySetInnerHTML={{
                              __html: content.replace(
                                /<script.*?>.*?<\/script>/,
                                ''
                              ),
                            }}
                          />
                        </>
                      )
                    }
                    return <StoryContentChildRawHTML content={content} />
                  }
                  if (type === ELEMENT_CUSTOM_EMBED) {
                    if (sub === 'image_link') {
                      const { config: customEmbedConfig } = customEmbed || {}
                      return (
                        <StoryContentsChildLinkedImage {...customEmbedConfig} />
                      )
                    }
                  }
                  return ''
                }}
              />
            )}
          </div>
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                itemProp="url"
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="banner-bbc-footer">
                <img
                  className="lazy"
                  alt="BBC"
                  src={`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${740} ${22}"%3E%3C/svg%3E`}
                  data-src={imgBbc}
                />
              </a>
            </div>
          )}
        </div>
        {arcSite === SITE_ELCOMERCIO && contentElementsHtml.includes('mxm') && (
          <>
            <script
              src="https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7"
              defer
            />
          </>
        )}
        {arcSite === SITE_ELBOCON && isJwVideo === true && (
          <script src="https://cdn.jwplayer.com/players/IxomITB6-BHYH7DVh.js?search=__CONTEXTUAL__" />
        )}
      </>
    )
  }
}

StoryContents.label = 'Artículo - contenidos'
StoryContents.static = true

export default StoryContents
