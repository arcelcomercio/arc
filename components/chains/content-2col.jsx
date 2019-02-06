import React, { Fragment, Component } from 'react'

const styles = [
    'content--grid-base',
    'content--1col',
    'content--2col',
    'col-2'
]

class Content2Col extends Component {
    render(){
        return(
            <section className={styles.join(' ')}>
                {this.props.children}
            </section>
        )
    }
}

export default Content2Col;