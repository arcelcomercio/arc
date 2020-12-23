import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  figure: 'main-img',
  image: 'main-img__img',
  caption: 'main-img__caption',
}

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_main-image.scss
 */
const StaticsResumen2020MainImage = ({ image, caption, month }) => {
  return (
    <figure className={classes.figure}>
      <Image
        src={image}
        width={1920}
        height={0}
        sizes="(max-width: 360px) 360px, (max-width: 540px) 540px, (max-width: 768px) 768px, (max-width: 1366px) 1366px, 1920px"
        alt={`La imagen más destacada de ${month}`}
        loading="eager"
        className={classes.image}
      />
      {caption ? (
        <figcaption className={classes.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}

export default React.memo(StaticsResumen2020MainImage)
