import React from 'react'
import { useFusionContext } from 'fusion:context'

export default () => {
  const {
    siteProperties = {},
    globalContent = {},
    requestUri,
    metaValue,
    arcSite,
    contextPath,
    deployment,
  } = useFusionContext()
  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent || {}

  const section = sectionId || _id

  return (
    <>
      {arcSite === 'depor' && section === '/futbol-peruano' && (
        <script
          defer
          src={deployment(
            `${contextPath}/resources/assets/js/ads/lg-floor-prices.js`
          )}
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
