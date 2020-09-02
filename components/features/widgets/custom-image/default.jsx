import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import customFields from './_dependencies/custom-fields'
import { defaultImage } from '../../../utilities/assets'
import { createResizedParams } from '../../../utilities/resizer/resizer'

const classes = {
  image: 'w-full h-full object-contain',
}

const CustomImageFeat = ({
  customFields: {
    imgUrlDesktop,
    imgTitle,
    imgAlt,
    imgLink,
    imgHeight,
    lazyload,
    cols,
    rows,
  } = {},
}) => {
  const { isAdmin, arcSite, contextPath, deployment } = useFusionContext()
  const lazyImg = defaultImage({ arcSite, contextPath, deployment, size: 'md' })
  const containerClass = cols && rows ? `block ${cols} md:${rows}` : 'block'
  const styleHeight = { height: imgHeight }

  let width = '307'
  if (cols === 'col-2') width = '633'
  if (cols === 'col-3') width = '960'

  let height = '0'
  if (rows === 'row-2') height = '0'
  if (rows === 'w-full') height = imgHeight || '0'

  const {
    resized_urls: {
      desktop: adminResizeImg = '',
      mobile: adminMobileImg = '',
    } = {},
  } =
    useContent(
      isAdmin && imgUrlDesktop
        ? {
            source: 'photo-resizer',
            query: {
              url: imgUrlDesktop,
              presets: `desktop:${width}x${height},mobile:450x0`,
            },
          }
        : {}
    ) || ''

  const { desktop: publicResizeImg = '', mobile: publicMobileImg = '' } =
    !isAdmin && imgUrlDesktop
      ? createResizedParams({
          url: imgUrlDesktop,
          presets: `desktop:${width}x${height},mobile:450x0`,
          arcSite,
        }) || {}
      : {}

  const resizedImg = isAdmin ? adminResizeImg : publicResizeImg
  const mobileResizedImg = isAdmin ? adminMobileImg : publicMobileImg

  if (!imgUrlDesktop)
    return (
      <div className={containerClass}>
        Modulo imagen, clic en editar para configurar.
      </div>
    )

  const picture = lazyload ? (
    <picture>
      <source
        media="(max-width: 639px)"
        srcSet={isAdmin ? mobileResizedImg : lazyImg}
        data-srcset={mobileResizedImg}
        className={isAdmin ? '' : 'lazy'}
      />
      <img
        src={isAdmin ? resizedImg : lazyImg}
        data-src={resizedImg}
        alt={imgAlt || ''}
        style={styleHeight}
        {...(imgTitle ? { title: imgTitle } : {})}
        className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
      />
    </picture>
  ) : (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobileResizedImg} />
      <img
        src={resizedImg}
        alt={imgAlt || ''}
        style={styleHeight}
        {...(imgTitle ? { title: imgTitle } : {})}
        className={classes.image}
      />
    </picture>
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
CustomImageFeat.label = 'Imagen con enlace - Nuevo'
CustomImageFeat.static = true

export default CustomImageFeat
