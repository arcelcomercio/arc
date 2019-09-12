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
import { ampHtml, publicidadAmp, replaceTags } from '../../../utilities/helpers'

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
      relatedContent,
      promoItems,
      tags,
      authorLink,
      author,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
    })
    const dataSlot = `/${adsAmp.dataSlot}/${arcSite}-amp-300x250-boton-movil2`
    const imgTag = 'amp-img'
    const placementId = adsAmp.movil2
    const width = '300'
    const height = '250'
    const parameters = { dataSlot, placementId, width, height }
    const parametersMovil4 = {
      dataSlot: `/${adsAmp.dataSlot}/${arcSite}-amp-300x250-middle-movil4`,
      placementId: adsAmp.movil4,
      width,
      height,
    }
    const parametersMovil5 = {
      dataSlot: `/${adsAmp.dataSlot}/${arcSite}-amp-300x250-inferior-movil5`,
      placementId: adsAmp.movil5,
      width,
      height,
    }
    const parametersMovil3 = {
      dataSlot: `/${adsAmp.dataSlot}/${arcSite}-amp-300x250-inline-movil3`,
      placementId: adsAmp.movil3,
      width,
      height,
    }

    return (
      <>
        <div className={classes.content}>
          {promoItems && <ElePrincipal data={promoItems} />}
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parameters)}
          />
          <p className={classes.author}>
            <a href={authorLink}>{author}</a>
          </p>
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
                      rawHtmlClasses=""
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

          {relatedContent.length > 0 && (
            <div className={classes.related}>
              <div className={classes.relatedTitle}>Relacionadas </div>
              {relatedContent.map((item, i) => {
                const { type } = item
                const key = `related-${i}`
                return type !== ConfigParams.ELEMENT_STORY ? (
                  ''
                ) : (
                  <StoryContentChildRelated
                    key={key}
                    {...item}
                    contextPath={contextPath}
                    arcSite={arcSite}
                    deployment={deployment}
                    isAmp="true"
                  />
                )
              })}
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
