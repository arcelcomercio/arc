import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStory from '../../../global-components/featured-story'
import StoryData from '../../../utilities/story-data'
import {
  includePromoItems,
  includePromoItemsCaptions,
  includePrimarySection,
  includeSections,
} from '../../../utilities/included-fields'

/**
 * TODO:
 * Separar _dependencies
 *
 */

const CardsFeaturedStoryList = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      imageSize = '',
    } = {},
  } = props
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const presets =
    'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
  const includedFields = `headlines.basic,subheadlines.basic,credits.by.name,credits.by.url,credits.by.type,${includePromoItems},${includePromoItemsCaptions},websites.${arcSite}.website_url,${includePrimarySection},${includeSections},publish_date,display_date`

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
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
              resized_urls { 
                landscape_l 
                landscape_md 
                portrait_md 
                square_s
                lazy_default 
              } 
            }
            basic_video {
              promo_items {
                basic { 
                  url 
                  type
                  subtitle
                  caption
                  resized_urls { 
                    landscape_l 
                    landscape_md 
                    portrait_md 
                    square_s
                    lazy_default 
                  } 
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
                  resized_urls { 
                    landscape_l 
                    landscape_md 
                    portrait_md 
                    square_s
                    lazy_default 
                  } 
                }
              }
            }
          }
          websites {
            ${arcSite} {
              website_url
            }
          }
          taxonomy { 
            primary_section { 
              name
              path 
            }
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

  const formatData = data => {
    const {
      websiteLink, // { websites { ${arcsite} { website_url } } }
      multimediaLandscapeMD,
      multimediaLandscapeL,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      title, // { headlines { basic } }
      multimediaType, // { promo_items }
      primarySectionLink, // { taxonomy { primary_section { path } } }
      primarySection, // { taxonomy { primary_section { name } } }
      author,
      authorLink,
      multimediaSubtitle,
      multimediaCaption,
    } = data

    return {
      category: {
        name: primarySection,
        url: primarySectionLink,
      },
      title: {
        name: title,
        url: websiteLink,
      },
      author: {
        name: author,
        url: authorLink,
      },
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS, // Url de la imágen
      multimediaLazyDefault,
      imageSize, // Se espera "parcialBot", "parcialTop" o "complete"
      // headband, // OPCIONAL, otros valores: "live"
      // size, // Se espera "oneCol" o "twoCol"
      // hightlightOnMobile,
      // editableField, // OPCIONAL, o pasar la función editableField de los props
      // titleField, // OPCIONAL, o pasar el customField de los props
      // categoryField, // OPCIONAL, o pasar el customField de los props
      multimediaType,
      isAdmin,
      multimediaSubtitle,
      multimediaCaption,
    }
  }

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'md',
  })

  return (
    <>
      {contentElements.map(data => {
        storyData.__data = data
        const formattedData = formatData(storyData)
        return (
          <FeaturedStory key={formattedData.title.url} {...formattedData} />
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
