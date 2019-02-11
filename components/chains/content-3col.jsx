import React, { Fragment, Component } from 'react'

const styles = [
    // 'content--1col',
    // 'content--2col',
    // 'content--3col',
    'content--grid-base',
    'col-3'
]

class Content3Col extends Component {
    render(){

        const { children } = this.props

        return(
            <section className={styles.join(' ')}>
                {children}
            </section>
        )
    }
}

export default Content3Col;