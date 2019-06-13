import React, { PureComponent } from 'react'
import InternalSurveyChildInput from './input'
import InternalSurveyChildResult from './result'
import InternalSurveyChildConfirmation from './confirmation'
import UtilListKey from '../../../../utilities/list-keys'
import DateNameFunc from '../../../../utilities/date-name'

const classes = {
  InternalSurvey: 'internal-survey grid primary-font p-30 mb-30',
  detail: 'internal-survey__detail position-relative pr-30 pl-30',
  result: 'internal-survey__result grid justify-center position-relative',
  date: 'internal-survey__date block mt-15 mb-15',
  title: 'internal-survey__title inline font-bold',
  buttons:
    'internal-survey__buttons grid justify-between overflow-hidden font-bold primary-font mt-20 mb-20',
  buttonpool: 'internal-survey__button-pool font-bold uppercase border-0',
  viewresult:
    'internal-survey__view-result block text-center border-1 border-solid',
  share: 'internal-survey__share',
  disable: 'internal-survey__disable',
  nav: 'internal-survey__nav hidden',
  navprev: 'internal-survey__nav-prev left-0',
  navnex: 'internal-survey__nav-next right-0',
  icon: 'internal-survey__icon block position-absolute w-full left-0',
  slug: 'internal-survey__slug h-full position-absolute text-center top-0',
}
class InternalSurveyChildSurvey extends PureComponent {
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
                <i className={classes.icon}> prev </i>
              </a>
            )}
            {next && (
              <a href={urlNext} className={`${classes.navnex} ${classes.slug}`}>
                <i className={classes.icon}> next </i>
              </a>
            )}
          </div>

          <time className={classes.date}>{DateNameFunc(date, ',')}</time>
          <h1 className={classes.title}>{title}</h1>
          <form action="">
            <ul>
              {choices.map((choice, index) => (
                <InternalSurveyChildInput
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
            <InternalSurveyChildResult
              choices={optionsList}
              sharelinks={sharelinks}
            />
          )}
          {flagViewSurveyConfirm && (
            <InternalSurveyChildConfirmation
              handleOnClickViewResult={this.viewResult}
            />
          )}
        </div>
      </div>
    )
  }
}

export default InternalSurveyChildSurvey
