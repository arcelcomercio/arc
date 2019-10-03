
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import CardMostReadList from './_children/list'

import schemaFilter from './_dependencies/schema-filter'
import { getQuery, getStories } from './_dependencies/functions'

const CONTENT_SOURCE = 'story-by-url'

const MW = 'https://d1xq2vaarrak2w.cloudfront.net/toppages-elcomercio.json'


@Consumer
class listMostViews extends Component{
  constructor(props){
    super(props)
    this.state = {
      urls: [],
      storiesQty: 5
    }
    const {
      customFields:{storiesQty = 5} = {}
    } = this.props
    this.listViews(MW,storiesQty)
    this.fetchContent({
      
    })
  }

  listViews = (dat,sq) => {
    fetch(dat)
      .then( response => {
        return response.json()
      })
      .then( data => {
        this.dataToState(data,sq)
      })
  } 

  dataToState = (urls,storiesQty) => {

    this.setState({
      urls,
      storiesQty,
    })
  }

  cantidad = (urls,sq) => {
    return urls.slice(0,sq)
  }

  pintadata = (urls,sq) => {
    const nvurls = this.cantidad(urls,sq)
    return nvurls.map(url => {
      return <li>{url}</li>
    })
  }

  render(){
    const {urls,storiesQty} = this.state
    return(
      <ul>
        {this.pintadata(urls,storiesQty)}
      </ul>
    )
  }
}

listMostViews.propTypes = {
  customFields: PropTypes.shape({
    customTitle: PropTypes.string.tag({
      name: 'Editar Título',
    }),
    customLink: PropTypes.string.tag({
      name: 'Editar Url',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Número de Noticias',
      min: 1,
      max: 22,
      step: 1,
      defaultValue: 5,
    }),
  })
}

listMostViews.label = 'Lista de notas más vistas'

export default listMostViews



































// import React, { Component } from 'react'
// import Consumer from 'fusion:consumer'
// import PropTypes from 'prop-types'

// import CardMostReadList from './_children/list'

// import schemaFilter from './_dependencies/schema-filter'
// import { getQuery, getStories } from './_dependencies/functions'

// const CONTENT_SOURCE = 'story-feed-by-views'

// @Consumer
// class CardMostRead extends Component {
//   constructor(props) {
//     super(props)
//     const {
//       globalContent,
//       globalContentConfig,
//       deployment,
//       contextPath,
//       arcSite,
//       customFields: { storiesQty = 5 } = {},
//     } = props
//     this.fetchContent({
//       data: {
//         source: CONTENT_SOURCE,
//         query: {
//           ...getQuery({ globalContent, globalContentConfig, storiesQty }),
//         },
//         filter: schemaFilter,
//         transform: ({ content_elements: contentElements = [] } = {}) => {
//           const data = {
//             stories: [
//               ...getStories({
//                 data: contentElements,
//                 deployment,
//                 contextPath,
//                 arcSite,
//               }),
//             ],
//           }
//           return data
//         },
//       },
//     })
//   }

//   render() {
//     const {
//       customFields,
//       arcSite,
//       requestUri,
//       editableField,
//       isAdmin,
//     } = this.props
//     const { viewImage = false, storiesQty = 5, customTitle = '', customLink } =
//       customFields || {}
//     const { data: { stories } = {} } = this.state
//     const params = {
//       viewImage,
//       storiesQty,
//       arcSite,
//       requestUri,
//       stories,
//       customTitle,
//       customLink,
//       editableField,
//       isAdmin,
//     }
//     return <CardMostReadList {...params} />
//   }
// }

// CardMostRead.propTypes = {
//   customFields: PropTypes.shape({
//     viewImage: PropTypes.bool.tag({
//       name: 'Imagen Visible',
//     }),
//     customTitle: PropTypes.string.tag({
//       name: 'Editar Título',
//     }),
//     customLink: PropTypes.string.tag({
//       name: 'Editar Url',
//     }),
//     storiesQty: PropTypes.number.tag({
//       name: 'Número de Noticias',
//       min: 1,
//       max: 22,
//       step: 1,
//       defaultValue: 5,
//     }),
//   }),
// }
// // TODO: Cambiar nombre a Noticias mas leidas
// // CardMostRead.label = 'Últimas Noticias'
// // 
// CardMostRead.label = 'Noticias mas Leidas'
// CardMostRead.static = true

// export default CardMostRead
