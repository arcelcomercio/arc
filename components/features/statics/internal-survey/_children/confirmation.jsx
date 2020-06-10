import React from 'react'

const classes = {
  confirm: `i-survey-confirmation bg-primary position-absolute text-center w-full top-0 left-0 pt-40 pb-40 pr-20 pl-20 h-auto lg:h-full`,
  message:
    'i-survey-confirmation__message font-bold mt-5 mb-40 title-sm text-gray-200',
  button: `i-survey-confirmation__button text-center inline-block border-1 border-solid border-gray text-sm line-h-double text-gray-200`,
}

const InternalSurveyChildConfirmation = ({ handleOnClickViewResult }) => {
  return (
    <div className={classes.confirm}>
      <p itemProp="description" className={classes.message}>
        Su voto se contabilizó correctamente.
      </p>
      <p itemProp="description" className={classes.message}>
        ¡Gracias por votar!{' '}
      </p>
      <button
        type="button"
        className={classes.button}
        onClick={handleOnClickViewResult}>
        Ver Resultados{' '}
      </button>
    </div>
  )
}

export default InternalSurveyChildConfirmation
