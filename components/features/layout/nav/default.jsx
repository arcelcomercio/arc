import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'

@Consumer
class Nav extends Component {

    render() {

        const { background, color } = this.props.siteProperties.nav

        const styles = {
              backgroundColor: background,
              color: color
          }

        return(
            <nav alt="nav" className="nav" style={styles}>
                <div className="nav__button__container">
                    <a className='nav__button' href="#">Buscar</a>
                    <a className='nav__button' href="#">Secciones</a>
                </div>
                <ul className='nav__list'>
                    <li>Politica</li>
                    <li>Deportes</li>
                    <li>Mundo</li>
                    <li>Economia</li>
                    <li>Opinion</li>
                </ul>
                <div className="nav__button__container">
                    <a className='nav__button--featured' href="#">ZONA EJECUTIVA</a>
                    <a className='nav__button--featured' href="#">CONSTRUYE BIEN</a>
                </div>
            </nav>
        )
    }
}

Nav.static = true

export default Nav
