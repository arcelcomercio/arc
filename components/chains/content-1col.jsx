import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../src/utilsJs/utilities'

const styles = FormatClassName([
    //'content--1col',
    'content--grid-base',
    'col-1'
])

class Content1Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={styles}>
                {children}
            </section>
        )
    }
}

export default Content1Col;