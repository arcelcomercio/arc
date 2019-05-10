import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  InternalSurvey: 'internal-survey',
  detail: 'internal-survey__detail',
  result: 'internal-survey_result',
  date: 'internal-survey__date',
  title: 'internal-survey__title',
  buttons: 'internal-survey__buttons',
  buttonpool: 'internal-survey__button-pool',
  viewresult: 'internal-survey__view-result',
}
@Consumer
class SurveyInternal extends Component {
  render() {
    return (
      <div className={classes.InternalSurvey}>
        <div className={classes.detail}>
          <time className={classes.date}>Martes 7 de mayo, 2019</time>
          <h1 className={classes.title}>
            ¿Está de acuerdo con que la Fiscalía investigue al congresista
            Richard Acuña?
          </h1>
          <form action="">
            <div className={classes.buttons}>
              <button type="button" className={classes.buttonpool}>
                Votar
              </button>
              <a href="#asd" className={classes.viewresult}>
                Ver Resultados
              </a>
            </div>
          </form>
        </div>
        <div className={classes.result}>asdadad</div>
      </div>
    )
  }
}

export default SurveyInternal
