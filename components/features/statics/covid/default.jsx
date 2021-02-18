import * as React from 'react'
import PropTypes from 'prop-types'
import Home from './_children/home'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */
const StaticsCovid = () => {
  return (
    <>
      <Home
        contagiados="2214785"
        recuperados="1991382"
        fallecidos="56093"
        uci="13"
        vacunados="43927"
      />
    </>
  )
}

StaticsCovid.static = true
StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
