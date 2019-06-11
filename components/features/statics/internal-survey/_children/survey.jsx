import React, { Component } from 'react'
import ItemInput from './item-input'
import ViewResult from './view-result'
import ViewSurveyConfirm from './view-confirm'
import UtilListKey from '../../../../utilities/list-keys'
import DateNameFunc from '../../../../utilities/date-name'

const classes = {
  InternalSurvey: 'internal-survey grid primary-font',
  detail: 'internal-survey__detail position-relative',
  result: 'internal-survey__result grid justify-center position-relative',
  ocultar: 'internal-survey__ocultar',
  date: 'internal-survey__date block',
  title: 'internal-survey__title inline font-bold',
  buttons:
    'internal-survey__buttons grid justify-between overflow-hidden font-bold primary-font',
  buttonpool: 'internal-survey__button-pool font-bold uppercase',
  viewresult: 'internal-survey__view-result block text-center',
  share: 'internal-survey__share',
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

  viewResult = () => {
    const { getResults } = this.props
    getResults().then(response => {
      this.setState({
        optionsList: response.choices,
        flagViewResult: true,
        flagViewSurveyConfirm: false,
      })
    })
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
      sharelinks,
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

          <time className={classes.date}>{DateNameFunc(date, ',')}</time>
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
            <ViewResult choices={optionsList} sharelinks={sharelinks} />
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
