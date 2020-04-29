import React from 'react'
import { useFusionContext } from 'fusion:context'

export default () => {
  const { arcSite, globalContent } = useFusionContext()

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
  } = globalContent || {}

  const section = (primarySection || sectionId || _id || '').split('/')[1]

  return (
    <>
      {arcSite === 'depor' && section !== 'off-side' && (
        <script
          async
          src="https://storage.googleapis.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/ayos-pro-comercio.js"
        />
      )}
      {arcSite === 'peru21' && (
        <script
          defer
          src="https://storage.googleapis.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/ayos-opt.js"
        />
      )}
    </>
  )
}
