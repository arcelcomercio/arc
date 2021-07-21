import { createBrowserHistory } from 'history'
import * as React from 'react'

import { AuthContext } from '../_context/auth'

/**
 * @typedef {'winback'} Source
 */

let history = {}

/**
 * Esta funcion se encarga de ejecutar lo necesario
 * para que GA reciba el evento de pagina vista (page_view)
 * @param {string} path URL de pagina a registrar como page_view
 *
 * @see [medicion de aplicaciones SPA](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications)
 */
const setPageView = (path) => {
  console.log('registra nueva pagina vista ->', path)
}

/**
 * Esta funcion se encarga de agregar el sufijo que se agregara
 * a la ruta ROOT dependiendo del origen o evento de la suscripcion,
 * ej. Si el evento es winback, se espera que la ruta ROOT
 * sea `/suscripcionesdigitales/eventos/winback/`
 * @param {Source} source Origen o evento de suscripcion
 * @returns {string} Sufijo para agregar a la ruta ROOT
 */
const getPathSuffix = (source) => {
  let suffix = ''
  switch (source) {
    case 'winback':
      suffix = 'eventos/winback/'
      break
    default:
      break
  }
  return suffix
}

/**
 * Este hook esta hecho para manejar las rutas virtuales
 * de suscripciones digitales. Para que funcione, debe ser
 * invocado en un componente que cuente con el `AuthProvider`,
 * porque este hook usa el `AuthContext` para determinar
 * el paso en el que se encuentra el usuario y asi manejar la
 * ruta adecuada.
 * @param {Source} source Origen o evento de suscripcion
 * @returns {object} [history](https://github.com/ReactTraining/history/)
 *
 * @see [documentacion de **history**](https://github.com/ReactTraining/history/blob/master/docs/getting-started.md)
 */
const useRoute = (source) => {
  const ROOT = `/suscripcionesdigitales/${getPathSuffix(source)}`
  const PROFILE = `${ROOT}perfil/`
  const PAYMENT = `${ROOT}pago/`
  const CONFIRMATION = `${ROOT}confirmacion/`
  const CIP = `${ROOT}cip/`

  const { userLoaded, userStep, updateStep } = React.useContext(AuthContext)

  React.useEffect(() => {
    history = createBrowserHistory()

    // Escucha los cambios en la URL
    // y actualiza el `userStep` si se hace
    // POP con las flechas de navegacion del navegador
    const unlisten = history.listen(({ location: loc, action }) => {
      const { pathname: newPathname, search } = loc || {}
      if (newPathname && action) {
        if (action === 'PUSH') {
          setPageView(newPathname)
        }
        if (action === 'POP') {
          switch (newPathname) {
            case PROFILE:
              setPageView(newPathname)
              updateStep(2)
              break
            case PAYMENT:
              setPageView(newPathname)
              updateStep(3)
              break
            case CONFIRMATION:
              setPageView(newPathname)
              updateStep(4)
              break
            case CIP:
              setPageView(newPathname)
              updateStep(5)
              break
            default: {
              if (newPathname === ROOT) history.replace(PROFILE + search)
              updateStep(2)
              break
            }
          }
        }
      }
    })
    return () => {
      unlisten()
    }
  }, [])

  React.useEffect(() => {
    const { location: loc } = history

    const pushPath = (path) => {
      const { pathname, search = '' } = loc || {}
      if (pathname) {
        if (pathname !== path) {
          if (userLoaded) {
            history.push(path + search)
          } else {
            history.replace(ROOT + search)
          }
        }
      }
    }
    // Cada vez que cambia el `userStep`
    // si se esta en una URL diferente a la del `userStep`
    // entonces se hace el cambio a la URL que corresponde
    switch (userStep) {
      case 2:
        pushPath(PROFILE)
        break
      case 3:
        pushPath(PAYMENT)
        break
      case 4:
        pushPath(CONFIRMATION)
        break
      case 5:
        pushPath(CIP)
        break
      default:
        pushPath(ROOT)
        break
    }
  }, [userStep, userLoaded])

  return {
    history,
  }
}

export default useRoute
