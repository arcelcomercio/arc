import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import ItemInput from './item-input'
import ViewResult from './view-result'
import ViewSurveyConfirm from './view-confirm'

const classes = {
  InternalSurvey: 'internal-survey',
  detail: 'internal-survey__detail',
  result: 'internal-survey__result',
  date: 'internal-survey__date',
  title: 'internal-survey__title',
  buttons: 'internal-survey__buttons',
  buttonpool: 'internal-survey__button-pool',
  viewresult: 'internal-survey__view-result',
  share: 'internal-survey__result-share',
  disable: 'internal-survey__disable',
}
@Consumer
class SurveyInternalChildSurvey extends Component {
  constructor() {
    super()
    this.state = {
      flagViewResult: false,
      flagViewSurveyConfirm: false,
      flagDisable: false,
    }
  }

  viewResult = () => {
    this.setState({
      flagViewResult: true,
      flagViewSurveyConfirm: false,
    })
  }

  viewConfirm = () => {
    this.setState({
      flagViewResult: false,
      flagViewSurveyConfirm: true,
      flagDisable: true,
    })
  }

  render() {
    const { flagViewResult, flagViewSurveyConfirm, flagDisable } = this.state

    return (
      <div className={classes.InternalSurvey}>
        <div className={classes.detail}>
          <span className={flagDisable && classes.disable} />
          <time className={classes.date}>Martes 7 de mayo, 2019</time>
          <h1 className={classes.title}>
            ¿Está de acuerdo con que la Fiscalía investigue al congresista
            Richard Acuña?
          </h1>
          <form action="">
            <ul>
              <ItemInput value="si" index="a2" />
              <ItemInput value="no" index="a1" />
            </ul>
            <div className={classes.buttons}>
              <button
                type="button"
                className={classes.buttonpool}
                onClick={this.viewConfirm}>
                Votar
              </button>
              <a
                href="#"
                className={classes.viewresult}
                onClick={this.viewResult}>
                Ver Resultados
              </a>
            </div>
          </form>
        </div>
        <div className={classes.result}>
          {flagViewResult && <ViewResult />}
          {flagViewSurveyConfirm && (
            <ViewSurveyConfirm handleOnClickViewResult={this.viewResult} />
          )}
        </div>
      </div>
    )
  }
}

export default SurveyInternalChildSurvey
