import React from 'react'
import PropTypes from 'prop-types'

import ContentBodyChildSpecial from './_children/content-body'

const ContentSpecialBody = () => {
  return <ContentBodyChildSpecial />
}

ContentSpecialBody.label = 'Especial - Contenido'
ContentSpecialBody.static = true

ContentSpecialBody.propType = {
  customFields: PropTypes.shape({
    idStory: PropTypes.string.tag({
      name: 'ID de historia',
    }),
  }),
}

export default ContentSpecialBody
