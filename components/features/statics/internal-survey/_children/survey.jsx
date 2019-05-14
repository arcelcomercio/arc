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
  nav: 'internal-survey__nav',
  navprev: 'internal-survey__nav-prev',
  navnex: 'internal-survey__nav-next',
  slug: 'internal-survey__slug',
  icoprev: 'internal-survey__nav-ico-prev',
}
class SurveyInternalChildSurvey extends Component {
  constructor() {
    super()
    this.state = {
      flagViewResult: false,
      flagViewSurveyConfirm: false,
      flagDisable: false,
      optionSelected: '',
      optionsList: [],
    }
  }

  componentDidMount() {
    const { hasVote } = this.props
    if (hasVote) {
      this.setState({
        flagDisable: true,
        flagViewSurveyConfirm: true,
      })
    }
  }

  fetch = () => {
    const { id } = this.props
    const source = 'quiz-by-id'
    const params = {
      id,
    }
    const { fetched } = this.getContent(source, params)
    fetched
      .then(response => {
        this.setState({
          optionsList: response.choices,
          flagViewResult: true,
          flagViewSurveyConfirm: false,
        })
      })
      .catch(e => console.log(e))
  }

  viewResult = () => {
    this.fetch()
  }

  setChoiceSelected = evt => {
    const { value } = evt.target
    this.setState({
      optionSelected: value,
    })
  }

  viewConfirm = e => {
    e.preventDefault()
    const { sendQuiz } = this.props
    const { optionSelected } = this.state
    if (optionSelected !== '') {
      sendQuiz(optionSelected).then(() => {
        this.setState({
          flagViewResult: false,
          flagViewSurveyConfirm: true,
          flagDisable: true,
        })
      })
    }
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
    const {
      flagViewResult,
      flagViewSurveyConfirm,
      flagDisable,
      optionsList,
    } = this.state
    const {
      title,
      date,
      choices,
      prev,
      next,
      contextPath,
      arcSite,
    } = this.props

    const WEBSITE = `?_website=${arcSite}`
    let urlNext = ''
    let urlPrev = ''

    if (next) urlNext = `${contextPath}/encuesta/${next}${WEBSITE}`
    if (prev) urlPrev = `${contextPath}/encuesta/${prev}${WEBSITE}`

    return (
      <div className={classes.InternalSurvey}>
        <div className={`${classes.detail} ${flagDisable && 'disable'}`}>
          <div className={`${classes.nav} ${flagDisable && 'active'}`}>
            {prev && (
              <a
                href={urlPrev}
                className={`${classes.navprev} ${classes.slug}`}>
                <i className={classes.icoprev}> prev </i>
              </a>
            )}
            {next && (
              <a href={urlNext} className={`${classes.navnex} ${classes.slug}`}>
                <i className={classes.icoprev}> next </i>
              </a>
            )}
          </div>

          <time className={classes.date}>{this.nameDate(date)}</time>
          <h1 className={classes.title}>{title}</h1>
          <form action="">
            <ul>
              {choices.map((choice, index) => (
                <ItemInput
                  key={UtilListKey(index)}
                  value={choice.option}
                  index={`item${choice.option}${index}`}
                  onChange={evt => this.setChoiceSelected(evt)}
                />
              ))}
            </ul>
            <div className={classes.buttons}>
              <button
                type="submit"
                className={classes.buttonpool}
                onClick={e => this.viewConfirm(e)}>
                Votar
              </button>
              <button
                type="button"
                className={classes.viewresult}
                onClick={this.viewResult}>
                Ver Resultados
              </button>
            </div>
          </form>
        </div>
        <div className={classes.result}>
          {flagViewResult && optionsList && (
            <ViewResult choices={optionsList} />
          )}
          {flagViewSurveyConfirm && (
            <ViewSurveyConfirm handleOnClickViewResult={this.viewResult} />
          )}
        </div>
      </div>
    )
  }
}

export default SurveyInternalChildSurvey
