import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import getLatinDate from '../../../utilities/date-name'

const CardsTabloidStory = props => {
  /* const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props */
  const { customFields: { section = '', storyNumber = 0 } = {} } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const { content_elements: contentElements = [] } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: {
        section,
        stories_qty: 1,
        feedOffset: storyNumber,
        preset1: '394x222',
        preset2: '9x5',
      },
      filter: `
      {
        content_elements {
          display_date
          websites {
            ${arcSite} {
              website_url
            }
          }
          headlines{
            basic
          }
          taxonomy {
            primary_section { 
              name 
              path
            }
          }
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                preset1
                preset2
              } 
            }
            basic_video {
              promo_items {
                basic { 
                  url 
                  type 
                  resized_urls { 
                    preset1
                    preset2
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
                    preset2
                  } 
                }
              }
            }
          }
        }
      }
    `,
    }) || {}
  const data = contentElements[0] || {}

  const {
    promo_items: {
      basic: { resized_urls: { preset1, preset2: lazyImg } = {} } = {},
    } = {},
  } = data

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimedia,
    title, // { headlines { basic } }
    date,
    // multimediaType, // { promo_items }
    primarySectionLink, // { taxonomy { primary_section { path } } }
    primarySection, // { taxonomy { primary_section { name } } }
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
      <h4 className="flex justify-center bg-base-200 p-10">
        <a
          className="text-white font-bold text-xl uppercase"
          href={primarySectionLink}>
          {primarySection}
        </a>
      </h4>
      <div className="pt-35">
        <a href={websiteLink} className="mb-40 flex justify-center">
          <time dateTime={date} className="text-xl text-gray-300 font-bold">
            {date && getLatinDate(date, ' del', true)}
          </time>
        </a>
        <a className="flex justify-center" href={websiteLink}>
          <picture className="inline-block pl-10 pr-10">
            <img
              className={`${
                isAdmin ? '' : 'lazy'
              } tabloid-story__img w-full object-cover`}
              src={isAdmin ? imageSrc : lazyImg}
              data-src={imageSrc}
              alt={title}
            />
          </picture>
        </a>
      </div>
    </div>
  )
}

CardsTabloidStory.label = 'Tabloide - nota'
CardsTabloidStory.static = true

CardsTabloidStory.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
      description:
        'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
    storyNumber: PropTypes.number.tag({
      name: 'Posición de la historia',
      description:
        'Si no se completa el campo, la posición de la historia será 0 (la última historia publicada)',
      group: 'Configuración',
      min: 0,
      defaultValue: 0,
    }),
  }),
}

export default CardsTabloidStory
