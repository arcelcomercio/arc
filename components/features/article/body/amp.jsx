import ArticleBody, {
  AmpOembed,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import AmpImage from '@arc-core-components/element_image'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import ElePrincipal from './_children/amp-ele-principal'
import ArticleBodyChildVideo from './_children/video'
import ArticleBodyChildTable from './_children/table'

const elementClasses = {
  content: 'amp-content',
  textClasses: 'amp-content__news-text',
  author: 'amp-content__author',
}

@Consumer
class ArticleAMPArticleBody extends Component {
  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
      },
    } = this.props

    return (
      <div className={elementClasses.content}>
        {promoItems && <ElePrincipal data={promoItems} />}
        <p className={elementClasses.author}>Por: Redacción DT</p>
        {contentElements && (
          <ArticleBody
            data={contentElements}
            elementClasses={elementClasses}
            renderElement={element => {
              const {
                type,
                subtype,
                raw_oembed: rawOembed,
                content_elements: innerContentElements,
              } = element
              if (type === 'oembed_response') {
                return <AmpOembed rawOembed={rawOembed} subtype={subtype} />
              }
              if (type === 'table') {
                return <ArticleBodyChildTable data={element} type={type} />
              }
              if (type === 'raw_html') {
                return null
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
                return <AmpImage {...element} layout="responsive" />
              }
              if (type === 'video') {
                return <ArticleBodyChildVideo data={element.embed_html} />
              }
              return undefined
            }}
          />
        )}
      </div>
    )
  }
}

export default ArticleAMPArticleBody
