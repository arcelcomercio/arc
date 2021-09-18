/* eslint-disable react/react-in-jsx-scope */
// import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'

import Footer from './_children/footer'
// import * as React from 'react'
// import AgendaCalendario from './_children/calendario'
import NavBar from './_children/navbar'
import AgendaNota from './_children/nota'

/**
 * @see estilos `src/websites/elcomercio/agenda-presidencial.scss`
 */

const StaticsAgendaPresidencial = () => (
  <>
    <NavBar isNota day="2021-09-13" />
    <AgendaNota />
    <Footer />
  </>
)

StaticsAgendaPresidencial.label = 'Agenda Presidencial'

StaticsAgendaPresidencial.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsAgendaPresidencial
