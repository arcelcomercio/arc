import React, { Component } from 'react'
import ENV from 'fusion:environment'
import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'
import Gravatar from '../common/gravatar'
import Cookie from '../utils/cookie'
import GetProfile from '../utils/get-profile'
import Loading from '../common/loading'
import Home from './_children/home/index'
import MiPerfil from './_children/profile/index'
import { ModalProvider, ModalConsumer } from '../signwall/context'

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
      activeProfile: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeProfile: true,
      })
    }, 1000)
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

  renderTemplate = template => {
    const templates = {
      home: <Home />,
      profile: <MiPerfil />,
    }
    return templates[template] || templates.home
  }

  render() {
    const { closePopup } = this.props
    const {
      typeLogin,
      userName,
      emailUser,
      userNameFB,
      activeProfile,
    } = this.state
    const url = '#'

    return (
      <ModalProvider>
        <ModalConsumer>
          {value => (
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
                        <span className="profile__text">
                          Bienvenido a tu perfil
                        </span>

                        <ul className="profile__menu">
                          {window.document.cookie.indexOf('isECO=true') >= 0 ? (
                            <>
                              <li className="profile__menu-item">
                                <a
                                  href={url}
                                  onClick={() => {
                                    value.changeTemplate('home')
                                  }}
                                  className="profile__menu-link active">
                                  Inicio
                                </a>
                              </li>

                              <li className="profile__menu-item">
                                <a
                                  href={url}
                                  onClick={() => {
                                    value.changeTemplate('profile')
                                  }}
                                  className="profile__menu-link">
                                  Mis Datos
                                </a>
                              </li>

                              <li className="profile__menu-item">
                                <a href={url} className="profile__menu-link">
                                  Mis Suscripciones
                                </a>
                              </li>
                            </>
                          ) : (
                            <li className="profile__menu-item">
                              <a
                                href={url}
                                className="profile__menu-link active">
                                Mis Datos
                              </a>
                            </li>
                          )}

                          <li className="profile__menu-item">
                            <button
                              type="button"
                              id="web_link_cerrarsesion"
                              className="profile__menu-link-close"
                              onClick={e => this.closeSession(e)}>
                              Cerrar Sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="profile__avatar">
                        <picture>
                          <Gravatar
                            email={emailUser}
                            type={
                              typeLogin === 'facebook' ? 'facebook' : 'password'
                            }
                            fbID={userNameFB}
                          />
                        </picture>
                      </div>
                    </div>
                    <div className="profile__right profile__card">
                      {/* {activeProfile ? ( */}
                        <div>
                          {window.document.cookie.indexOf('isECO=true') >= 0 ? (
                            <div>
                              {this.renderTemplate(value.selectedTemplate)}
                            </div>
                          ) : (
                            <Home />
                          )}
                        </div>
                      {/* ) : (
                        <Loading />
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              <Footer position="center" />
            </Modal>
          )}
        </ModalConsumer>
      </ModalProvider>
    )
  }
}

export default ProfileAccount
