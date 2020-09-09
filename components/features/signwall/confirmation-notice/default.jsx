import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'
import { getLocaleStorage } from '../_dependencies/Utils'
import { requestVerifyEmail } from '../_dependencies/services'

const classes = {
  wrapper:
    'confirmation-notice p-15 flex flex-col md:flex-row w-full text-white bg-base-100 position-relative items-center line-h-xs secondary-font',
  link: 'confirmation-notice__link text-primary-color ml-5 mr-5',
  closed:
    'confirmation-notice__btn-closed text-white position-absolute mr-5 md:mr-15 right-0',
  btnIcon: 'icon-close-circle rounded bg-black title-xs',
  txtCount: 'confirmation-notice__counter',
}

const ConfirmationNotice = props => {
  const { arcSite } = useFusionContext() || {}
  const [showSendEmail, setShowSendEmail] = useState(false)
  const { email, emailVerified } = getLocaleStorage('ArcId.USER_PROFILE') || {}

  const {
    customFields: {
      customText = 'Estimado usuario le invitamos a que pueda verificar su correo',
      linkText = 'Enviar correo de confirmación',
      linkUrl = '/',
    } = {},
  } = props

  const htmlScript = ''

  const sendVerifyEmail = e => {
    e.preventDefault()
    setShowSendEmail(true)
    requestVerifyEmail(email, arcSite)
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  return (
    <>
      {email && !emailVerified && (
        <div className={classes.wrapper}>
          <p>
            {customText}: <strong>{email}</strong>.
          </p>

          <>
            {!showSendEmail ? (
              <a
                href={linkUrl}
                onClick={sendVerifyEmail}
                className={classes.link}>
                {linkText}
              </a>
            ) : (
              <span className={classes.txtCount}>
                Podrás reenviar nuevamente dentro de
                <strong id="countdown"> 10 </strong> segundos
              </span>
            )}
          </>

          <button
            id="id-confirmation-notice"
            type="button"
            className={classes.closed}>
            <i className={classes.btnIcon}></i>
          </button>

          <script dangerouslySetInnerHTML={{ __html: htmlScript }}></script>
        </div>
      )}
    </>
  )
}

ConfirmationNotice.static = true
ConfirmationNotice.label = 'Singwall - Cintillo de Confirmación'
ConfirmationNotice.propTypes = {
  customFields: PropTypes.shape({
    customText: PropTypes.string.tag({
      name: 'Texto del cintillo',
    }),
    linkText: PropTypes.string.tag({
      name: 'Texto del enlace',
    }),
    linkUrl: PropTypes.string.tag({
      name: 'Url de enlace',
    }),
  }),
}

export default ConfirmationNotice
