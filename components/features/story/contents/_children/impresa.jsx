import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  paperNav: 'paper-nav position-relative vv',
}

const RenderRelatedContentImpresa = ({
  url, 
  subtitle, 
  // width, 
  // height
}) => {
  return (
    <figure className={classes.paperNav}>
      <Image
        src={url}
        width={617}
        height={637}
        sizes="(max-width: 360px) 320px, 617px"
        alt={subtitle}
        className={classes.image}
      />
    </figure>
  )
}
export default RenderRelatedContentImpresa
