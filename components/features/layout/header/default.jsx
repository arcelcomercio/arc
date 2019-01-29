import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'


@Consumer
class Header extends Component {

    render() {

        return(
            <Fragment>
                <header alt='header' className='header'>
                    <span>29 DE ENERO, 2019</span>
                    <img 
                        src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} 
                        alt={`Logo de ${this.props.arcSite}`}
                        height={34}
                    />
                    <div>
                        <button>Ingresar</button>
                        <button>Suscríbete</button>
                    </div>
                </header>
                <ul className='hot'>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                </ul>    
            </Fragment>
        )
    }
}

Header.static = true

export default Header
