import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../resources/utilsJs/utilities'

const classes = FormatClassName([
    //'content--1col',
    'content--grid-base',
    'col-1'
])

class Content1Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={classes}>
                {children}
            </section>
        )
    }
}

export default Content1Col;