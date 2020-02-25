import React from 'react'
import { useFusionContext } from 'fusion:context'
import { ENVIRONMENT } from 'fusion:environment'

export default () => {
  const {
    siteProperties: { siteDomain } = {},
    globalContent = {},
    arcSite,
    contextPath,
    deployment,
  } = useFusionContext()
  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent || {}

  let cdnUrl = `https://cdnc.${siteDomain}`
  if (arcSite === 'elcomerciomag') {
    cdnUrl = `https://cdnc.mag.elcomercio.pe`
  }
  if (arcSite === 'peru21g21') {
    cdnUrl = `https://cdnc.g21.peru21.pe`
  }

  const resourcesPath =
    ENVIRONMENT === 'elcomercio' ? cdnUrl : `${contextPath}/resources`

  const section = (primarySection || sectionId || _id || '').split('/')[1]

  return (
    <>
      {arcSite === 'depor' && section === 'futbol-peruano' && (
        <script
          src={deployment(`${resourcesPath}/assets/js/ads/lg-floor-prices.js`)}
        />
      )}
      {arcSite === 'peru21' && section === 'espectaculos' && (
        <script src="https://storage.cloud.google.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/ayos-opt.js" />
      )}
    </>
  )
}
