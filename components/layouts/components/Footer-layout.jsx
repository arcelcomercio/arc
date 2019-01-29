import React, { Component } from 'react'

class FooterLayout extends Component {
    render() {
        return(
            <footer alt="footer">
                {this.props.elements}
            </footer>
        )
    }
}

export default FooterLayout;