import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

const styles = [
    //'content--1col',
    //'content--2col',
    'content--grid-base',
    'col-2'
]

const makeDynamic = () => {
    styles.splice(styles.indexOf('content--rows-height'))
    return(
        styles.join(' ')
    )
}

const makeStatic = () => {
    styles.push('content--rows-height')
    return(
        styles.join(' ')
    )
}

class Content2Col extends Component {
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


Content2Col.propTypes = {
    customFields: PropTypes.shape({
      dynamicHeight: PropTypes.bool.tag({ name: "¿Alto auto-ajustable?", group: "Opciones"}),
    })
}

export default Content2Col;