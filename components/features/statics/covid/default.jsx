import * as React from 'react'
import PropTypes from 'prop-types'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */
const StaticsCovid = () => {
  return <></>
}

StaticsCovid.static = true
StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
