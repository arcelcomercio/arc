// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
} from '@arc-core-components/feature_article-body'

import { replaceTags, storyTagsBbc } from '../../../utilities/tags'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
  SITE_ELBOCON,
} from '../../../utilities/constants/sitenames'
import {
  SPECIAL,
  SPECIAL_BASIC,
  BIG_IMAGE,
  STORY_CORRECTION,
  STAMP_TRUST,
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
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
  ELEMENT_BLOCKQUOTE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LINK_LIST,
  ELEMENT_LIST,
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
import StoryContentsChildAuthorTrust from './_children/author-trust'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentsChildIcon from './_children/icon-list'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildVideoNativo from './_children/video-nativo'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildLinkList from './_children/link-list'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import Ads from '../../../global-components/ads'
import LiteYoutube from '../../../global-components/lite-youtube'

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
        isDfp = false,
        siteUrl,
      },
      isAdmin,
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
      multimediaLandscapeMD,
      multimediaStorySmall,
      multimediaLarge,
      multimediaLazyDefault,
      tags,
      contentPosicionPublicidad,
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
      date,
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
            ? promoItems && <StoryContentsChildImpresa data={promoItems} />
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
                    publicidad = false,
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
                        {publicidad && isDfp && (
                          <Ads
                            adElement={nameAds}
                            isDesktop={false}
                            isMobile
                            isDfp={isDfp}
                          />
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
                    return (
                      <StoryContentsChildLinkList
                        items={items}
                        multimediaLazyDefault={multimediaLazyDefault}
                        arcSite={arcSite}
                        isAdmin={isAdmin}
                      />
                    )
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
                      let contentHtml = content
                      contentHtml = contentHtml
                        .replace('</script>:', '</script>')
                        .replace(':<script', '<script')
                        .replace(
                          /:icon:/gm,
                          '<div  class="more-compartir"></div>'
                        )
                        .replace(
                          /:fijado:/gm,
                          '<svg xmlns="http://www.w3.org/2000/svg" class="icon-compartir" width="20" height="20" viewBox="0 0 475 475"><path d="M380 247c-15-19-32-28-51-28V73c10 0 19-4 26-11 7-7 11-16 11-26 0-10-4-18-11-26C347 4 339 0 329 0H146c-10 0-18 4-26 11-7 7-11 16-11 26 0 10 4 19 11 26 7 7 16 11 26 11v146c-19 0-36 9-51 28-15 19-22 40-22 63 0 5 2 9 5 13 4 4 8 5 13 5h115l22 139c1 5 4 8 9 8h0c2 0 4-1 6-2 2-2 3-4 3-6l15-138h123c5 0 9-2 13-5 4-4 5-8 5-13C402 287 395 266 380 247zM210 210c0 3-1 5-3 7-2 2-4 3-7 3-3 0-5-1-7-3-2-2-3-4-3-7V82c0-3 1-5 3-7 2-2 4-3 7-3 3 0 5 1 7 3 2 2 3 4 3 7V210z" data-original="#000000"/></svg>'
                        )
                      return <StoryContentChildRawHTML content={contentHtml} />
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
          {prerollDefault[1] && <div id="rpm" data-roll={prerollDefault[1]} />}
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
          <>
            <script
              src="https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7"
              defer
            />
          </>
        )}
        {arcSite === SITE_ELBOCON && isJwVideo === true && (
          <script src="https://cdn.jwplayer.com/players/IxomITB6-BHYH7DVh.js?search=__CONTEXTUAL__"></script>
        )}
      </>
    )
  }
}

StoryContents.label = 'Artículo - contenidos'
StoryContents.static = true

export default StoryContents
