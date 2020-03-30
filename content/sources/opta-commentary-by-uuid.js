/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
// import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import { ARC_ACCESS_TOKEN } from 'fusion:environment'
// import RedirectError from '../../components/utilities/redirect-error'
import { getFootballGameId } from '../../components/utilities/get-story-values'

const schemaName = 'opta-commentary'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const fetch = storyData => {
  // const {} = storyData
  console.log('QUE HAY AQUI?!!!')
  console.log(storyData)
  const footballGameId = getFootballGameId(storyData)
  if (footballGameId !== '') {
    const urlCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=${footballGameId}`

    return request({
      uri: urlCDN,
      ...options,
    })
      .then(dataOpta => {
        console.log('======request exec=========')
        console.log(dataOpta)
        console.log('======fin request exec=========')
        return dataOpta
      })
      .catch(error => {
        console.log(error)
        return {}
      })
  }
  return storyData
}

// const resolve = key => {
//     console.log("======================================")
//     console.log(key)
//     console.log("======================================")

//     return `https://cdna-resultadosopta.minoticia.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=e9kndb1sooxtzw0qm0s2cl27e`
// }

// const transform = (data = {}) => {
//     console.log("======transform exec=========")
//     const { items = [] } = data
//     return items
// }

export default {
  fetch,
  schemaName,
  params,
}
