

export const handleResize = (currentDevice) => {
    return e => {
        const wsize = window.innerWidth
        //------ Set the new state if you change from mobile to desktop
        if (wsize >= 1024 && currentDevice !== 'desktop') {
            let device ='desktop'
            //return 'desktop'
            this.dispatchEvent('displayChange', 'desktop')
            // console.log("me estoy ejecutando en desktop")
        } else {
            //------ Set the new state if you change from desktop to mobile
            if (wsize < 1024 && wsize >= 640 && currentDevice !== 'tablet') {
                this.dispatchEvent('displayChange', 'tablet')
                //return 'tablet'
            } else {
                //------ Set the new state if you change from desktop to mobile
                if (wsize < 640 && currentDevice !== 'mobile') {
                    //return 'mobile'
                    this.dispatchEvent('displayChange', 'mobile')
                }
            }
        }
    }
}









// export const hResize = (device,size) => {
//     // window.addEventListener('resize', handleResize(device,size) );
//     window.addEventListener('resize', handleResize(device,size) );
// }


// export const hResize = (device,size) => {
//     const wsize = size;
    
//     //------ Set the new state if you change from mobile to desktop
//     if (wsize >= 1024 && device !== 'desktop') {
//             this.dispatchEvent('resize', () => 'desktop')
//     } else {
//         //------ Set the new state if you change from desktop to mobile
//         if (wsize < 1024 && wsize >= 640 && device !== 'tablet') {
//             this.dispatchEvent('resize', () => 'tablet')
//         } else {
//             //------ Set the new state if you change from desktop to mobile
//             if (wsize < 640 && device !== 'mobile') {
//                 this.dispatchEvent('resize', () => 'mobile')
//             }
//         }
//     }
// }