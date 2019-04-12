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
    const { storiesQty } = props.customFields || {}
    this.state = {
      stories: [],
      storiesQty: storiesQty || 5,
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    const { globalContent, globalContentConfig } = this.props
    const { storiesQty } = this.state
    const { source, params } = configFetch(
      globalContent,
      globalContentConfig,
      storiesQty
    )
    const { fetched } = this.getContent(source, params, filterSchema())
    // FIXME
    fetched
      .then(response => {
        const { content_elements: contentElements } = response || {}
        const stories = contentElements || []

        if (stories.length > 0) {
          this.setState({
            stories: castingData(stories, this.props),
          })
        } else {
          this.setState({
            stories: setDataTest(storiesQty),
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          stories: setDataTest(storiesQty),
        })
      })
  }

  render() {
    const { customFields, arcSite, requestUri } = this.props
    const { viewImage, storiesQty } = customFields || {}
    const { stories } = this.state
    const params = {
      viewImage,
      storiesQty,
      arcSite,
      requestUri,
      stories,
    }
    return <ListReads {...params} />
  }
}

MasLeidas.propTypes = {
  customFields: PropTypes.shape({
    viewImage: PropTypes.bool.tag({
      name: 'Imagen Visible',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Número de Noticias',
      min: 1,
      max: 6,
      step: 1,
      defaultValue: 5,
    }),
  }),
}

export default MasLeidas
