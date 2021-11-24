import { useAppContext } from 'fusion:context'
import React, { useState } from 'react'
import { FC } from 'types/features'

import { getVerboseDate } from '../../../utilities/date-time/dates'
import ArchiveCalendar from '../../widgets/archive-calendar/default'
import customFields from './_dependencies/custom-fields'

const classes = {
  wrapper: 'custom-title-archive',
  title: 'custom-title-archive__title',
  button: 'custom-title-archive__button uppercase',
}

interface Props {
  customFields?: {
    customText?: string
    isUppercase?: boolean
  }
}

const CustomTitleArchive: FC<Props> = (props) => {
  // const { globalContentConfig, arcSite } = useAppContext()
  const { globalContentConfig } = useAppContext()
  const [showCalendar, setShowCalendar] = useState(false)

  const { customFields: { customText, isUppercase } = {} } = props

  const handleClick = () => {
    setShowCalendar(!showCalendar)
  }

  const getArchivoTitle = () => {
    const { source } = globalContentConfig || {}
    if (source !== 'story-feed-by-section-and-date') {
      return undefined
    }

    const { query: { date = '' } = {} }: { query?: { date?: any } } =
      globalContentConfig || {}

    if (date === '' || !date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      return 'ÚLTIMO MINUTO'
    }

    return `ARCHIVO, ${getVerboseDate({ date, showTime: false }).toUpperCase()}` // ARCHIVO, LUNES 03 DE FEBRERO DEL 2018
  }

  return (
    <div className={`${classes.wrapper} ${isUppercase ? 'uppercase' : ''}`}>
      <h1 className={classes.title}>
        {customText || getArchivoTitle() || 'Título'}
      </h1>
      <button className={classes.button} type="button" onClick={handleClick}>
        <span className="icon">
          {showCalendar ? (
            <svg viewBox="0 0 500 500">
              <path d="M 30,440 A 30,30 0 0 1 7.5,392.5 L 230,80 A 25,25 0 0 1 270,80 L 492.5,392.5 A 30,30 0 0 1 470,440 Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 500 500">
              <path d="M 470,60 A 30,30 0 0 1 492.5,107.5 L 270,420 A 25,25 0 0 1 230,420 L 7.5,107.5 A 30,30 0 0 1 30,60 Z" />
            </svg>
          )}
        </span>
        {showCalendar ? `Cerrar Archivo` : `Ver Archivo`}
      </button>

      <div className={`${showCalendar ? '' : 'hidden'}`}>
        <ArchiveCalendar />
      </div>
    </div>
  )
}

CustomTitleArchive.propTypes = {
  customFields,
}

CustomTitleArchive.label = 'Título de Archivo'

export default CustomTitleArchive
