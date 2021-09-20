/* eslint-disable react/react-in-jsx-scope */
// 1.import { Footer } from 'components/features/footer/depor/_children/ComponentStyles'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import Footer from './_children/footer'
// 2.import AgendaCalendario from './_children/calendario'
import NavBar from './_children/navbar'
import AgendaNota from './_children/nota'

/**
 * @see estilos `src/websites/elcomercio/agenda-presidencial.scss`
 */

const StaticsAgendaPresidencial = () => {
  const { requestUri } = useAppContext()
  // 3.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNotaWeb = /\/agenda-presidencial\/(\d{4})-(\d{1,2})-(\d{1,2})\//.test(
    requestUri
  )
  // 4.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dateUrl = requestUri
    .split('?')[0]
    .split('/')
    .filter((item) => item)
    .pop()
  return (
    <>
      <NavBar />
      <AgendaNota />
      <Footer />
    </>
  )
}

/* 5.
<NavBar isNota={isNotaWeb} day={dateUrl} />
{isNotaWeb === true ? <AgendaNota /> : <AgendaCalendario />}
*/

StaticsAgendaPresidencial.label = 'Agenda Presidencial'

StaticsAgendaPresidencial.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsAgendaPresidencial
