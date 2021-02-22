import * as React from 'react'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import Home from './_children/home'
import QuestionList from './_children/question-list'
// import InfectedAverage from './_children/infected-average'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => {
  
  // const { globalContent: { data = {} } = {}, requestUri } = useAppContext()
  /* const uri = requestUri.split('/')[3]
  const distrito = data.filter(el => el.dist_prov_slug === uri)[0]
  const {
    infected_by_date: infectedDate = [],
    dist_prov: distProv = '',
    desde_marzo: desdeMarzo = '',
    embed_chart: embedChart = '',
  } = distrito
  */

  return (
    <>
      <Home />
      {/* <QuestionList data={data.data} requestUri={requestUri} /> */}
    </>
  )
}

StaticsCovid.static = true
StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
