import React, { Component, Fragment } from 'react'
import Header from '../../features/layout/header/default'

class HeaderLayout extends Component {
    render() {
        return(
            <Fragment>
                <Header />
                {this.props.elements}
            </Fragment>
        )
    }
}

export default HeaderLayout;