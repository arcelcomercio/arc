import React, { Component } from 'react'

class Content extends Component {
    render() {
        return(
            <sidebar alt="sidebar">
                {this.props.elements}
            </sidebar>
        )
    }
}

export default Content;