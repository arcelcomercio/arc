import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return(
            <footer alt="footer">
                {this.props.elements}
            </footer>
        )
    }
}

export default Footer;