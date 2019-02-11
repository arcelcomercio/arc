import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../src/utilsJs/utilities'
import PropTypes from 'prop-types'

const styles = FormatClassName([
    //'content--1col',
    'content--grid-base',
    'col-1'
])

const makeDynamic = () => {
    styles.splice(styles.indexOf('content--rows-height'))
    return(
        styles
    )
}

const makeStatic = () => {
    styles.push('content--rows-height')
    return(
        styles
    )
}

class Content1Col extends Component {
    render(){

        const { customFields: { dynamicHeight }, children } = this.props

        return(
            <section className={
                dynamicHeight ? makeDynamic() : makeStatic()
            }>
                {children}
            </section>
        )
    }
}


Content1Col.propTypes = {
    customFields: PropTypes.shape({
      dynamicHeight: PropTypes.bool.tag({ name: "¿Alto de fila automático?", group: "Opciones"}),
    })
}

export default Content1Col;