import React, { Component } from 'react'
import * as Icon from '../../common/iconos'

const myParam = '23423ew24refqejhaut78r687ydfuiay87r'

class FormVerify extends Component {
  constructor(props) {
    super(props)
    if (myParam) {
      this.state = {
        showPopupVerify: false,
        tokenEmail: myParam,
      }
      this.validateToken()
    } else {
      this.state = {
        showPopupVerify: false,
      }
    }
  }

  togglePopupVerify = () => {
    const { showPopupVerify } = this.state
    this.setState({
      showPopupVerify: !showPopupVerify,
    })
  }

  validateToken = () => {
    const { tokenEmail } = this.state
    window.Identity.verifyEmail(tokenEmail).then(() => {
      this.setState({
        showPopupVerify: true,
      })
    })
  }

  render() {
    const { showPopupVerify } = this.state
    const { brandCurrent } = this.props
    return (
      <div className="modal-body__wrapper">
        {showPopupVerify ? (
          <form className="form-grid">
            <div className="row-grid col-center">
              <Icon.ResetPass
                className="icon-message"
                bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
              />
            </div>

            <div className="grid-clear-20" />

            <div className="row-grid col-center">
              <h1 className="title-message">¡Bienvenido Usuario!</h1>
              <p className="text-login">
                Tu correo electrónico ha sido validado
                <br />
                disfruta nuestro contenido sin límites
              </p>
            </div>

            <div className="grid-clear-10" />

            <div className="row-grid col-center">
              <div className="col-12 form-group">
                <input
                  type="button"
                  className="btn btn--blue btn-bg"
                  value="Continuar Navegando"
                  onClick={e => {
                    this.togglePopupVerify(e)
                  }}
                />
              </div>
              <div className="grid-clear-30" />
            </div>
          </form>
        ) : null}
      </div>
    )
  }
}

export default FormVerify
