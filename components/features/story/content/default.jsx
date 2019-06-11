// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  RawHtml,
} from '@arc-core-components/feature_article-body'
import {
  appendToBody,
  createLink,
  createScript,
} from '../../../utilities/helpers'

import StoryContentChildVideo from './_children/video'
import StoryContentChildImage from './_children/image'
import StoryHeaderChildGallery from '../header/_children/gallery'
import StoryContentChildBlockQuote from './_children/blockquote'
import StoryContentChildTable from '../../../global-components/story-table'
import StoryContentChildRelated from './_children/related'
import StoryContentChildTags from './_children/tags'
import StoryContentChildAuthor from './_children/author'
import StoryContentChildMultimedia from './_children/multimedia'
import StoryContentChildRelatedInternal from './_children/related-internal'
import StoryContentChildIcon from './_children/icon-list'

const classes = {
  news: 'story-content w-full bg-color--white pl-20 pr-20',
  content: 'story-content__content position-relative flex flex--row-reverse',
  textClasses: 'story-content__font--secondary',
  newsImage: 'story-content__image w-full story-content__image--cover',
  newsEmbed: 'story-content__embed',
  tags: 'story-content',
  section: 'w-full',
  relatedList: 'related-content__list',
  relatedTitle: 'related-content__title font-bold uppercase',
}

const OPTA_CSS_LINK =
  'https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'
const OPTA_JS_LINK =
  'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js'

@Consumer
class StoryContent extends PureComponent {
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
        {promoItems && <StoryContentChildMultimedia data={promoItems} />}
        {author && <StoryContentChildAuthor data={author} date={date} />}
        <div className={classes.content}>
          <StoryContentChildIcon />
          {contentElements && (
            <ArcStoryContent
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const { _id, type, subtype, raw_oembed: rawOembed } = element
                if (type === 'image') {
                  return (
                    <StoryContentChildImage
                      data={element}
                      className={classes.newsImage}
                    />
                  )
                }
                if (type === 'video') {
                  return (
                    <StoryContentChildVideo
                      data={element.embed_html}
                      className={classes.newsImage}
                    />
                  )
                }
                if (type === 'gallery') {
                  return <StoryHeaderChildGallery data={element} type={type} />
                }
                if (type === 'table') {
                  return <StoryContentChildTable data={element} type={type} />
                }
                if (type === 'quote') {
                  return <StoryContentChildBlockQuote data={element} />
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
                    <StoryContentChildRelatedInternal
                      stories={relatedContent}
                      contextPath={contextPath}
                      id={_id}
                    />
                  )
                }
                if (type === 'raw_htmal') {
                  const { content } = element
                  /* Si encuentra opta-widget agrega scripts a <head> */
                  if (content.includes('opta-widget'))
                    this.handleOptaWidget({
                      id: opta,
                      css: OPTA_CSS_LINK,
                      js: OPTA_JS_LINK,
                      defer: true,
                    })
                  return <RawHtml rawHtmlClasses="ss" />
                }
                return ''
              }}
            />
          )}
        </div>

        <StoryContentChildTags
          data={tags}
          className={classes.tags}
          contextPath={contextPath}
        />

        {relatedContent && relatedContent.length > 0 && (
          <div role="list" className={classes.relatedList}>
            <h4 className={classes.relatedTitle}>Relacionadas </h4>
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

StoryContent.label = 'Artículo - contenido'

export default StoryContent
