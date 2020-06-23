import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'

import TitleWithImageChildSpecial from './_children/title-with-image'

const CONTENT_SOURCE = 'story-by-id'

const TitleWithImageSpecial = props => {
  const {
    customFields: {
      storyCode = '',
      hideTitle = false,
      hideSubtitle = false,
    } = {},
  } = props

  const story = useContent({
    source: CONTENT_SOURCE,
    query: {
      _id: storyCode,
      published: 'false',
    },
    filter: `{ 
      canonical_url 
      headlines { basic }
      subheadlines { basic }
      credits {
        by { name url type }
      }
      promo_items {
        basic { url type subtitle caption resized_urls { landscape_xl } }
      }
    }`,
  })

  const {
    headlines: { basic: storyTitle = '' } = {},
    promo_items: { basic: imageStory = {} } = {},
    subheadlines: { basic: storySubtitle = '' } = {},
  } = story || {}

  const params = {
    storyTitle,
    imageStory,
    storySubtitle,
    hideTitle,
    hideSubtitle,
  }

  return <TitleWithImageChildSpecial {...params} />
}

TitleWithImageSpecial.propTypes = {
  customFields: PropTypes.shape({
    storyCode: PropTypes.string.tag({
      name: 'ID de historia',
    }),
    hideTitle: PropTypes.bool.tag({
      name: 'Ocultar titulo',
    }),
    hideSubtitle: PropTypes.bool.tag({
      name: 'Ocultar subtitulo',
    }),
  }),
}

TitleWithImageSpecial.label = 'Especial - Título con imagen de fondo'
TitleWithImageSpecial.static = true

export default TitleWithImageSpecial
