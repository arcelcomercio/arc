import React from 'react'
import Image from '@arc-core-components/element_image'

// Basic flex stuff
const classes = {
  paperNav: 'paper-nav ',
  paperPrev: 'paper-prev position-absolute top-0',
  paperNext: 'paper-next position-absolute top-0',
  iconPrev: 'icon-prev',
  iconNext: 'icon-next',
}

const RenderRelatedContentImpresa = ({ data: { basic = {} } = {} }) => {
  const sizerImg = 'impresa'
  const ampClass = 'amp-'
  return (
    <>
      <Image
        width="100%"
        layout="responsive"
        imgClassName={classes.image}
        captionClassName={`${ampClass}${classes.caption}`}
        sizePreset={sizerImg}
        {...basic}
      />
      <div className={classes.paperNav}>
        <a href="/impresa/presion-alta-498352" className={classes.paperPrev}>
          <i className={classes.iconPrev}> </i>
        </a>
        <a href="/impresa/coimas-498663" className={classes.paperNext}>
          <i className={classes.iconNext}> </i>
        </a>
      </div>
    </>
  )
}
export default RenderRelatedContentImpresa
