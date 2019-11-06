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
import StoryContentChildTags from './_children/tags'
import StoryContentChildRelated from './_children/related'
import StoryData from '../../../utilities/story-data'
import {
  ampHtml,
  publicidadAmp,
  replaceTags,
  storyTagsBbc,
  formatDateStoryAmp,
  getDateSeo,
} from '../../../utilities/helpers'

import ConfigParams from '../../../utilities/config-params'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  textClasses:
    'amp-story-content__news-text text-lg mt-15 mb-25 secondary-font text-gray-300 text-xl line-h-md',
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
      deployment,
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
    const namePublicidad =
      arcSite !== 'elcomercio' && arcSite !== 'elcomerciomag' ? arcSite : 'eco'

    const dataSlot = `/${
      adsAmp.dataSlot
    }/${namePublicidad}-amp-300x250-boton-movil2`
    const imgTag = 'amp-img'
    const placementId = adsAmp.movil2
    const width = '300'
    const height = '250'
    const parameters = {
      dataSlot,
      placementId,
      width,
      height,
      primarySectionLink,
      arcSite,
    }
    const parametersMovil4 = {
      dataSlot: `/${
        adsAmp.dataSlot
      }/${namePublicidad}-amp-300x250-middle-movil4`,
      placementId: adsAmp.movil4,
      width,
      height,
      primarySectionLink,
      arcSite,
    }
    const parametersMovil5 = {
      dataSlot: `/${
        adsAmp.dataSlot
      }/${namePublicidad}-amp-300x250-inferior-movil5`,
      placementId: adsAmp.movil5,
      width,
      height,
      primarySectionLink,
      arcSite,
    }
    const parametersMovil3 = {
      dataSlot: `/${
        adsAmp.dataSlot
      }/${namePublicidad}-amp-300x250-inline-movil3`,
      placementId: adsAmp.movil3,
      width,
      height,
      primarySectionLink,
      arcSite,
    }
    const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
    const imgBbc =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bbc_head.png`
      ) || ''

    return (
      <>
        <div className={classes.content}>
          {promoItems && <ElePrincipal data={promoItems} {...siteUrl} />}
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
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
                  publicidad = false,
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
                      {publicidad && (
                        <div
                          className={classes.adsAmp}
                          dangerouslySetInnerHTML={publicidadAmp(
                            parametersMovil3
                          )}
                        />
                      )}
                    </>
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
            dangerouslySetInnerHTML={publicidadAmp(parametersMovil4)}
          />

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
          dangerouslySetInnerHTML={publicidadAmp(parametersMovil5)}
        />
      </>
    )
  }
}

StoryContentAmp.static = true
export default StoryContentAmp
