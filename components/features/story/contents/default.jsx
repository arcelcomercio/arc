// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  RawHtml,
  Text,
} from '@arc-core-components/feature_article-body'
import {
  appendToBody,
  createLink,
  createScript,
  replaceTags,
  replaceHtmlMigracion,
} from '../../../utilities/helpers'

import StoryContentsChildVideo from './_children/video'
import StoryContentsChildImage from './_children/image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentsChildRelatedInternal from './_children/related-internal'
import StoryContentsChildIcon from './_children/icon-list'
import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'
import StoryContentsChildImpresa from './_children/impresa'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content: 'story-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary mb-25 title-xs line-h-md mt-20 secondary-font pr-20',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed',
  tags: 'story-content',
  section: 'w-full',
  listClasses: 'story-content__paragraph-list',
  alignmentClasses: 'story-content__alignment',
}

@Consumer
class StoryContents extends PureComponent {
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
      arcSite,
      contextPath,
      siteProperties: {
        ids: { opta },
      },
    } = this.props
    const { credits: author, related_content: { basic: relatedContent } = {} } =
      globalContent || {}

    const {
      publishDate: date,
      promoItems,
      displayDate: updatedDate,
      contentElements,
      primarySection,
    } = new StoryData({
      data: globalContent,
      contextPath,
    })

    return (
      <div className={classes.news}>
        {primarySection === 'Impresa'
          ? promoItems && <StoryContentsChildImpresa data={promoItems} />
          : promoItems && <StoryContentsChildMultimedia data={promoItems} />}

        {author && (
          <StoryContentsChildAuthor
            {...author}
            date={date}
            updatedDate={updatedDate}
          />
        )}
        <div id="ads_m_movil2" />
        <div className={classes.content} id="contenedor">
          {/* TODO: se retira para el sitio de gestion por la salida del 30 de julio */}
          {arcSite !== ConfigParams.SITE_GESTION && <StoryContentsChildIcon />}{' '}
          <div id="ads_d_inline" />
          <div id="ads_m_movil_video" />
          <div id="ads_m_movil3" />
          {contentElements && (
            <ArcStoryContent
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const {
                  _id,
                  type,
                  subtype,
                  raw_oembed: rawOembed,
                  content,
                  alignment = '',
                } = element
                if (type === ConfigParams.ELEMENT_IMAGE) {
                  return (
                    <StoryContentsChildImage
                      data={element}
                      className={classes.newsImage}
                      resizer="true"
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_VIDEO) {
                  return (
                    <>
                      {element && element.embed_html && (
                        <StoryContentsChildVideo
                          data={element.embed_html}
                          className={classes.newsImage}
                        />
                      )}
                    </>
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
                  return <StoryContentsChildTable data={element} type={type} />
                }
                if (type === ConfigParams.ELEMENT_QUOTE) {
                  return <StoryContentsChildBlockQuote data={element} />
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
                    <StoryContentsChildRelatedInternal
                      stories={relatedContent}
                      id={_id}
                    />
                  )
                }

                if (type === ConfigParams.ELEMENT_TEXT) {
                  const alignmentClass = alignment
                    ? `${classes.textClasses} ${
                        classes.alignmentClasses
                      }-${alignment}`
                    : classes.textClasses
                  return (
                    <Text
                      content={replaceTags(content)}
                      className={alignmentClass}
                    />
                  )
                }

                if (type === ConfigParams.ELEMENT_RAW_HTML) {
                  /* Si encuentra opta-widget agrega scripts a <head> */
                  if (content.includes('opta-widget'))
                    this.handleOptaWidget({
                      id: opta,
                      css: ConfigParams.OPTA_CSS_LINK,
                      js: ConfigParams.OPTA_JS_LINK,
                      defer: true,
                    })

                  return content.includes('id="powa-') ? (
                    <StoryContentsChildVideo
                      data={content}
                      className={classes.newsImage}
                    />
                  ) : (
                    <StoryContentChildRawHTML content={content} />
                  )
                }
                return ''
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

StoryContents.label = 'Artículo - contenidos'

export default StoryContents
