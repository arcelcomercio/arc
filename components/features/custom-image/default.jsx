import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import customFields from './_dependencies/custom-fields'
import { defaultImage } from '../../utilities/helpers'
import { getResizedUrl } from '../../utilities/resizer'

const classes = { lazy: 'lazy' }

const CustomImage = ({
  customFields: {
    imgUrlDesktop = '',
    imgTitle = '',
    imgAlt,
    imgLink = '',
    imgHeight = '',
    cols = '',
    rows = '',
  } = {},
}) => {
  const { isAdmin, arcSite, contextPath, deployment } = useFusionContext()

  const lazyImg = defaultImage({ arcSite, contextPath, deployment, size: 'md' })

  const containerClass = `block ${cols} md:${rows}`

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
      ? getResizedUrl({
          url: imgUrlDesktop,
          presets: `desktop:${width}x${height},mobile:450x0`,
          arcSite,
        }) || {}
      : {}

  const resizedImg = isAdmin ? adminResizeImg : publicResizeImg
  const mobileResizedImg = isAdmin ? adminMobileImg : publicMobileImg

  if (imgUrlDesktop === '')
    return (
      <div className={containerClass}>
        Modulo imagen, clic en editar para configurar.
      </div>
    )

  const picture = (
    <picture>
      <source
        media="(max-width: 650px)"
        srcSet={isAdmin ? mobileResizedImg : lazyImg}
        data-srcset={mobileResizedImg}
        className={isAdmin ? '' : classes.lazy}
      />

      <img
        src={isAdmin ? resizedImg : lazyImg}
        data-src={resizedImg}
        alt={imgAlt}
        {...(imgTitle !== '' ? { title: imgTitle } : {})}
        className={`${isAdmin ? '' : classes.lazy} w-full h-full object-cover`}
      />
    </picture>
  )

  if (imgLink !== '') {
    return (
      <div>
        <a className={containerClass} href={imgLink}>
          {picture}
        </a>
      </div>
    )
  }

  return <div className={containerClass}>{picture}</div>
}

CustomImage.propTypes = {
  customFields,
}
CustomImage.label = 'Imagen con enlace'
CustomImage.static = true

export default CustomImage
