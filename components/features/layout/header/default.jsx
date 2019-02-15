import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
    header: [
        'header'
    ],
    headerMain: [
        'header__main',
        'flex-center-vertical',
        'flex--justify-between'
    ],
    headerLogo: [
        'header__logo'
    ],
    headerButtonContainer: [
        'flex-center',
        'header__main__btn-container'
    ],
    headerBtnLogin: [
        'flex-center-vertical',
        'btn',
        'bg-color--white'
    ],
    headerBtnSubscribe: [
        'flex-center-vertical',
        'btn',
        'bg-color--link'
    ],
    headerBtnIconLogin: [
        'icon--login'
    ],
    headerFeatured: [
        'flex-center',
        'header__featured',
        'bg-color--white'
    ],
    headerFeaturedItem:  [
        'flex-center',
        'header__featured__item'
    ],
    headerFeaturedItemIcon: [
        'icon',
        'icon--fire'
    ]
})
@Consumer
class Header extends Component {

    render() {

        return(
            <header className={classes.header} >
                <div className={classes.headerMain}>
                    <span>29 DE ENERO, 2019</span>
                    <img 
                        src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} 
                        alt={`Logo de ${this.props.arcSite}`}
                        className={classes.headerLogo}
                    />
                    <div className={classes.headerButtonContainer}>
                        <Button
                            iconClass={classes.headerBtnIconLogin}
                            btnText='Ingresar'
                            btnClass={classes.headerBtnLogin}
                            btnLink='#'
                        />
                        <Button
                            btnText='Suscríbete'
                            btnClass={classes.headerBtnSubscribe}
                            btnLink='#'
                        />
                    </div>
                </div>
                <ul className={classes.headerFeatured}>
                    <li className={classes.headerFeaturedItem}>
                        <i className={classes.headerFeaturedItemIcon}></i>
                        LOS TEMAS DE HOY 
                    </li>
                    <li className={classes.headerFeaturedItem}>CNM </li>
                    <li className={classes.headerFeaturedItem}>Vizcarra </li>
                    <li className={classes.headerFeaturedItem}>Congreso </li>
                    <li className={classes.headerFeaturedItem}>Poder Judicial </li>
                    <li className={classes.headerFeaturedItem}>Corrupción </li>
                </ul>    
            </header>
        )
    }
}

Header.static = true

export default Header
