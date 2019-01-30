import React, { Component } from 'react'
import Footer from '../../features/layout/footer/default'

class FooterLayout extends Component {
    render() {
        return(
            <footer>
                <Footer/>
                {this.props.elements}
            </footer>
        )
    }
}

export default FooterLayout;