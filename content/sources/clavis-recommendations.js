/* eslint-disable import/no-extraneous-dependencies */
import { resizerSecret } from 'fusion:environment'
import request from 'request-promise-native'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

const schemaName = 'stories-dev'

const params = [
    {
        name: 'uid',
        displayName: 'ID del usuario',
        type: 'text',
    },
    {
        name: 'contentId',
        displayName: 'ARC ID de la historia', // Para este API la pos. inic. es 1
        type: 'text',
    },
    {
        name: 'count',
        displayName: 'Cantidad de recomendaciones', // Para este API la pos. inic. es 1
        type: 'number',
    },
    {
        name: 'referrer',
        displayName: 'Enlace referido', // Para este API la pos. inic. es 1
        type: 'text',
    },
]

const options = {
    method: 'POST',
    uri: 'https://hybrid-elcomercio.perso.aws.arc.pub/hybrid/hybrid-filter/recommend',
    qs: {
        outputType: 'ans' // -> uri + '?outputType=ans'
    },
    headers: {
        'Content-Type': 'application/json'
    },
    gzip: true,
    json: true,
}

const fetch = (key = {}) => {
    const site = key['arc-site']
    const { uid, contentId, count, referrer = '' } = key

    if (contentId && typeof count === 'number' && site) {
        options.body = {
            uid,
            url: `contentapi://${contentId}`,
            count,
            referrer,
            site,
            includeFields: [
                'subheadlines', 'description', 'taxonomy.primary_section', 'credits', 'subtype', 'headlines', 'canonical_url', 'promo_items', 'url', 'content_restrictions', 'display_date', 'publish_date', '_id', 'websites'
            ]
        }
    } else /* return {}  */ throw new Error('Hay parametros faltantes o incorrectos')

    return request({ ...options }).then(recommendations => {
        if (recommendations === null || recommendations === undefined || recommendations === '') {
            return {}
        }
        const { resizerUrl } = getProperties(site)
        const stories = {
            content_elements: addResizedUrlsToStory(
                recommendations,
                resizerUrl,
                resizerSecret,
                addResizedUrls
            ) || null
        }
        return stories
    }).catch(e => console.error(e))
}

const source = {
    fetch,
    schemaName,
    params,
    ttl: 120,
}

export default source
