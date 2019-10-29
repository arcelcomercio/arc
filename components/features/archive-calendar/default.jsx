import React, { useState } from 'react'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'

import ArchiveCalendarChild from './_children/calendar'

const ArchiveCalendar = ({ customFields: { sectionField } = {} }) => {
  const {
    globalContentConfig: { query },
  } = useFusionContext()
  const { date: urlDate } = query || {}

  const getCalendarDate = (date = new Date()) => {
    if (date instanceof Date) return date
    const [year, month, day] = date.split('-')
    const newDate = [year, Number(month - 1), Number(day)]
    return new Date(...newDate)
  }

  const renderNewURL = date => {
    const { section } = query || {}
    const _date = new Date(date)
    const year = _date.getFullYear()
    const month = Number(_date.getMonth() + 1)
    const day = _date.getDate()
    const dayFormat = day < 10 ? `0${day}` : day
    const monthFormat = month < 10 ? `0${month}` : month
    const newDateFormat = `${year}-${monthFormat}-${dayFormat}`
    const url = section
      ? `/archivo/${section}/${newDateFormat}/`
      : `/archivo${
          sectionField === '/' || !sectionField ? '/todas' : sectionField
        }/${newDateFormat}/`
    return url
  }

  const [calendarDate, setStateDate] = useState(getCalendarDate(urlDate))
  const setNewDate = data => {
    setStateDate(data)
    window.location.href = renderNewURL(data)
  }

  const params = {
    activeStartDate: getCalendarDate(urlDate),
    maxDate: new Date(),
    minDate: new Date(2014, 0, 1),
    onChange: newDate => setNewDate(newDate),
    value: calendarDate,
  }

  return <ArchiveCalendarChild {...params} />
}

ArchiveCalendar.label = 'Calendario Archivo'

ArchiveCalendar.propTypes = {
  customFields: PropTypes.shape({
    sectionField: PropTypes.string.tag({
      name: 'Sección',
    }),
    /* dateField: PropTypes.string.tag({
      name: 'Fecha',
    }), */
  }),
}

export default ArchiveCalendar
