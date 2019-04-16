// file path: ArticleBodyContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArticleBody from '@arc-core-components/feature_article-body'

import Video from './_children/video'
import Imagen from './_children/article-image'
import Gallery from '../header/_children/gallery'
import Blockquote from './_children/blockquote'
import Table from './_children/table'
import Tags from './_children/tags'
import Autor from './_children/autor'
import ElePrincipal from './_children/ele-principal'

const classes = {
  textClasses: 'font--secondary',
  headerClasses: 'font--primary',
  imageClasses: 'visual__image visual__image--cover',
  news: 'news-text-content col-2 padding-normal bg-color--white',
  newsImage: 'visual__image visual__image--cover',
}
@Consumer
class ArticleBodyContent extends PureComponent {
  render() {
    const { globalContent } = this.props
    const {
      content_elements: contentElements,
      promo_items: promoItems,
      publish_date: date,
      credits: author,
      taxonomy,
    } = globalContent || {}

    return (
      <div className={classes.news}>
        {promoItems && <ElePrincipal data={promoItems} />}
        {author && <Autor data={author} date={date} />}
        {contentElements && (
          <ArticleBody
            data={contentElements}
            classes={classes}
            renderElement={element => {
              const { type } = element
              if (type === 'image') {
                return <Imagen data={element} className={classes.newsImage} />
              }
              if (type === 'video') {
                return (
                  <Video
                    data={element.embed_html}
                    className={classes.newsImage}
                  />
                )
              }
              if (type === 'gallery') {
                return <Gallery data={element} type={type} />
              }
              if (type === 'table') {
                return <Table data={element} type={type} />
              }
              if (type === 'quote') {
                return <Blockquote data={element} />
              }
              if (type === 'oembed_response') {
                return ''
              }
              return ''
            }}
          />
        )}
        {taxonomy && <Tags data={taxonomy} />}
      </div>
    )
  }
}

export default ArticleBodyContent
