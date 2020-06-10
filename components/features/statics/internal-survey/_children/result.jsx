import React from 'react'
import InternalSurveyChildItem from './item'
import InternalSurveyChildShare from './share'

const classes = {
  graphic: 'i-survey-result__graphic table pt-30 pb-30',
  title: 'i-survey-result__title text-center font-xbold title-xl line-h-none',
  count: 'i-survey-result__count font-bold mt-5 mb-40 text-xl',
  list: 'overflow-y-auto mb-40',
}

const InternalSurveyChildResult = props => {
  const { choices, sharelinks: { facebook = '', twitter = '' } = {} } = props
  const values = choices.map(el => el.votes)
  const total = values.reduce((acc, curr) => acc + curr)
  const maxValue = values.indexOf(Math.max(...values))

  return (
    <div className={classes.graphic}>
      <h4 itemProp="name" className={classes.title}>
        Resultados
      </h4>
      <p itemProp="description" className={classes.count}>
        sobre un total de {total} votos.
      </p>
      <ul className={classes.list}>
        {choices &&
          choices.map((el, i) => {
            const percentage = (el.votes * 100) / total
            return (
              <InternalSurveyChildItem
                key={el.option}
                result={el.option}
                percent={percentage.toFixed(2)}
                max={i === maxValue || false}
              />
            )
          })}
      </ul>
      <ul className={classes.share}>
        <InternalSurveyChildShare socialnetwork="F" url={facebook} />
        <InternalSurveyChildShare socialnetwork="T" url={twitter} />
      </ul>
    </div>
  )
}

export default InternalSurveyChildResult
