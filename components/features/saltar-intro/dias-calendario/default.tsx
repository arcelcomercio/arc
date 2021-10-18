import * as React from 'react'

const classes = {
  container: 'saltar-intro-dias-calendario__container flex',
  boxDay: 'saltar-intro-dias-calendario__box-day',
  dayNum: 'saltar-intro-dias-calendario__day-num',
  dayName: 'saltar-intro-dias-calendario__day-name',
  triangle: 'saltar-intro-dias-calendario__triangle',
  boxLine: 'saltar-intro-dias-calendario__box-line',
  line: 'saltar-intro-dias-calendario__line',
}

const SaltarIntroDiasCalendario = /* (props: any) */ () => 
  /* const {
    customFields: {},
  } = props */
   (
    <div className={classes.container}>
      <div className={classes.boxDay}>
        <h2 className={classes.dayNum}>3</h2>
        <h3 className={classes.dayName}>miércoles</h3>
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


/*
SaltarIntroSearchCalendario.propTypes = {
  customFields=,
} */

SaltarIntroDiasCalendario.label = 'Dias calendario - Saltar Intro'
SaltarIntroDiasCalendario.static = true

export default SaltarIntroDiasCalendario
