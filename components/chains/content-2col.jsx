import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../resources/utilsJs/utilities'

const styles = FormatClassName([
    //'content--1col',
    //'content--2col',
    'content--grid-base',
    'col-2'
])

class Content2Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={styles}>
                {children}
            </section>
        )
    }
}

export default Content2Col;