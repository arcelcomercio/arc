import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../src/utilsJs/utilities'

const styles = FormatClassName({
    nav: [
        'flex-center-vertical',
        'flex--justify-between',
        'nav'
    ],
    navButton: [
        'flex-center-vertical',
        'btn',
        'nav__btn'
    ],
    navButtonIconSearch: [
        'icon--search'
    ],
    navButtonIconMenu: [
        'icon--menu'
    ],
    navButtonContainer: [
        'flex-center',
        'nav__btn__container'
    ],
    navButtonFeatured: [
        'flex-center-vertical',
        'btn',
        'nav__btn--featured'
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
            <nav className={styles.nav} style={inline}>
                <div className={styles.navButtonContainer}>
                    <Button
                        iconClass={styles.navButtonIconSearch}
                        btnClass={styles.navButton}
                        btnText='Buscar'
                        btnLink='#'
                    />
                    <Button
                        iconClass={styles.navButtonIconMenu}
                        btnClass={styles.navButton}
                        btnText='Secciones'
                        btnLink='#'
                    />
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

//Nav.static = true

export default Nav
