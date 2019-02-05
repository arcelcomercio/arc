import React, { Fragment, Component } from 'react'

class ContentInfinite extends Component {
    render(){
        return(
            <section className='content content--infinite'>
                {this.props.children}
            </section>
        )
    }
}

export default ContentInfinite;