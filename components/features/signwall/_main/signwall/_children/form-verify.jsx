import React, { Component } from 'react'
import Taggeo from '../../utils/taggeo'
import * as Icon from '../../common/iconos'

class FormVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { brandCurrent, closePopup } = this.props
    return (
      <div className="modal-body__wrapper">
        <form className="form-grid">
          <div className="form-grid__verify-account">
            <Icon.ResetPass
              className="icon-message"
              bgcolor={brandCurrent === 'elcomercio' ? '#fecd26' : '#F4E0D2'}
            />
          </div>

          <h1 className="form-grid__info text-center  pt-40 ">
            ¡Bienvenido Usuario!
          </h1>

          <p className="form-grid__info-sub text-center">
            Tu correo electrónico ha sido validado
            <br />
            disfruta nuestro contenido sin límites
          </p>

          <div className="form-grid__group">
            <div className="form-group">
              <input
                id="verificar_continuar_navegando"
                type="button"
                className="btn btn--blue btn-bg"
                value="Continuar Navegando"
                onClick={() => {
                  Taggeo('Web_Sign_Wall_Verify', 'web_verify_continuar_boton')
                  closePopup()
                }}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default FormVerify
