import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import Calendar from 'react-calendar/dist/entry.nostyle'

const ArchiveCalendar = () => {
  const {
    globalContentConfig: { query },
  } = useFusionContext()
  const { date: urlDate } = query

  const formatCalendarDate = (dt = new Date()) => {
    if (dt instanceof Date) return dt
    const [year, month, day] = dt.split('-')
    const newDate = [year, Number(month - 1), Number(day)]
    return new Date(...newDate)
  }

  const renderNewURL = date => {
    const { section } = query
    const _date = new Date(date)
    const year = _date.getFullYear()
    const month = Number(_date.getMonth() + 1)
    const day = _date.getDate()
    const formatDay = day < 10 ? `0${day}` : day
    const formatMonth = month < 10 ? `0${month}` : month
    const newFormatDate = `${year}-${formatMonth}-${formatDay}`
    const url = section
      ? `/archivo/${section}/${newFormatDate}/`
      : `/archivo/todas/${newFormatDate}/`
    return url
  }

  const [calendarDate, setStateDate] = useState(formatCalendarDate(urlDate))
  const setNewDate = data => {
    setStateDate(data)
    window.location.href = renderNewURL(data)
  }
  return (
    <div className="react-calendar__box">
      <div className="react-calendar__header">
        <h3 className="react-calendar__title">Archivo</h3>
        <div className="react-calendar__brand">
          <span className="icon-marca react-calendar__icon" />
        </div>
      </div>
      <div className="react-calendar__content-calendar">
        <Calendar
          activeStartDate={formatCalendarDate(urlDate)}
          maxDate={new Date()}
          minDate={new Date(2014, 0, 1)}
          onChange={newDate => setNewDate(newDate)}
          value={calendarDate}
        />
      </div>
    </div>
  )
}

ArchiveCalendar.label = 'Calendario Archivo'
export default ArchiveCalendar
