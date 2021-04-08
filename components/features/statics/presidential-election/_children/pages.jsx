/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const classes = {
  container: 'presidential-election-pages',
  title: 'presidential-election-pages__title',
  boxUrl: 'presidential-election-pages__box-url',
  inputRadio: 'presidential-election-pages__input--radio',
  active: 'presidential-election-pages__active',
  label: 'presidential-election-pages__label',
  radioFake: 'presidential-election-pages__radio-fake',
}
const PATH_PRESIDENCIAL = 'presidencial'
const PATH_CONGRESAL = 'congresal'
const PATH_PARLAMENTO_ANDINO = 'parlamento-andino'
/**
 * @type {'presidencial' | 'congresal' | 'parlamento-andino'}
 */
export default ({
  page = PATH_PRESIDENCIAL,
  pathBase = '/resultados-elecciones-2021',
}) => {
  const urlPath = page.replaceAll('_', '-')
  const selectedInput = (pathVal, pathCurrent) => {
    return pathVal === pathCurrent
  }
  const addClassActive = (pathVal, pathCurrent) => {
    const classActive = selectedInput(pathVal, pathCurrent)
      ? classes.active
      : ''
    return `${classes.inputRadio} ${classActive}`
  }
  const handleChangeRadio = e => {
    window.location.href = e.target.value
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Resultados oficiales</h1>
      <div className={classes.boxUrl} onChange={handleChangeRadio}>
        <input
          className={addClassActive(urlPath, PATH_PRESIDENCIAL)}
          value={`${pathBase}/${PATH_PRESIDENCIAL}`}
          type="radio"
          name="url"
          id={PATH_PRESIDENCIAL}
          checked={selectedInput(urlPath, PATH_PRESIDENCIAL)}
        />
        <label htmlFor={PATH_PRESIDENCIAL} className={classes.label}>
          <span className={classes.radioFake}></span>Presidencial
        </label>
        <input
          className={addClassActive(urlPath, PATH_CONGRESAL)}
          value={`${pathBase}/${PATH_CONGRESAL}`}
          type="radio"
          name="url"
          id={PATH_CONGRESAL}
          checked={selectedInput(urlPath, PATH_CONGRESAL)}
        />
        <label htmlFor={PATH_CONGRESAL} className={classes.label}>
          <span className={classes.radioFake}></span>Congresal
        </label>
        <input
          className={addClassActive(urlPath, PATH_PARLAMENTO_ANDINO)}
          value={`${pathBase}/${PATH_PARLAMENTO_ANDINO}`}
          type="radio"
          name="url"
          id={PATH_PARLAMENTO_ANDINO}
          checked={selectedInput(urlPath, PATH_PARLAMENTO_ANDINO)}
        />
        <label htmlFor={PATH_PARLAMENTO_ANDINO} className={classes.label}>
          <span className={classes.radioFake}></span>Par. Andino
        </label>
      </div>
    </div>
  )
}
