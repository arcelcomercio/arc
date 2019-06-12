import StoryContent, {
  AmpOembed,
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

const classes = {
  content: 'story-content-amp pl-20 pr-20 m-0 mx-auto',
  textClasses: 'story-content-amp__news-text text mt-15 mb-25 secondary-font',
  author: 'story-content-amp__author mt-15 mb-15',
  image: 'story-content-amp__image',
}

@Consumer
class StoryContentAmp extends PureComponent {
  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
        taxonomy: { tags = {} },
        related_content: { basic: relatedContent } = {},
      },
      contextPath,
    } = this.props
    return (
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
              if (type === 'oembed_response') {
                return (
                  <AmpOembed
                    rawOembed={rawOembed}
                    subtype={subtype}
                    className={classes}
                  />
                )
              }
              if (type === 'quote') {
                return <StoryContentChildBlockQuote data={element} />
              }
              if (type === 'table') {
                return <StoryContentChildTable data={element} type={type} />
              }

              if (type === 'gallery') {
                return (
                  <AMPCarousel
                    data={innerContentElements}
                    width="500"
                    height="300"
                  />
                )
              }
              if (type === 'image') {
                return (
                  <AmpImage
                    {...element}
                    ImgTag="amp-img"
                    imgClassName={classes.image}
                    layout="responsive"
                  />
                )
              }
              if (type === 'video') {
                return (
                  <amp-iframe i-amphtml-layout="responsive" frameborder="0">
                    <i-amphtml-sizer />
                    <i-amphtml-scroll-container class="amp-active" />
                    <StoryContentChildVideo data={element.embed_html} />
                  </amp-iframe>
                )
              }
              return undefined
            }}
          />
        )}
        <StoryContentChildTags data={tags} contextPath={contextPath} />
        {relatedContent.length > 0 && (
          <div className={classes.related}>
            <div className={classes.relatedTitle}>Relacionadas </div>
            {relatedContent.map((item, i) => {
              const { type } = item
              const key = `related-${i}`
              return type !== 'story' ? (
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
    )
  }
}

export default StoryContentAmp
