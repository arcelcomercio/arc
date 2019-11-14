/* eslint-disable */
import { hasLocalStorage, getUUID } from './clavis-service'

const BASE_URL = 'https://hybrid-elcomercio.perso.aws.arc.pub/hybrid/hybrid-filter'
const RECOMMEND = '/recommend'
const RENDERED = '/rendered'
const CLICKED = '/clicked'

const CONTENT_API_URL = 'contentapi://'
const HEADERS = new Headers({
    'Content-Type': 'application/json'
})

/**
 * @description
 * Esta función permite obtener una promesa que al ser resuelta retorna 
 * el listado de historias *(NO en formato ANS)* recomendadas para un usuario específico y relacinada a la 
 * historia que está visualizando actualmente. Esta función requiere que el DOM exista, por 
 * lo tanto, debería usarse en `componentDidMount` o `useEffect`.
 * 
 * @param {Object} props Propiedades
 * @param {string} props.contentId ID de la historia sobre la cual se recomienda. 
 * @param {number} props.count Cantidad de historias a recomendar.
 * @param {string} props.site ID del sitio del que solicita las recomendaciones.
 * 
 * @returns {Promise} Promesa que resuelve la lista de historias recomendadas para el usuario.
 * 
 * @see
 * - [Documentación.](https://elcomercio.arcpublishing.com/alc/docs/swagger/?url=./arc-products/recommendations.json#/recommend/getRecommendations)
 * - [Dashboard de Clavis.](https://elcomercio.arcpublishing.com/clavis/recommendations)
 */
export default function clavisRecommendations({ contentId, count, site }) {
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
            const requestUrl = `${BASE_URL}${RECOMMEND}`

            return fetch(requestUrl, {
                method: 'POST',
                body: JSON.stringify({
                    uid: getUUID(),
                    url: `${CONTENT_API_URL}${contentId}`,
                    count,
                    referrer: document.referrer,
                    site
                }),
                headers: HEADERS,
            }).then(function (response) {
                return response.json();
            })

        } else return;
    }
}

/**
 * @description
 * Esta función envía información a Clavis sobre las recomendaciones que 
 * han sido **renderizadas** para el usuario. Es clave para generar estadísticas 
 * fiables en el panel de control de clavis y recomendaciones más precisas. 
 * Esta función requiere que el DOM exista, por lo tanto, debería usarse en 
 * `componentDidMount` o `useEffect`.
 * 
 * @param {Object} props Propiedades
 * @param {string} props.contentId ID de la historia sobre la cual se recomienda. 
 * @param {number} props.count Cantidad de historias a recomendar.
 * @param {string} props.site ID del sitio del que solicita las recomendaciones.
 * @param {Object} props.response Version corta de las recomendaciones obtenidas.
 * @param {Object[]} props.response.results Listado de recomendaciones cortas.
 * @param {string} props.response.results[].url URL de la historia recomendada.
 * @param {string} props.response.results[].responsestype Tipo de respuesta de la historia recomendada.
 * 
 * @see
 * - [Documentación.](https://elcomercio.arcpublishing.com/alc/docs/swagger/?url=./arc-products/recommendations.json#/rendered/renderedRecommendations)
 * - [Dashboard de Clavis.](https://elcomercio.arcpublishing.com/clavis/recommendations)
 */
export function clavisRendered({ contentId, count, site, response }) {
    if (contentId && typeof count === 'number' && site && response) {
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
            const requestUrl = `${BASE_URL}${RENDERED}`

            return fetch(requestUrl, {
                method: 'POST',
                body: JSON.stringify({
                    uid: getUUID(),
                    url: `${CONTENT_API_URL}${contentId}`,
                    count,
                    referrer: document.referrer,
                    site,
                    response
                }),
                headers: HEADERS,
            }).then(function (response) {
                return response.json();
            })

        } else return;
    }
}

/**
 * @description
 * Esta función envía información a Clavis acerca de una recomendación sobre la 
 * que el usuario ha hecho **clic**. Es clave para generar estadísticas 
 * fiables en el panel de control de clavis y recomendaciones más precisas. 
 * Se espera que esta función se ejecute como respuesta a un evento `onClick()`.
 * 
 * @param {Object} props Propiedades
 * @param {string} props.contentId ID de la historia sobre la cual se recomienda. 
 * @param {number} props.count Cantidad de historias a recomendar.
 * @param {string} props.site ID del sitio del que solicita las recomendaciones.
 * @param {string} props.clickedUrl URL del artículo clickeado.
 * @param {Object} props.response Version corta de las recomendaciones obtenidas.
 * @param {Object[]} props.response.results Listado de recomendaciones cortas.
 * @param {string} props.response.results[].url URL de la historia recomendada.
 * @param {string} props.response.results[].responsestype Tipo de respuesta de la historia recomendada.
 * 
 * @see
 * - [Documentación.](https://elcomercio.arcpublishing.com/alc/docs/swagger/?url=./arc-products/recommendations.json#/rendered/renderedRecommendations)
 * - [Dashboard de Clavis.](https://elcomercio.arcpublishing.com/clavis/recommendations)
 */
export function clavisClicked({ contentId, count, site, clickedUrl, response }) {
    if (contentId && typeof count === 'number' && site && clickedUrl && response) {
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
            site.length > 0 &&
            clickedUrl &&
            clickedUrl.length > 0
        ) {
            const requestUrl = `${BASE_URL}${CLICKED}`

            return fetch(requestUrl, {
                method: 'POST',
                body: JSON.stringify({
                    uid: getUUID(),
                    url: `${CONTENT_API_URL}${contentId}`,
                    count,
                    referrer: document.referrer,
                    site,
                    clickedUrl,
                    response
                }),
                headers: HEADERS,
            }).then(function (response) {
                return response.json();
            })

        } else return;
    }
}

/**
 * @description Recibe un arreglo de historias recomendadas en *formato ANS* o 
 * el formato predeterminado que devuelve la API de `recommendations` de **Clavis** 
 * y lo convierte un objeto con el último formato mencionado y exactamente los datos 
 * que necesita el parámetro `response` en los **endpoints** `/clicked` y `/rendered`.
 * 
 * @param {Object[]} recommendations Arreglo de historias recomendadas, estén o no en formato ANS.
 * @param {string} recommendations[].url URL de la historia recomendada listada.
 * @param {string} recommendations[].responsetype Tipo de respuesta de Clavis de la historia 
 * recomendada listada.
 * 
 * @returns {Object} Objeto con listado `results` de historias que fueron recomendadas. 
 * Estas historias tienen dos valores `url` y `responsetype`.
 * 
 * @see [Mira *Model* en el *Request body* de los *endpoints* en la documentación.](https://elcomercio.arcpublishing.com/alc/docs/swagger/?url=./arc-products/recommendations.json#/rendered/renderedRecommendations)
 */
export const buildClavisRenderedResponse = (recommendations) => {
    const filteredRecommendations = (recommendations && recommendations.length > 0)
        ? recommendations.map(({ url, responsetype }) => (
            {
                url,
                responsetype
            }
        ))
        : []
    return {
        results: filteredRecommendations
    }
}