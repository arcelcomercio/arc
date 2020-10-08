import React from 'react'
import { useFusionContext } from 'fusion:context'
import ArcStoryContent, {
  Oembed,
} from '@arc-core-components/feature_article-body'

import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
} from '../../../utilities/constants/sitenames'
/* import {
  SPECIAL,
  SPECIAL_BASIC,
  BIG_IMAGE,
} from '../../../utilities/constants/subtypes' */
import { OPTA_CSS_LINK, OPTA_JS_LINK } from '../../../utilities/constants/opta'
// import ShareButtons from '../../../global-components/lite/share'
import {
  ELEMENT_HEADER,
  ELEMENT_IMAGE,
  ELEMENT_QUOTE,
  ELEMENT_CUSTOM_EMBED,
  ELEMENT_RAW_HTML,
  ELEMENT_TABLE,
  ELEMENT_TEXT,
  ELEMENT_VIDEO,
  ELEMENT_GALLERY,
  ELEMENT_OEMBED,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LIST,
} from '../../../utilities/constants/element-types'
import StoryData from '../../../utilities/story-data'

import StoryContentsChildVideo from '../multimedia/_children/video'
import StoryContentsChildImage from '../multimedia/_children/image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildLinkedImage from './_children/linked-image'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthorLite from './_children/author-lite'
import StoryContentsChildAuthorTrustLite from './_children/author-trust-lite'
import StoryContentsChildVideoNativo from '../multimedia/_children/video-nativo'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import {
  STORY_CORRECTION,
  STORY_CUSTOMBLOCK,
  STAMP_TRUST,
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
} from '../../../utilities/constants/subtypes'
import StoryContentsChildCustomBlock from './_children/custom-block'
import LiteYoutube from '../../../global-components/lite-youtube'

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

const StoryContentsLite = () => {
  const {
    globalContent,
    arcSite,
    contextPath,
    deployment,
    siteProperties: {
      ids: { opta },
      isDfp = false,
      siteUrl,
    },
  } = useFusionContext()

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
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    tags,
    contentPosicionPublicidadLite,
    canonicalUrl,
    prerollDefault,
    contentElementsHtml,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    roleSecond: authorRoleSecond,
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
    date: getDateSeo(date || createdDate),
    locality,
    primarySectionLink,
    authorEmail,
    primarySection,
    subtype,
    ...promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    primaryImage: true,
    authorImageSecond,
    authorLinkSecond,
    authorSecond,
    authorEmailSecond,
    authorRoleSecond,
  }
  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''
  const seccArary = canonicalUrl.split('/')
  const secc = seccArary[1].replace(/-/gm, '')

  const publicidadHtml = (contentHtml, espacio, text) => {
    const html = `<div id=${`gpt_${espacio}`} className="f just-center" data-ads-name=${`/28253241/${arcSite}/web/post/${secc}/${espacio}`}
                  data-ads-dimensions="[[300,250]]" data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>`
    return contentHtml.replace(text, html)
  }

  return (
    <>
      <div className={classes.news}>
        {subtype !== GALLERY_VERTICAL && (
          <>
            {SITE_ELCOMERCIO === arcSite ? (
              <StoryContentsChildAuthorTrustLite {...params} />
            ) : (
              <StoryContentsChildAuthorLite {...params} />
            )}
          </>
        )}
        {subtype !== MINUTO_MINUTO && (
          <div
            id="gpt_caja3"
            data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja3`}
            data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
            data-prebid-enabled></div>
        )}
        <div
          className={`${classes.content} ${isPremium &&
            'story-content__nota-premium paywall no_copy'}`}
          style={isPremium ? { display: 'none' } : {}}
          id="contenedor">
          {!isDfp && (
            <>
              <div id="ads_d_inline" />
              <div id="ads_m_movil_video" />
              <div id="ads_m_movil3" />
            </>
          )}
          {contentPosicionPublicidadLite && (
            <ArcStoryContent
              data={contentPosicionPublicidadLite}
              elementClasses={classes}
              renderElement={element => {
                const {
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
                } = element
                if (type === ELEMENT_IMAGE) {
                  const presets = 'landscape_md:314,story_small:482,large:640'

                  return (
                    <StoryContentsChildImage
                      {...element}
                      multimediaLazyDefault={multimediaLazyDefault}
                      presets={presets}
                    />
                  )
                }
                if (type === ELEMENT_VIDEO) {
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
                      {nameAds === 'inline' && (
                        <div
                          id="gpt_inline"
                          data-ads-name={`/28253241/${arcSite}/web/post/${secc}/inline`}
                          data-ads-dimensions="[[1,1]]"
                          data-ads-dimensions-m="[[1,1]]"></div>
                      )}
                      {nameAds === 'caja4' && (
                        <div
                          id="gpt_caja4"
                          data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja4`}
                          data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                          data-prebid-enabled></div>
                      )}
                      {nameAds === 'caja5' && (
                        <div
                          id="gpt_caja5"
                          data-ads-name={`/28253241/${arcSite}/web/post/${secc}/caja5`}
                          data-ads-dimensions-m="[[300, 100], [320, 50], [300, 50], [320, 100], [300, 250]]"
                          data-prebid-enabled></div>
                      )}
                      <p
                        itemProp="description"
                        className={alignmentClass}
                        dangerouslySetInnerHTML={{
                          __html: replaceTags(content),
                        }}></p>
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
                        {items.map(item => (
                          <li
                            dangerouslySetInnerHTML={{
                              __html: item.content
                                ? item.content.replace(
                                    /<a/g,
                                    '<a itemprop="url"'
                                  )
                                : '',
                            }}></li>
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
                    /twitter-(?:tweet|timeline)|instagram-media/.test(content)
                  ) {
                    return (
                      <>
                        <div
                          data-type={
                            /twitter-(?:tweet|timeline)/.test(content)
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
                  let contentHtml = content

                  if (content.includes('<mxm')) {
                    contentHtml = publicidadHtml(
                      contentHtml,
                      'caja2',
                      '<div id="gpt_caja2" class="flex justify-center"></div>'
                    )
                    contentHtml = publicidadHtml(
                      contentHtml,
                      'caja3',
                      '<div id="gpt_caja3" class="flex justify-center"></div>'
                    )
                    contentHtml = publicidadHtml(
                      contentHtml,
                      'caja4',
                      '<div id="gpt_caja4" class="flex justify-center"></div>'
                    )
                    contentHtml = publicidadHtml(
                      contentHtml,
                      'caja5',
                      '<div id="gpt_caja5" class="flex justify-center"></div>'
                    )
                  }
                  return <StoryContentChildRawHTML content={contentHtml} />
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
        {prerollDefault[1] && <div id="rpm" data-roll={prerollDefault[1]} />}
        {/* <div className={classes.social}>
          <div className="st-social__share">
            <ShareButtons></ShareButtons>
          </div>
        </div> */}
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
      {arcSite === SITE_ELCOMERCIO && contentElementsHtml.includes('mxm') && (
        <script
          src="https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7"
          defer></script>
      )}
    </>
  )
}

StoryContentsLite.label = 'Artículo - contenidos'
StoryContentsLite.static = true

export default StoryContentsLite
