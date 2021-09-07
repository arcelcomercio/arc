import PropTypes from 'prop-types'
import * as React from 'react'

const classes = {
  title: 'prueba',
}

const CustomTitleFeatLeo = (props) => {
  const { customFields: { isNegrita, isSubrayado } = {} } = props

  return (
    <>
      <div>
        <h1> my first component </h1>

        {`
       ${isNegrita ? <b>{classes.title}</b> : classes.title}
       ${isSubrayado ? <u>{classes.title}</u> : classes.title}
       ${
         isNegrita &&
         isSubrayado && (
           <b>
             <u>{classes.title}</u>
           </b>
         )
       }
       `}
      </div>
    </>
  )
}

CustomTitleFeatLeo.propTypes = {
  customFields: PropTypes.shape({
    isNegrita: PropTypes.bool.tag({
      name: 'negrita',
    }),
    isSubrayado: PropTypes.bool.tag({
      name: 'subrayado',
    }),
  }),
}

CustomTitleFeatLeo.label = 'Título Personalizable by Leo'
/* CustomTitleFeatLeo.static = true */

export default CustomTitleFeatLeo
