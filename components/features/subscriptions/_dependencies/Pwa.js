/* eslint-disable no-unused-expressions */
import { isLogged } from './Session'

export default {
  isPWA() {
    if (typeof window !== 'undefined') {
      return !!window.ReactNativeWebView || !!window.nativeConnection
    }
    return null
  },
  parse(string) {
    try {
      return JSON.parse(string)
    } catch (error) {
      window.console.warn(
        'No se pudo parsear el JSON, por que no son los datos esperados `ArcId_USER_INFO`'
      )
      return {}
    }
  },
  _onMessage({ origin, data }, callback) {
    if (origin !== window.location.origin) return
    const userIdentity = this.parse(data)
    if (userIdentity.accessToken && userIdentity.refreshToken) {
      window.localStorage.setItem('ArcId.USER_INFO', data)
      callback()
    }
  },
  mount(callback) {
    const APP_CONNECTION = window.ReactNativeWebView || window.nativeConnection
    if (this.isPWA() && !isLogged()) {
      APP_CONNECTION && APP_CONNECTION.postMessage('paywall_ready')
      window.addEventListener('message', e => this._onMessage(e, callback))
    }
  },
  finalize() {
    const APP_CONNECTION = window.ReactNativeWebView || window.nativeConnection
    if (!this.isPWA()) return
    APP_CONNECTION && APP_CONNECTION.postMessage('successful_purchase')
  },
  pwaCloseWebView() {
    const APP_CONNECTION = window.ReactNativeWebView || window.nativeConnection
    if (!this.isPWA()) return
    APP_CONNECTION.pwaCloseWebview && APP_CONNECTION.pwaCloseWebview()
  },
}
