import ArcStoryContent, {
  Oembed,
} from '@arc-core-components/feature_article-body'
import { AnyObject } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'
import { ContentElement, Tag } from 'types/story'

import Image from '../../../../global-components/image'
import ShareButtons from '../../../../global-components/lite/share'
import LiteYoutube from '../../../../global-components/lite-youtube'
import StoryContentsChildTable from '../../../../global-components/story-table'
import { getAssetsPath } from '../../../../utilities/assets'
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
} from '../../../../utilities/constants/element-types'
import {
  OPTA_CSS_LINK,
  OPTA_JS_LINK,
} from '../../../../utilities/constants/opta'
import {
  SITE_DEPOR,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
} from '../../../../utilities/constants/sitenames'
import {
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
  PARALLAX,
  STAMP_TRUST,
  STORY_CORRECTION,
  STORY_CUSTOMBLOCK,
  VIDEO_JWPLAYER,
  VIDEO_JWPLAYER_MATCHING,
} from '../../../../utilities/constants/subtypes'
import { getDateSeo } from '../../../../utilities/date-time/dates'
import { contentWithAds } from '../../../../utilities/story/content'
import { processedAds } from '../../../../utilities/story/helpers'
import { replaceTags, storyTagsBbc } from '../../../../utilities/tags'
import StoryContentsChildAuthorLite from '../../contents/_children/author-lite'
import StoryContentsChildAuthorTrustLite from '../../contents/_children/author-trust-lite'
import StoryContentsChildBlockQuote from '../../contents/_children/blockquote'
import StoryContentsChildCorrection from '../../contents/_children/correction'
import StoryContentsChildCustomBlock from '../../contents/_children/custom-block'
import StoryContentsChildInterstitialLink from '../../contents/_children/interstitial-link'
import StoryContentsChildJwplayerRecommender from '../../contents/_children/jwplayer-recommender'
import StoryContentsChildLinkList from '../../contents/_children/link-list'
import StoryContentsChildLinkedImage from '../../contents/_children/linked-image'
import StoryContentsChildParallaxElements from '../../contents/_children/parallax-elements'
import StoryContentsChildStampTrust from '../../contents/_children/stamp-trust'
import iframeScriptCounter from '../../contents/_dependencies/counter-mag'
import StoryHeaderChildGallery from '../gallery/_children/gallery-lite'
import StoryContentsChildImage from '../multimedia/_children/image'
import StoryContentsChildVideo from '../multimedia/_children/video'
import StoryContentsChildVideoNativo from '../multimedia/_children/video-nativo'
import StoryContentChildRawHTML from './_children/rawHtml'

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

interface FeaturesProps {
  arcSite: ArcSite
  contextPath: string
  requestUri: string
  displayDate?: Date
  publishDate?: Date
  createdDate?: string
  authorImage: string
  authorLink: string
  author: string
  role: string
  locality: string
  primarySection: string
  authorEmail: string
  subtype: string
  isPremium: boolean
  multimediaLarge: string
  multimediaLandscapeMD: string
  multimediaLandscapeS: string
  tags: Tag[]
  contentElements: ContentElement[]
  canonicalUrl: string
  authorsList: AnyObject[]
  shareAlign: string
  copyLink: boolean
  liteAdsEvery: number
  index: number
}

const StoryChildrenContentsLite: FC<FeaturesProps> = (props) => {
  const {
    siteProperties: {
      ids: { opta },
      siteUrl,
      jwplayers,
      jwplayersMatching,
    },
  } = useAppContext()

  const {
    arcSite = 'elcomercio',
    contextPath,
    requestUri,
    shareAlign = 'right',
    copyLink = false,
    liteAdsEvery = 2,
    displayDate = new Date(),
    publishDate: updateDate = new Date(),
    createdDate,
    authorImage,
    authorLink,
    author,
    role: authorRole,
    locality,
    primarySection,
    authorEmail,
    subtype,
    isPremium,
    tags,
    contentElements,
    canonicalUrl,
    authorsList = [],
    index,
  } = props
  const displayDateStory = getDateSeo(displayDate || createdDate)
  const publishDateStory = getDateSeo(updateDate)
  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''
  const seccArary = canonicalUrl?.split('/')
  const secc = seccArary[1] && seccArary[1].replace(/-/gm, '')
  const storyContent = contentWithAds({
    contentElements,
    adsEvery: liteAdsEvery,
  })
  const isPreview = /^\/preview\//.test(requestUri)

  let isGsapRequired = false
  if (subtype === PARALLAX) {
    const elementsWithScrollGallery = contentElements.filter(
      ({ embed: { config: { block = '' } = {} } = {} }) =>
        block === 'scroll_gallery'
    )
    isGsapRequired = elementsWithScrollGallery.length > 0
  }

  return (
    <>
      <div className={classes.news}>
        {subtype !== GALLERY_VERTICAL && (
          <>
            {SITE_ELCOMERCIO === arcSite ? (
              <StoryContentsChildAuthorTrustLite
                author={author}
                authorLink={authorLink}
                authorImage={authorImage}
                authorRole={authorRole}
                displayDate={new Date(displayDateStory)}
                publishDate={new Date(publishDateStory)}
                locality={locality}
                authorEmail={authorEmail}
                primarySection={primarySection}
                authorsList={authorsList}
              />
            ) : (
              <StoryContentsChildAuthorLite
                author={author}
                authorLink={authorLink}
                authorEmail={authorEmail}
                displayDate={new Date(displayDateStory)}
                publishDate={new Date(publishDateStory)}
                arcSite={arcSite}
              />
            )}
          </>
        )}
        {arcSite !== SITE_ELCOMERCIOMAG &&
          arcSite !== SITE_DEPOR &&
          subtype !== MINUTO_MINUTO &&
          subtype !== GALLERY_VERTICAL && (
            <div className={`content_gpt_caja${index + 1}`}>
              <div
                id={`gpt_caja_${index + 1}`}
                data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja3`}
                data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                data-bloque="3"
                data-prebid-enabled
              />
            </div>
          )}
        <div
          className={`${classes.content} ${
            isPremium && !isPreview
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
          {storyContent && (
            <ArcStoryContent
              data={storyContent}
              elementClasses={classes}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderElement={(element: any) => {
                const {
                  _id: id,
                  type,
                  subtype: sub,
                  embed: customEmbed,
                  raw_oembed: rawOembed,
                  content,
                  level,
                  alignment = '',
                  headlines: { basic: captionVideo = '' } = {},
                  nameAds,
                  description,
                  url = '',
                  items = [],
                  list_type: listType = 'unordered',
                  caption,
                  showCaption,
                  duration,
                  streams,
                  promo_items: { basic: { url: imageUrl = '' } = {} } = {},
                } = element
                if (type === ELEMENT_IMAGE) {
                  return (
                    <StoryContentsChildImage
                      customHeight={0}
                      customWidth={620}
                      url={url}
                      multimediaLandscapeMD={url}
                      multimediaLarge={url}
                      multimediaLandscapeS={url}
                      caption={caption}
                      showCaption={showCaption}
                    />
                  )
                }
                if (type === ELEMENT_VIDEO) {
                  const dataVideo = updateDate && updateDate?.split('T')[0]
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
                          content={element.embed_html || content}
                          classImage={classes.newsImage}
                          description={captionVideo}
                          contentElemtent=""
                          primarySection={primarySection}
                          duration={duration}
                          imageUrl={imageUrl}
                          streams={streams}
                          id={id}
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
                          description: descriptionTxt = '',
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
                }
                if (type === ELEMENT_GALLERY) {
                  const sectionUrl = canonicalUrl?.split('/') || '/'
                  const seccioPublicidad = sectionUrl[1]?.replace(/-/gm, '')
                  return (
                    <StoryHeaderChildGallery
                      promoItems={element}
                      seccioPublicidad={seccioPublicidad}
                      arcSite={arcSite}
                    />
                  )
                }
                if (type === ELEMENT_TEXT) {
                  const alignmentClass = alignment
                    ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                    : classes.textClasses
                  return (
                    <>
                      {arcSite === SITE_DEPOR && (
                        <p
                          itemProp="description"
                          className={alignmentClass}
                          dangerouslySetInnerHTML={{
                            __html: replaceTags(content),
                          }}
                        />
                      )}
                      {nameAds === 'caja3' &&
                        (arcSite === SITE_ELCOMERCIOMAG ||
                          arcSite === SITE_DEPOR) &&
                        subtype !== MINUTO_MINUTO &&
                        subtype !== GALLERY_VERTICAL && (
                          <div className={`content_gpt_caja3_${index + 1}`}>
                            <div
                              id={`gpt_caja3_${index + 1}`}
                              data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja3`}
                              data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                              data-bloque="3"
                              data-prebid-enabled
                            />
                          </div>
                        )}
                      {nameAds === 'inline' && (
                        <div className={`content_gpt_inline_${index + 1}`}>
                          <div
                            id={`gpt_inline_${index + 1}`}
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/inline`}
                            data-ads-dimensions="[[1,1]]"
                            data-bloque="3"
                            data-ads-dimensions-m="[[1,1]]"
                          />
                        </div>
                      )}
                      {nameAds === 'caja4' && subtype !== GALLERY_VERTICAL && (
                        <div className={`content_gpt_caja4_${index + 1}`}>
                          <div
                            id={`gpt_caja4_${index + 1}`}
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja4`}
                            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                            data-bloque="3"
                            data-prebid-enabled
                          />
                        </div>
                      )}
                      {nameAds === 'caja5' && subtype !== GALLERY_VERTICAL && (
                        <div className={`content_gpt_caja5_${index + 1}`}>
                          <div
                            id={`gpt_caja5_${index + 1}`}
                            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja5`}
                            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                            data-bloque="4"
                            data-prebid-enabled
                          />
                        </div>
                      )}
                      {arcSite !== SITE_DEPOR && (
                        <p
                          itemProp="description"
                          className={alignmentClass}
                          dangerouslySetInnerHTML={{
                            __html: replaceTags(content),
                          }}
                        />
                      )}
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
                        {items.map(({ content: contentHtml = '' } = {}) => (
                          <li
                            dangerouslySetInnerHTML={{
                              __html: contentHtml
                                ? contentHtml.replace(
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

                if (type === ELEMENT_CUSTOM_EMBED && sub === STORY_CORRECTION) {
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
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      contentVideo = content.replace(
                        /peru21.pe\/upload/gi,
                        'img.peru21.pe/upload'
                      )
                    }
                    return (
                      <>
                        <StoryContentsChildVideo
                          contentElemtent=""
                          primarySection={primarySection}
                          description={description}
                          content={content}
                          duration={duration}
                          classImage={classes.newsImage}
                          imageUrl={imageUrl}
                          streams={streams}
                          id={id}
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
                    const {
                      config: { link, title, alt, photo },
                    } = customEmbed || {}
                    return (
                      <StoryContentsChildLinkedImage
                        link={link}
                        title={title}
                        alt={alt}
                        photo={photo}
                      />
                    )
                  }
                  if (sub === 'parallax_blocks' && subtype === PARALLAX) {
                    const { config: customEmbedConfig } = customEmbed || {}
                    return (
                      <StoryContentsChildParallaxElements
                        config={customEmbedConfig}
                        id={id}
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
                arcSite === 'elcomercio' || arcSite === 'elcomerciomag'
              }
            />
          </div>
        </div>
        {storyTagsBbc(tags) && (
          <div className={classes.bbcHead}>
            <a
              itemProp="url"
              href={URL_BBC}
              rel="nofollow noopener noreferrer"
              target="_blank">
              <img alt="BBC" src={imgBbc} data-src={imgBbc} />
            </a>
          </div>
        )}
      </div>
      <div id="bottom-content-observed" />

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

StoryChildrenContentsLite.label = 'Artículo - contenidos'

export default StoryChildrenContentsLite
