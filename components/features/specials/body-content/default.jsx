import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ArcStoryContent, {
  Oembed,
  Text,
} from '@arc-core-components/feature_article-body'

import { replaceTags } from '../../../utilities/tags'
import { getDateSeo } from '../../../utilities/date-time/dates'

import {
  ELEMENT_HEADER,
  ELEMENT_IMAGE,
  ELEMENT_QUOTE,
  ELEMENT_RAW_HTML,
  ELEMENT_TABLE,
  ELEMENT_TEXT,
  ELEMENT_VIDEO,
  ELEMENT_GALLERY,
  ELEMENT_OEMBED,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_INTERSTITIAL_LINK,
  ELEMENT_LINK_LIST,
} from '../../../utilities/constants/element-types'

import StoryData from '../../../utilities/story-data'

import StoryContentsChildImage from '../../story/contents/_children/image'
import StoryContentsChildVideo from '../../story/contents/_children/video'
import StoryContentsChildVideoNativo from '../../story/contents/_children/video-nativo'
import StoryHeaderChildGallery from '../../story/gallery/_children/gallery'
import StoryContentsChildBlockQuote from '../../story/contents/_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildInterstitialLink from '../../story/contents/_children/interstitial-link'
import StoryContentsChildLinkList from '../../story/contents/_children/link-list'
import StoryContentChildRawHTML from '../../story/contents/_children/rawHtml'

/* import ContentBodyChildSpecial from './_children/content-body' */
import schemaFilter from './_dependencies/schema-filter'

const CONTENT_SOURCE = 'story-by-id'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content:
    'story-content__content body-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary body-content__text mb-25 title-xs line-h-md mt-20 secondary-font mx-auto',
  blockquoteClass:
    'story-content__blockquote text-gray-300 line-h-sm ml-15 mt-40 mb-40 pl-10 pr-30',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed embed-script',
  alignmentClasses: 'story-content__alignment',
  headerText: 'body-content__header-text mx-auto',
}

const BodyContentSpecial = props => {
  const { customFields: { storyCode = '' } = {} } = props

  const { isAdmin, arcSite, contextPath, deployment } = useFusionContext()

  const story = useContent({
    source: CONTENT_SOURCE,
    query: {
      _id: storyCode,
      published: 'false',
    },
    filter: schemaFilter,
  })

  const {
    publishDate: date,
    promoItems,
    displayDate: updatedDate,
    createdDate,
    authorImage,
    authorLink,
    author,
    primarySection,
    authorEmail,
    primarySectionLink,
    subtype,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    contentPosicionPublicidad,
  } = new StoryData({
    data: story,
    contextPath,
    deployment,
    arcSite,
  })

  const params = {
    authorImage,
    author,
    authorLink,
    updatedDate: getDateSeo(updatedDate || createdDate),
    date,
    primarySectionLink,
    authorEmail,
    primarySection,
    subtype,
    ...promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault,
    primaryImage: true,
  }

  /* const { content_elements: contentElements = [] } = story || {} */

  /* const params = { contentElements } */

  /* return <ContentBodyChildSpecial {...params} /> */
  return (
    <div className={classes.content} id="contenedor">
      {contentPosicionPublicidad && (
        <ArcStoryContent
          data={contentPosicionPublicidad}
          elementClasses={classes}
          renderElement={element => {
            const {
              type,
              subtype: sub,
              raw_oembed: rawOembed,
              content,
              level,
              alignment = '',
              headlines: { basic: captionVideo = '' } = {},
              url = '',
              items = [],
            } = element
            if (type === ELEMENT_IMAGE) {
              const presets = 'landscapeMd:314,storySmall:482,large:980'

              return (
                <StoryContentsChildImage
                  {...element}
                  multimediaLazyDefault={multimediaLazyDefault}
                  presets={presets}
                />
              )
            }
            if (type === ELEMENT_VIDEO) {
              return (
                <>
                  {element && element.embed_html ? (
                    <StoryContentsChildVideo
                      data={element.embed_html}
                      {...element}
                      className={classes.newsImage}
                      description={captionVideo}
                      contentElemtent="true"
                    />
                  ) : (
                    <StoryContentsChildVideoNativo
                      streams={element && element.streams}
                    />
                  )}
                </>
              )
            }
            if (type === ELEMENT_GALLERY) {
              return (
                <StoryHeaderChildGallery
                  contentElementGallery={element}
                  type={type}
                />
              )
            }
            if (type === ELEMENT_TABLE) {
              return <StoryContentsChildTable data={element} type={type} />
            }
            if (type === ELEMENT_QUOTE) {
              return <StoryContentsChildBlockQuote data={element} />
            }
            if (type === ELEMENT_INTERSTITIAL_LINK) {
              return (
                <StoryContentsChildInterstitialLink
                  url={url}
                  content={content}
                  isAmp={false}
                />
              )
            }
            if (type === ELEMENT_LINK_LIST) {
              return (
                <StoryContentsChildLinkList
                  items={items}
                  multimediaLazyDefault={multimediaLazyDefault}
                  arcSite={arcSite}
                  isAdmin={isAdmin}
                />
              )
            }
            if (type === ELEMENT_OEMBED) {
              return (
                <Oembed
                  rawOembed={rawOembed}
                  subtype={sub}
                  className={classes.newsEmbed}
                />
              )
            }

            if (type === ELEMENT_HEADER && level === 2) {
              return (
                <h2
                  className={classes.headerText}
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )
            }

            if (type === ELEMENT_TEXT) {
              const alignmentClass = alignment
                ? `${classes.textClasses} ${classes.alignmentClasses}-${alignment}`
                : classes.textClasses

              return (
                <Text
                  content={replaceTags(content)}
                  className={alignmentClass}
                />
              )
            }

            if (type === ELEMENT_BLOCKQUOTE) {
              return (
                <>
                  <blockquote
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                    className={classes.blockquoteClass}
                  />
                </>
              )
            }

            if (type === ELEMENT_RAW_HTML) {
              return <StoryContentChildRawHTML content={content} />
            }
            return ''
          }}
        />
      )}
    </div>
  )
}

BodyContentSpecial.label = 'Especial - Contenido Nota'
BodyContentSpecial.static = true

BodyContentSpecial.propTypes = {
  customFields: PropTypes.shape({
    storyCode: PropTypes.string.tag({
      name: 'ID de historia',
    }),
  }),
}

export default BodyContentSpecial
