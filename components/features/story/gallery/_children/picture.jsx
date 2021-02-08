import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  image: 'story-content__gallery-img w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}
/**
 *
 * @todo confirmar si las galerias verticales tienen un
 * ancho maximo de dos columnas siempre para hacer la validacion aqui.
 * Veo que en produccion a veces las galerias verticales
 * tienen plantillas con tres columnas de ancho.
 */
const StoryHeaderChildPicture = ({
  url,
  caption,
  subtitle,
  // itemv,
  i,
} = {}) => {
  return (
    <Image
      src={url}
      width={980}
      height={0}
      sizes="(max-width: 360px) 314px, (max-width: 768px) 482px, 980px"
      alt={caption || subtitle}
      className={classes.image}
      loading={i === 0 ? 'auto' : 'lazy'}
    />
  )
}

export default React.memo(StoryHeaderChildPicture)
