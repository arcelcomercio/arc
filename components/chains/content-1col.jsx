import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

const styles = [
    //'content--1col',
    'content--grid-base',
    'col-1'
]

class Content1Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={styles.join(' ')}>
                {children}
            </section>
        )
    }
}

export default Content1Col;