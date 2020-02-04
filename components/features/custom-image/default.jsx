import React from 'react'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import { defaultImage } from '../../utilities/helpers'

const classes = { lazy: 'lazy' }

const CustomImage = props => {
  const { isAdmin, arcSite, contextPath, deployment } = useFusionContext()

  const lazyImg = defaultImage({ arcSite, contextPath, deployment, size: 'md' })

  const {
    customFields: {
      imgUrlDesktop = '',
      imgUrlMobile = '',
      imgTitle = '',
      imgAlt,
      imgLink = '',
      imgWidth = '',
    } = {},
  } = props

  if (imgUrlDesktop === '')
    return <div>Modulo imagen, clic en editar para configurar.</div>

  const picture = (
    <picture>
      {imgUrlMobile !== '' && (
        <source
          media="(max-width: 650px)"
          srcSet={isAdmin ? imgUrlMobile : lazyImg}
          data-srcset={imgUrlMobile}
          className={isAdmin ? '' : classes.lazy}
        />
      )}
      <img
        src={isAdmin ? imgUrlDesktop : lazyImg}
        data-src={imgUrlDesktop}
        alt={imgAlt}
        {...(imgTitle !== '' ? { title: imgTitle } : {})}
        {...(imgWidth !== '' ? { width: imgWidth } : { width: '100%' })}
        className={isAdmin ? '' : classes.lazy}
      />
    </picture>
  )

  if (imgLink !== '') {
    return (
      <div>
        <a href={imgLink}>{picture}</a>
      </div>
    )
  }

  return <div>{picture}</div>
}

CustomImage.propTypes = {
  customFields,
}
CustomImage.label = 'Imagen con enlace'
CustomImage.static = true

export default CustomImage
