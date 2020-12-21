import * as React from 'react'

import Story from './story'

/**
 * @todo - El listado deberia tener la barra de carga al final que se activa justo 
 * antes de redirigir al siguiente mes. Si se llega al final de diciembre, no se 
 * carga la barra ni hace redireccion.
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_stories-list.scss
 */
const StaticsResumen2020StoriesList = ({ content }) => {
  return (
    <main>
      {/* 
        map
        seria bueno que cada nota tuviera un ID unico simple en el JSON para el atributo KEY 
      */}
      <Story></Story> 
    </main>
  )
}

export default StaticsResumen2020StoriesList