import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { loadDateFromYYYYMMDD } from '../../../utilities/date-time/dates'

const classes = {
  container: 'saltar-intro-dias-calendario__container flex',
  boxDay: 'saltar-intro-dias-calendario__box-day',
  dayNum: 'saltar-intro-dias-calendario__day-num',
  dayName: 'saltar-intro-dias-calendario__day-name',
  triangle: 'saltar-intro-dias-calendario__triangle',
  boxLine: 'saltar-intro-dias-calendario__box-line',
  line: 'saltar-intro-dias-calendario__line',
}

const SaltarIntroDiasCalendario: React.FC = /* (props: any) */ () => {
  const { globalContent, contextPath } = useFusionContext()
  const { data = {} } = globalContent
  const dateFormat = (date: string) => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ]
    const d = loadDateFromYYYYMMDD(date)
    return { dayName: days[d.getDay()], day: d?.getDate() }
  }

  return Object.keys(data).map((key: string) => {
    const { dayName = '', day = '' } = dateFormat(key)
    return (
      <div className={classes.container}>
        <div className={classes.boxDay}>
          <h2 className={classes.dayNum}>{day}</h2>
          <h3 className={classes.dayName}>{dayName}</h3>
        </div>
        <div className={classes.boxLine}>
          <div className={classes.triangle} />
          <div className={classes.line} />
          <div className={classes.line} />
          <div className={classes.line} />
          <div className={classes.line} />
          <div className={classes.line} />
        </div>
      </div>
    )
  })
}

/*
SaltarIntroSearchCalendario.propTypes = {
  customFields=,
} */

SaltarIntroDiasCalendario.label = 'Dias calendario - Saltar Intro'
SaltarIntroDiasCalendario.static = true

export default SaltarIntroDiasCalendario
