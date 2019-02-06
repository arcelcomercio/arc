import React, { Fragment, Component } from 'react'

const styles = [
    'content--grid-base',
    'content-layout',
    'content--1col',
    'col-1'
]

class Content1Col extends Component {
    render(){
        return(
            <section className={styles.join(' ')}>
                {this.props.children}
            </section>
        )
    }
}

export default Content1Col;