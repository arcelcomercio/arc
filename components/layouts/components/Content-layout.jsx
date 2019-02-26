import React, { Component } from 'react'
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName([
    'flex',
    'flex--column'
])

class ContentLayout extends Component {
    render() {

        return(
            <div className={classes}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentLayout;