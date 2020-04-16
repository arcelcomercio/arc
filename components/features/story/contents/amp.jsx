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
import StoryContentChildTable from '../../../global-components/story-table'
import StoryContentChildBlockQuote from './_children/blockquote'
import StoryGoogleNews from '../../../global-components/google-news'
import StoryContentChildTags from './_children/tags'
// import StoryContentChildRelated from './_children/related'
import StoryData from '../../../utilities/story-data'
import {
  replaceTags,
  storyTagsBbc,
  getDateSeo,
} from '../../../utilities/helpers'

import ConfigParams from '../../../utilities/config-params'
import {
  SITE_ELCOMERCIO,
  SITE_PERU21,
} from '../../../utilities/constants/sitenames'
import { getAssetsPath } from '../../../utilities/constants'
import {
  formatDateStoryAmp,
  publicidadAmp,
  publicidadAmpAd,
  ampHtml,
} from '../../../utilities/story/helpers-amp'
import { getResizedUrl } from '../../../utilities/resizer'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  textClasses:
    'amp-story-content__news-text text-lg mt-15 mb-25 secondary-font text-gray-300 text-xl line-h-md',
  blockquoteClass: 'amp-story-content__blockquote text-lg secondary-font text-gray-300 text-xl line-h-md ml-15 mt-25 mb-25 pl-10 pr-30',
  author: 'amp-story-content__author mt-15 mb-15 secondary-font',
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
      isAmp,
      siteProperties: { siteUrl, adsAmp },
      globalContent: data = {},
    } = this.props
    const {
      contentPosicionPublicidadAmp,
      promoItems,
      tags,
      authorLink,
      displayDate: updatedDate,
      primarySectionLink,
      author,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
    })
    // const namePublicidad =
    //   arcSite !== 'elcomercio' && arcSite !== 'elcomerciomag' ? arcSite : 'eco'

    // const dataSlot = `/${adsAmp.dataSlot}/${
    //   arcSite === 'diariocorreo' ? 'correo' : namePublicidad
    // }-amp-300x250-boton-movil2`
    const namePublicidad = arcSite !== 'peru21g21' ? arcSite : SITE_PERU21

    const dataSlot = `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja2`
    const isComercio = arcSite === SITE_ELCOMERCIO

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

    return (
      <>
        <div className={classes.content}>
          {promoItems && <ElePrincipal data={promoItems} {...siteUrl} />}
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parametersCaja2)}
          />
          <p className={classes.author}>
            <a href={authorLink}>{author}</a>
          </p>
          <time dateTime={getDateSeo(updatedDate)} className={classes.datetime}>
            {formatDateStoryAmp(updatedDate)}
          </time>
          {contentPosicionPublicidadAmp && (
            <StoryContent
              data={contentPosicionPublicidadAmp}
              elementClasses={classes}
              renderElement={element => {
                const {
                  type,
                  subtype,
                  raw_oembed: rawOembed,
                  content_elements: innerContentElements,
                  content,
                  level,
                  publicidadInline = false,
                  publicidadCaja3 = false,
                } = element
                if (type === ConfigParams.ELEMENT_OEMBED) {
                  return (
                    <AmpOembed
                      rawOembed={rawOembed}
                      subtype={subtype}
                      className={classes}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_RAW_HTML) {
                  return content.includes('id="powa-') ? (
                    <StoryContentChildVideo
                      data={content}
                      className={classes.newsImage}
                    />
                  ) : (
                    <RawHtml
                      content={ampHtml(content, arcSite)}
                      className={classes.rawHtmlClasses}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_HEADER && level === 1) {
                  return (
                    <h2>
                      <RawHtml content={content}></RawHtml>
                    </h2>
                  )
                }
                if (type === ConfigParams.ELEMENT_QUOTE) {
                  return <StoryContentChildBlockQuote data={element} />
                }
                if (type === ConfigParams.ELEMENT_TABLE) {
                  return <StoryContentChildTable data={element} type={type} />
                }

                if (type === ConfigParams.ELEMENT_GALLERY) {
                  return (
                    <AMPCarousel
                      data={innerContentElements}
                      width="500"
                      height="300"
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_IMAGE) {
                  return (
                    <AmpImage
                      {...element}
                      url={
                        getResizedUrl({
                          url: element.url,
                          presets: 'large:400x',
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
                if (type === ConfigParams.ELEMENT_TEXT) {
                  return (
                    <>
                      <Text
                        content={ampHtml(replaceTags(content), arcSite)}
                        className={classes.textClasses}
                      />
                      {publicidadInline && (
                        <div
                          className={classes.adsAmp}
                          dangerouslySetInnerHTML={publicidadAmpAd(
                            parametersInline
                          )}
                        />
                      )}
                      {publicidadCaja3 && (
                        <div
                          className={classes.adsAmp}
                          dangerouslySetInnerHTML={publicidadAmpAd(
                            parametersCaja3
                          )}
                        />
                      )}
                    </>
                  )
                }
                if (type === ConfigParams.ELEMENT_BLOCKQUOTE) {
                  return (
                    <blockquote
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                      className={classes.blockquoteClass}
                    />
                  )
                }

                if (type === ConfigParams.ELEMENT_VIDEO) {
                  return <StoryContentChildVideo data={element} />
                }
                return undefined
              }}
            />
          )}
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja4)}
          />
          {isComercio && <StoryGoogleNews />}
          <StoryContentChildTags data={tags} {...isAmp} />
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

        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja5)}
        />
      </>
    )
  }
}

StoryContentAmp.static = true
export default StoryContentAmp
