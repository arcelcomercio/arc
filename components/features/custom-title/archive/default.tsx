import { useAppContext } from 'fusion:context'
import React, { useState } from 'react'
import { FC } from 'types/features'

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
  const { arcSite } = useAppContext()
  const [showCalendar, setShowCalendar] = useState(false)

  const {
    customFields: { customText = 'Sin Título!', isUppercase } = {},
  } = props

  const handleClick = () => {
    setShowCalendar(!showCalendar)
  }

  const formatTitle = (title: string) =>
    title.replace('ARCHIVO DE TODAS,', 'NOTICIAS')

  return (
    <>
      <div
        className={`${classes.wrapper} ${isUppercase ? 'uppercase' : ''} ${
          showCalendar ? 'custom-title-archive--active' : ''
        }`}>
        <h1 className={classes.title}>
          {arcSite === 'trome' ? formatTitle(customText) : customText}
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
      </div>
      <div className={`${showCalendar ? '' : 'hidden'}`}>
        <ArchiveCalendar />
      </div>
    </>
  )
}

CustomTitleArchive.propTypes = {
  customFields,
}

CustomTitleArchive.label = 'Título de Archivo'

export default CustomTitleArchive
