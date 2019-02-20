import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Button from '../../../../resources/components/button'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const styles = FormatClassName({
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

    handleResize = () => {
        const wsize = window.innerWidth

        //------ Set the new state if you change from mobile to desktop
        if(wsize >= 1024 && this.state.device !== 'desktop') {
            this.setState({
                device: 'desktop'
            });
            this.dispatchEvent('displayChange', this.state.device)
        } else {
            //------ Set the new state if you change from desktop to mobile
            if(wsize < 1024 && wsize >= 640 && this.state.device !== 'tablet') {
                this.setState({
                    device: 'tablet'
                });
                this.dispatchEvent('displayChange', this.state.device)
            } else {
                //------ Set the new state if you change from desktop to mobile
                if(wsize < 640 && this.state.device !== 'mobile') {
                    this.setState({
                        device: 'mobile'
                    });
                    this.dispatchEvent('displayChange', this.state.device)
                }
            }
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
x
    render() {

        return(
            this.state.device === 'desktop' ?
                <header className={styles.header} >
                    <div className={styles.headerMain}>
                        <span>29 DE ENERO, 2019</span>
                        <img 
                            src={`${this.props.contextPath}/resources/dist/${this.props.arcSite}/images/logo.png`} 
                            alt={`Logo de ${this.props.arcSite}`}
                            className={styles.headerLogo}
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
            : null
        )
    }
}

//Header.static = true

export default Header
