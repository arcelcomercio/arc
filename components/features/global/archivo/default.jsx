import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
/*
import customFields from './_children/customfields'
import filterSchema from './_children/filterschema'
*/
// import CardNotice from './../../Listado-de-noticias/default'
import CardNotice from './../../../../resources/components/listado-noticias'

const API_URL = 'story__by-websiteurl'
@Consumer
class Archivo extends Component {
  constructor(props) {
    super(props)
    // this.state = { data: {} }
    this.renderCount = 0
    // this.fetch()
  }

  /*
  fetch() {
    const {
      customFields: { link },
      arcSite,
    } = this.props
    if (link) {
      const { fetched } = this.getContent(
        API_URL,
        {
          website_url: link,
          website: arcSite,
        },
        filterSchema(arcSite)
      )
      fetched.then(response => {
        this.setState({ data: response })
      })
    }
  }
  */

  data() {
    this.data_old = [
			{
				canonical_url: '/politica/yonhy-lescano-victima-de-acoso-en-el-congreso-acusa-al-legislador-de-ap',
				basic: 'Yonhy Lescano: víctima de acoso en el Congreso acusa al legislador de AP',
				subheadlines: 'La periodista narró los hechos ante el procurador del Congreso este viernes.',
				section_name: 'Política',
				section_path: '/politica',
				display_date: '2019-03-05T21:52:26.747Z',
				author_name: 'Patricia del Rio',
				author_url: '/people/patricia-del-rio/',
				promo_items: {
					basic: {
						url: 'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/DODFOGLKK5AFZMDJZ5AL35BHSE.jpeg',
					}
				}
      }
    ]

    return  [
      {
        website_url: '',
        headlines: {
          basic: ''
        },
        subheadlines: {
          basic: ''
        },
        websites: {
          arcSite: {
              website_section: {
                  name: '',
                  path: ''
              },
          },
        },
        display_date: '',
        credits: {
          by: {
              name: '',
              url: ''
          },
        },
        promo_items: {
          basic_video: {
              promo_items: {
                  basic: {
                      url: ''
                  }
              }
          },
          basic_gallery: {
              promo_items: {
                  basic: {
                      url: ''
                  }
              }
          },
          basic: {
              type: '',
              url: ''
          }
        }
      }
    ]
  }

  render() {
    // console.log('apertura extraordinaria render', this.renderCount + 1)
    // console.dir(this.state)

    const {
      globalContent: {
        content_elements: contentElements,
      },
      arcSite
    } = this.props

    console.log('props')
    console.dir(this.props)
    // console.dir(JSON.stringify(this.props))

    const params = {
      data: contentElements,
      arcSite
    }
    return <CardNotice {...params} />
  }
}


Archivo.propTypes = {
  globalContent: PropTypes.object,
}


export default Archivo
