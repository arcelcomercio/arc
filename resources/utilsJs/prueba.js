

// esta funcion debe ser exportable y debe recibir los sgtes parametros:
// currentDevice  que es el valor del setState actual

// luego capturar el tamaño de la ventana
// compararla con las medidas del breakpoint para desktop en una condicional IF 
// si cumple que el tamaño de la ventana es mayor o igual a 1024 y el valor de currentdevice es diferente 
// a desktop , ejecuta:

// this.displachEvent('displayChange', 'desktop')

// esto despacha el evento displayChange, que es un evento personalizado, y manda la variale desktop

// displayChange se escuchara a 



export const handleResize = (currentDevice,wsize) => {

    if(wsize >= 1024 && currentDevice !== 'desktop'){

        this.dispatchEvent('displayChange', 'desktop');

    }else if(wsize < 1024 && currentDevice !== 'desktop') {

        this.dispatchEvent('displayChange', 'tablet')

    }else if(wsize < 640 && currentdevice !== 'mobile'){

        this.dispatchEvent('displayChange', 'mobile')

    }
}









// export const handleResize = (currentDevice) => {
//     return e => {
//         const wsize = window.innerWidth
//         //------ Set the new state if you change from mobile to desktop
//         if (wsize >= 1024 && currentDevice !== 'desktop') {
//             let device ='desktop'
//             //return 'desktop'
//             this.dispatchEvent('displayChange', 'desktop')
//             // console.log("me estoy ejecutando en desktop")
//         } else {
//             //------ Set the new state if you change from desktop to mobile
//             if (wsize < 1024 && wsize >= 640 && currentDevice !== 'tablet') {
//                 this.dispatchEvent('displayChange', 'tablet')
//                 //return 'tablet'
//             } else {
//                 //------ Set the new state if you change from desktop to mobile
//                 if (wsize < 640 && currentDevice !== 'mobile') {
//                     //return 'mobile'
//                     this.dispatchEvent('displayChange', 'mobile')
//                 }
//             }
//         }
//     }
// }









