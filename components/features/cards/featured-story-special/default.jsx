import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  includePrimarySection,
  includePromoItems,
  includeSections,
} from '../../../utilities/included-fields'

/**
 * TODO:
 * Extraer classes
 * Extrear _dependencies
 * Separar vista de controlador
 * Aplicar Lazyload para las imagenes (guiate del destaque global)
 */

const CardsFeaturedStorySpecial = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const presets = 'landscape_xl:980x528,landscape_l:648x374'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePrimarySection},${includeSections}`

  const data = useContent({
    source: contentService,
    query: Object.assign(contentConfigValues, { presets, includedFields }),
    filter: `
      headlines { basic }
      promo_items {
        basic { 
          url 
          type 
          resized_urls { 
            landscape_xl
            landscape_l
            lazy_default
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                landscape_xl
                landscape_l
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
              resized_urls { 
                landscape_xl
                landscape_l
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
    `,
  })

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimediaLandscapeXL,
    multimediaLandscapeL,
    multimediaLazyDefault,
    title, // { headlines { basic } }
    // multimediaType, // { promo_items }
    primarySectionLink, // { taxonomy { primary_section { path } } }
    primarySection, // { taxonomy { primary_section { name } } }
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'lg',
  })

  return (
    <div className="featured-special position-relative">
      <a
        itemProp="url"
        href={websiteLink}
        className="featured-special__img-link block h-full">
        <picture className="featured-special__picture block">
          <source
            className={isAdmin ? '' : 'lazy'}
            media="(max-width: 1023px)"
            type="image/jpeg"
            srcSet={isAdmin ? multimediaLandscapeL : multimediaLazyDefault}
            data-srcset={multimediaLandscapeL}
          />
          <img
            className={`${
              isAdmin ? '' : 'lazy'
            } featured-special__img w-full object-cover`}
            src={isAdmin ? multimediaLandscapeXL : multimediaLazyDefault}
            data-src={multimediaLandscapeXL}
            alt={title}
          />
        </picture>
      </a>
      <div className="featured-special__content overflow-hidden position-absolute ml-20 mb-20 md:ml-40 md:mb-40 bottom-0">
        <a
          itemProp="url"
          href={primarySectionLink}
          className="featured-special__section-link inline-block font-bold text-white p-5 pl-30 pr-30 mb-15 text-xl bg-primary">
          {primarySection}
        </a>
        <h2 itemProp="name" className="featured-special__title-link block">
          <a
            itemProp="url"
            href={websiteLink}
            className="text-white font-bold line-h-sm title-md ">
            {title}
          </a>
        </h2>
      </div>
    </div>
  )
}

CardsFeaturedStorySpecial.label = 'Destaque especial'
CardsFeaturedStorySpecial.static = true

CardsFeaturedStorySpecial.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default CardsFeaturedStorySpecial
