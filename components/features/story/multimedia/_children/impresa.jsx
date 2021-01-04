import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  paperNav: 'paper-nav position-relative vv ',
  image: 'w-full ',
}

const RenderRelatedContentImpresa = ({ data: { basic = {} } = {} }) => {
  return (
    <figure className={classes.paperNav}>
      <Image
        src={basic.url}
        width={617}
        height={637}
        sizes="(max-width: 360px) 320px, 617px"
        alt={basic.subtitle}
        className={classes.image}
      />
    </figure>
  )
}
export default RenderRelatedContentImpresa
