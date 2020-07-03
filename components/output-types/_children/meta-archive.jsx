import React from 'react'
import { getActualDate } from '../../utilities/date-time/dates'

export default props => {
  const { globalContent, siteUrl = '', requestUri = '' } = props
  const { params = {} } = globalContent || {}
  const timeCurrent = new Date()

  const paginationUrl = newDateFormatted => {
    return requestUri.match(/\/[0-9]{4}-[0-9]{2}-[0-9]{2}?(?=$|\/|\?)/) !== null
      ? `${siteUrl}${requestUri.replace(
          /\/[0-9]{4}-[0-9]{2}-[0-9]{2}?(?=$|\/|\?)/,
          `/${newDateFormatted}`
        )}`
      : `${siteUrl}${requestUri}${newDateFormatted}/`
  }

  const calcDate = (option, date) => {
    const dateParam = new Date(date)
    let newDate
    if (option === 'next') newDate = dateParam.getDate() + 1
    if (option === 'prev') newDate = dateParam.getDate() - 1
    const timeNextDay = dateParam.setDate(newDate)
    return new Date(timeNextDay)
  }

  const getNewDateFormatted = newDate => {
    const newYear = newDate.getUTCFullYear()
    const newMonth = newDate.getUTCMonth() + 1
    const newDay = newDate.getUTCDate()

    return `${newYear}-${newMonth >= 10 ? newMonth : `0${newMonth}`}-${
      newDay >= 10 ? newDay : `0${newDay}`
    }`
  }
  let currentDate = getNewDateFormatted(timeCurrent)

  const getNextDay = date => {
    const newDate = calcDate('next', date)
    return getNewDateFormatted(newDate)
  }

  const getPrevDay = date => {
    const newDate = calcDate('prev', date || getActualDate())
    return getNewDateFormatted(newDate)
  }

  const hasNextDay = date => {
    const dateParam = new Date(date).getTime()
    currentDate = new Date(currentDate).getTime()
    return dateParam < currentDate
  }

  const nextDate = getNextDay(params.date)
  const prevDate = getPrevDay(params.date)

  const hasNext = hasNextDay(params.date)
  const urlNextPage = paginationUrl(nextDate)
  const urlPrevPage = paginationUrl(prevDate)

  return (
    <>
      <link rel="prev" href={urlPrevPage} />
      <link rel="prefetch" href={urlPrevPage} />
      {hasNext && (
        <>
          <link rel="next" href={urlNextPage} />
          <link rel="prefetch" href={urlNextPage} />
        </>
      )}
    </>
  )
}
