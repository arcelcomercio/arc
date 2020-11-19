import StoryContent, {
  AmpOembed,
  RawHtml,
  Text,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import AmpImage from '@arc-core-components/element_image'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ElePrincipal from './_children/amp-ele-principal'
import StoryContentChildVideo from './_children/amp-video'
import StoryContentChildVideoJwplayer from './_children/amp-video-jwplayer'
import StoryContentChildTable from '../../../global-components/story-table'
import StoryContentChildBlockQuote from './_children/blockquote'
import StoryGoogleNews from '../../../global-components/google-news'
import StoryContentChildTags from './_children/tags'
import StoryContentsChildInterstitialLink from './_children/interstitial-link'
import StoryContentsChildLinkList from './_children/link-list'
import StoryContentsChildCorrection from './_children/correction'
import StoryContentsChildStampTrust from './_children/stamp-trust'
import StoryData from '../../../utilities/story-data'
import { getDateSeo } from '../../../utilities/date-time/dates'
import { formatHtmlToText } from '../../../utilities/parse/strings'
import {
  replaceTags,
  cleanLegacyAnchor,
  storyTagsBbc,
} from '../../../utilities/tags'

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
} from '../../../utilities/constants/element-types'

import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
  SITE_ELBOCON,
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIOMAG,
} from '../../../utilities/constants/sitenames'
import { getAssetsPath } from '../../../utilities/assets'
import {
  formatDateTime,
  publicidadAmp,
  publicidadAmpAd,
  ampHtml,
} from '../../../utilities/story/helpers-amp'
import { createResizedParams } from '../../../utilities/resizer/resizer'
import {
  STORY_CORRECTION,
  STAMP_TRUST,
  GALLERY_VERTICAL,
  MINUTO_MINUTO,
  VIDEO_JWPLAYER,
} from '../../../utilities/constants/subtypes'

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
  // TODO: Revisar video y imgTag
  relatedTitle:
    'related-content__title font-bold uppercase pt-20 pb-20 secondary-font',
  adsAmp: 'text-center ad-amp-movil',
  bbcHead: 'bbc-head',
  rawHtmlClasses: 'story-content__embed',
}

@Consumer
class StoryContentAmp extends PureComponent {
  render() {
    const {
      contextPath,
      arcSite,
      siteProperties: { siteUrl, adsAmp },
      globalContent: data = {},
    } = this.props
    const { source } = data
    const {
      contentPosicionPublicidadAmp,
      promoItems,
      tags,
      authorLink,
      displayDate,
      publishDate: updateDate,
      primarySection,
      primarySectionLink,
      author,
      multimediaLazyDefault,
      subtype,
      promoItemJwplayer = {},
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
    })
    const namePublicidad = arcSite !== 'peru21g21' ? arcSite : SITE_PERU21
    const dataSlot = `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja2`
    const isComercio = arcSite === SITE_ELCOMERCIO
    const isMag = arcSite === SITE_ELCOMERCIOMAG
    const isLegacy =
      source.source_id &&
      (arcSite === SITE_ELBOCON || arcSite === SITE_DIARIOCORREO)

    const imgTag = 'amp-img'
    const width = '300'
    const height = '250'
    const parametersCaja2 = {
      // movil2 caja2
      dataSlot,
      width,
      height,
      primarySectionLink,
      arcSite,
      movil1: true,
    }
    const parametersCaja3 = {
      // movil4 caja3 caja3
      dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja3`,
      width,
      height,
      primarySectionLink,
      arcSite,
      movil1: true,
      size: '300x250,320x100,320x50,300x100,300x50',
    }
    const parametersCaja4 = {
      // movil5 caja5 caja4
      dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja4`,
      width,
      height,
      primarySectionLink,
      arcSite,
      movil1: true,
      size: '300x250,320x100,320x50,300x100,300x50',
    }
    const parametersCaja5 = {
      // movil5 caja5 caja4
      dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja5`,
      width,
      height,
      primarySectionLink,
      arcSite,
      movil1: true,
      size: '300x250,320x100,320x50,300x100,300x50',
    }
    const parametersInline = {
      // movil3 caja3 inline
      dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/inline`,
      width,
      height,
      primarySectionLink,
      arcSite,
      movil1: false,
    }

    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

    const processedAdsAmp = content => {
      const res = content.split('<div class="live-event2-comment">')
      let entryHtml = ''

      res.forEach((entry, i) => {
        let publicidad = ''
        const divContent = i === 0 ? '' : '<div class="live-event2-comment">'
        if (i === 3) {
          publicidad = publicidadAmp(parametersCaja2)
        }
        if (i === 7) {
          publicidad = publicidadAmp(parametersCaja3)
        }
        if (i === 11) {
          publicidad = publicidadAmp(parametersCaja3)
        }
        entryHtml = `${entryHtml} ${divContent} ${entry} ${publicidad &&
          `<div class='text-center ad-amp-movil'>${publicidad.__html} </div>`}`
      })
      return entryHtml
    }

    return (
      <>
        <div className={classes.content}>
          {promoItemJwplayer.key ? (
            <StoryContentChildVideoJwplayer
              data={promoItemJwplayer}></StoryContentChildVideoJwplayer>
          ) : (
            <>{promoItems && <ElePrincipal data={promoItems} {...siteUrl} />}</>
          )}
          {!isMag && (
            <div
              className={classes.adsAmp}
              dangerouslySetInnerHTML={publicidadAmp(parametersCaja2)}
            />
          )}

          {subtype !== GALLERY_VERTICAL && (
            <div
              className={isMag ? classes.authorTimeContainer : 'pt-15 pb-15'}>
              <p className={classes.author}>
                {isMag ? (
                  <>
                    Por{' '}
                    <a href={authorLink} className="font-bold">
                      {author}
                    </a>{' '}
                    en{' '}
                    <a href={primarySectionLink} className="font-bold">
                      {primarySection}
                    </a>
                  </>
                ) : (
                  <a href={authorLink}>{author}</a>
                )}
              </p>
              <time
                dateTime={getDateSeo(displayDate)}
                className={classes.datetime}>
                {isMag
                  ? `${formatDateTime(displayDate)} ${
                      displayDate !== updateDate
                        ? `| Actualizado ${formatDateTime(updateDate)}`
                        : ''
                    }`
                  : `Actualizado el ${formatDateTime(displayDate)}`}
              </time>
            </div>
          )}
          {contentPosicionPublicidadAmp && (
            <StoryContent
              data={contentPosicionPublicidadAmp}
              elementClasses={classes}
              renderElement={element => {
                const {
                  type,
                  subtype: sub,
                  embed: customEmbed,
                  raw_oembed: rawOembed,
                  content_elements: innerContentElements,
                  content,
                  level,
                  publicidadInline = false,
                  publicidadCaja2 = false,
                  publicidadCaja3 = false,
                  publicidadCaja4 = false,
                  url = '',
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
                          }></RawHtml>
                      </h2>
                    )
                  if (isLegacy)
                    return (
                      <RawHtml content={cleanLegacyAnchor(content)}></RawHtml>
                    )
                }
                if (type === ELEMENT_QUOTE) {
                  return <StoryContentChildBlockQuote data={element} />
                }
                if (type === ELEMENT_TABLE) {
                  return <StoryContentChildTable data={element} type={type} />
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
                      {isMag &&
                        publicidadCaja2 &&
                        subtype !== MINUTO_MINUTO &&
                        subtype !== GALLERY_VERTICAL && (
                          <div
                            className={classes.adsAmp}
                            dangerouslySetInnerHTML={publicidadAmp(
                              parametersCaja2
                            )}
                          />
                        )}
                      {!isMag && publicidadInline && (
                        <div
                          className={classes.adsAmp}
                          dangerouslySetInnerHTML={publicidadAmpAd(
                            parametersInline
                          )}
                        />
                      )}
                      {publicidadCaja3 &&
                        subtype !== MINUTO_MINUTO &&
                        subtype !== GALLERY_VERTICAL && (
                          <div
                            className={classes.adsAmp}
                            dangerouslySetInnerHTML={publicidadAmpAd(
                              parametersCaja3
                            )}
                          />
                        )}
                      {isMag &&
                        publicidadCaja4 &&
                        subtype !== MINUTO_MINUTO &&
                        subtype !== GALLERY_VERTICAL && (
                          <div
                            className={classes.adsAmp}
                            dangerouslySetInnerHTML={publicidadAmpAd(
                              parametersCaja4
                            )}
                          />
                        )}
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
                  return (
                    <StoryContentsChildLinkList
                      items={items}
                      multimediaLazyDefault={multimediaLazyDefault}
                      arcSite={arcSite}
                      isAmp
                    />
                  )
                }

                if (type === ELEMENT_VIDEO) {
                  return <StoryContentChildVideo data={element} />
                }
                if (type === ELEMENT_CUSTOM_EMBED) {
                  if (sub === VIDEO_JWPLAYER) {
                    const { embed: { config: videJplayer = {} } = {} } = element
                    return <StoryContentChildVideoJwplayer data={videJplayer} />
                  }
                }
                return undefined
              }}
            />
          )}
          {!isMag &&
            subtype !== MINUTO_MINUTO &&
            subtype !== GALLERY_VERTICAL && (
              <div
                className={classes.adsAmp}
                dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja4)}
              />
            )}
          {isComercio && <StoryGoogleNews />}
          <StoryContentChildTags data={tags} arcSite={arcSite} isAmp />
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <amp-img
                  alt="BBC"
                  layout="responsive"
                  width="500"
                  height="30"
                  src={imgBbc}
                  data-src={imgBbc}
                />
              </a>
            </div>
          )}
        </div>

        {!isMag && (
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja5)}
          />
        )}
      </>
    )
  }
}

StoryContentAmp.static = true
export default StoryContentAmp
