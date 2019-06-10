// file path: ArticleBodyContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcArticleBody, {
  Oembed,
} from '@arc-core-components/feature_article-body'
import {
  appendToBody,
  createLink,
  createScript,
} from '../../../utilities/helpers'

import ArticleBodyChildVideo from './_children/video'
import ArticleBodyChildArticleImage from './_children/image'
import ArticleHeaderChildGallery from '../header/_children/gallery'
import ArticleBodyChildBlockQuote from './_children/blockquote'
import ArticleBodyChildTable from '../../../global-components/article-table'
import ArticleBodyChildRelated from './_children/related'
import ArticleBodyChildTags from './_children/tags'
import ArticleBodyChildAuthor from './_children/author'
import ArticleBodyChildMultimedia from './_children/multimedia'
import ArticleBodyChildRelatedInternal from './_children/related-internal'
import ArticleBodyChildIcon from './_children/icon-list'

const classes = {
  news: 'article-body full-width bg-color--white pd-left-20 pd-right-20',
  content: 'article-body__content position-relative flex flex-row-reverse',
  textClasses: 'article-body__font--secondary',
  newsImage: 'article-body__image full-width article-body__image--cover',
  newsEmbed: 'article-body__embed',
  tags: 'article-body',
  section: 'full-width',
}

const OPTA_CSS_LINK =
  'https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'
const OPTA_JS_LINK =
  'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js'

@Consumer
class ArticleBody extends PureComponent {
  handleOptaWidget = ({ id, css, js, defer }) => {
    appendToBody(
      createScript({
        textContent: `
        var opta_settings={
            subscription_id: '${id}',
            language: 'es_CO',
            timezone: 'America/Lima'
        };`,
      })
    )
    appendToBody(
      createScript({
        src: js,
        defer,
      })
    )
    appendToBody(createLink(css))
  }

  render() {
    const {
      globalContent,
      contextPath,
      siteProperties: {
        ids: { opta },
      },
    } = this.props
    const {
      content_elements: contentElements,
      promo_items: promoItems,
      publish_date: date,
      credits: author,
      taxonomy: { tags = {} },
      related_content: { basic: relatedContent } = {},
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
                if (type === 'raw_html') {
                  const { content } = element
                  /* Si encuentra opta-widget agrega scripts a <head> */
                  if (content.includes('opta-widget'))
                    this.handleOptaWidget({
                      id: opta,
                      css: OPTA_CSS_LINK,
                      js: OPTA_JS_LINK,
                      defer: true,
                    })
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

        {relatedContent && relatedContent.length > 0 && (
          <div role="list" className={classes.related}>
            <h4 className={classes.relatedTitle}>Relacionadas </h4>
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
