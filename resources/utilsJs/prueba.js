


export const hResize = (device,size) => {
    window.addEventListener('resize', handleResize(device,size) );
}


const handleResize = (device,size) => {
    const wsize = size;
    
    //------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && device !== 'desktop') {
        // setState({
            //     device: 'desktop'
            // });
            console.log("estoy en desktop")
            dispatchEvent('displayChange', device)
            this.props.procesar('desktop')
    } else {
        //------ Set the new state if you change from desktop to mobile
        if (wsize < 1024 && wsize >= 640 && device !== 'tablet') {
            setState({
                device: 'tablet'
            });
            console.log("estoy en tablet")
            this.dispatchEvent('displayChange', device)
        } else {
            //------ Set the new state if you change from desktop to mobile
            if (wsize < 640 && device !== 'mobile') {
                setState({
                    device: 'mobile'
                });
                console.log("estoy en mobile")
                this.dispatchEvent('displayChange', device)
            }
        }
    }
}