import React from 'react'
import PropTypes from 'prop-types'

import TitleWithImageChildSpecial from './_children/title-with-image'

const TitleWithImageSpecial = () => {
  return <TitleWithImageChildSpecial />
}

TitleWithImageSpecial.label = 'Especial - Título con imagen de fondo'
TitleWithImageSpecial.static = true

TitleWithImageSpecial.propType = {
  customFields: PropTypes.shape({
    idStory: PropTypes.string.tag({
      name: 'ID de historia',
    }),
  }),
}

export default TitleWithImageSpecial
