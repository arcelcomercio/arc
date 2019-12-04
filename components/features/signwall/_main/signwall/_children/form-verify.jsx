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
              bgcolor={
                {
                  elcomercio: '#fecd26',
                  elcomerciomag: '#fecd26',
                  gestion: '#F4E0D2',
                  peru21: '#d5ecff',
                  peru21g21:'#d5ecff',
                  elbocon: '#fdabab',
                  depor: '#d5d945',
                  trome:'#ffede5',
                  ojo:'#e7fced',
                }[brandCurrent]
              }
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
                className="btn btn-bg"
                value="Continuar Navegando"
                onClick={() => {
                  Taggeo('Web_Sign_Wall_Verify', 'web_swv_continuar_boton')
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
