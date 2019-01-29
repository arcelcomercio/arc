import React, { Component } from 'react'

class ContentLayout extends Component {
    render() {
        return(
            <main alt="content">
                {this.props.elements}
            </main>
        )
    }
}

export default ContentLayout;