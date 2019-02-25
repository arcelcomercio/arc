import React, { Component } from 'react'
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName([
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
                className={classes}>
                {this.props.elements}
            </div>
        )
    }
}

export default MainLayout;