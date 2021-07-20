import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'

function HeaderWithBackground({
  customFields: {
    logo,
    logoLink,
    logoAlt,
    backgroundImg,
    backgroundColor,
    classDiv,
    heightDiv,
    heightImg,
  },
}) {
  const { contextPath, arcSite } = useFusionContext()

  return (
    <div
      className={`f f-center ${classDiv || 'div-custom-background'}`}
      style={{
        backgroundColor: backgroundColor || 'transparent',
        backgroundImage: backgroundImg ? `url("${backgroundImg}")` : 'none',
        height: heightDiv || '86px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}>
      <a href={logoLink} className="h-full f f-center">
        <img
          src={
            logo ||
            `${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/logo.png?d=1`
          }
          alt={logoAlt || 'Logo'}
          style={{ height: heightImg || '80%' }}
        />
      </a>
    </div>
  )
}

// HeaderWithBackground.static = true
HeaderWithBackground.label = 'Cabecera - Fondo personalizable'

HeaderWithBackground.propTypes = {
  customFields: PropTypes.shape({
    logo: PropTypes.string.tag({
      name: 'Logo',
      description: 'Url de la imagen',
    }),
    logoLink: PropTypes.string.tag({
      name: 'Enlace de redireccionamiento del logo',
      description:
        'Por defecto la url del logo es "/". Ejemplo de path: "/somos"',
    }),
    logoAlt: PropTypes.string.tag({
      name: 'SEO: atributo "alt" del Logo',
    }),
    backgroundImg: PropTypes.string.tag({
      name: 'Imagen de fondo',
      description: 'Url de la imagen',
    }),
    backgroundColor: PropTypes.string.tag({
      name: 'Color de fondo',
      description: 'En Hex, ejemplo: #252256',
    }),
    classDiv: PropTypes.string.tag({
      name: 'Identificador del div con clase',
      description:
        'Sirve para identificar el div por clase. ejem: div_contenedor',
    }),
    heightDiv: PropTypes.string.tag({
      name: 'Altura del div',
      description: 'por defecto esta en 86px (poner con el "px")',
    }),
    heightImg: PropTypes.string.tag({
      name: 'Altura de la imagen en %',
      description: 'por defecto esta en 80% (poner con el "%")',
    }),
  }),
}

export default HeaderWithBackground
