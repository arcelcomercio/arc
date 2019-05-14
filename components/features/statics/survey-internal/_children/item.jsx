import React, { Fragment } from 'react'

const classes = {
  item: 'internal-survey__result-pool-item',
  text: 'internal-survey__result-pool-text',
  percent: 'internal-survey__result-pool-percent',
  bar: 'internal-survey__result-pool-bar',
  progress: 'internal-survey__result-pool-progress',
  progresstop: 'internal-survey__result-top',
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
    <Fragment>
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
    </Fragment>
  )
}

export default SurveyInternalChildItem
