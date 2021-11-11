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

const AgendaCalendario = (props) => {
  const { isLastDayClick = false, isYesterday = false } = props
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
  const getCalendarDate2 = (date = new Date(), yesterday) => {
    let ant = 0
    if (yesterday === true) {
      ant = 1
    }
    console.log('ant', ant)
    if (date instanceof Date) return date
    const [year, month, day] = date.split('-')
    const newDate = [year, Number(month - 1), Number(day - ant)]
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

    return `/agenda-presidencial/${newDateFormat}/`
  }

  const day = (val) => {
    const d = new Date()
    d.setHours(d.getHours() - 5)
    if (val) {
      return d.setDate(d.getDate())
    }
    return d.setDate(d.getDate() - 1)
  }

  const setNewDate = (data) => {
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
                maxDate={new Date(day(isLastDayClick))}
                minDate={new Date(2021, 6, 28)}
                onChange={(newDate) => setNewDate(newDate)}
                value={getCalendarDate2(urlDate, isYesterday)}
                //  value={new Date()}
                locale="es-419"
                // navigationLabel={({ date, locale }) =>
                //   `${mes(date.toLocaleDateString(locale))}`
                // }
                prev2Label=""
                next2Label=""
                formatShortWeekday={(locale, value) =>
                  ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'][value.getDay()]
                }
              />
            </React.Suspense>
          )}
        </div>
      </div>
    </>
  )
}

export default AgendaCalendario
