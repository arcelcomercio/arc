// TODO: Este componente no lo estan usando, creo que el auth con google no funciona

import React from 'react'
import { Google } from '../../../common/iconos'

class AuthGoogle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingGo: true,
    }
    this.clickLoginGoogle = this.clickLoginGoogle.bind(this)
  }

  clickLoginGoogle = () => {
    const { typePopUp, typeForm } = this.props
    const tipCat = typePopUp || ''
    const tipAct = typePopUp ? `web_sw${typePopUp.slice(0, 1)}` : ''
    const tipForm = typeForm || ''

    // console.log(tipCat, tipAct, tipForm)

    this.setState({
      sendingGo: false,
    })

    const waitForGlobal = (key, callback) => {
      if (window[key]) {
        callback()
      } else {
        setTimeout(() => {
          waitForGlobal(key, callback)
        }, 100)
      }
    }

    waitForGlobal('Identity', () => {
      window.Identity.initGoogleLogin(
        process.env.REACT_APP_GOOGLE_CLIENTID,
        {
          width: 200,
          height: 50,
          longtitle: true,
          theme: 'dark',
        },
        'google-sign-in-button-arc'
      )
        .then(() => {
          this.clickTriggerLogin()
          // -- test de tageo
          if (tipCat === 'organico' || tipCat === 'hard') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: `${tipForm}_google_success`,
              eventCategory: `Web_Sign_Wall_${tipCat}`,
              eventAction: `${tipAct}_${tipForm}_success_google`,
            })
          }
          // -- test de tageo
        })
        .catch(err => {
          // -- test de tageo
          if (tipCat === 'organico' || tipCat === 'hard') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event: `${tipForm}_google_error`,
              eventCategory: `Web_Sign_Wall_${tipCat}`,
              eventAction: `${tipAct}_${tipForm}_error_google`,
            })
          }
          // -- test de tageo
        })
    })
  }

  clickTriggerLogin = () => {
    const clickGoogle = document.querySelector('#google-sign-in-button-arc')
    if (clickGoogle) clickGoogle.click()

    this.setState({
      sendingGo: true,
    })
  }

  render() {
    const { id, align } = this.props
    const { sendingGo } = this.state
    return (
      <>
        <button
          type="button"
          name="google"
          id={id}
          className={`btn btn-google ${align || ''}`}
          onClick={() => this.clickLoginGoogle()}
          disabled={!sendingGo}>
          <Google />
          <span className="btn-text">
            {!sendingGo ? 'Ingresando...' : 'Google'}
          </span>
        </button>
        <div hidden id="google-sign-in-button-arc" />
      </>
    )
  }
}

export default AuthGoogle
