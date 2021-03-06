import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import { getVerboseDate } from '../../../utilities/date-time/dates'
import {
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'

/**
 * TODO:
 * Extraer classes
 * Extrear _dependencies
 * Separar vista de controlador
 */

const CardsTabloidStory = (props) => {
  /* const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props */
  const { customFields: { section = '', storyNumber = 0 } = {} } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const data =
    useContent({
      source: 'story-by-section',
      query: {
        section,
        feedOffset: storyNumber,
        presets: 'preset1:394x222',
        includedFields: `websites.${arcSite}.website_url,display_date,headlines.basic,${includePrimarySection(
          { arcSite }
        )},${includePromoItems}`,
      },
      filter: `
      {
        display_date
        websites {
          ${arcSite} {
            website_url
            website_section {
              name
              path
            }
          }
        }
        headlines{
          basic
        }
        promo_items {
          basic { 
            url 
            type 
            resized_urls { 
              preset1
            } 
          }
          basic_video {
            promo_items {
              basic { 
                url 
                type 
                resized_urls { 
                  preset1
                } 
              }
            }
          }
          basic_jwplayer {
            subtype
            type
            embed{
              config{
                thumbnail_url
                resized_urls { 
                  landscape_xs
                  landscape_s
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
                  preset1
                } 
              }
            }
          }
        }
      }
    `,
    }) || {}

  const {
    promo_items: { basic: { resized_urls: { preset1 } = {} } = {} } = {},
  } = data

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimedia,
    multimediaLazyDefault,
    title, // { headlines { basic } }
    date,
    // multimediaType, // { promo_items }
    primarySectionLink,
    primarySection,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  const imageSrc = preset1 || multimedia

  return (
    <div className="tabloid-story row-1 bg-base-400">
      <h4 itemProp="name" className="flex justify-center bg-base-200 p-10">
        <a
          itemProp="url"
          className="text-white font-bold text-xl uppercase"
          href={primarySectionLink}>
          {primarySection}
        </a>
      </h4>
      <div className="pt-35">
        <a
          itemProp="url"
          href={websiteLink}
          className="mb-40 flex justify-center">
          <time dateTime={date} className="text-xl text-gray-300 font-bold">
            {date && getVerboseDate({ date, showTime: false })}
          </time>
        </a>
        <a itemProp="url" className="flex justify-center" href={websiteLink}>
          <picture className="inline-block pl-10 pr-10">
            <img
              className={`${
                isAdmin ? '' : 'lazy'
              } tabloid-story__img w-full object-cover`}
              src={isAdmin ? imageSrc : multimediaLazyDefault}
              data-src={imageSrc}
              alt={title}
            />
          </picture>
        </a>
      </div>
    </div>
  )
}

CardsTabloidStory.label = 'Tabloide - Art??culo'
CardsTabloidStory.static = true

CardsTabloidStory.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la secci??n',
      description:
        'Si no se coloca la URL de la secci??n, se renderiza la ??ltima historia publicada. Ejemplo: /deporte-total',
    }),
    storyNumber: PropTypes.number.tag({
      name: 'Posici??n de la historia',
      description:
        'Si no se completa el campo, la posici??n de la historia ser?? 0 (la ??ltima historia publicada)',
      group: 'Configuraci??n',
      min: 0,
      defaultValue: 0,
    }),
  }),
}

export default CardsTabloidStory
