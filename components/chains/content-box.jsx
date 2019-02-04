import React, { Fragment, Component } from 'react'

class ContentBox extends Component {
    render(){
        return(
            <div className='content content--box'>
                {this.props.children}
            </div>
        )
    }
}

export default ContentBox;