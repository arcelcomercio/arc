import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { FC } from 'types/features'

const PollaFooter: FC = () => {
  const { arcSite } = useAppContext()
  const { siteDomain } = getProperties(arcSite)

  return (
    <div className="polla-footer">
      <span>Copyright© {siteDomain} - Grupo El Comercio - </span>
      <span>Todos los derechos reservados.</span>
    </div>
  )
}

PollaFooter.label = 'La Polla - Footer'
PollaFooter.static = true

export default PollaFooter
