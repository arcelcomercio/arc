import * as React from 'react'
import PropTypes from 'prop-types'

/**
 * @todo Al hacer click a un mes, se debe redirigir al listado del mes que corresponde
 * @todo Se espera que el boton correspondiente al mes activo tenga un "estado" (que quede de otro color o algo asi)
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_hero.scss
 */
const StaticsResumen2020Hero = ({ title, year, subtitle, children }) => {
  return (
    <section>
      {children /** dejar este children, es la publicidad */}
    </section>
  )
}

StaticsResumen2020Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  children: PropTypes.node
}

export default StaticsResumen2020Hero