import React from 'react'
import { useFusionContext } from 'fusion:context'

import { lgFloorPrices, smFloorPrices } from './scripts/main'

export default () => {
  const { globalContent = {}, arcSite } = useFusionContext()
  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent || {}

  const section = (primarySection || sectionId || _id || '').split('/')[1]

  return (
    <>
      {arcSite === 'depor' && section === 'futbol-peruano' && (
        <script
          dangerouslySetInnerHTML={{
            __html: lgFloorPrices,
          }}
        />
      )}
      {arcSite === 'peru21' && section === 'espectaculos' && (
        <script
          dangerouslySetInnerHTML={{
            __html: smFloorPrices,
          }}
        />
      )}
    </>
  )
}
