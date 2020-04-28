import React from 'react'
import { useFusionContext } from 'fusion:context'

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
      {arcSite === 'depor' && (
        <script src="https://storage.googleapis.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/ayos-pro-comercio.js" />
      )}
      {arcSite === 'peru21' && (
        <script src="https://storage.googleapis.com/acn-comercio-peru-floor-prices-dev/comercioperu/web-script/ayos-opt.js" />
      )}
    </>
  )
}
