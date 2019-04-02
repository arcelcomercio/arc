import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import ListReads from '../../../../resources/components/listado-leidas'
import filterSchema from './_children/filterSchema'
import { setDataTest, castingData } from './_children/castingData'
import configFetch from './_children/configFetch'

@Consumer
class MasLeidas extends Component {
  constructor(props) {
    super(props)
    const { numNotes } = props
    this.state = {
      news: [],
      totalElements: numNotes,
    }
    console.log(props)
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    const { source, params } = configFetch(this.props)
    const { fetched } = this.getContent(source, params, filterSchema())
    const { totalElements } = this.state

    fetched
      .then(response => {
        if (
          response &&
          response.content_elements &&
          response.content_elements.length > 0
        ) {
          this.setState({
            news: castingData(response.content_elements, this.props),
          })
        } else {
          this.setState({
            news: setDataTest(totalElements),
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          news: setDataTest(totalElements),
        })
      })
  }

  render() {
    const { customFields, arcSite, requestUri } = this.props
    const { viewImage, numNotes } = customFields
    const { news } = this.state
    const params = {
      viewImage,
      numNotes,
      arcSite,
      requestUri,
      news,
    }

    return <ListReads {...params} />
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
