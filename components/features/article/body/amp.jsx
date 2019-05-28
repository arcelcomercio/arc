import ArticleBody, {
  AmpOembed,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import AmpImage from '@arc-core-components/element_image'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import schemaFilter from './_dependencies/schema-filter'
import ElePrincipal from './_children/amp-ele-principal'
import ArticleBodyChildVideo from './_children/video'
import ArticleBodyChildTable from '../../../global-components/article-table'
import ArticleBodyChildBlockQuote from './_children/blockquote'
import ArticleBodyChildTags from './_children/tags'
import ArticleBodyChildRelated from './_children/related'

const classes = {
  content: 'amp-content pd-left-20 pd-right-20',
  textClasses: 'amp-content__news-text text',
  author: 'amp-content__author',
  tags: 'amp-content',
}

@Consumer
class ArticleAMPArticleBody extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dataRelated: [],
    }

    this.getContentApi()
  }

  getContentApi = () => {
    const {
      arcSite,
      globalContent: { _id: id },
    } = this.props

    const { fetched } = this.getContent(
      'story-by-related',
      { _id: id, website: arcSite },
      schemaFilter
    )
    fetched.then(response => {
      const { basic: element } = response
      this.setState({
        dataRelated: element || [],
      })
    })
  }

  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
        taxonomy: { tags = {} },
      },
    } = this.props
    const { dataRelated } = this.state

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
                  <amp-iframe i-amphtml-layout="responsive" frameborder="0">
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
        <ArticleBodyChildTags data={tags} className={classes.tags} />
        <ArticleBodyChildRelated stories={dataRelated} />
      </div>
    )
  }
}

export default ArticleAMPArticleBody
