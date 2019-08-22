import React from 'react'
import Calendar from 'react-calendar/dist/entry.nostyle'

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
}) => {
  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <h3 className={classes.title}>Archivo</h3>
        <div className={classes.brand}>
          <span className={classes.icon} />
        </div>
      </div>
      <div className={classes.content}>
        <Calendar
          activeStartDate={activeStartDate}
          maxDate={maxDate}
          minDate={minDate}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default ArchiveCalendarChild
