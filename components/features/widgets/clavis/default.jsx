import React from 'react'
import { useFusionContext } from 'fusion:context'
import Clavis from '../../../utilities/analytics/clavis'

const ClavisComponent = () => {
  const { globalContent } = useFusionContext()

  const getClavisConfig = () => {
    const { _id, taxonomy } = globalContent || {}
    if (_id && taxonomy) {
      return {
        contentId: _id,
        auxiliaries:
          taxonomy.auxiliaries && taxonomy.auxiliaries.length > 0
            ? taxonomy.auxiliaries.map(aux => {
                return aux._id
              })
            : [],
        targetingUrl: 'https://targeting.perso.aws.arc.pub/api/v1/targeting',
      }
    }
    return {}
  }

  return <Clavis clavisConfig={getClavisConfig()} />
}

export default ClavisComponent
