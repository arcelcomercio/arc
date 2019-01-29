import React, { Component } from 'react'
import FeatureTest from '../../features/pp/default'

class Header extends Component {
    render() {
        return(
            <header alt="header">
                <FeatureTest />
                {this.props.elements}
            </header>
        )
    }
}

export default Header;