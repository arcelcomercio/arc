import React from 'react'
import SurveyChoices from './choices'

const CardSurveyChildSurvey = props => {
  const { listChoices } = props
  const paramsChoices = {
    listChoices,
  }
  return (
    <div className="card-survey full-width">
      <h3 className="card-survey__header text-uppercase text-center">
        encuesta
      </h3>
      <form className="card-survey__question position-relative">
        <p className="card-survey__question-title">
          ¿El congreso volvera a blindar a Donayre pese al ultimo fallo de la
          Corte suprema?
        </p>
        <div className="card-survey__question-choices">
          <SurveyChoices {...paramsChoices} />
        </div>
        <div className="card-survey__buttons full-width position-absolute flex-center-vertical flex--justify-between">
          <a href="/" className="card-survey__buttons-results">
            Ver Resultados
          </a>
          <button
            type="button"
            className="card-survey__buttons-submit text-uppercase">
            votar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CardSurveyChildSurvey
