import React from 'react'
import PropTypes from 'prop-types'

const LayoutParallax = ({ children = [] }) => {
  return (
    <>
      {children[0] /* Cabecera de página */}

      <div className="l-parallax">{children[1] /* Parallax Destacado */}</div>

      <div className="l-parallax__p" />
      <div className="l-parallax__g" />

      <div className="l-parallax__content" role="main">
        {children[2] /* Contenido */}

        {children[3] /* Contenido */}
      </div>
    </>
  )
}

LayoutParallax.propTypes = {
  children: PropTypes.node,
}

LayoutParallax.sections = [
  'Cabecera de página',
  'Parallax Destacado',
  'Contenido',
  'Pie de página',
]

export default LayoutParallax
