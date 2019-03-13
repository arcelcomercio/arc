import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import ItemNew from './_children/ItemNew'

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
    data.forEach(el => {
      const d = {}
      if (el.website_url != null) d.websiteUrl = el.website_url
      if (el.promo_items != null) {
        if (el.promo_items.basic != null && el.promo_items.basic.url != null) {
          d.imageUrl = el.promo_items.basic.url
          d.captionImg = el.promo_items.basic.caption
          d.typeNote = 'image'
        }
        if (
          el.promo_items.basic_video != null &&
          el.promo_items.basic_video.promo_items.basic != null
        ) {
          d.imageUrl = el.promo_items.basic_video.promo_items.basic.url
          d.captionImg = el.promo_items.basic_video.promo_items.basic.caption
          d.typeNote = 'video'
        }
        if (el.promo_items.basic != null && el.promo_items.basic.url != null) {
          d.imageUrl = el.promo_items.basic.url
          d.captionImg = el.promo_items.basic.caption
          d.typeNote = 'image'
        }
        if (
          el.promo_items.basic_video != null &&
          el.promo_items.basic_video.promo_items.basic != null
        ) {
          d.imageUrl = el.promo_items.basic_video.promo_items.basic.url
          d.captionImg = el.promo_items.basic_video.promo_items.basic.caption
          d.typeNote = 'video'
        }
      }
      if (el.headlines != null) d.title = el.headlines.basic
      aux.push(d)
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
      section: requestUri.split('/')[1],
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
            caption
          }
          basic_video {
            promo_items {
              basic {
                url
                caption
              }
            }
          }
          basic {
            url
            caption
          }
          basic_video {
            promo_items {
              basic {
                url
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
        {news.map(item => (
          <ItemNew item={item} viewImage={viewImage} />
        ))}
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
