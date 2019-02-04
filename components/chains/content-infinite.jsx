import React, { Fragment, Component } from 'react'

class ContentInfinite extends Component {
    render(){
        return(
            <div className='content content--infinite'>
                {this.props.children}
            </div>
        )
    }
}

export default ContentInfinite;