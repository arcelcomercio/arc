import React, { Component } from 'react'

const styles = [
    'content--grid-base',
    'content-layout',
    'content--1col',
    'content--2col',
    'content--3col',
    'margin-top'
]

class MainLayout extends Component {

    render() {

        return(
            <div 
                className={styles.join(' ')}>
                {this.props.elements}
            </div>
        )
    }
}

export default MainLayout;