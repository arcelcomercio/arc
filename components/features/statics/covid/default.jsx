import * as React from 'react'
// import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
// import Home from './_children/home'
import QuestionList from './_children/question-list'
// import InfectedAverage from './_children/infected-average'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => {
  /*
  const { globalContent: data, requestUri } = useAppContext()
  const uri = requestUri.split('/')[2]
  const distrito = data.filter(el => el.dist_prov_slug === uri)[0]
  console.log(distrito)
  */
  return (
    <>
      {/*       
      <Home
        fecha="(Actualizado el 2 de octubre a las 10:30 am)"
        contagiados="2214785"
        recuperados="1991382"
        fallecidos="56093"
        uci="13"
        vacunados="43927"
      />
      */}
      <QuestionList />
    </>
  )
}

StaticsCovid.static = true
StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
