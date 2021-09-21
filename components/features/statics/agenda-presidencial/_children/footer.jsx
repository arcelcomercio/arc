// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Console } from 'console'
import * as React from 'react'

const classes = {
  contenedor: 'agenda-presidencial__footer__contenedor',
  elecont: 'agenda-presidencial__footer__elemento__contenedor',
  elecont2: 'agenda-presidencial__footer__elemento__contenedor2',
  back: 'agenda-presidencial__footer__elemento__back',
  ahead: 'agenda-presidencial__footer__elemento__ahead',
  hoja: 'agenda-presidencial__footer__elemento__hoja',
}

const Footer = (props) => {
  const { isBack = '', isAhead = '' } = props

  // redirecciona un dia atras
  const haciaAtras = (e) => {
    e.preventDefault()
    window.location.href = isBack
  }
  // redirecciona un dia adelante
  const haciaAdelante = (e) => {
    e.preventDefault()
    window.location.href = isAhead
  }

  return (
    <>
      <div
        className={classes.contenedor}
        style={
          !isBack && !isAhead
            ? { backgroundColor: 'transparent' }
            : { backgroundColor: '#fffcf5' }
        }>
        <div className={classes.elecont}>
          {isBack && (
            <button type="submit" className={classes.back} onClick={haciaAtras}>
              <svg>
                <g
                  style={{
                    opacity: 0.203,
                  }}>
                  <path d="M25.468 50.937a25.475 25.475 0 0 1-9.914-48.935 25.476 25.476 0 0 1 19.828 46.935 25.311 25.311 0 0 1-9.914 2Zm0-47.937a22.475 22.475 0 0 0-8.745 43.172A22.475 22.475 0 0 0 34.214 4.765 22.327 22.327 0 0 0 25.468 3Z" />
                  <path d="M25.468 14.381a1.5 1.5 0 0 1 1.061 2.561l-8.527 8.527 8.527 8.527a1.5 1.5 0 0 1-2.121 2.121l-9.587-9.587a1.5 1.5 0 0 1 0-2.121l9.587-9.587a1.5 1.5 0 0 1 1.06-.441Z" />
                  <path d="M15.881 23.968h19.175a1.5 1.5 0 1 1 0 3H15.881a1.5 1.5 0 0 1 0-3Z" />
                </g>
              </svg>
            </button>
          )}
        </div>

        <div className={classes.elecont2}>
          {isAhead && (
            <div className={classes.hoja}>
              <button
                type="submit"
                className={classes.ahead}
                onClick={haciaAdelante}>
                <svg>
                  <g
                    style={{
                      opacity: 0.2,
                    }}>
                    <path d="M25.469 0a25.475 25.475 0 0 1 9.914 48.935A25.476 25.476 0 0 1 15.555 2a25.311 25.311 0 0 1 9.914-2Zm0 47.937a22.475 22.475 0 0 0 8.745-43.172 22.475 22.475 0 0 0-17.491 41.407 22.327 22.327 0 0 0 8.746 1.765Z" />
                    <path d="M25.469 36.556a1.5 1.5 0 0 1-1.061-2.561l8.527-8.527-8.527-8.527a1.5 1.5 0 0 1 2.121-2.121l9.587 9.587a1.5 1.5 0 0 1 0 2.121l-9.587 9.587a1.5 1.5 0 0 1-1.06.441Z" />
                    <path d="M35.056 26.969H15.881a1.5 1.5 0 1 1 0-3h19.175a1.5 1.5 0 0 1 0 3Z" />
                  </g>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Footer
