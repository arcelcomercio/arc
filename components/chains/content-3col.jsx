import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../resources/utilsJs/utilities'

const classes = FormatClassName([
    // 'content--1col',
    // 'content--2col',
    // 'content--3col',
    'content--grid-base',
    'col-3'
])

class Content3Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={classes}>
                {children}
            </section>
        )
    }
}

export default Content3Col;