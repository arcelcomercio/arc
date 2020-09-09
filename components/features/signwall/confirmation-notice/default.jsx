import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  wrapper:
    'confirmation-notice p-15 flex flex-col md:flex-row w-full text-white bg-base-100 position-relative items-center line-h-xs secondary-font',
  link: 'confirmation-notice__link text-primary-color ml-5',
  closed:
    'confirmation-notice__btn-closed text-white position-absolute mr-5 md:mr-15 right-0',
  btnIcon: 'icon-close-circle rounded bg-black title-xs',
}

const ConfirmationNotice = props => {
  const {
    customFields: {
      customText = 'Estimado usuario le invitamos a que pueda verificar su correo',
      linkText = 'Enviar correo de confirmación',
      linkUrl = '/',
    } = {},
  } = props

  const htmlScript = ''

  return (
    <div className={classes.wrapper}>
      <p>{customText}: email@email.com</p>
      <a href={linkUrl} className={classes.link}>
        {linkText}
      </a>
      <button
        id="id-confirmation-notice"
        type="button"
        className={classes.closed}>
        <i className={classes.btnIcon}></i>
      </button>
      <script dangerouslySetInnerHTML={{ __html: htmlScript }}></script>
    </div>
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
