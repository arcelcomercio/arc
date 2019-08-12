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
        console.log(getService('PWA_DOMAIN'))
        if(origin !== getService('PWA_DOMAIN')) return
        window.localStorage.setItem('ArcId.USER_INFO', data)
        callback()
    },
    mount(callback){
        window.addEventListener('message', (e) => this._onMessage(e, callback))
    }
}