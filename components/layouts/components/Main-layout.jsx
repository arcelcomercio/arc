import React, { Component } from 'react'
import { FormatClassName } from '../../src/utilsJs/utilities'

const styles = FormatClassName([
    'content--grid-base',
    'content-layout',
    'content--1col',
    'content--2col',
    'content--3col',
    'margin-top'
])

class MainLayout extends Component {

    render() {

        return(
            <div 
                className={styles}>
                {this.props.elements}
            </div>
        )
    }
}

export default MainLayout;