import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import getLatinDate from '../../../utilities/date-name'

const CardsTabloidStory = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
    filter: `
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
          landscape_md
        } 
      }
      basic_video {
        promo_items {
          basic { 
            url 
            type 
            resized_urls { 
              landscape_md
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
              landscape_md
            } 
          }
        }
      }
    }
    `,
  })

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimediaLandscapeMD,
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
              className="tabloid-story__img w-full object-cover"
              src={multimediaLandscapeMD}
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
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default CardsTabloidStory
