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
import ArticleBodyChildTable from '../../../global-components/article-table'
import ArticleBodyChildRelated from './_children/related'
import ArticleBodyChildTags from './_children/tags'
import ArticleBodyChildAuthor from './_children/author'
import ArticleBodyChildMultimedia from './_children/multimedia'
import schemaFilter from './_dependencies/schema-filter'
import ArticleBodyChildRelatedInternal from './_children/related-internal'
import ArticleBodyChildIcon from './_children/icon-list'

const classes = {
  news: 'article-body full-width bg-color--white pd-left-20 pd-right-20',
  content: 'position-relative flex flex--row-reverse',
  textClasses: 'article-body__font--secondary',
  newsImage: 'article-body__image full-width article-body__image--cover',
  newsEmbed: 'article-body__embed',
  tags: 'article-body',
}
@Consumer
class ArticleBody extends PureComponent {
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
      'story-by-related',
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
    const { globalContent, arcSite, contextPath } = this.props
    const { data } = this.state
    const {
      content_elements: contentElements,
      promo_items: promoItems,
      publish_date: date,
      credits: author,
      taxonomy: { tags = {} },
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
                const { type, subtype, raw_oembed: rawOembed } = element
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
                      data={element}
                      stories={data}
                      arcSite={arcSite}
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
        <ArticleBodyChildRelated stories={data} />
      </div>
    )
  }
}

ArticleBody.label = 'Artículo - contenido'

export default ArticleBody
