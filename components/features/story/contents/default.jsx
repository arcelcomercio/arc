// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  Text,
} from '@arc-core-components/feature_article-body'

import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../utilities/constants'
import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
} from '../../../utilities/constants/sitenames'
import {
  SPECIAL,
  SPECIAL_BASIC,
  BIG_IMAGE,
} from '../../../utilities/constants/subtypes'
import { OPTA_CSS_LINK, OPTA_JS_LINK } from '../../../utilities/constants/opta'
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
  ELEMENT_STORY,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LINK_LIST,
} from '../../../utilities/constants/element-types'
import StoryData from '../../../utilities/story-data'

import StoryContentsChildVideo from './_children/video'
import StoryContentsChildImage from './_children/image'
import StoryContentsChildLinkedImage from './_children/linked-image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentsChildRelatedInternal from './_children/related-internal'
import StoryContentsChildIcon from './_children/icon-list'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildVideoNativo from './_children/video-nativo'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildLinkList from './_children/link-list'
import Ads from '../../../global-components/ads'

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
class StoryContents extends PureComponent {
  render() {
    const {
      globalContent,
      arcSite,
      contextPath,
      deployment,
      requestUri,
      siteProperties: {
        ids: { opta },
      },
      siteProperties: { isDfp = false },
      isAdmin,
    } = this.props
    const { related_content: { basic: relatedContent } = {} } =
      globalContent || {}

    const {
      publishDate: date,
      promoItems,
      displayDate: updatedDate,
      createdDate,
      authorImage,
      authorLink,
      author,
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
      contentPosicionPublicidad,
      contentElementsHtml,
    } = new StoryData({
      data: globalContent,
      contextPath,
      deployment,
      arcSite,
    })

    const params = {
      authorImage,
      author,
      authorLink,
      updatedDate: getDateSeo(updatedDate || createdDate),
      date,
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
    }
    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

    const { basic_gallery: basicGallery = {} } = promoItems
    let relatedIds = []

    return (
      <>
        <div className={classes.news}>
          {isPremium &&
            SITE_ELCOMERCIO === arcSite &&
            requestUri.includes('/archivo-elcomercio/') &&
            !basicGallery && (
              <div className={classes.premiumWrapper}>
                <p className={classes.premiumText}>Suscriptor Digital</p>
              </div>
            )}
          {primarySectionLink === '/impresa/' ||
          primarySectionLink === '/malcriadas/' ||
          storyTagsBbc(tags, 'portada-trome')
            ? promoItems && <StoryContentsChildImpresa data={promoItems} />
            : promoItems &&
              subtype !== BIG_IMAGE &&
              subtype !== SPECIAL_BASIC &&
              subtype !== SPECIAL && (
                <StoryContentsChildMultimedia data={params} />
              )}

          <StoryContentsChildAuthor {...params} />

          <Ads
            adElement={`${isDfp === true ? 'caja3' : 'movil2'}`}
            isDesktop={false}
            isMobile
            isDfp={isDfp}
          />
          <div
            className={`${classes.content} ${isPremium &&
              'story-content__nota-premium paywall no_copy'}`}
            style={isPremium ? { display: 'none' } : {}}
            id="contenedor">
            <StoryContentsChildIcon />
            {!isDfp && (
              <>
                <div id="ads_d_inline" />
                <div id="ads_m_movil_video" />
                <div id="ads_m_movil3" />
              </>
            )}
            {contentPosicionPublicidad && (
              <ArcStoryContent
                data={contentPosicionPublicidad}
                elementClasses={classes}
                renderElement={element => {
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
                    publicidad = false,
                    nameAds,
                    url = '',
                    items = [],
                  } = element
                  if (type === ELEMENT_IMAGE) {
                    const presets = 'landscapeMd:314,storySmall:482,large:980'

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
                            contentElemtent="true"
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
                  if (type === ELEMENT_LINK_LIST) {
                    return (
                      <StoryContentsChildLinkList
                        items={items}
                        multimediaLazyDefault={multimediaLazyDefault}
                        arcSite={arcSite}
                        isAdmin={isAdmin}
                      />
                    )
                  }
                  if (type === ELEMENT_OEMBED) {
                    return (
                      <Oembed
                        rawOembed={rawOembed}
                        subtype={sub}
                        className={classes.newsEmbed}
                      />
                    )
                  }

                  if (type === ELEMENT_STORY) {
                    relatedIds.push(_id)
                  }

                  if (type !== ELEMENT_STORY && relatedIds.length > 0) {
                    const relateIdsParam = relatedIds
                    relatedIds = []
                    return (
                      <StoryContentsChildRelatedInternal
                        stories={relatedContent}
                        ids={relateIdsParam}
                        imageDefault={multimediaLazyDefault}
                      />
                    )
                  }

                  if (type === ELEMENT_HEADER && level === 1) {
                    return (
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    )
                  }

                  if (type === ELEMENT_TEXT) {
                    const alignmentClass = alignment
                      ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                      : classes.textClasses
                    return (
                      <>
                        {publicidad && isDfp && (
                          <Ads
                            adElement={nameAds}
                            isDesktop={false}
                            isMobile
                            isDfp={isDfp}
                          />
                        )}
                        <Text
                          content={replaceTags(content)}
                          className={alignmentClass}
                        />
                      </>
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
                                setTimeout(function(){
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
                                }, 0)
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
                      content.includes('twitter-tweet') ||
                      content.includes('instagram-media')
                    ) {
                      return (
                        <>
                          <div
                            data-type={
                              content.includes('twitter-tweet')
                                ? 'twitter'
                                : 'instagram'
                            }
                            className={classes.newsEmbed}
                            dangerouslySetInnerHTML={{
                              __html: content.replace(
                                /(<script.*?>).*?(<\/script>)/,
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
                    if (subtype === 'custom_embed') {
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
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <img alt="BBC" src={imgBbc} data-src={imgBbc} />
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
      </>
    )
  }
}

StoryContents.label = 'Artículo - contenidos'
StoryContents.static = true

export default StoryContents
