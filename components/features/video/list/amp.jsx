import React from 'react'

import { useFusionContext } from 'fusion:context'

import ConfigParams from '../../../utilities/config-params'

const classes = {
  taboola: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto ',
}

const VideoListAmp = () => {
  const {
    arcSite,
    siteProperties: {
      taboola: { dataModeAmp },
    },
  } = useFusionContext()

  return (
    <div className={classes.taboola}>
      {arcSite !== ConfigParams.SITE_GESTION && (
        <amp-embed // TODO: publicidad taboola x definir de parte del cliente // se Retira para gestion
          width="100"
          height="100"
          type="taboola"
          layout="responsive"
          heights="(min-width:1862px) 213%, (min-width:1293px) 218%, (min-width:909px) 226%, (min-width:647px) 236%, (min-width:500px) 252%, (min-width:397px) 272%, 297%"
          data-publisher={`grupoelcomercio-${
            arcSite === 'publimetro' ? 'publimetrope' : arcSite
          }`}
          data-mode={dataModeAmp}
          data-placement="Mobile Below Article Thumbnails AMP"
          data-target_type="mix"
          data-article="auto"
          data-url=""
        />
      )}
    </div>
  )
}

VideoListAmp.label = 'Artículo - Taboola'
VideoListAmp.static = true

export default VideoListAmp
