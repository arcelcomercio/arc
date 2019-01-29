import React, { Component } from 'react'

class Content extends Component {
    render() {
        return(
            <main alt="content">
                {this.props.elements}
            </main>
        )
    }
}

export default Content;