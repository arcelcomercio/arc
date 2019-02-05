import React, { Component } from 'react'

class ContentLayout extends Component {
    render() {

        return(
            <div className='layout__basic'>
                {this.props.children}
            </div>
        )
    }
}

export default ContentLayout;