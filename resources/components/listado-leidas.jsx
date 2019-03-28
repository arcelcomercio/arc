import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import DataStory from './utils/data-story'
import ItemNew from './item-new-read'

const classes = {
  masLeidas: 'flex flex--column mas-leidas',
  title: 'mas-leidas__title',
}

@Consumer
class ListReads extends Component {
  constructor(props) {
    super(props)
    const { numNotes } = props
    this.state = {
      news: [],
      totalElements: numNotes,
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
        id: el._id,
      })
    })
    this.setState({
      news: aux,
    })
  }

  fetch() {
    const { arcSite, requestUri, numNotes } = this.props
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
        publish_date
        _id
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
    const { viewImage } = this.props

    return (
      <div className={classes.masLeidas}>
        <h4 className={classes.title}>lo más visto</h4>
        {news.map(item => {
          const params = { item, viewImage }
          return <ItemNew key={item.id} {...params} />
        })}
      </div>
    )
  }
}
export default ListReads
