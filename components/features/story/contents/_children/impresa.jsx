import React from 'react'
import Image from '@arc-core-components/element_image'

const classes = {
  paperNav: 'paper-nav position-relative',
  paperPrev:
    'paper-nav__arrows position-absolute top-0 left-0 h-full flex items-center justify-center',
  paperNext:
    'paper-nav__arrows position-absolute top-0 right-0 h-full flex items-center justify-center',
  iconPrev: 'paper-nav__arrows--prev icon-left',
  iconNext: 'paper-nav__arrows--next icon-right',
}

const RenderRelatedContentImpresa = ({ data: { basic = {} } = {} }) => {
  const sizerImg = 'impresa'
  const ampClass = 'amp-'

  return (
    <>
      <div className={classes.paperNav}>
        <Image
          width="100%"
          layout="responsive"
          imgClassName={classes.image}
          captionClassName={`${ampClass}${classes.caption}`}
          sizePreset={sizerImg}
          {...basic}
        />
      </div>
    </>
  )
}
export default RenderRelatedContentImpresa
