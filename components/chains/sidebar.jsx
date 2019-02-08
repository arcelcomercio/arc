import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

const styles = [
    //'content--1col',
    'content--grid-base',
    'col-1'
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

class Sidebar extends Component {
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


Sidebar.propTypes = {
    customFields: PropTypes.shape({
      dynamicHeight: PropTypes.bool.tag({ name: "¿Alto auto-ajustable?", group: "Opciones"}),
    })
}

export default Sidebar;