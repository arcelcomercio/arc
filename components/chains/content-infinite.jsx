import React, { Fragment, Component } from 'react'

const styles = [
    'content--grid-base',
    'content-layout',
    'content--infinite',
    'content--1col',
    'content--2col',
    'content--3col',
    'col-3'
]

class ContentInfinite extends Component {
    render(){
        return(
            <section className={styles.join(' ')}>
                {this.props.children}
            </section>
        )
    }
}

export default ContentInfinite;