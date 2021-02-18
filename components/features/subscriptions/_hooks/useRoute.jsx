import * as React from 'react'
import { createBrowserHistory } from 'history'

import { AuthContext } from '../_context/auth'

const ROOT = '/suscripcionesdigitales/'
const PROFILE = `${ROOT}perfil/`
const PAYMENT = `${ROOT}pago/`
const CONFIRMATION = `${ROOT}confirmacion/`

let history = {}

/**
 * Esta funcion se encarga de ejecutar lo necesario
 * para que GA reciba el evento de pagina vista (page_view)
 * @param {string} path
 * @see [medicion de aplicaciones SPA](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications)
 */
const setPageView = path => {
  console.log('registra nueva pagina vista ->', path)
}

/**
 * Este hook esta hecho para manejar las rutas virtuales
 * de suscripciones digitales. Para que funcione, debe ser
 * invocado en un componente que cuente con el `AuthProvider`,
 * porque este hook usa el `AuthContext` para determinar
 * el paso en el que se encuentra el usuario y asi manejar la
 * ruta adecuada.
 * @returns {object} [history](https://github.com/ReactTraining/history/)
 * @see [documentacion de **history**](https://github.com/ReactTraining/history/blob/master/docs/getting-started.md)
 */
const useRoute = () => {
  const { userLoaded, userStep, updateStep } = React.useContext(AuthContext)

  React.useEffect(() => {
    history = createBrowserHistory()

    // Escucha los cambios en la URL
    // y actualiza el `userStep` si se hace
    // POP con las flechas de navegacion del navegador
    const unlisten = history.listen(({ location, action }) => {
      const { pathname: newPathname } = location
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
          default: {
            if (newPathname === ROOT) history.replace(PROFILE)
            updateStep(2)
            break
          }
        }
      }
    })
    return () => {
      unlisten()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const { location } = history

    const pushPath = path => {
      if (location.pathname !== path) {
        if (userLoaded) {
          history.push(path)
        } else {
          history.replace(ROOT)
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
