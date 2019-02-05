import React, { Fragment, Component } from 'react'

class ContentBox extends Component {
    render(){
        return(
            <section className='content content--box'>
                {this.props.children}
            </section>
        )
    }
}

export default ContentBox;