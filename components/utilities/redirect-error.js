/**
 * @description Clase que se extiende de Error y permite redireccionar una 
 * solicitud hecha con **fetch**. Perfecta para manejar errores indeseados 
 * cuando no se recibe la data que se espera.
 */
class RedirectError extends Error {

    /**
     * @param {string} [location] URI a donde se espera redireccionar. Por defecto 
     * se usa la ubicación actual.
     * @param {number} [statusCode=302] STATUS que retornará la solicitud.
     */
    constructor(location, statusCode) {
        super()
        this.location = location || this.location
        this.statusCode = statusCode || 302
    }
}

export default RedirectError