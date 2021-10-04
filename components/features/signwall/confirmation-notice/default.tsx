import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'

import { env } from '../../../utilities/arc/env'
import { cintilloScript } from './_dependencies/scripts'

const classes = {
  wrapper:
    'confirmation-notice p-15 flex flex-col md:flex-row w-full text-white position-relative items-center line-h-xs secondary-font',
  link: 'confirmation-notice__link text-primary-color ml-5 mr-5',
  closed:
    'confirmation-notice__btn-closed text-white position-absolute mr-5 md:mr-15 right-0',
  btnIcon: 'icon-close-circle rounded bg-black title-xs',
  txtCount: 'confirmation-notice__counter md:mr-25',
}
const ConfirmationNotice: FC = () => {
  const { arcSite } = useAppContext() || {}

  return (
    <>
      <div
        id="signwall-cintillo-verify"
        style={{ display: 'none' }}
        className={`${classes.wrapper} ${
          arcSite === 'elcomercio' ? 'bg-base-100' : 'bg-base-300'
        }`}>
        <p id="signwall-cintillo-texto" />

        <button
          type="button"
          id="signwall-cintillo-link"
          className={classes.link}>
          Enviar correo de confirmación
        </button>

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
          <i className={classes.btnIcon} />
        </button>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: cintilloScript({ arcEnv: env, arcSite }),
        }}
      />
    </>
  )
}

ConfirmationNotice.label = 'Signwall - Cintillo Verificación de E-mail'

export default ConfirmationNotice
