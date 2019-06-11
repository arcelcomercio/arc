import React from 'react'

const classes = {
  item: 'survey-result__item position-relative font-bold',
  text: 'survey-result__text position-absolute',
  percent: 'survey-result__percent inline-b',
  bar: 'survey-result__bar block overflow-hidden position-relative w-full',
  progress: 'survey-result__progress block position-absolute overflow-hidden',
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
