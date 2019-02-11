import React, { Fragment, Component } from 'react'
import { FormatClassName } from '../../../src/utilsJs/utilities'

const styles = FormatClassName([
    'content--grid-base',
    'content-layout',
    'content--box',
    'content--1col',
    'content--2col',
    'content--3col',
    'col-3'
])
class ContentBox extends Component {
    render(){
        return(
            <section className={styles}>
                {this.props.children}
            </section>
        )
    }
}

export default ContentBox;