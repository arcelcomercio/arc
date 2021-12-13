/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */
import ArcStoryContent, {
  Oembed,
} from '@arc-core-components/feature_article-body'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Image from '../../../global-components/image'
import ShareButtons from '../../../global-components/lite/share'
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
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
  SITE_TROME,
} from '../../../utilities/constants/sitenames'
import {
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
  PARALLAX,
  STAMP_TRUST,
  STORY_CORRECTION,
  STORY_CUSTOMBLOCK,
  VIDEO_JWPLAYER,
  VIDEO_JWPLAYER_MATCHING,
  CUSTOM_EC_BLOCKS,
} from '../../../utilities/constants/subtypes'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { contentWithAds } from '../../../utilities/story/content'
import { processedAds } from '../../../utilities/story/helpers'
import StoryData from '../../../utilities/story-data'
import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentsChildImage from '../multimedia/_children/image'
import StoryContentsChildVideo from '../multimedia/_children/video'
import StoryContentsChildVideoNativo from '../multimedia/_children/video-nativo'
import StoryContentsChildAuthorLite from './_children/author-lite'
import StoryContentChildAuthorLiteV2 from './_children/author-lite-v2'
import StoryContentsChildAuthorTrustLite from './_children/author-trust-lite'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildHighlightedQuotes from './_children/highlighted-quotes'
import StoryContentsChildIntertitle from './_children/intertitle'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildCustomBlock from './_children/custom-block'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildJwplayerRecommender from './_children/jwplayer-recommender'
import StoryContentsChildLinkList from './_children/link-list'
import StoryContentsChildLinkedImage from './_children/linked-image'
import StoryContentsChildParallaxElements from './_children/parallax-elements'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import iframeScriptCounter from './_dependencies/counter-mag'
import customFields from './_dependencies/custom-fields'

const classes = {
  news: 'story-contents w-full ',
  content: 'story-contents__content ',
  textClasses: 'story-contents__font-paragraph ',
  newsImage: 'story-contents__image  ',
  newsEmbed: 'story-contents__embed embed-script',
  social: 'story-contents__social',
  tags: 'story-contents',
  blockquoteClass: 'story-contents__blockquote',
  section: 'w-full',
  listClasses: 'story-contents__paragraph-list',
  alignmentClasses: 'story-contents__alignment',
  bbcHead: 'bbc-head p-10',
}

const StoryContentsLite = (props) => {
  const {
    customFields: {
      shareAlign = 'right',
      shareLinks = false,
      copyLink = false,
      liteAdsEvery = 2,
    } = {},
  } = props
  const {
    globalContent,
    arcSite,
    contextPath,
    deployment,
    requestUri,
    metaValue,
    siteProperties: {
      ids: { opta },
      isDfp = false,
      siteUrl,
      jwplayers,
      jwplayersMatching,
    },
  } = useAppContext()

  const {
    promoItems,
    displayDate,
    publishDate: updateDate,
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
    contentElements,
    canonicalUrl,
    contentElementsHtml,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    roleSecond: authorRoleSecond,
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
    displayDate: getDateSeo(displayDate || createdDate),
    publishDate: getDateSeo(updateDate),
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
    arcSite,
    authorsList,
  }
  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/bbc-footer.png'
  const seccArary = canonicalUrl?.split('/') || '/'
  const secc = seccArary[1] && seccArary[1]?.replace(/-/gm, '')
  const storyContent = contentWithAds({
    contentElements,
    adsEvery: liteAdsEvery,
  })
  const isPreview = /^\/preview\//.test(requestUri)

  let isGsapRequired = false
  if (subtype === PARALLAX) {
    const elementsWithScrollGallery = contentElements.filter(
      ({ embed: { config: { block } = {} } = {} }) => block === 'scroll_gallery'
    )
    isGsapRequired = elementsWithScrollGallery.length > 0
  }

  const isStoryV2StandarStyle =
    metaValue('section_style') === 'story-v2-standard'

  return (
    <>
      <div className={classes.news}>
        {subtype !== GALLERY_VERTICAL && (
          <>
            {(() => {
              if (isStoryV2StandarStyle)
                return (
                  <StoryContentChildAuthorLiteV2
                    authorsList={authorsList}
                    displayDate={getDateSeo(displayDate || createdDate)}
                    publishDate={getDateSeo(updateDate)}
                  />
                )
              if (SITE_ELCOMERCIO === arcSite)
                return <StoryContentsChildAuthorTrustLite {...params} />
              return <StoryContentsChildAuthorLite {...params} />
            })()}
          </>
        )}
        <div
          className={`${classes.content} ${isPremium && !isPreview
            ? 'story-content__nota-premium paywall no_copy'
            : ''
            }`}
          style={
            isPremium && !isPreview
              ? {
                display: 'none',
                opacity: '0',
                userSelect: 'none',
                visibility: 'hidden',
              }
              : {}
          }
          id="contenedor">
          {!isDfp && (
            <>
              <div id="ads_d_inline" />
              <div id="ads_m_movil_video" />
              <div id="ads_m_movil3" />
            </>
          )}
          {storyContent && (
            <ArcStoryContent
              data={storyContent}
              elementClasses={classes}
              renderElement={(element) => {
                const {
                  _id,
                  type,
                  subtype: sub,
                  embed: customEmbed,
                  raw_oembed: rawOembed,
                  content,
                  level,
                  alignment = '',
                  headlines: { basic: captionVideo = '' } = {},
                  nameAds,
                  url = '',
                  items = [],
                  list_type: listType = 'unordered',
                  title,
                } = element

                if (
                  arcSite === SITE_TROME &&
                  type === ELEMENT_BLOCKQUOTE &&
                  content.toLowerCase().includes('puedes leer')
                ) {
                  return null
                }

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
                  const dataVideo = updateDate && updateDate.split('T')[0]
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
                          thumbnail_url: image = '',
                          description: descriptionTxt,
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
                          className="jwplayer-lazy "
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
                          className="s-multimedia__caption"
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
                  if (sub === CUSTOM_EC_BLOCKS) {
                    if (customEmbed.config.block === 'highlighted-quotes') {
                      return (<StoryContentsChildHighlightedQuotes data={element} />)
                    }
                    if (customEmbed.config.block === 'intertitle') {
                      return (<StoryContentsChildIntertitle data={element} />)
                    }
                  }
                }
                // // Condicion para trome sin blockquoute - components/features/story/title/lite.jsx
                // if (type === ELEMENT_BLOCKQUOTE && arcSite === SITE_TROME) {
                //   return null
                // }

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
                      {nameAds === 'caja3' &&
                        subtype !== MINUTO_MINUTO &&
                        subtype !== GALLERY_VERTICAL && (
                          <div className="content_gpt_caja3">
                            <div
                              id="gpt_caja3"
                              data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja3`}
                              data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                              data-bloque="3"
                              data-prebid-enabled
                            />
                          </div>
                        )}
                      {nameAds === 'inline' && (
                        <div className="content_gpt_inline">
                          <div
                            id="gpt_inline"
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/inline`}
                            data-ads-dimensions="[[1,1]]"
                            data-bloque="3"
                            data-ads-dimensions-m="[[1,1]]"
                          />
                        </div>
                      )}
                      {nameAds === 'caja4' && subtype !== GALLERY_VERTICAL && (
                        <div className="content_gpt_caja4">
                          <div
                            id="gpt_caja4"
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja4`}
                            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                            data-bloque="3"
                            data-prebid-enabled
                          />
                        </div>
                      )}
                      {nameAds === 'caja5' && subtype !== GALLERY_VERTICAL && (
                        <div className="content_gpt_caja5">
                          <div
                            id="gpt_caja5"
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja5`}
                            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                            data-bloque="4"
                            data-prebid-enabled
                          />
                        </div>
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
                  return <StoryContentsChildTable data={element} type={type} />
                }
                if (type === ELEMENT_QUOTE) {
                  return <StoryContentsChildBlockQuote data={element} />
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
                if (type === ELEMENT_INTERSTITIAL_LINK) {
                  return (
                    <StoryContentsChildInterstitialLink
                      url={url}
                      content={content}
                      isAmp={false}
                    />
                  )
                }
                if (type === ELEMENT_HEADER && level === 1) {
                  return (
                    <h2
                      itemProp="name"
                      className={classes.textClasses}
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                    />
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

                if (
                  !isStoryV2StandarStyle &&
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

                if (
                  !isStoryV2StandarStyle &&
                  type === ELEMENT_CUSTOM_EMBED &&
                  sub === STAMP_TRUST
                ) {
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
                  if (arcSite === SITE_TROME)
                    return (
                      <StoryContentsChildLinkList items={items} title={title} />
                    )
                  return <StoryContentsChildLinkList items={items} />
                }

                if (
                  type === ELEMENT_CUSTOM_EMBED &&
                  sub === STORY_CUSTOMBLOCK
                ) {
                  const {
                    config: {
                      customBlockContent = '',
                      customBlockType = '',
                    } = {},
                  } = customEmbed || {}
                  return (
                    <StoryContentsChildCustomBlock
                      content={customBlockContent}
                      type={customBlockType}
                      isAmp={false}
                    />
                  )
                }

                if (type === ELEMENT_RAW_HTML) {
                  if (content.includes('<mxm')) {
                    return (
                      <StoryContentChildRawHTML
                        content={processedAds(content, 'lite', arcSite, secc)}
                        arcSite={arcSite}
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
                        <StoryContentChildRawHTML
                          content={content}
                          arcSite={arcSite}
                        />
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

                  return (
                    <StoryContentChildRawHTML
                      content={content}
                      output="lite"
                      arcSite={arcSite}
                    />
                  )
                }
                if (type === ELEMENT_CUSTOM_EMBED) {
                  if (sub === 'image_link') {
                    const { config: customEmbedConfig } = customEmbed || {}
                    return (
                      <StoryContentsChildLinkedImage {...customEmbedConfig} />
                    )
                  }
                  if (sub === 'parallax_blocks' && subtype === PARALLAX) {
                    const { config: customEmbedConfig } = customEmbed || {}
                    return (
                      <StoryContentsChildParallaxElements
                        config={customEmbedConfig}
                        id={_id}
                      />
                    )
                  }
                }
                return ''
              }}
            />
          )}
        </div>
        <div
          className={`${classes.social} ${shareAlign === 'left' ? 'f' : ''}`}>
          <div className="st-social__share">
            <ShareButtons
              activeCopyLink={copyLink}
              activeLinkedin={
                arcSite === 'elcomercio' || arcSite === 'elcomerciomag' || arcSite === 'trome'
              }
              hideShareLinks={shareLinks}
            />
          </div>
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
        {(() => {
          if (!isStoryV2StandarStyle) return null

          const trustElement = storyContent.filter(
            ({ type, subtype: sub }) =>
              type === ELEMENT_CUSTOM_EMBED && sub === STAMP_TRUST
          )[0]
          return trustElement ? (
            <StoryContentsChildStampTrust
              url={trustElement?.embed?.config?.url}
              urlImg={trustElement?.embed?.config?.url_img}
              isAmp={false}
              siteUrl={siteUrl}
            />
          ) : null
        })()}
        {(() => {
          if (!isStoryV2StandarStyle) return null

          const correctionElement = storyContent.filter(
            ({ type, subtype: sub }) =>
              type === ELEMENT_CUSTOM_EMBED && sub === STORY_CORRECTION
          )[0]
          return correctionElement ? (
            <StoryContentsChildCorrection
              content={correctionElement?.embed?.config?.content}
              isAmp={false}
              type={
                correctionElement?.embed?.config?.type_event || 'correction'
              }
            />
          ) : null
        })()}
      </div>
      <div id="bottom-content-observed" />
      {arcSite === SITE_ELCOMERCIO && contentElementsHtml.includes('mxm') && (
        <script
          src="https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7"
          defer
        />
      )}
      {arcSite === SITE_ELCOMERCIOMAG && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: iframeScriptCounter(),
          }}
        />
      )}
      {subtype === PARALLAX && (
        // https://web.dev/lazy-loading-images/#images-css
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html:
              '"use strict";document.addEventListener("DOMContentLoaded",function(){var e,n=[].slice.call(document.querySelectorAll(".lazy-background"));"IntersectionObserver"in window&&(e=new IntersectionObserver(function(n,t){n.forEach(function(n){n.isIntersecting&&(n.target.classList.add("visible"),e.unobserve(n.target))})},{rootMargin:"0px 0px 256px 0px"}),n.forEach(function(n){e.observe(n)}))});',
          }}
        />
      )}
      {subtype === PARALLAX && isGsapRequired && (
        <>
          <script
            defer
            src="https://cdna.elcomercio.pe/resources/assets/js/gsap.min.js"
          />
          <script
            defer
            src="https://cdna.elcomercio.pe/resources/assets/js/ScrollTrigger.min.js"
          />
        </>
      )}
    </>
  )
}

StoryContentsLite.label = 'Artículo - contenidos'
StoryContentsLite.static = true

StoryContentsLite.propTypes = {
  customFields,
}

export default StoryContentsLite
