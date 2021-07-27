import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  paperNav: 'paper-nav position-relative vv ',
  image: 'w-full ',
}

const RenderRelatedContentImpresa = ({ url, subtitle, width, height }) => {
  const figureInlineStyle = {
    paddingBottom: `${(height * 100) / width}%`,
    height: 0,
    overflow: 'hidden',
  }
  return (
    <figure
      className={classes.paperNav}
      style={width && height ? figureInlineStyle : {}}>
      <Image
        src={url}
        width={617}
        height={0}
        sizes="(max-width: 360px) 320px, 617px"
        alt={subtitle}
        className={classes.image}
      />
    </figure>
  )
}
export default React.memo(RenderRelatedContentImpresa)
