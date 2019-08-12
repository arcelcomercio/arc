export default {
    parse(string){
        try {
            return JSON.parse(string)
          } catch (error) {
            return string
          }
    },
    _onMessage({origin, data}, callback){
        if(origin !== 'https://pwa.gestion.pe') return
        this.parse(data);
        console.log({data})
        window.localStorage.setItem('ArcId.USER_INFO', data)
        callback()
    },
    mount(callback){
        window.addEventListener('message', (e) => this._onMessage(e, callback))
    }
}