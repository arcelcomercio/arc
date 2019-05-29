// file path: ArticleBodyContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcArticleBody, {
  Oembed,
} from '@arc-core-components/feature_article-body'

import ArticleBodyChildVideo from './_children/video'
import ArticleBodyChildArticleImage from './_children/image'
import ArticleHeaderChildGallery from '../header/_children/gallery'
import ArticleBodyChildBlockQuote from './_children/blockquote'
import ArticleBodyChildTable from './_children/table'
import ArticleBodyChildRelated from './_children/related'
import ArticleBodyChildTags from './_children/tags'
import ArticleBodyChildAuthor from './_children/author'
import ArticleBodyChildMultimedia from './_children/multimedia'
import ArticleBodyChildRelatedInternal from './_children/related-internal'
import ArticleBodyChildIcon from './_children/icon-list'

const classes = {
  news: 'article-body news-text-content col-2 bg-color--white',
  content: 'article-body__content',
  textClasses: 'article-body__font--secondary',
  newsImage: 'article-body__image article-body__image--cover',
  newsEmbed: 'article-body__embed',
  tags: 'article-body',
}
@Consumer
class ArticleBody extends PureComponent {
  render() {
    const { globalContent, contextPath } = this.props
    const {
      content_elements: contentElements,
      promo_items: promoItems,
      publish_date: date,
      credits: author,
      taxonomy: { tags = {} },
      related_content: { basic: relatedContent },
    } = globalContent || {}
    return (
      <div className={classes.news}>
        {promoItems && <ArticleBodyChildMultimedia data={promoItems} />}
        {author && <ArticleBodyChildAuthor data={author} date={date} />}
        <div className={classes.content}>
          <ArticleBodyChildIcon />
          {contentElements && (
            <ArcArticleBody
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const { _id, type, subtype, raw_oembed: rawOembed } = element
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
                  return (
                    <ArticleHeaderChildGallery data={element} type={type} />
                  )
                }
                if (type === 'table') {
                  return <ArticleBodyChildTable data={element} type={type} />
                }
                if (type === 'quote') {
                  return <ArticleBodyChildBlockQuote data={element} />
                }
                if (type === 'oembed_response') {
                  return (
                    <Oembed
                      rawOembed={rawOembed}
                      subtype={subtype}
                      className={classes.newsEmbed}
                    />
                  )
                }
                if (type === 'story') {
                  return (
                    <ArticleBodyChildRelatedInternal
                      stories={relatedContent}
                      contextPath={contextPath}
                      id={_id}
                    />
                  )
                }
                return ''
              }}
            />
          )}
        </div>

        <ArticleBodyChildTags
          data={tags}
          className={classes.tags}
          contextPath={contextPath}
        />

        {relatedContent.length > 0 && (
          <div className={classes.related}>
            <div className={classes.relatedTitle}>Relacionadas </div>
            {relatedContent.map((item, i) => {
              const { type } = item
              const key = `related-${i}`
              return type !== 'story' ? (
                ''
              ) : (
                <ArticleBodyChildRelated
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

ArticleBody.label = 'Artículo - contenido'

export default ArticleBody
