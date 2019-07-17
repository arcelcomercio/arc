import React, { Component } from 'react'
import Modal from '../common/modal'
import Header from '../common/header'
import Footer from '../common/footer'
import Gravatar from '../common/gravatar'
import FormProfile from './_children/dashboard-profile'
import Cookie from '../utils/cookie'
// import { cloneDeep } from '@babel/types'

const Cookies = new Cookie()

class ProfileAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeLogin: 'Form',
    }
  }

  closeSession = () => {
    const { closePopup } = this.props
    window.Identity.clearSession()
    closePopup()
    // window.sessUser.setState({
    //   accessPanel: false,
    //   nameUser: 'Ingresa a tu cuenta',
    // })
    Cookies.deleteCookie('arc_e_id')
    Cookies.deleteCookie('mpp_sess')
  }

  componentDidMount = () => {
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    const profileLS = JSON.parse(localProfile)
    let getTypeLogin = ''

    if (localProfile !== 'null') {
      if (profileLS.identities !== null) {
        getTypeLogin = profileLS.identities[0].type
      } else {
        getTypeLogin = 'Form'
      }
    } else {
      getTypeLogin = '-'
    }
    this.setState({
      typeLogin: getTypeLogin,
    })
  }

  render() {
    const { closePopup } = this.props
    const { typeLogin } = this.state

    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    const profileLS = JSON.parse(localProfile)
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
                    Hola{' '}
                    {() => {
                      if (
                        profileLS &&
                        profileLS.firstName &&
                        profileLS.firstName !== 'undefined'
                      ) {
                        return profileLS.firstName
                      }
                      return 'Usuario'
                    }}
                  </h1>
                  <span className="profile__text">Bienvenido a tu perfil</span>

                  <ul className="profile__menu">
                    <li className="profile__menu-item">
                      <a
                        href="/"
                        to="/panel/profile"
                        // activeClassName="selected"
                        className="profile__menu-link active">
                        Mis Datos
                      </a>
                    </li>
                    <li className="profile__menu-item">
                      <button
                        type="button"
                        id="web_link_cerrarsesion"
                        className="profile__menu-link"
                        onClick={() => this.closeSession()}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="profile__avatar">
                  <picture>
                    {typeLogin === 'Facebook' ? (
                      <img
                        src={`https://graph.facebook.com/${
                          profileLS.identities[0].userName
                        }/picture?type=large&redirect=true&width=500&height=500`}
                        alt="facebook"
                      />
                    ) : (
                      <Gravatar
                        email={() => {
                          if (profileLS) {
                            if (profileLS.email) {
                              return profileLS.email
                            }
                            return 'admin@gmail.com'
                          }
                          return 'admin@gmail.com'
                        }}
                      />
                    )}
                  </picture>
                </div>
              </div>
              <div className="profile__right profile__card">
                <FormProfile />
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
