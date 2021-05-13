import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import FeaturedStory from '../../../global-components/featured-story'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'

const CardsFeaturedStoryList = (props) => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      imageSize = '',
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useAppContext()
  const includedFields = `headlines.basic,subheadlines.basic,${includeCredits},${includePromoItems},${includePromoItemsCaptions},websites.${arcSite}.website_url,${includePrimarySection(
    { arcSite }
  )},${includeSections},publish_date,display_date`

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'no-presets',
        includedFields,
      }),
      filter: `
      {
        content_elements { 
          headlines { basic }
          credits {
            by { name url type }
          }
          promo_items {
            basic { 
              url 
              type
              subtitle
              caption
            }
            basic_video {
              promo_items {
                basic { 
                  url 
                  type
                  subtitle
                  caption
                }
              }
            }
            basic_jwplayer {
              subtype
              type
              embed{
                config{
                  thumbnail_url
                }
              }
            }
            basic_gallery {
              promo_items {
                basic { 
                  url 
                  type
                  subtitle
                  caption
                }
              }
            }
          }
          websites {
            ${arcSite} {
              website_url
              website_section {
                name
                path
              }
            }
          }
          taxonomy { 
            sections {
              name
              path 
            }
          }
          publish_date
          display_date
        }
      }
      `,
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
  })

  return (
    <>
      {contentElements.map((data) => {
        storyData.__data = data
        const {
          primarySection,
          primarySectionLink,
          title,
          websiteLink,
          author,
          authorLink,
          multimediaType,
          multimediaSubtitle,
          multimediaCaption,
          multimedia,
        } = storyData
        return (
          <FeaturedStory
            key={`ft-list-${websiteLink}`}
            primarySection={primarySection}
            primarySectionLink={primarySectionLink}
            title={title}
            websiteLink={websiteLink}
            author={author}
            authorLink={authorLink}
            multimediaType={multimediaType}
            multimediaSubtitle={multimediaSubtitle}
            multimediaCaption={multimediaCaption}
            multimedia={multimedia}
            imageSize={imageSize}
            arcSite={arcSite}
          />
        )
      })}
    </>
  )
}

CardsFeaturedStoryList.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
    imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcialBot: 'Parcial inferior',
        parcialTop: 'Parcial Superior',
        complete: 'Completa',
      },
      defaultValue: 'parcialBot',
    }),
  }),
}

CardsFeaturedStoryList.label = 'Listado de destaques'
CardsFeaturedStoryList.static = true

export default CardsFeaturedStoryList
