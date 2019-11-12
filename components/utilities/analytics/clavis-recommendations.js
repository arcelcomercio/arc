/* eslint-disable */
import { hasLocalStorage, getUUID } from './clavis-service'

const BASE_URL = 'https://hybrid-elcomercio.perso.aws.arc.pub/hybrid/hybrid-filter'

/**
 * 
 * @param {object} props Propiedades
 * @param {string} props.contentId ID de la historia sobre la cual se recomienda. 
 * @param {number} props.count Cantidad de historias a recomendar.
 * @param {string} props.site ID del sitio del que solicita las recomendaciones.
 * 
 * @param {string} endpoint Endpoint de la API. `/recommend`, `/rendered` o `/clicked`.
 * 
 * @returns {Promise} Promesa que resuelve la lista de historias recomendadas para el usuario.
 * 
 * @see - Documentación https://elcomercio.arcpublishing.com/alc/docs/swagger/?url=./arc-products/recommendations.json#/
 */
function clavisRecommendations({ contentId, count, site }, endpoint = '/recommend') {
    if (contentId && typeof count === 'number' && site) {
        if (typeof window === "undefined") {
            throw new Error(
                "Estás tratando de invocar clavis en un entorno de no navegación."
            );
        }
        if (!hasLocalStorage()) {
            console.error(
                "LocalStorage no existe o no es escribible. Clavis depende del localStorage."
            );
            return;
        }

        if (
            contentId &&
            contentId.length > 0 &&
            site &&
            site.length > 0
        ) {
            const requestUrl = `${BASE_URL}${endpoint}`

            /* const environment = (window &&
                window.location &&
                window.location.host &&
                (window.location.host.includes('sandbox')
                    || window.location.host.includes('dev')
                    || window.location.host.includes('localhost'))) ?
                `sandbox.[${ARC_ORG_NAME}]` : ARC_ORG_NAME; */

            return fetch(requestUrl, {
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify({
                    uid: getUUID(),
                    url: `contentapi://${contentId}`,
                    count,
                    referrer: document.referrer,
                    site
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }).then(function (response) {
                return response.json();
            })

        } else return;
    }
}

export default clavisRecommendations