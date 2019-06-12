import React from 'react'

const classes = {
  confirm: 'survey-confirmation position-absolute text-center w-full h-auto',
  message: 'survey-confirmation__message font-bold',
  button: 'survey-confirmation__button text-center inline-b',
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
