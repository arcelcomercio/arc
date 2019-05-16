// file path: ArticleBodyContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcArticleBody from '@arc-core-components/feature_article-body'

import ArticleBodyChildVideo from './_children/video'
import ArticleBodyChildArticleImage from './_children/image'
import ArticleHeaderChildGallery from '../header/_children/gallery'
import ArticleBodyChildBlockQuote from './_children/blockquote'
import ArticleBodyChildTable from './_children/table'
import ArticleBodyChildTags from './_children/tags'
import ArticleBodyChildAuthor from './_children/author'
import ArticleBodyChildMultimedia from './_children/multimedia'

const classes = {
  news: 'article-body news-text-content col-2 bg-color--white',
  textClasses: 'article-body__font--secondary',
  newsImage: 'article-body__image article-body__image--cover',
}
@Consumer
class ArticleBody extends PureComponent {
  render() {
    const { globalContent } = this.props
    const {
      content_elements: contentElements,
      promo_items: promoItems,
      publish_date: date,
      credits: author,
      taxonomy,
    } = globalContent || {}
    console.log(globalContent)
    debugger
    return (
      <div className={classes.news}>
        {promoItems && <ArticleBodyChildMultimedia data={promoItems} />}
        {author && <ArticleBodyChildAuthor data={author} date={date} />}
        {contentElements && (
          <ArcArticleBody
            data={contentElements}
            classes={classes}
            renderElement={element => {
              const { type } = element
              if (type === 'image') {
                return (
                  <ArticleBodyChildArticleImage
                    data={element}
                    className={classes.newsImage}
                  />
                )
              }
              if (type === 'video') {
                return (
                  <ArticleBodyChildVideo
                    data={element.embed_html}
                    className={classes.newsImage}
                  />
                )
              }
              if (type === 'gallery') {
                return <ArticleHeaderChildGallery data={element} type={type} />
              }
              if (type === 'table') {
                return <ArticleBodyChildTable data={element} type={type} />
              }
              if (type === 'quote') {
                return <ArticleBodyChildBlockQuote data={element} />
              }
              if (type === 'oembed_response') {
                return ''
              }
              return ''
            }}
          />
        )}
        {taxonomy && <ArticleBodyChildTags data={taxonomy} />}
      </div>
    )
  }
}

ArticleBody.label = 'Artículo - contenido'
ArticleBody.static = true

export default ArticleBody
