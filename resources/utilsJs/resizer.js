import Consumer from 'fusion:consumer'

@Consumer
class Resizer {

    static setDevice = () => {
        console.log('SE EJECUTO -- SETDEVICE')
        const {
            innerWidth
        } = window

        if (innerWidth < 640) {
            return 'mobile'
        }
        if (innerWidth >= 640 && innerWidth < 1024) {
            return 'tablet'
        }
        return 'desktop'
    }

    static _handleResize = () => {
        const {
            innerWidth,
            device
        } = window
        console.log(innerWidth + ' ' + device)

        if (innerWidth >= 1024 && device !== 'desktop') {
            window.device = 'desktop'
            Resizer.dispatchEvent('displayChange', window.device)
            console.log(window.device)
        } else if (innerWidth < 1024 && innerWidth >= 640 && device !== 'tablet') {
            window.device = 'tablet'
            Resizer.dispatchEvent('displayChange', window.device)
            console.log(window.device)
        } else if (innerWidth < 640 && device !== 'mobile') {
            window.device = 'mobile'
            Resizer.dispatchEvent('displayChange', window.device)
            console.log(window.device)
        }
    }

    static setResizeListener = () => {
        window.device = Resizer.setDevice()
        window.addEventListener('resize', Resizer._handleResize)
        console.log('Se envió el Listener')
    }
}

export default Resizer