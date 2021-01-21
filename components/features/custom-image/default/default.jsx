import * as React from 'react'

import customFields from './_dependencies/custom-fields'
import Image from '../../../global-components/image'

const classes = {
  image: 'w-full h-full object-contain',
}

const CustomImageFeat = ({
  customFields: {
    imgUrl,
    imgTitle,
    imgAlt,
    imgLink,
    imgHeight,
    lazyload,
    cols,
    rows,
  } = {},
}) => {
  const containerClass = cols && rows ? `block ${cols} md:${rows}` : 'block'
  const styleHeight = { height: imgHeight }
  const W_COL1 = 307
  const W_COL2 = 633
  const W_COL3 = 960
  const H_AUTO = 0

  let width = W_COL1
  if (cols === 'col-2') width = W_COL2
  if (cols === 'col-3') width = W_COL3

  let height = H_AUTO
  if (rows === 'row-2') height = H_AUTO
  if (rows === 'w-full') height = imgHeight || H_AUTO

  if (!imgUrl)
    return (
      <div className={containerClass}>
        Modulo imagen, clic en editar para configurar.
      </div>
    )

  const sizes =
    width !== W_COL1
      ? `(max-width: 360px) 320px, (max-width: 480px) 420px, ${width}px`
      : ''
  const loading = lazyload ? 'lazy' : 'auto'
  const picture = (
    <Image
      src={imgUrl}
      width={width}
      height={height}
      style={styleHeight}
      alt={imgAlt}
      title={imgTitle}
      className={classes.image}
      loading={loading}
      sizes={sizes}
    />
  )

  if (imgLink) {
    return (
      <div>
        <a itemProp="url" className={containerClass} href={imgLink}>
          {picture}
        </a>
      </div>
    )
  }

  return <div className={containerClass}>{picture}</div>
}

CustomImageFeat.propTypes = {
  customFields,
}
CustomImageFeat.label = 'Imagen con enlace'
CustomImageFeat.static = true

export default CustomImageFeat
