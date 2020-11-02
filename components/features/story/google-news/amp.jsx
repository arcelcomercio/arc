import React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import GoogleNews from '../../../global-components/google-news'

const StoryGoogleNewsAmp = props => {
  const { customFields: { customUrl = '', customText = '' } = {} } = props
  const { outputType } = useAppContext()
  return (
    <div className="pr-20 pl-20">
      <GoogleNews url={customUrl} text={customText} outputType={outputType} />
    </div>
  )
}

StoryGoogleNewsAmp.label = 'Artículo - Google News'
StoryGoogleNewsAmp.static = true

StoryGoogleNewsAmp.propTypes = {
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

export default StoryGoogleNewsAmp
