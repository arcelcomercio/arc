import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

const styles = [
    //'content--1col',
    //'content--2col',
    'content--grid-base',
    'col-2'
]

class Content2Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={styles.join(' ')}>
                {children}
            </section>
        )
    }
}

export default Content2Col;