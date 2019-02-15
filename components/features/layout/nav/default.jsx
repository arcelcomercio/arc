import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
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
    ],
    navList: [
        'flex-center',
        'nav__list'
    ]
})
@Consumer
class Nav extends Component {

    render() {

        return(
            <nav className={classes.nav}>
                <div className={classes.navButtonContainer}>
                    <Button
                        iconClass={classes.navButtonIconSearch}
                        btnClass={classes.navButton}
                        btnText='Buscar'
                        btnLink='#'
                    />
                    <Button
                        iconClass={classes.navButtonIconMenu}
                        btnClass={classes.navButton}
                        btnText='Secciones'
                        btnLink='#'
                    />
                </div>
                <ul className={classes.navList}>
                    <li>Politica</li>
                    <li>Deportes</li>
                    <li>Mundo</li>
                    <li>Economia</li>
                    <li>Opinion</li>
                </ul>
                <div className={classes.navButtonContainer}>
                    <a className={classes.navButtonFeatured} href="#">ZONA EJECUTIVA</a>
                    <a className={classes.navButtonFeatured} href="#">CONSTRUYE BIEN</a>
                </div>
            </nav>
        )
    }
}

//Nav.static = true

export default Nav
