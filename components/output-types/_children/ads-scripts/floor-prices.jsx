import { useFusionContext } from 'fusion:context'
import React from 'react'

export default () => {
  const { arcSite } = useFusionContext()

  // const { section_id: sectionId } = globalContent || {}

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
