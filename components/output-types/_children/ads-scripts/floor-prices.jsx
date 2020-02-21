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

  const section = primarySection || sectionId || _id

  let cdnUrl = `https://cdnc.${siteDomain}/resources`
  if (arcSite === 'elcomerciomag') {
    cdnUrl = `https://cdnc.mag.elcomercio.pe/resources`
  }
  if (arcSite === 'peru21g21') {
    cdnUrl = `https://cdnc.g21.peru21.pe/resources`
  }

  const resourcesPath =
    ENVIRONMENT === 'elcomercio' ? cdnUrl : `${contextPath}/resources`

  return (
    <>
      {arcSite === 'depor' && section === '/futbol-peruano' && (
        <script
          defer
          src={deployment(`${resourcesPath}/assets/js/ads/lg-floor-prices.js`)}
        />
      )}
      {arcSite === 'peru21' && section === '/espectaculos' && (
        <script
          defer
          src={deployment(
            `${contextPath}/resources/assets/js/ads/sm-floor-prices.js`
          )}
        />
      )}
    </>
  )
}
