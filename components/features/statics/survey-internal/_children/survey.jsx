import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import ItemInput from './item-input'
import ViewResult from './view-result'
import ViewSurveyConfirm from './view-confirm'
import UtilListKey from '../../../../utilities/list-keys'

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

  nameDate = datestring => {
    let name = ''
    if (datestring) {
      const dias = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ]
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ]
      const date = new Date(datestring)
      name = `${dias[date.getDay()]} ${date.getDate()} de ${
        meses[date.getMonth()]
      }, ${date.getFullYear()}`
    }
    return name
  }

  render() {
    const { flagViewResult, flagViewSurveyConfirm, flagDisable } = this.state
    const { contextPath, title, date, choices } = this.props

    console.log(choices)
    return (
      <div className={classes.InternalSurvey}>
        <div className={classes.detail}>
          <span className={flagDisable ? classes.disable : ''} />
          <time className={classes.date}>{this.nameDate(date)}</time>
          <h1 className={classes.title}>{title}</h1>
          <form action="">
            <ul>
              {choices.map((choice, index) => (
                <ItemInput
                  key={UtilListKey(index)}
                  value={choice.option}
                  index={`item${choice.option}${index}`}
                />
              ))}
              {/* <ItemInput value="si" index="a2" />
              <ItemInput value="no" index="a1" /> */}
            </ul>
            <div className={classes.buttons}>
              <button
                type="button"
                className={classes.buttonpool}
                onClick={this.viewConfirm}>
                Votar
              </button>
              <a
                href="/"
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
