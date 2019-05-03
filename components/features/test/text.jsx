import React from 'react'
import PropTypes from 'prop-types'

import { customWidth } from '../../../resources/utilsJs/custom-fields'

export default function TextTest(props) {
  const {
    customFields: { layout: { customWidth: { column = '' } } = {} } = {},
  } = props

  return (
    <p className={column}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit magnam
      eaque itaque reprehenderit, commodi est pariatur ducimus repudiandae
      reiciendis vero consequuntur ea expedita cumque nobis sapiente autem, qui
      architecto in!
    </p>
  )
}

TextTest.propTypes = {
  customFields: PropTypes.shape({
    layout: customWidth,
  }),
}
