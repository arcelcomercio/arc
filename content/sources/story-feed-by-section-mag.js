import {  CONTENT_BASE } from 'fusion:environment'

// const query = {
//   bool: {
//     must: [
//       {
//         term: {
//           type: 'story',
//         },
//       },
//       {
//         bool: {
//           should: [
//             {
//               term: {
//                 'taxonomy.tags.slug': 'claro-guardians-league',
//               },
//             },
//           ],
//         },
//       },
//       {
//         term: {
//           'revision.published': 'true',
//         },
//       },
//     ],
//   },
// }
const resolve = () => {
//   const requestUri = `https://api.elcomercio.arcpublishing.com/content/v4/search/published?sort=publish_date:desc&from=0&size=2&website=elcomercio&body={
//         "query": {${JSON.stringify(query)}}
//     }`
const requestUri = `${CONTENT_BASE}/content/v4/search/published?sort=publish_date:desc&from=0&size=10&website=elcomerciomag&q`

  return requestUri
}

export default {
  resolve,
}
