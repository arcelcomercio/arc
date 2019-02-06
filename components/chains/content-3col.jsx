import React, { Fragment, Component } from 'react'

const styles = [
    'content--grid-base',
    'content-layout',
    'content--1col',
    'content--2col',
    'content--3col',
    'col-3'
]

class Content3Col extends Component {
    render(){
        return(
            <section className={styles.join(' ')}>
                {this.props.children}
            </section>
        )
    }
}

export default Content3Col;