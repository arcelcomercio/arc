import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStory from '../../../global-components/featured-story'
import StoryData from '../../../utilities/story-data'

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
  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: contentConfigValues,
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
              website_section {
                name
                path
              }
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
          website_url
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
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'md',
    })
    return {
      category: {
        name: primarySection,
        url: primarySectionLink,
      }, // Se espera un objeto {name: '', url: ''}
      title: {
        name: title,
        url: websiteLink,
      }, // Se espera un objeto {name: '', url: ''}
      author: {
        name: author,
        url: authorLink,
      }, // Se espera un objeto {name: '', url: ''}
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

  return (
    <>
      {contentElements.map(data => (
        <FeaturedStory key={formatData(data).title.url} {...formatData(data)} />
      ))}
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
