import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './children/customfields'
import { OpinionTitle } from './children/opinion-title'
import ListOpinion from './children/opinion-list'

import { GetMultimediaContent } from './../../../../resources/utilsJs/utilities'

// 01 evaluar las clases
const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
}
// fin evaluar las clases

// const SeparatorItem = ({ headlines, urlImage, website_url, medio }) => {
//   debugger
//   return (
//     <article className={classes.item}>
//       {medio === 'video' && <span>&#8227;</span>}
//       {medio === 'gallery' && <span>G</span>}
//       <div className={classes.detail}>
//         <h2 className={classes.separatorTitle}>
//           <a href={website_url}>{headlines}</a>
//         </h2>
//       </div>
//       <figure>
//         {website_url && (
//           <a href={website_url}>
//             <img src={urlImage} alt="" />
//           </a>
//         )}
//       </figure>
//     </article>
//   )
// }

// const SeparatorListItem = ({ data }) => {
//   const result = data.map(
//     ({ promo_items: promoItems, website_url: websiteUrl, headlines }) => {
//       let multimedia = null

//       if (promoItems !== null) {
//         multimedia = GetMultimediaContent(promoItems)
//       }

//       const { url, medio } = multimedia

//       return (
//         <SeparatorItem
//           key={websiteUrl}
//           headlines={headlines.basic}
//           urlImage={url}
//           website_url={websiteUrl}
//           medio={medio}
//         />
//       )
//     }
//   )
//   return result
// }

const createMarkup = html => {
  return { __html: html }
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.title}
      // eslint-disable-next-line react/no-danger
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
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let news_number = 4
    const { device } = this.state

    if (device === 'mobile') {
      news_number = 1
    } else if (device === 'desktop') {
      news_number = 4
    }

    const { arcSite } = this.props
    console.log(`arcSite: ${arcSite}`)

    const { section } = this.state
    console.log(`Section --> ${section}`)
    console.log(`newsNumber --> ${news_number}`)

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        news_number,
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

      this.setState({
        data: response.content_elements,
      })

      console.log(response)
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 640 && this.state.device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }
    return 'desktop'
  }

  filterSchema = () => {
    return `
    {
      content_elements{
        website_url
        taxonomy{
          sections{
            path
            name
          }
        }
        credits{
          by{
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

  listado = data => {
    const listOpinion = data.map(opinion => {
      return <p>{opinion.headlines.basic}</p>
    })
    return listOpinion
  }

  render() {
    const { titleSection, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSection ? (
          <h1 className={classes.title}>
            <a href="#">{titleSection}</a>
          </h1>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.body}>
          {/* <ListOpinion data={data} /> */}
          {/* <SeparatorListItem data={data} /> */}
          {this.listado(data)}
        </div>
      </div>
    )
  }
}

SeparadorOpinion.propTypes = {
  customFields,
}

export default SeparadorOpinion
