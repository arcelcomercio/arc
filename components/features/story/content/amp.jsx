import StoryContent, {
  AmpOembed,
  RawHtml,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import AmpImage from '@arc-core-components/element_image'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ElePrincipal from './_children/amp-ele-principal'
import StoryContentChildVideo from './_children/video'
import StoryContentChildTable from '../../../global-components/story-table'
import StoryContentChildBlockQuote from './_children/blockquote'
import StoryContentChildTags from './_children/tags'
import StoryContentChildRelated from './_children/related'
import StoryData from '../../../utilities/story-data'
import { ampHtml } from '../../../utilities/helpers'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  textClasses:
    'amp-story-content__news-text text-lg mt-15 mb-25 secondary-font text-gray-300 text-xl line-h-md',
  author: 'amp-story-content__author mt-15 mb-15',
  image: 'amp-story-content__image mt-10 mb-10',
  // TODO: Revisar video y imgTag
  video: 'amp-story-content__video amp-active',
}

@Consumer
class StoryContentAmp extends PureComponent {
  render() {
    const {
      globalContent: data = {},
      contextPath,
      arcSite,
      siteProperties: { siteUrl },
      isAmp,
    } = this.props
    const { contentElements, relatedContent, promoItems, tags } = new StoryData(
      {
        data,
        arcSite,
        contextPath,
        siteUrl,
      }
    )

    const imgTag = 'amp-img'
    return (
      <>
        <div className={classes.content}>
          {promoItems && <ElePrincipal data={promoItems} />}
          <p className={classes.author}>Por: Redacción DT</p>
          {contentElements && (
            <StoryContent
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const {
                  type,
                  subtype,
                  raw_oembed: rawOembed,
                  content_elements: innerContentElements,
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
                  const { content } = element
                  return (
                    <RawHtml content={ampHtml(content)} rawHtmlClasses="" />
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
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_VIDEO) {
                  return (
                    <amp-iframe i-amphtml-layout="responsive" frameborder="0">
                      <i-amphtml-sizer />
                      <i-amphtml-scroll-container className={classes.video} />
                      <StoryContentChildVideo data={element.embed_html} />
                    </amp-iframe>
                  )
                }
                return undefined
              }}
            />
          )}
          <StoryContentChildTags data={tags} {...contextPath} {...isAmp} />

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
                  />
                )
              })}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default StoryContentAmp
