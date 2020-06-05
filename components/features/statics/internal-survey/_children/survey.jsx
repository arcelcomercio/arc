import React, { useState, useEffect } from 'react'
import InternalSurveyChildInput from './input'
import InternalSurveyChildResult from './result'
import InternalSurveyChildConfirmation from './confirmation'
import UtilListKey from '../../../../utilities/list-keys'
import getLatinDate from '../../../../utilities/date-time/latin-date'

const classes = {
  InternalSurvey: 'internal-survey bg-tertiary grid primary-font p-30 mb-30',
  detail: 'internal-survey__detail bg-white position-relative pr-30 pl-30',
  result:
    'internal-survey__result bg-primary grid justify-center position-relative',
  date: 'internal-survey__date block mt-15 mb-15 text-md line-h-none',
  title: 'internal-survey__title inline font-bold',
  buttons:
    'internal-survey__buttons grid justify-between overflow-hidden font-bold primary-font mt-20 mb-20',
  buttonpool:
    'internal-survey__button-pool font-bold uppercase border-0 text-white',
  viewresult:
    'internal-survey__view-result block text-center border-1 border-solid border-gray text-sm text-gray-300 line-h-double',
  share: 'internal-survey__share',
  disable: 'internal-survey__disable',
  nav: 'internal-survey__nav hidden',
  navprev: 'internal-survey__nav-prev left-0',
  navnex: 'internal-survey__nav-next right-0',
  icon:
    'internal-survey__icon block position-absolute w-full left-0 title-sm line-h-none',
  slug:
    'internal-survey__slug h-full position-absolute text-center top-0 text-white',
}

const InternalSurveyChildSurvey = props => {
  const [flagViewResult, setFlagViewResult] = useState(false)
  const [flagViewSurveyConfirm, setFlagViewSurveyConfirm] = useState(false)
  const [flagDisable, setFlagDisable] = useState(false)
  const [optionSelected, setOptionSelected] = useState('')
  const [optionsList, setOptionsList] = useState([])

  useEffect(() => {
    const { hasVote } = props
    if (hasVote) {
      setFlagDisable(true)
      setFlagViewSurveyConfirm(true)
    }
  }, [])

  const viewResult = () => {
    const { getResults } = props
    getResults().then(response => {
      setOptionsList(response.choices)
      setFlagViewResult(true)
      setFlagViewSurveyConfirm(false)
    })
  }

  const setChoiceSelected = evt => {
    const { value } = evt.target
    setOptionSelected(value)
  }

  const viewConfirm = e => {
    e.preventDefault()
    const { sendQuiz } = props
    if (optionSelected !== '') {
      sendQuiz(optionSelected).then(() => {
        setFlagViewResult(false)
        setFlagViewSurveyConfirm(true)
        setFlagDisable(true)
      })
    }
  }

  const { title, date, choices, prev, next, sharelinks } = props

  let urlNext = ''
  let urlPrev = ''

  if (next) urlNext = `/encuesta/${next}`
  if (prev) urlPrev = `/encuesta/${prev}`

  return (
    <div className={classes.InternalSurvey}>
      <div className={`${classes.detail} ${flagDisable && 'disable'}`}>
        <div className={`${classes.nav} ${flagDisable && 'active'}`}>
          {prev && (
            <a href={urlPrev} className={`${classes.navprev} ${classes.slug}`}>
              <i className={classes.icon}> prev </i>
            </a>
          )}
          {next && (
            <a href={urlNext} className={`${classes.navnex} ${classes.slug}`}>
              <i className={classes.icon}> next </i>
            </a>
          )}
        </div>

        <time className={classes.date}>{getLatinDate(date, ',')}</time>
        <h1 itemProp="name" className={classes.title}>{title}</h1>
        <form action="">
          <ul>
            {choices.map((choice, index) => (
              <InternalSurveyChildInput
                key={UtilListKey(index)}
                value={choice.option}
                index={`item${choice.option}${index}`}
                onChange={evt => setChoiceSelected(evt)}
              />
            ))}
          </ul>
          <div className={classes.buttons}>
            <button
              type="submit"
              className={classes.buttonpool}
              onClick={e => viewConfirm(e)}>
              Votar
            </button>
            <button
              type="button"
              className={classes.viewresult}
              onClick={viewResult}>
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
            handleOnClickViewResult={viewResult}
          />
        )}
      </div>
    </div>
  )
}

export default InternalSurveyChildSurvey
