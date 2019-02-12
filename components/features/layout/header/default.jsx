import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../src/utilsJs/utilities'

const styles = FormatClassName({
    header: [
        'header'
    ],
    headerMain: [
        'header__main',
        'flex-center-vertical',
        'flex--justify-between'
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
        'header__featured'
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

        const { background, color } = this.props.siteProperties.header

        const otros = {
              backgroundColor: background,
              color: color
          }

        return(
            <header className={styles.header} >
                <div className={styles.headerMain} style={otros}>
                    <span>29 DE ENERO, 2019</span>
                    <img 
                        src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} 
                        alt={`Logo de ${this.props.arcSite}`}
                        height={34}
                    />
                    <div className={styles.headerButtonContainer}>
                        <Button
                            iconClass={styles.headerBtnIconLogin}
                            btnText='Ingresar'
                            btnClass={styles.headerBtnLogin}
                            btnLink='#'
                        />
                        <Button
                            btnText='Suscríbete'
                            btnClass={styles.headerBtnSubscribe}
                            btnLink='#'
                        />
                    </div>
                </div>
                <ul className={styles.headerFeatured}>
                    <li className={styles.headerFeaturedItem}>
                        <i className={styles.headerFeaturedItemIcon}></i>
                        LOS TEMAS DE HOY 
                    </li>
                    <li className={styles.headerFeaturedItem}>CNM </li>
                    <li className={styles.headerFeaturedItem}>Vizcarra </li>
                    <li className={styles.headerFeaturedItem}>Congreso </li>
                    <li className={styles.headerFeaturedItem}>Poder Judicial </li>
                    <li className={styles.headerFeaturedItem}>Corrupción </li>
                </ul>    
            </header>
        )
    }
}

Header.static = true

export default Header
