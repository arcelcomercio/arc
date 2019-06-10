import React from 'react'

const classes = {
  confirm: 'survey-confirmation',
  message: 'survey-confirmation__message',
  button: 'survey-confirmation__button',
}

const SurveyChildViewSurveyConfirm = ({ handleOnClickViewResult }) => {
  return (
    <div className={classes.confirm}>
      <p className={classes.message}>Su voto se contabilizó correctamente.</p>
      <p className={classes.message}>¡Gracias por votar! </p>
      <button
        type="button"
        className={classes.button}
        onClick={handleOnClickViewResult}>
        Ver Resultados{' '}
      </button>
    </div>
  )
}

export default SurveyChildViewSurveyConfirm
