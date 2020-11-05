/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import { cintilloScript } from './scripts'

const classes = {
  wrapper:
    'confirmation-notice p-15 flex flex-col md:flex-row w-full text-white position-relative items-center line-h-xs secondary-font',
  link: 'confirmation-notice__link text-primary-color ml-5 mr-5',
  closed:
    'confirmation-notice__btn-closed text-white position-absolute mr-5 md:mr-15 right-0',
  btnIcon: 'icon-close-circle rounded bg-black title-xs',
  txtCount: 'confirmation-notice__counter md:mr-25',
}

@Consumer
class ConfirmationNotice extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    const arcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
    const { arcSite } = this.props
    return (
      <>
        <div
          id="signwall-cintillo-verify"
          style={{ display: 'none' }}
          className={`${classes.wrapper} ${
            arcSite === 'elcomercio' ? 'bg-base-100' : 'bg-base-300'
          }`}>
          <p id="signwall-cintillo-texto"></p>

          <a href="#" id="signwall-cintillo-link" className={classes.link}>
            Enviar correo de confirmación
          </a>

          <span
            id="signwall-cintillo-counter"
            style={{ display: 'none' }}
            className={classes.txtCount}>
            Podrás reenviar nuevamente dentro de
            <strong id="signwall-cintillo-countdown"> 10 </strong> segundos
          </span>

          <button
            id="signwall-cintillo-close"
            type="button"
            className={classes.closed}>
            <i className={classes.btnIcon}></i>
          </button>
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: cintilloScript({ arcEnv, arcSite }),
          }}
        />
      </>
    )
  }
}

ConfirmationNotice.label = 'Singwall - Cintillo de Confirmación'

export default ConfirmationNotice
