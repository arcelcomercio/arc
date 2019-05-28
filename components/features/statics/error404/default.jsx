
import React, {PureComponent} from 'react'
import Consumer from 'fusion:consumer'
import SearchInput from '../../../global-components/search-input'
import PropTypes from 'prop-types'



const classes = {
    container:'error__container',
    iconCaretDown: 'error__icon',
    title:'error__title',
    content:'error__content',
    linkBox:'error__link-box',
    link:'error__link',
    searchBox: 'error__search-box'
}

@Consumer
class Error404 extends PureComponent{
    render(){
        const {
            contextPath,
            customFields,
            editableField,
            siteProperties = {},
            globalContentConfig = {}
          } = this.props

          const { messages: { errorTitle, errorDescription }  = {}} = siteProperties

        const { title = errorTitle, description = errorDescription } = customFields
        return(
            <>
                <div className={classes.container}>
                    <i className={classes.iconCaretDown}/>
                    <h3 className={classes.title} {...editableField('title')}>{title}</h3>
                    <p className={classes.content} {...editableField('description')}>{description}</p>
                    <div className={classes.searchBox}>
                        <SearchInput
                            globalContentConfig = {globalContentConfig}
                            contextPath = {contextPath}
                        />
                    </div>
                    <p className={classes.linkBox}>
                        <a href="#"className={classes.link}>
                            Volver a la página principal
                        </a>
                    </p>
                </div>
                <div className="datafromAjax">

                </div>
            </>
            
        )
    }
}

Error404.label = 'Error 404'

Error404.propTypes = {
    customFields: PropTypes.shape({
        title : PropTypes.string.isRequired.tag({
            name: 'Título',
            description: 'ingrese el titulo de manera obligatoria, Ejm: ¡Oops! ... Página no encontrada',
            default: 'lalala'
        }),
        description: PropTypes.string.isRequired.tag({
            name: 'Descripción',
            description: 'Ingrese un texto descriptivo, Ejm: La página que buscas no existe ...'
        })
    })
}

export default Error404