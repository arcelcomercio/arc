/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppContext } from 'fusion:context'
import React from 'react'

const classes = {
  container: 'presidential-election-pages',
  title: 'presidential-election-pages__title',
  boxUrl: 'presidential-election-pages__box-url',
  inputRadio: 'presidential-election-pages__input--radio',
  active: 'presidential-election-pages__active',
  label: 'presidential-election-pages__label',
  radioFake: 'presidential-election-pages__radio-fake',
  ec_data: 'presidential-election-pages__ec-data',
}
const PATH_PRESIDENCIAL = 'presidencial'
const PATH_CONGRESAL = 'congresal'
const PATH_PARLAMENTO_ANDINO = 'parlamento-andino'
/**
 * @type {'presidencial' | 'congresal' | 'parlamento-andino'}
 */
export default ({
  customFields = {},
  page = PATH_PRESIDENCIAL,
  pathBase = '',
}) => {
  const { arcSite } = useAppContext()

  const { template, urlFirstElection, urlSecondElection } = customFields

  const urlPath = page.replaceAll('_', '-')
  const selectedInput = (pathVal, pathCurrent) => pathVal === pathCurrent
  const addClassActive = (pathVal, pathCurrent) => {
    const classActive = selectedInput(pathVal, pathCurrent)
      ? classes.active
      : ''
    return `${classes.inputRadio} ${classActive}`
  }
  const handleChangeRadio = (e) => {
    window.location.href = e.target.value
  }
  return (
    <div
      className={`${classes.container} ${
        template === 'second' ? 'second' : ''
      }`}>
      <h1 className={classes.title}>Resultados oficiales</h1>

      <div className={classes.ec_data}>
        {arcSite === 'elcomercio' && (
          <svg viewBox="0 0 370.68 77.8">
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <path
                  className="presidential-election-pages__cls-1"
                  d="M38.9,77.8A38.9,38.9,0,1,0,0,38.9,38.89,38.89,0,0,0,38.9,77.8"
                />
                <path
                  className="presidential-election-pages__cls-2"
                  d="M61.91,50.54l-.86.75a31,31,0,0,1-8.72,5.07A23.32,23.32,0,0,1,43.4,58l-1.7,0V20.11c3,1.53,4.58,2.21,7.86,2.21,4.56,0,8.68-3.16,11.92-7.9l-1.24-.66a7.21,7.21,0,0,1-5.81,3.07c-2.74,0-6-1.49-10-4.15L28.6,25.85V41.63c0,4.23-.11,5.42-.39,6.2A7.84,7.84,0,0,1,26.56,50,21.28,21.28,0,0,1,21.84,36.7,20,20,0,0,1,25,25.78,26.27,26.27,0,0,1,32.3,18l.46-.31-.86-.93-.41.25c-5.32,3.19-9.48,6.11-11.87,9.51A24.42,24.42,0,0,0,15,40.8a24.82,24.82,0,0,0,3.25,12.12,22.69,22.69,0,0,0,9,9,25.3,25.3,0,0,0,12.27,3.15,27.5,27.5,0,0,0,8.84-1.5,25.06,25.06,0,0,0,7.64-4,27.33,27.33,0,0,0,6-7.15l.73-1.15ZM40.14,57.76a21.4,21.4,0,0,1-6.88-2.1A20.25,20.25,0,0,1,27.44,51a63.2,63.2,0,0,0,7.1-6.8,7.72,7.72,0,0,0,1.7-2.94,15.74,15.74,0,0,0,.33-4V21.66l3.57-3.06Z"
                />
                <path d="M121.21,54l4.53-1.2V21.9l-4.53-1.2V12.84h42.32l.56,15.57h-9l-2.4-6.72H141.59v11h3.18l1.06-4h7.22V45.33h-7.22l-1.06-4.18h-3.18V53h11.25l3.25-8.21h9.13l-.63,17.06H121.21Z" />
                <path d="M167.78,37.68c0-19,13.09-25.69,26.32-25.69,6.44,0,12.81,1.07,15.85,2.27l.5,15.29h-9.91l-2-6.45a10.27,10.27,0,0,0-4.67-1c-6.79,0-8.92,5.17-8.92,14.16,0,13.44,2.62,16.35,9.27,16.35a9.81,9.81,0,0,0,5-1.21l2.05-6.58H211l-.71,15.07c-3.54,1.56-9.34,2.84-17.55,2.84C178.53,62.74,167.78,55.66,167.78,37.68Z" />
                <path d="M214.49,54l4.53-1.2V21.9l-4.46-1.2V12.84h24.91c14.58,0,24.48,6.3,24.48,23.78,0,17.91-10.61,25.27-24.34,25.27H214.49Zm23.92-1.56c5.66,0,8.7-2.83,8.7-14.86,0-13.09-3.25-15.35-9.06-15.35h-2.83V52.47Z" />
                <path d="M265,52.33c0-7.64,5.38-10.12,14.44-11.75l5.94-1.13V38.11c0-3.33-1.56-4.67-6.79-4.67a67.51,67.51,0,0,0-9.84.7V25.58a52.34,52.34,0,0,1,16.7-2.69c10,0,14.51,4.18,14.51,12.81V51.55a2.05,2.05,0,0,0,2.34,2.2h1v7.07a17.21,17.21,0,0,1-8.07,2c-4.39,0-7-1.35-8.21-4.6h-.35c-1.91,2.54-5.59,4.6-10.41,4.6C269.34,62.81,265,58.42,265,52.33Zm20.38,1.06V45.82l-2.33.07c-2.41.14-3.61,1.42-3.61,4.39s.85,4.25,3.11,4.25A4.15,4.15,0,0,0,285.4,53.39Z" />
                <path d="M307.91,51.84V32.3h-3.75V25.58l5.09-2,1.7-8.77h11.54v8.91h7.22V32.3h-7.22V49.5c0,3.12,1.56,3.89,4.32,3.89a11.73,11.73,0,0,0,3.25-.49v7.78a19.73,19.73,0,0,1-9.55,2.06C312.51,62.74,307.91,60.12,307.91,51.84Z" />
                <path d="M332.4,52.33c0-7.64,5.38-10.12,14.43-11.75l5.95-1.13V38.11c0-3.33-1.56-4.67-6.79-4.67a67.51,67.51,0,0,0-9.84.7V25.58a52.34,52.34,0,0,1,16.7-2.69c10,0,14.51,4.18,14.51,12.81V51.55a2,2,0,0,0,2.33,2.2h1v7.07a17.14,17.14,0,0,1-8.06,2c-4.39,0-7-1.35-8.21-4.6h-.36c-1.91,2.54-5.59,4.6-10.4,4.6C336.72,62.81,332.4,58.42,332.4,52.33Zm20.38,1.06V45.82l-2.34.07c-2.4.14-3.61,1.42-3.61,4.39s.85,4.25,3.12,4.25A4.17,4.17,0,0,0,352.78,53.39Z" />
                <line
                  className="presidential-election-pages__cls-3"
                  x1="98.26"
                  y1="13.95"
                  x2="98.26"
                  y2="63.85"
                />
              </g>
            </g>
          </svg>
        )}
        <a
          className="presidential-election-pages__link"
          href={template === 'second' ? urlFirstElection : urlSecondElection}>
          {template === 'second' ? 'Primera vuelta' : 'Segunda vuelta'}
        </a>
      </div>

      {template !== 'second' && (
        <div className={classes.boxUrl} onChange={handleChangeRadio}>
          {customFields[PATH_PRESIDENCIAL] ? (
            <>
              {' '}
              <input
                className={addClassActive(urlPath, PATH_PRESIDENCIAL)}
                value={`${pathBase}/${PATH_PRESIDENCIAL}/`}
                type="radio"
                name="url"
                id={PATH_PRESIDENCIAL}
                checked={selectedInput(urlPath, PATH_PRESIDENCIAL)}
              />
              <label htmlFor={PATH_PRESIDENCIAL} className={classes.label}>
                <span className={classes.radioFake} />
                Presidencial
              </label>{' '}
            </>
          ) : null}

          {customFields[PATH_CONGRESAL] ? (
            <>
              <input
                className={addClassActive(urlPath, PATH_CONGRESAL)}
                value={`${pathBase}/${PATH_CONGRESAL}/`}
                type="radio"
                name="url"
                id={PATH_CONGRESAL}
                checked={selectedInput(urlPath, PATH_CONGRESAL)}
              />
              <label htmlFor={PATH_CONGRESAL} className={classes.label}>
                <span className={classes.radioFake} />
                Congresal
              </label>
            </>
          ) : null}

          {customFields[PATH_PARLAMENTO_ANDINO] ? (
            <>
              {' '}
              <input
                className={addClassActive(urlPath, PATH_PARLAMENTO_ANDINO)}
                value={`${pathBase}/${PATH_PARLAMENTO_ANDINO}/`}
                type="radio"
                name="url"
                id={PATH_PARLAMENTO_ANDINO}
                checked={selectedInput(urlPath, PATH_PARLAMENTO_ANDINO)}
              />
              <label htmlFor={PATH_PARLAMENTO_ANDINO} className={classes.label}>
                <span className={classes.radioFake} />
                Par. Andino
              </label>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}
