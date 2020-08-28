import React from 'react'
import PropTypes from 'prop-types'
import GoogleNews from '../../../global-components/google-news'

const StoryGoogleNews = props => {
  const { customFields: { customUrl = '', customText = '' } = {} } = props
  return <GoogleNews url={customUrl} text={customText} />
}

StoryGoogleNews.label = 'Artículo - Google News'
StoryGoogleNews.static = true

StoryGoogleNews.propTypes = {
  customFields: PropTypes.shape({
    customUrl: PropTypes.string.tag({
      name: 'Link de google news',
    }),
    customText: PropTypes.string.tag({
      name: 'Texto personalizado',
      description:
        'Personalización del texto previo a "Google News" (Respetar las mayusculas y minusculas).',
    }),
  }),
}

export default StoryGoogleNews
