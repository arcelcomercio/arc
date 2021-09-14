import { useAppContext } from 'fusion:context'
import * as React from 'react'

const classes = {
  box: 'react-calendar__box flex flex-col',
  header:
    'react-calendar__header flex justify-between items-center pt-10 pb-10 pr-20 pl-20',
  title: 'react-calendar__title uppercase w-full position-relative font-bold',
  brand: 'react-calendar__brand rounded flex justify-center items-center',
  icon: 'icon-marca react-calendar__icon',
  content: 'react-calendar__content-calendar p-10',
}

const AgendaCalendario = () => {
  const {
    globalContentConfig: { query },
  } = useAppContext()
  const { date: urlDate } = query || {}

  const getCalendarDate = (date = new Date()) => {
    if (date instanceof Date) return date
    const [year, month, day] = date.split('-')
    const newDate = [year, Number(month - 1), Number(day)]
    return new Date(...newDate)
  }

  const renderNewURL = (date) => {
    const mydate = new Date(date)
    const year = mydate.getFullYear()
    const month = Number(mydate.getMonth() + 1)
    const day = mydate.getDate()
    const dayFormat = day < 10 ? `0${day}` : day
    const monthFormat = month < 10 ? `0${month}` : month
    const newDateFormat = `${year}-${monthFormat}-${dayFormat}`

    return `/archivo/todas/${newDateFormat}/`
  }

  const mes = () => {
    const d = new Date()
    d.setHours(d.getHours() - 5)
    return new Intl.DateTimeFormat('es-419', { month: 'long' }).format(d)
  }

  const [calendarDate, setStateDate] = React.useState(getCalendarDate(urlDate))
  const setNewDate = (data) => {
    setStateDate(data)
    window.location.href = renderNewURL(data)
  }

  const Calendar = React.lazy(() =>
    import(
      /* webpackChunkName: "calendar" */
      'react-calendar/dist/entry.nostyle'
    )
  )

  return (
    <>
      <div className={classes.box}>
        <div className={classes.content}>
          {typeof window !== 'undefined' && (
            <React.Suspense fallback="Cargando...">
              <Calendar
                activeStartDate={getCalendarDate(urlDate)}
                maxDate={new Date()}
                minDate={new Date(2021, 6, 28)}
                onChange={(newDate) => setNewDate(newDate)}
                value={calendarDate}
                locale="es-419"
                navigationLabel={() => `${mes()}`}
                prev2Label=""
                next2Label=""
              />
            </React.Suspense>
          )}
        </div>
      </div>
    </>
  )
}

export default AgendaCalendario
