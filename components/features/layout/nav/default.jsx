import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
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
        'icon',
        'icon--search',
        'icon--margin-right'
    ],
    navButtonIconMenu: [
        'icon',
        'icon--menu',
        'icon--margin-right'
    ],
    navButtonContainer: [
        'flex-center-vertical',
        'flex--justify-start',
        'flex-1',
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
        'flex-center-vertical',
        'flex--justify-end',
        'flex-1',
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
        'icon',
        'icon--login',
        'icon--margin-right'
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
        this.fetch()
    }

    fetch() {

        const source = 'sections-by-hierarchy'
        const params = {
            website: this.props.arcSite,
            hierarchy: 'navbar-header-sections'
        }

        const { fetched } = this.getContent(source, params)

        fetched.then(response => {
            console.log(response)
        })
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
            <nav className={classes.nav}>
                <div className={classes.navButtonContainer}>
                    {
                        this.state.device === 'desktop' &&
                        <Fragment>
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
                        </Fragment>
                    }
                    {
                        this.state.device === 'tablet' &&
                        <Fragment>
                            <Button
                                iconClass={classes.navButtonIconSearch
                                    .replace('icon--margin-right', '')} 
                                btnClass={classes.navButton}
                                btnLink='#'
                                />
                            <Button
                                iconClass={classes.navButtonIconMenu}
                                btnClass={classes.navButton}
                                btnText='Secciones'
                                btnLink='#'
                                />
                        </Fragment>
                    }
                    {
                        this.state.device === 'mobile' &&
                            <Button
                                iconClass={classes.navButtonIconMenu
                                    .replace('icon--margin-right', '')}
                                btnClass={classes.navButton}
                                btnLink='#'
                                />
                    }
                </div>
                <ul className={classes.navList}>
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
                    className={classes.navLogo}
                />
                {
                    this.state.device === 'desktop' && 
                        <div className={classes.navButtonContainer}>
                            <a className={classes.navButtonFeatured} href="#">ZONA EJECUTIVA</a>
                            <a className={classes.navButtonFeatured} href="#">CONSTRUYE BIEN</a>
                        </div>
                }
                {
                    this.state.device === 'tablet' &&
                        <div className={classes.headerButtonContainer}>
                            <Button
                                iconClass={classes.headerBtnIconLogin
                                    .replace('icon--margin-right', '')}
                                btnClass={classes.headerBtnLogin}
                                btnLink='#'
                            />
                            <Button
                                btnText='Suscríbete'
                                btnClass={classes.headerBtnSubscribe}
                                btnLink='#'
                            />
                        </div>
                }
                {
                    this.state.device === 'mobile' &&
                        <div className={classes.headerButtonContainer}>
                            <Button
                                iconClass={classes.headerBtnIconLogin
                                    .replace('icon--margin-right', '')}
                                btnClass={classes.headerBtnLogin}
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
