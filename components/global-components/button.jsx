import React from 'react'

/**
 * @description Botón + ícono reutilizable.
 *
 * @param {Object} props Propiedades.
 * @param {string} props.iconClass Clases de estilos para el ícono.
 * Si este parámetro está vacío no se imprime el ícono.
 * @param {string} props.btnClass Clases de estilos para el botón.
 * @param {string} props.btnText Texto del botón.
 * @param {string} props.btnLink Enlace al que dirige el botón.
 * @param {Function} props.onClick Función asignada al evento onClick del botón.
 *
 * @returns {HTMLAnchorElement} Elemento <a...> con un ícono interno,
 * con comportamiento de botón y completamente accesible.
 */


export default props => {
  const { iconClass, btnClass, btnText, btnLink, onClick } = props

  return (
    <a
      className={btnClass}
      href={btnLink}
      onClick={onClick}
      tabIndex="0"
      role="button">
      {iconClass && <i className={iconClass} />}
      <span>{btnText}</span>
    </a>
  )
}
