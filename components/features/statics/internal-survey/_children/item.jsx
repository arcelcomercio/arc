import React from 'react'

const classes = {
  item: 'survey-result__item',
  text: 'survey-result__text',
  percent: 'survey-result__percent',
  bar: 'survey-result__bar',
  progress: 'survey-result__progress',
  progresstop: 'survey-result__top',
}

const style = perc => ({
  width: `${perc}%`,
})

const SurveyInternalChildItem = ({
  result = '',
  percent = '',
  max = false,
}) => {
  const classtop = max === true ? classes.progresstop : ''
  return (
    <li className={classes.item}>
      <span className={classes.text}>
        {result}
        <span className={classes.percent}>{percent}%</span>
      </span>
      <span className={classes.bar}>
        <span
          className={`${classes.progress} ${classtop}`}
          style={style(percent)}
        />
      </span>
    </li>
  )
}

export default SurveyInternalChildItem
