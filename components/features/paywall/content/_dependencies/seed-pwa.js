import { isLogged } from "../../_dependencies/Identity";

export default {
    isPWA(){
        return !!window.nativeConnection
    },
    parse(string){
        try {
            return JSON.parse(string)
          } catch (error) {
              console.warn('No se pudo parsear el JSON, por que no son los datos esperados `ArcId_USER_INFO`');
              return {}
          }
    },
    _onMessage({origin, data}, callback){
        if(origin !== window.location.origin) return
        const userIdentity = this.parse(data);
        if(userIdentity.accessToken && userIdentity.refreshToken){
            window.localStorage.setItem('ArcId.USER_INFO', data)
            callback()
        }
    },
    mount(callback){
        if( this.isPWA() && !isLogged() ){
            window.nativeConnection.postMessage('paywall_ready')
            window.addEventListener('message', (e) => this._onMessage(e, callback))
        }
    },
    finalize(){
        if( !this.isPWA() ) return;
        window.nativeConnection.postMessage('successful_purchase');
        window.nativeConnection.pwaCloseWebView();
    }
}