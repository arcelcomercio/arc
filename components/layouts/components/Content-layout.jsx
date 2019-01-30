import React, { Component } from 'react'

class ContentLayout extends Component {
    render() {
        //console.log('--------> Content')
        //console.log(this.props.elements, this.props.elements.length)
        return(
            <main alt="content" className='content'>
                {this.props.elements}
            </main>
        )
    }
}

export default ContentLayout;