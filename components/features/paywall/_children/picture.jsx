/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import PropTypes from 'prop-types'
import templayed from 'templayed'
import styled, { withTheme } from 'styled-components'
import {
  spacing,
  flexbox,
  sizing,
  positions,
  shadows,
  display,
} from '@material-ui/system'
import URL from 'url-parse'

const NoLineHeightPicture = styled.picture`
  line-height: 0px;
`

const Picture = props => {
  const {
    theme,
    hideOnMedia,
    hideOnScreenSize,
    src,
    types,
    ...restProps
  } = props

  // Resolvemos la extension de la ruta con el primer formato indicado en types
  const imgSrc = templayed(src)({ ext: types[0] })
  const { pathname, query } = new URL(imgSrc)
  const regex = new RegExp(`(?:[/\\]?)([\\w-]+)[.](${types.join('|')})$`)
  const match = pathname.match(regex)
  if (!match) throw new Error('Picture does not support that extension')

  return (
    <NoLineHeightPicture>
      {(hideOnMedia || hideOnScreenSize) && (
        <source
          media={hideOnMedia || theme.breakpoints.down(hideOnScreenSize, false)}
          srcSet={theme.images.pixel}
        />
      )}
      {types.map(type => (
        <source
          key={`source_${type}`}
          srcSet={pathname.replace(/\.[\w-]+$/, `.${type}`) + (query || '')}
          type={`image/${type}`}
        />
      ))}
      <img src={imgSrc} {...restProps} />
    </NoLineHeightPicture>
  )
}

const StyledPicture = styled(Picture)`
  ${spacing}
  ${flexbox}
  ${sizing}
  ${positions}
  ${shadows}
  ${display}
`

StyledPicture.propTypes = {
  /**
   * Uri de la imagen. Opcionalemente la extension puede expresarse
   * con la variable {{ext}}
   */
  src: PropTypes.string.isRequired,

  /**
   * Lista de extensiones de tipo de imagen disponibles en este picture
   */
  types: PropTypes.arrayOf(PropTypes.string),

  /**
   * No mostrar en pantallas con tamaño igual o menor al breakpoint
   * especificado (xs, sm, md, lg, xl)
   */
  hideOnScreenSize: PropTypes.string,

  /**
   * No mostrar en pantallas con tamaño igual o menor al media query
   * especificado
   */
  hideOnMedia: PropTypes.string,

  /**
   * Altura de la imagen. Esta propiedad es responsiva y soporta los
   * breakpoints (xs, sm, md, lg, xl)
   */
  height: PropTypes.string,

  /**
   * Ancho de la imagen. Esta propiedad es responsiva y soporta los
   * breakpoints (xs, sm, md, lg, xl)
   */
  width: PropTypes.string,

  /**
   * Texto alternativo de la imagen
   */
  alt: PropTypes.string,
}

export default withTheme(StyledPicture)
