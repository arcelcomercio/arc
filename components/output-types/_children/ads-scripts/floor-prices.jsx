import React from 'react'
import { useFusionContext } from 'fusion:context'

export default () => {
  const { arcSite, globalContent = {} } = useFusionContext()

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent || {}

  return (
    <>
      {arcSite === 'peru21' && (
        <script
          defer
          src="https://storage.googleapis.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/-opt.js"
        />
      )}
    </>
  )
}
