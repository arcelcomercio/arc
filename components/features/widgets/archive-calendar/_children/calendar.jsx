import * as React from 'react'

import importRetry from '../../../../utilities/core/import-retry'

const classes = {
  box: 'react-calendar__box flex flex-col',
  header:
    'react-calendar__header flex justify-between items-center pt-10 pb-10 pr-20 pl-20',
  title: 'react-calendar__title uppercase w-full position-relative font-bold',
  brand: 'react-calendar__brand rounded flex justify-center items-center',
  icon: 'icon-marca react-calendar__icon',
  content: 'react-calendar__content-calendar p-10',
}

const ArchiveCalendarChild = ({
  activeStartDate,
  maxDate,
  minDate,
  onChange,
  value,
  locale,
}) => {
  const Calendar = React.lazy(() =>
    importRetry(() =>
      import(
        /* webpackChunkName: "calendar" */
        'react-calendar/dist/entry.nostyle'
      )
    )
  )

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <h3 itemProp="name" className={classes.title}>
          Archivo
        </h3>
        <div className={classes.brand}>
          <span className={classes.icon} />
        </div>
      </div>
      <div className={classes.content}>
        {typeof window !== 'undefined' && (
          <React.Suspense fallback="Cargando...">
            <Calendar
              activeStartDate={activeStartDate}
              maxDate={maxDate}
              minDate={minDate}
              onChange={onChange}
              value={value}
              locale={locale}
            />
          </React.Suspense>
        )}
      </div>
    </div>
  )
}

export default ArchiveCalendarChild
