import React, { Component } from 'react'
import Header from '../../features/header/default'

class HeaderLayout extends Component {
    render() {
        return(
            <header alt="header">
                <Header />
                {this.props.elements}
            </header>
        )
    }
}

export default HeaderLayout;