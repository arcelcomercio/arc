import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './children/customfields'
import DataStory from '../../../../resources/components/utils/data-story'
import OpinionItem from '../../../../resources/components/opinionItem'

const classes = {
  separator: 'separator__opinion',
  opinionBody: 'separator__opinion--body',
  opinionTitle: 'separator__opinion-title',
}

const createMarkup = html => {
  return { __html: html }
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.opinionTitle}
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}

@Consumer
class SeparadorOpinion extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { section, titleSection, htmlCode },
    } = this.props || {}

    this.state = {
      device: this.setDevice(),
      section,
      titleSection,
      htmlCode,
      data: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize) // Temporal
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 5
    const { device } = this.state

    if (device === 'mobile') {
      newsNumber = 1
    } else if (device === 'tablet') {
      newsNumber = 3
    } else if (device === 'desktop') {
      newsNumber = 5
    }

    const { arcSite } = this.props

    const { section } = this.state

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        news_number: newsNumber,
        section,
      },
      this.filterSchema()
    )
    fetched.then(response => {
      if (!response) {
        // eslint-disable-next-line no-param-reassign
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      const newDatos = []
      const nObj = {}
      for (let i = 0; i < newsNumber; i++) {
        const dh = new DataStory(response.content_elements[i], arcSite)

        nObj.id = dh.id
        nObj.author = dh.author
        nObj.authorUrl = dh.authorLink
        nObj.titulo = dh.title
        nObj.seccion = dh.section
        nObj.seccionUrl = dh.sectionLink
        nObj.websiteUrl = dh.link
        nObj.imageUrl = dh.authorImage
        newDatos.push({ ...nObj })
      }
      this.setState({
        data: newDatos,
      })
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state
    if (wsize >= 1024 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
    } else if (wsize >= 640 && wsize < 1024 && device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi()
    } else if (wsize < 640 && device !== 'mobile') {
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) return 'mobile'
    if (wsize >= 640 && wsize < 1024) return 'tablet'
    return 'desktop'
  }

  filterSchema = () => {
    return `
    {
      content_elements{
        _id
        website_url
        taxonomy{
          sections{
            type
            path
            name
          }
        }
        credits{
          by{
            type
            name
            url
            image{
              url
            }
          }
        }
        headlines{
          basic
        }
      }
    }
    `
  }

  listado = () => {
    const { data } = this.state
    return data.map(info => <OpinionItem key={info.id} data={info} />)
  }

  render() {
    const { titleSection, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSection ? (
          <div className={classes.opinionTitle}>{titleSection}</div>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.opinionBody}>{data[0] && this.listado()}</div>
      </div>
    )
  }
}

SeparadorOpinion.propTypes = {
  customFields,
}

export default SeparadorOpinion

// import React, { Component } from 'react'
// import Consumer from 'fusion:consumer'
// import { customFields } from './children/customfields'

// // 01 evaluar las clases
// const classes = {
//   separator: 'separator__opinion',
//   headerHtml: 'separator__headerHtml',
//   title: 'separator__headerTitle',
//   body: 'separator__body',
//   item: 'separator__item',
//   detail: 'separator__detail',
//   separatorTitle: 'separator__title',
//   mvideo: 'separator--video',
//   separadorTitleOpinion: 'separador__headerTitle-opinion',
//   opinionItem: 'separator__opinion--item',
//   opinionItemImage: 'separator__opinion--item-image',
//   opinionBody: 'separator__opinion--body',
//   itemDetailAuthor: 'separator__opinion--item',
//   opinionSection: 'separator__opinion--section', //
//   opinionItemDetails: 'separator__opinion--item-details',
//   opinionTitle: 'separator__opinion-title',
// }

// const createMarkup = html => {
//   return { __html: html }
// }

// const HeaderHTML = ({ htmlCode }) => {
//   return (
//     <div
//       className={classes.opinionTitle}
//       dangerouslySetInnerHTML={createMarkup(htmlCode)}
//     />
//   )
// }

// const OpinionItem = ({
//   author,
//   basic,
//   websiteUrl,
//   sectionUrl,
//   authorUrl,
//   section,
//   imagen,
// }) => {
//   return (
//     <article className={classes.opinionItem}>
//       <div className={classes.opinionItemDetails}>
//         <h3>
//           <a href={sectionUrl}>{section}</a>
//         </h3>
//         <h5>
//           <a href={authorUrl}>{author}</a>
//         </h5>
//         <p>
//           <a href={websiteUrl}>{basic}</a>
//         </p>
//       </div>
//       <figure className={classes.opinionItemImage}>
//         {/* <a href={imagenUrl}> */}
//         <img src={imagen} alt="default" />
//         {/* </a> */}
//       </figure>
//     </article>
//   )
// }

// @Consumer
// class SeparadorOpinion extends Component {
//   constructor(props) {
//     super(props)

//     const {
//       customFields: { section, titleSection, htmlCode },
//     } = this.props || {}

//     this.state = {
//       device: this.setDevice(),
//       section,
//       titleSection,
//       htmlCode,
//       data: [],
//     }
//   }

//   componentDidMount = () => {
//     window.addEventListener('resize', this.handleResize) // Temporal
//     this.getContentApi()
//   }

//   getContentApi = () => {
//     let newsNumber = 5
//     const { device } = this.state

//     if (device === 'mobile') {
//       newsNumber = 1
//     } else if (device === 'tablet') {
//       newsNumber = 3
//     } else if (device === 'desktop') {
//       newsNumber = 5
//     }

//     const { arcSite } = this.props

//     const { section } = this.state

//     const { fetched } = this.getContent(
//       'stories__by-section',
//       {
//         website: arcSite,
//         news_number: newsNumber,
//         section,
//       },
//       this.filterSchema()
//     )
//     fetched.then(response => {
//       if (!response) {
//         // eslint-disable-next-line no-param-reassign
//         response = []
//         console.log(
//           'No hay respuesta del servicio para obtener el listado de noticias'
//         )
//       }

//       if (!response.content_elements) {
//         response.content_elements = []
//         console.log(
//           'No hay respuesta del servicio para obtener el listado de noticias'
//         )
//       }

//       this.setState({
//         data: response.content_elements,
//       })
//     })
//   }

//   handleResize = () => {
//     const wsize = window.innerWidth
//     const { device } = this.state
//     if (wsize >= 1024 && device !== 'desktop') {
//       this.setState({
//         device: 'desktop',
//       })
//       this.getContentApi()
//     } else if (wsize >= 640 && wsize < 1024 && device !== 'tablet') {
//       this.setState({
//         device: 'tablet',
//       })
//       this.getContentApi()
//     } else if (wsize < 640 && device !== 'mobile') {
//       this.setState({
//         device: 'mobile',
//       })
//       this.getContentApi()
//     }
//   }

//   setDevice = () => {
//     const wsize = window.innerWidth

//     if (wsize < 640) return 'mobile'
//     if (wsize >= 640 && wsize < 1024) return 'tablet'
//     return 'desktop'
//   }

//   filterSchema = () => {
//     return `
//     {
//       content_elements{
//         _id
//         website_url
//         taxonomy{
//           sections{
//             type
//             path
//             name
//           }
//         }
//         credits{
//           by{
//             type
//             name
//             url
//             image{
//               url
//             }
//           }
//         }
//         headlines{
//           basic
//         }
//       }
//     }
//     `
//   }

//   imagenAuthor = data => {
//     const { by } = data.credits

//     if (Object.keys(by).length !== 0) {
//       const imageData = data.credits.by[0]

//       if (imageData.image && imageData.image.url) {
//         return imageData.image.url
//       }
//       return 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
//     }
//     return 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
//   }

//   urlAuthor = data => {
//     const { by } = data.credits

//     if (Object.keys(by).length !== 0) {
//       const authorData = data.credits.by[0]

//       if (authorData.url) {
//         return authorData.url
//       }
//       return 'default'
//     }
//     return 'default'
//   }

//   listado = () => {
//     const { data } = this.state

//     const listOpinion = data.map(story => {
//       return (
//         <OpinionItem
//           key={story._id}
//           author={
//             story.credits.by.length !== 0
//               ? story.credits.by[0].name
//               : 'Editorial Peru 21'
//           }
//           basic={story.headlines.basic}
//           section={
//             story.taxonomy.sections.some(alias => alias.type === 'section') &&
//             story.taxonomy.sections[0].name
//           }
//           imagen={this.imagenAuthor(story)}
//           websiteUrl={story.website_url}
//           authorUrl={this.urlAuthor(story)}
//           sectionUrl={story.taxonomy.sections[0].path}
//         />
//       )
//     })
//     return listOpinion
//   }

//   render() {
//     const { titleSection, htmlCode, data } = this.state

//     return (
//       <div className={classes.separator}>
//         {titleSection ? (
//           <div className={classes.opinionTitle}>{titleSection}</div>
//         ) : (
//           <HeaderHTML htmlCode={htmlCode} />
//         )}
//         <div className={classes.opinionBody}>{data[0] && this.listado()}</div>
//       </div>
//     )
//   }
// }

// SeparadorOpinion.propTypes = {
//   customFields,
// }

// export default SeparadorOpinion
