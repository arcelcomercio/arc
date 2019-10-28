import React from 'react'
import { useFusionContext } from 'fusion:context'
import HeaderChildStandardAmp from '../inverted/_children/header-amp'

const HeaderStandardAmp = () => {
  const {
    contextPath,
    arcSite,
    deployment,
    siteProperties,
  } = useFusionContext()

  const parameters = { contextPath, arcSite, deployment, siteProperties }

  return (
    <>
      <HeaderChildStandardAmp {...parameters} />
    </>
  )
}

HeaderStandardAmp.static = true

export default HeaderStandardAmp
