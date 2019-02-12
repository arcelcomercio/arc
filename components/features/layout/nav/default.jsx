import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import { FormatClassName } from '../../../../src/utilsJs/utilities'

const styles = FormatClassName({
    nav: [
        'flex--center-vertical',
        'flex__justify--between',
    ],
    navButton: [
        'flex--center-vertical',
        'nav__button'
    ],
    navButtonContainer: [
        'flex--center-vertical',
        'flex__justify--center',
        'nav__button__container'
    ],
    navButtonFeatured: [
        'flex--center-vertical',
        'nav__button--featured'
    ]
})
@Consumer
class Nav extends Component {

    render() {

        const { background, color } = this.props.siteProperties.nav

        const inline = {
              backgroundColor: background,
              color: color
          }

        return(
            <nav alt="nav" className={styles.nav} style={inline}>
                <div className={styles.navButtonContainer}>
                    <a className={styles.navButton} href="#">Buscar</a>
                    <a className={styles.navButton} href="#">Secciones</a>
                </div>
                <ul className='nav__list'>
                    <li>Politica</li>
                    <li>Deportes</li>
                    <li>Mundo</li>
                    <li>Economia</li>
                    <li>Opinion</li>
                </ul>
                <div className={styles.navButtonContainer}>
                    <a className={styles.navButtonFeatured} href="#">ZONA EJECUTIVA</a>
                    <a className={styles.navButtonFeatured} href="#">CONSTRUYE BIEN</a>
                </div>
            </nav>
        )
    }
}

Nav.static = true

export default Nav
