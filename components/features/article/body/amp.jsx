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
import ArticleBodyChildBlockQuote from './_children/blockquote'
import schemaFilter from './_children/_dependencies/schema-filter'
import ArticleBodyChildRelated from './_children/related'

const classes = {
  content: 'amp-content',
  textClasses: 'amp-content__news-text',
  author: 'amp-content__author',
}

@Consumer
class ArticleAMPArticleBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }

    this.getContentApi()
  }

  getContentApi = () => {
    const {
      arcSite,
      globalContent: { _id: id },
    } = this.props

    const { fetched } = this.getContent(
      'story-by-id',
      { _id: id, website: arcSite },
      schemaFilter
    )
    fetched.then(response => {
      const { basic: element } = response
      this.setState({
        data: element || [],
      })
    })
  }

  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
      },
    } = this.props
    const { data } = this.state

    return (
      <div className={classes.content}>
        {promoItems && <ElePrincipal data={promoItems} />}
        <p className={classes.author}>Por: Redacción DT</p>
        {contentElements && (
          <ArticleBody
            data={contentElements}
            classes={classes}
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
                return <ArticleBodyChildBlockQuote data={element} />
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
                return (
                  <amp-iframe
                    class="amphtml-video"
                    width="897"
                    height="542"
                    layout="responsive"
                    i-amphtml-layout="responsive"
                    frameborder="0">
                    <i-amphtml-sizer />
                    <i-amphtml-scroll-container class="amp-active" />
                    <ArticleBodyChildVideo data={element.embed_html} />
                  </amp-iframe>
                )
              }
              return undefined
            }}
          />
        )}
        <ArticleBodyChildRelated stories={data} />
      </div>
    )
  }
}

export default ArticleAMPArticleBody
