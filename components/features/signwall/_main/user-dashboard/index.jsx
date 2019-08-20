import React, { Component } from 'react'
import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'
import Gravatar from '../common/gravatar'
import Cookie from '../utils/cookie'
import GetProfile from '../utils/get-profile'

import UpdateProfile from './_children/section/update-profile'
import UpdatePass from './_children/section/update-pass'

const Cookies = new Cookie()

class ProfileAccount extends Component {
  constructor(props) {
    super(props)

    const { publicProfile } = new GetProfile()
    const { identities = [] } = publicProfile
    const [identitie = { type: 'Password' }] = identities || []
    const [usernameid = { userName: '' }] = identities || []
    const nameInit = publicProfile.firstName || 'Usuario'
    const emailInit = publicProfile.email || 'admin@elcomercio.pe'

    this.state = {
      typeLogin: identitie.type.toLowerCase(),
      userName:
        nameInit.length >= 24 ? `${nameInit.slice(0, 24)}...` : nameInit,
      emailUser: emailInit,
      userNameFB: usernameid.userName,
      disabledSocial: identitie.type !== 'Password',
      activeProfile: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeProfile: true,
      })
    }, 500)
  }

  closeSession = () => {
    const { closePopup } = this.props
    window.Identity.clearSession()
    Cookies.deleteCookie('arc_e_id')
    Cookies.deleteCookie('mpp_sess')
    Cookies.deleteCookie('ArcId.USER_INFO')
    if (window.location.pathname.indexOf('suscripciones') >= 0) {
      window.location.reload()
    } else {
      closePopup()
    }
  }

  componentWillUpdate = () => {
    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
    ModalProfile.style.overflow = 'auto'
  }

  componentWillUnmount = () => {
    const ModalProfile =
      document.querySelector('#arc-popup-profile').parentNode ||
      document.querySelector('#arc-popup-profile').parentElement
    ModalProfile.style.overflow = 'auto'
  }

  handlerUpdateName = name => {
    this.setState({
      userName: name,
    })
  }

  render() {
    const { closePopup } = this.props
    const {
      typeLogin,
      userName,
      emailUser,
      userNameFB,
      disabledSocial,
      activeProfile,
    } = this.state
    const urlNone = '#'

    return (
      <Modal
        size="full"
        position="fit"
        color="#f4f4f4"
        name="arc-popup-profile"
        id="arc-popup-profile">
        <Header closePopup={closePopup} type="large" />

        <div className="bg_white">
          <div className="container">
            <div className="profile">
              <div className="profile__left profile__card">
                <div>
                  <h1 className="profile__title">
                    Hola {userName !== 'undefined' ? userName : 'Usuario'}
                  </h1>
                  <span className="profile__text">Bienvenido a tu perfil</span>

                  <ul className="profile__menu">
                    <li className="profile__menu-item">
                      <a href={urlNone} className="profile__menu-link active">
                        Mis Datos
                      </a>
                    </li>
                    <li className="profile__menu-item">
                      <button
                        type="button"
                        id="web_link_cerrarsesion"
                        className="profile__menu-link"
                        onClick={e => this.closeSession(e)}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="profile__avatar">
                  <picture>
                    {typeLogin === 'facebook' ? (
                      <img
                        src={`https://graph.facebook.com/${userNameFB}/picture?type=large&redirect=true&width=500&height=500`}
                        alt="facebook"
                      />
                    ) : (
                      <Gravatar email={emailUser} />
                    )}
                  </picture>
                </div>
              </div>
              <div className="profile__right profile__card">
                {activeProfile ? (
                  <UpdateProfile handlerUpdateName={this.handlerUpdateName} />
                ) : (
                  'cargando....'
                )}
                <hr hidden={disabledSocial} />
                <div hidden={disabledSocial}>
                  <UpdatePass />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer position="center" />
      </Modal>
    )
  }
}

export default ProfileAccount
