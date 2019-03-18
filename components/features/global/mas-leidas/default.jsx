import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import ItemNew from './_children/ItemNew'
import DataStory from '../../../../resources/components/utils/data-story'

const classes = {
  masLeidas: 'flex flex--column mas-leidas',
  title: 'mas-leidas__title',
}

@Consumer
class MasLeidas extends Component {
  constructor(props) {
    super(props)
    const { customFields } = props
    this.state = {
      news: [],
      totalElements: customFields.numNotes,
    }
    this.fetch()
  }

  setDataTest() {
    const item = {
      title:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore vel repellat quae amet, maxime inventore eos dolores labore velit veniam nesciunt consequuntur, excepturi magnam unde deleniti ea itaque cumque assumenda?',
      imageUrl: 'https://picsum.photos/100/50',
      websiteUrl: '#',
    }
    const { totalElements } = this.state
    const auxTest = []
    for (let i = 0; i < totalElements; i++) {
      auxTest[i] = item
    }
    this.setState({
      news: auxTest,
    })
  }

  castingData(data) {
    const aux = []
    const { arcSite } = this.props
    const element = new DataStory({}, arcSite)

    data.forEach(el => {
      element.__data = el
      aux.push({
        websiteUrl: element.link,
        imageUrl: element.multimedia,
        typeNote: element.multimediaType,
        title: element.title,
      })
    })
    this.setState({
      news: aux,
    })
  }

  fetch() {
    const { arcSite, requestUri, customFields } = this.props
    const { numNotes } = customFields
    const source = 'stories__most-readed'
    const params = {
      website: arcSite,
      section: `/${requestUri.split('?')[0].split('/')[1]}`,
      num_notes: numNotes,
    }

    const schema = `{
      content_elements {
        canonical_url
        website_url
        display_date
        headlines {
          basic
        }
        promo_items {
          basic {
            url
            type
            caption
          }
          basic_video {
            promo_items {
              basic {
                url
                type
                caption
              }
            }
          }
          basic_gallery {
            promo_items {
              basic {
                url
                type
                caption
              }
            }
          }
        }
      }
    }`
    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        if (response && response.content_elements.length > 0) {
          this.castingData(response.content_elements)
        } else this.setDataTest()
      })
      .catch(error => {
        console.log(error)
        this.setDataTest()
      })
  }

  render() {
    const { news } = this.state
    const { customFields } = this.props
    const { viewImage } = customFields

    return (
      <div className={classes.masLeidas}>
        <h4 className={classes.title}>lo más visto</h4>
        {news.map(item => {
          const params = { item, viewImage }
          return <ItemNew {...params} />
        })}
      </div>
    )
  }
}

MasLeidas.propTypes = {
  customFields: PropTypes.shape({
    viewImage: PropTypes.bool.tag({
      name: 'Imagen Visible',
    }),
    numNotes: PropTypes.number.tag({
      name: 'Número de Noticias',
      min: 1,
      defaultValue: 5,
    }),
  }),
}

export default MasLeidas
