import * as React from 'react'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'

import InfectedAverage from './_children/infected-average'
import QuestionList from './_children/question-list'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => {
  const { globalContent: data, requestUri } = useAppContext()
  const uri = requestUri.split('/')[2]
  const distrito = data.filter(el => el.dist_prov_slug === uri)[0]
  console.log(distrito)
  return (
    <>
      {/* <InfectedAverage {...distrito}></InfectedAverage> */}
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
