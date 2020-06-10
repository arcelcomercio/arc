import React from 'react'

const classes = {
  item:
    'i-survey-item position-relative font-bold mb-20 p-0 border-b-0 text-lg text-gray-300',
  text:
    'i-survey-item__text position-absolute left-0 top-0 pt-5 pl-10 text-gray-200',
  percent: 'i-survey-item__percent inline-block pl-10',
  bar: 'i-survey-item__bar block overflow-hidden position-relative w-full',
  progress:
    'i-survey-item__progress bg-white block position-absolute overflow-hidden left-0 top-0',
  progresstop: 'i-survey-item__top bg-base-100',
}

const style = perc => ({
  width: `${perc}%`,
})

const InternalSurveyChildItem = ({
  result = '',
  percent = '',
  max = false,
}) => {
  const classtop = max === true ? classes.progresstop : ''
  return (
    <li className={classes.item}>
      <p itemProp="description" className={classes.text}>
        {result}
        <p itemProp="description" className={classes.percent}>
          {percent}%
        </p>
      </p>
      <span
        role="progressbar"
        aria-valuenow={percent || 0}
        aria-valuemin="0"
        aria-valuemax="100"
        className={classes.bar}>
        <span
          className={`${classes.progress} ${classtop}`}
          style={style(percent)}
        />
      </span>
    </li>
  )
}

export default InternalSurveyChildItem
