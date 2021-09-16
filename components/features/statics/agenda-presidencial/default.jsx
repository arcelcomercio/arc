/* eslint-disable react/react-in-jsx-scope */
// import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'

import AgendaNota from './_children/nota'

// import * as React from 'react'
// import AgendaCalendario from './_children/calendario'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => (
  <>
    <AgendaNota />
  </>
)

StaticsCovid.label = 'Agenda Presidencial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
