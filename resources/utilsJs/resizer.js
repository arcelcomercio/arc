export const setDevice = () => {
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

export const setResizeListener = (dispatch) => {
    window.device = setDevice()
    /* window.watch("device", (el, oldValue, newValue) => {
        console.log(`${el} --- old -> ${oldValue} --- new -> ${newValue}`)
    }) */
    // window.addEventListener('resize', Resizer._handleResize)
    window.addEventListener('resize', () => {
        const {
            innerWidth,
            device
        } = window
        console.log(innerWidth + ' ' + device)

        if (innerWidth >= 1024 && device !== 'desktop') {
            window.device = 'desktop'
            dispatch('displayChange', window.device)
            console.log(window.device)
        } else if (innerWidth < 1024 && innerWidth >= 640 && device !== 'tablet') {
            window.device = 'tablet'
            dispatch('displayChange', window.device)
            console.log(window.device)
        } else if (innerWidth < 640 && device !== 'mobile') {
            window.device = 'mobile'
            dispatch('displayChange', window.device)
            console.log(window.device, 'device')
        }
    })
    console.log('Se envió el Listener')
}