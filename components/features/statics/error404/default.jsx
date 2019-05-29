import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import SearchInput from '../../../global-components/search-input'

const classes = {
  container: 'error__container text-center full-width position-relative',
  icon: 'error__icon position-absolute',
  title: 'error__title title mg-bottom-10',
  content: 'error__content text-sm pd-top-15 pd-bottom-15 inline-b',
  link: 'error__link inline-b text-sm pd-top-15 pd-bottom-15',
  searchBox: 'error__search-box pd-top-10 pd-bottom-20',
}

@Consumer
class Error404 extends PureComponent {
  render() {
    const {
      contextPath,
      customFields,
      editableField,
      siteProperties = {},
      globalContentConfig = {},
    } = this.props

    const { messages: { errorTitle, errorDescription } = {} } = siteProperties
    const { title = errorTitle, description = errorDescription } = customFields

    return (
      <>
        <div role="group" className={classes.container}>
          <i className={classes.icon} />
          <h3 className={classes.title} {...editableField('title')}>
            {title}
          </h3>
          <p className={classes.content} {...editableField('description')}>
            {description}
          </p>
          <div role="search" className={classes.searchBox}>
            <SearchInput
              globalContentConfig={globalContentConfig}
              contextPath={contextPath}
            />
          </div>
          <a href={contextPath} className={classes.link}>
            Volver a la página principal
          </a>
        </div>
        {/* <div className="datafromAjax" /> TODO: Falta implementar esta parte */}
      </>
    )
  }
}

Error404.label = 'Error 404'
Error404.static = true

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
