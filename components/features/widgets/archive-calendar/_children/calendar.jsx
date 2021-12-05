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

const ArchiveCalendarChild = ({
  activeStartDate,
  maxDate,
  minDate,
  onChange,
  value,
  locale,
  arcSite,
}) => {
  const Calendar = React.lazy(() =>
    import(
      /* webpackChunkName: "calendar" */
      'react-calendar/dist/entry.nostyle'
    )
  )

  const getArrowIcon = (icon) => {
    let svg

    switch (icon) {
      case 'next':
        svg = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        )
        break
      case 'next2':
        svg = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
          </svg>
        )
        break
      case 'prev':
        svg = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        )
        break
      case 'prev2':
        svg = (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
          </svg>
        )
        break
      default:
    }

    return <span className="icon">{svg}</span>
  }

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
              nextLabel={arcSite === 'trome' ? getArrowIcon('next') : '›'}
              next2Label={arcSite === 'trome' ? getArrowIcon('next2') : '»'}
              prevLabel={arcSite === 'trome' ? getArrowIcon('prev') : '‹'}
              prev2Label={arcSite === 'trome' ? getArrowIcon('prev2') : '«'}
            />
          </React.Suspense>
        )}
      </div>
    </div>
  )
}

export default ArchiveCalendarChild
