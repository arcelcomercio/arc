import React, { Component, Fragment } from 'react'
import Footer from '../../features/layout/footer/default'

class FooterLayout extends Component {
    render() {
        return(
            <Fragment>
                <Footer/>
                {this.props.elements}
            </Fragment>
        )
    }
}

export default FooterLayout;