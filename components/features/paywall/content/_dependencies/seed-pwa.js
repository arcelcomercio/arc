import getService from '../../_dependencies/services'


export default {
    isPWA(){
        return !!window.nativeConnection
    },
    parse(string){
        try {
            return JSON.parse(string)
          } catch (error) {
            throw new Error('No se pudo almacenar, por que no son los datos esperados `ArcId_USER_INFO`')
          }
    },
    _onMessage({origin, data}, callback){
        if(origin !== getService('PWA_DOMAIN')) return
        const userIdentity = this.parse(data);
        if(userIdentity.accessToken && userIdentity.refreshToken){
            window.localStorage.setItem('ArcId.USER_INFO', data)
            callback()
        }
    },
    mount(callback){
        if( !this.isPWA ) return;
        window.nativeConnection.postMessage('paywall_ready')
        window.addEventListener('message', (e) => this._onMessage(e, callback))
    },
    finalize(){
        if( !this.isPWA ) return;
        window.nativeConnection.postMessage('successful_purchase');
        window.nativeConnectionModal.pwaCloseWebView();
    }
}