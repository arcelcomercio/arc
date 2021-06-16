import * as React from 'react'
import { FC } from 'types/features'

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
interface FeatureProps {
  small?: string
  large?: string
  medium?: string
  caption?: string
  subtitle?: string
}

const StoryHeaderChildPicture: FC<FeatureProps> = (data) => {
  const large = data?.large || ''
  const small = data?.small || ''
  const medium = data?.medium || ''
  const caption = data?.caption || ''

  const renderCompleteImage = () => (
    <>
      <source srcSet={small} media="(max-width: 360px)" />
      <source srcSet={medium} media="(max-width: 768px)" />
      <img src={large} alt={caption} className={classes.image} />
    </>
  )

  return (
    <figure>
      <picture>{renderCompleteImage()}</picture>
    </figure>
  )
}

export default React.memo(StoryHeaderChildPicture)
