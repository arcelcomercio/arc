import * as React from 'react'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'

import InfectedAverage from './_children/infected-average'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => {
  const { globalContent: data, requestUri } = useAppContext()
  const uri = requestUri.split('/')[2]
  const distrito = data.filter(el => el.dis_prov_slug === uri)[0]
  return (
    <>
      <InfectedAverage {...distrito}></InfectedAverage>
    </>
  )
}

StaticsCovid.static = true
StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
