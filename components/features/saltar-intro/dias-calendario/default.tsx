import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { loadDateFromYYYYMMDD } from '../../../utilities/date-time/dates'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'saltar-intro-dias-calendario__container flex',
  boxDay: 'saltar-intro-dias-calendario__box-day',
  dayNum: 'saltar-intro-dias-calendario__day-num',
  dayName: 'saltar-intro-dias-calendario__day-name',
  triangle: 'saltar-intro-dias-calendario__triangle',
  boxLine: 'saltar-intro-dias-calendario__box-line',
  line: 'saltar-intro-dias-calendario__line',
  boxSeeMore: 'saltar-intro-dias-calendario__box-see-more',
  seeMore: 'saltar-intro-dias-calendario__see-more',
}

const SaltarIntroDiasCalendario: React.FC = (props) => {
  const { globalContent, contextPath } = useFusionContext()
  const {
    customFields: { seeMoreLink = '' },
  } = props
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

  return (
    <>
      {Object.keys(data).map((key: string) => {
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
      })}
      <div className={classes.boxSeeMore}>
        <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
          Ver más
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 28.44 26.27">
            <path
              d="M24.79,14.26c0,5.59-4.55,10.09-10.09,10.09c-5.59,0-10.09-4.49-10.09-10.09c0-5.54,4.49-10.03,10.09-10.03
C20.24,4.23,24.79,8.72,24.79,14.26z M22.18,14.26l-5.59-5.56c-0.61-0.61-1.51-0.61-2.14,0c-0.29,0.26-0.41,0.67-0.41,1.04
c0,0.41,0.12,0.78,0.41,1.1c0,0,0.96,0.96,1.94,1.94H8.7c-0.81,0-1.51,0.64-1.51,1.48c0,0.84,0.7,1.51,1.51,1.51h7.68
c-0.99,1.04-1.94,1.94-1.94,1.94c-0.29,0.32-0.41,0.72-0.41,1.1c0,0.41,0.12,0.75,0.41,1.07c0.64,0.61,1.54,0.61,2.14,0L22.18,14.26
z"
            />
          </svg>
        </a>
      </div>
    </>
  )
}

SaltarIntroDiasCalendario.propTypes = {
  customFields,
}
SaltarIntroDiasCalendario.label = 'Dias calendario - Saltar Intro'
SaltarIntroDiasCalendario.static = true

export default SaltarIntroDiasCalendario
