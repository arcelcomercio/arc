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
import ConfigParams from '../../../utilities/config-params'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content: 'story-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary mb-25 title-xs line-h-md mt-20 secondary-font',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed',
  tags: 'story-content',
  section: 'w-full',
  // Related-content
  relatedList: 'related-content__list pt-10',
  relatedTitle: 'related-content__title font-bold uppercase pt-20 pb-20',
}

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

    const structuredTaboola = `
      window._taboola = window._taboola || [];
      _taboola.push({
      mode: 'thumbnails-a',
      container: 'taboola-below-content-thumbnails',
      placement: 'Below Content Thumbnails',
      target_type: 'mix'
      });`
    return (
      <div className={classes.news}>
        {promoItems && <StoryContentChildMultimedia data={promoItems} />}
        {author && <StoryContentChildAuthor data={author} date={date} />}
        <div id="ads_d_inline" />
        <div id="ads_m_movil_video" />
        <div id="ads_m_movil3" />
        <div id="ads_m_movil2" />
        <div className={classes.content}>
          <StoryContentChildIcon />
          {contentElements && (
            <ArcStoryContent
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const { _id, type, subtype, raw_oembed: rawOembed } = element
                if (type === ConfigParams.ELEMENT_IMAGE) {
                  return (
                    <StoryContentChildImage
                      data={element}
                      className={classes.newsImage}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_VIDEO) {
                  return (
                    <StoryContentChildVideo
                      data={element.embed_html}
                      className={classes.newsImage}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_GALLERY) {
                  return (
                    <StoryHeaderChildGallery
                      contentElementGallery={element}
                      type={type}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_TABLE) {
                  return <StoryContentChildTable data={element} type={type} />
                }
                if (type === ConfigParams.ELEMENT_QUOTE) {
                  return <StoryContentChildBlockQuote data={element} />
                }
                if (type === ConfigParams.ELEMENT_OEMBED) {
                  return (
                    <Oembed
                      rawOembed={rawOembed}
                      subtype={subtype}
                      className={classes.newsEmbed}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_STORY) {
                  return (
                    <StoryContentChildRelatedInternal
                      stories={relatedContent}
                      id={_id}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_RAW_HTML) {
                  const { content } = element
                  /* Si encuentra opta-widget agrega scripts a <head> */
                  if (content.includes('opta-widget'))
                    this.handleOptaWidget({
                      id: opta,
                      css: ConfigParams.OPTA_CSS_LINK,
                      js: ConfigParams.OPTA_JS_LINK,
                      defer: true,
                    })
                  return <RawHtml rawHtmlClasses="" />
                }
                return ''
              }}
            />
          )}
        </div>

        <div id="ads_m_movil4" />

        <StoryContentChildTags data={tags} className={classes.tags} />
        <div id="ads_d_left" />
        <div id="ads_d_recomendador" />

        {relatedContent && relatedContent.length > 0 && (
          <div role="list" className={classes.relatedList}>
            <h4 className={classes.relatedTitle}>Relacionadas </h4>
            {relatedContent.map((item, i) => {
              const { type } = item
              const key = `related-${i}`
              return type !== ConfigParams.ELEMENT_STORY ? (
                ''
              ) : (
                <StoryContentChildRelated key={key} {...item} />
              )
            })}
          </div>
        )}

        <div id="taboola-below-content-thumbnails" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: structuredTaboola }}
        />
      </div>
    )
  }
}

StoryContent.label = 'Artículo - contenido'
export default StoryContent
