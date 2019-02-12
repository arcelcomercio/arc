import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../src/utilsJs/utilities'

const styles = FormatClassName({
    header: [
        'header'
    ],
    headerMain: [
        'header__main'
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
