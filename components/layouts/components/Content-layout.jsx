import React, { Component } from 'react'
import { FormatClassName } from '../../../src/utilsJs/utilities'

const styles = FormatClassName([
    'flex',
    'flex__column'
])

class ContentLayout extends Component {
    render() {

        return(
            <div className={styles}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentLayout;