import PropTypes from 'prop-types'
import React from 'react'

import ErrorView from './_children/error-view'
import SearchView from './_children/search-view'

const Error404 = (props) => {
  const { customFields } = props

  return customFields?.activateSearchFunctionality ? (
    <SearchView customFields={customFields} />
  ) : (
    <ErrorView customFields={customFields} />
  )
}

Error404.label = 'Error 404'

Error404.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Título',
      description:
        'Ingrese un título personalizado, Ejm: ¡Oops! ... Página no encontrada',
    }),
    description: PropTypes.string.tag({
      name: 'Descripción',
      description:
        'Ingrese un texto descriptivo, Ejm: La página que buscas no existe ...',
    }),
    activateSearchFunctionality: PropTypes.bool.tag({
      name: 'Activar funcionalidad de buscador',
      description:
        'Al activar este checkbox, si la url empieza con /buscar, se activará la función del buscador.',
    }),
  }),
}

export default Error404
