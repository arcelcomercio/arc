import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import Image from '@arc-core-components/element_image'
import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  paperNav: 'paper-nav position-relative vv',
}

const RenderRelatedContentImpresa = ({ data: { basic = {} } = {} }) => {
  const ampClass = 'amp-'

  const { arcSite } = useAppContext()
  const extractImage = urlImg =>
    createResizedParams({
      url: urlImg,
      presets: 'impresa:617x637',
      arcSite,
    }) || {}

  return (
    <>
      <div className={classes.paperNav}>
        <Static id="image">
          <Image
            width="100%"
            layout="responsive"
            imgClassName={classes.image}
            captionClassName={`${ampClass}${classes.caption}`}
            {...basic}
            url={extractImage(basic.url).impresa}
          />
        </Static>
      </div>
    </>
  )
}
export default RenderRelatedContentImpresa
