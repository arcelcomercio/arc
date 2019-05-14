import React from 'react'

const classes = {
  confirm: 'internal-survey__confirm',
  confirmessage: 'internal-survey__confirm-message',
  btnviewresult: 'internal-survey__confirm-botton-view-result',
}

const SurveyChildViewSurveyConfirm = ({ handleOnClickViewResult }) => {
  return (
    <div className={classes.confirm}>
      <p className={classes.confirmessage}>
        Su voto se contabilizó correctamente.
      </p>
      <p className={classes.confirmessage}>¡Gracias por votar! </p>
      <button
        type="button"
        className={classes.btnviewresult}
        onClick={handleOnClickViewResult}>
        Ver Resultados{' '}
      </button>
    </div>
  )
}

export default SurveyChildViewSurveyConfirm
