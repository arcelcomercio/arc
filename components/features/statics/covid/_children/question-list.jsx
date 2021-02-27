import React from 'react'
import { useContent } from 'fusion:content'
import Graph from './graph'
import { getVerboseDate } from '../../../../utilities/date-time/dates'

const classes = {
  container: 'covid-question-list__container flex flex-col',
  title: 'covid-question-list__title',
  box: 'covid-question-list__box',
  item: 'covid-question-list__item flex',
  question: 'covid-question-list__question',
  iconRight: 'covid-question-list__icon--right',
  btnHome: 'covid-question-list__btn--home',
}

const CovidChildQuestionList = ({ requestUri }) => {
  const { data = [] } =
    useContent({
      source: 'get-spreadsheet-covid',
      query: {
        title: 'Mas Informacion API',
      },
    }) || {}
  const urlMatch = requestUri.match(/\/covid-19\/mas-informacion\/(.*)+\//i)
  const param = (urlMatch && urlMatch[1]) || null

  const questionList = questionData => {
    const dataArr = Array.from(questionData) || []
    return (
      <div className={classes.container}>
        <h2 className={classes.title}>Más Información</h2>
        <div className={classes.box}>
          {dataArr.map(({ pregunta = '', slug = '' }) => {
            return (
              <a
                href={`/covid/mas-informacion/${slug}`}
                className={classes.item}>
                <span className={classes.question}>{pregunta}</span>
                <svg
                  className={classes.iconRight}
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.678"
                  height="12.686"
                  viewBox="0 0 7.678 12.686">
                  <path
                    d="M12,6.343,6.737,11.508l1.2,1.178,6.475-6.343L7.94,0l-1.2,1.178Z"
                    transform="translate(-6.737)"
                  />
                </svg>
              </a>
            )
          })}
        </div>
        <a className={classes.btnHome} href="/covid-19/">
          Inicio
        </a>
      </div>
    )
  }
  const graph = (questionData, slug) => {
    const dataSlug = questionData.filter(el => el.slug === slug)
    const {
      data_process: dataProcess = [],
      titulo: title,
      vacunados_hoy: vaccineToday,
      vacunados_desde: vaccineFrom,
    } = (dataSlug && dataSlug[0]) || {}

    const dataFiler = []
    let maxValue = 0
    for (let i = 0; i < dataProcess.length; i++) {
      if (maxValue < dataProcess[i].value) {
        maxValue = dataProcess[i].value
      }
      if (dataProcess[i].title !== null) dataFiler[i] = dataProcess[i]
    }
    return (
      <Graph
        maxValue={maxValue}
        dataProcess={dataProcess}
        title={title}
        titleOne="Vacunas llegaron hoy"
        titleTwo="personas se vacunaron hoy"
        valOne={vaccineToday}
        valTwo={vaccineFrom}
        colorBar="#55AC0A"
        date={getVerboseDate({
          date: new Date(),
          showTime: false,
          showWeekday: false,
          showYear: false,
        })}
      />
    )
  }
  return param === null ? questionList(data) : graph(data, param)
}

export default CovidChildQuestionList
