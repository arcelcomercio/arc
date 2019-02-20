import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

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
    ],
    navList: [
        'flex-center',
        'nav__list'
    ],
    navLogo: [
        'nav__logo'
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
    ]
})

@Consumer
class Nav extends Component {
    constructor(props){
        super(props)
        //------ Checks if you are in desktop or not
        this.state = {
            device: this.setDevice()
        }
    }

    setDevice = () => {
        const wsize = window.innerWidth

        if(wsize < 640) {
            return 'mobile'
        } else if(wsize >= 640 && wsize < 1024){ 
            return 'tablet'
        } else {
            return 'desktop'
        }   
    }

    handleDevice = (device) => {
        this.setState({
            device: device
        })
    }

    componentDidMount() {
        this.addEventListener('displayChange', this.handleDevice)
    }

    render() {

        return(
            <nav className={styles.nav}>
                <div className={styles.navButtonContainer}>
                    {
                        this.state.device === 'desktop' &&
                        <Fragment>
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
                        </Fragment>
                    }
                    {
                        this.state.device === 'tablet' &&
                            <Fragment>
                                <Button
                                    iconClass={styles.navButtonIconSearch}
                                    btnClass={styles.navButton}
                                    btnLink='#'
                                    />
                                <Button
                                    iconClass={styles.navButtonIconMenu}
                                    btnClass={styles.navButton}
                                    btnText='Secciones'
                                    btnLink='#'
                                    />
                            </Fragment>  
                    }
                </div>
                <ul className={styles.navList}>
                    <li>Politica</li>
                    <li>Deportes</li>
                    <li>Mundo</li>
                    <li>Economia</li>
                    <li>Opinion</li>
                </ul>
                <img
                    src='https://www.woodwing.com/sites/default/files/assets/cases-new/elcomercio_logo_white_2x-2.png'
                    /* src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} */ 
                    alt={`Logo de ${this.props.arcSite}`}
                    className={styles.navLogo}
                />
                {
                    this.state.device === 'desktop' 
                        ?
                        <div className={styles.navButtonContainer}>
                            <a className={styles.navButtonFeatured} href="#">ZONA EJECUTIVA</a>
                            <a className={styles.navButtonFeatured} href="#">CONSTRUYE BIEN</a>
                        </div>
                        :
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
                }
            </nav>
        )
    }
}

//Nav.static = true

export default Nav
