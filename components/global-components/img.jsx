import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'
import { defaultImage } from '../utilities/assets'
import { createResizedParams } from '../utilities/resizer/resizer'

const CustomImg = ({
  src,
  dataSrc,
  alt,
  loading,
  filterQuality,
  className,
  style,
  width = 640,
  height = 360,
}) => {
  /**
   * Se espera el atributo `loading` para simular los
   * estandares actuales, asi el codigo esta preparado
   * para cuando este estandar sea mayormente aceptado.
   */
  const lazy = loading === 'lazy'
  const presets = { image: { width, height } }
  const { arcSite, contextPath } = useAppContext()

  /**
   * Si tiene lazy activado acepta la imagen por
   * `dataSrc` o `src`, este ultimo caso para alinearse
   * a los estandares actuales.
   */
  const { image } = createResizedParams({
    url: lazy ? dataSrc || src : src,
    presets,
    arcSite,
    filterQuality,
  })

  return (
    <Static id={`image:${presets}`}>
      <img
        src={lazy ? defaultImage({ contextPath, arcSite }) : image}
        data-src={lazy ? image : null}
        alt={alt || ''}
        className={`${lazy ? 'lazy' : ''} ${className}`}
        style={style || {}}
      />
    </Static>
  )
}

export default CustomImg
