import getService from '../../_dependencies/services'

export default {
    parse(string){
        try {
            return JSON.parse(string)
          } catch (error) {
            return string
          }
    },
    _onMessage({origin, data}, callback){
        if(origin !== getService('PWA_DOMAIN')) return
        window.localStorage.setItem('ArcId.USER_INFO', data)
        callback()
    },
    mount(callback){
        if(window.opener)
            window.opener.postMessage('paywall-ready', getService('PWA_DOMAIN'));
        window.addEventListener('message', (e) => this._onMessage(e, callback))
    }
}