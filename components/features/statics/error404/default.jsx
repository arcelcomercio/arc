import React from 'react'
import { useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import SearchInput from '../../../global-components/search-input'

const classes = {
  container:
    'error bg-gray-100 text-center w-full position-relative secondary-font pt-40 pb-40 pr-20 pl-40',
  title:
    'error__title text-xl mb-10 primary-font font-bold line-h-md lg:p-0 lg:pl-20 lg:pr-20',
  content: 'error__content text-sm pt-15 pb-15 inline-block line-h-md',
  link:
    'error__link inline-block text-sm pt-15 pb-15 font-bold text-gray-300 line-h-md',
  searchBox: 'pt-10 pb-20 m-0 mx-auto',
}

const Error404 = props => {
  const { customFields } = props
  const { arcSite } = useFusionContext()
  const { messages: { errorTitle, errorDescription } = {} } = getProperties(
    arcSite
  )
  const { title = errorTitle, description = errorDescription } = customFields
  const { editableField } = useEditableContent()

  return (
    <>
      <div role="group" className={classes.container}>
        <h3
          className={classes.title}
          {...editableField('title')}
          suppressContentEditableWarning>
          {title}
        </h3>
        <p
          className={classes.content}
          {...editableField('description')}
          suppressContentEditableWarning>
          {description}
        </p>
        <div role="search" className={classes.searchBox}>
          <SearchInput />
        </div>
        <a href="/" className={classes.link}>
          Volver a la página principal
        </a>
      </div>
      {/* <div className="datafromAjax" /> TODO: Falta implementar esta parte */}
    </>
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
  }),
}

export default Error404
