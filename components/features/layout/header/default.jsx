import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'


@Consumer
class Header extends Component {

    render() {

        const { background, color } = this.props.siteProperties.header

        const styles = {
              backgroundColor: background,
              color: color
          }

        return(
            <header alt='header' className='header' >
                <div className="header__main" style={styles}>
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
                </div>
                <ul className='hot'>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                    <li>lomas </li>
                </ul>    
            </header>
        )
    }
}

Header.static = true

export default Header
