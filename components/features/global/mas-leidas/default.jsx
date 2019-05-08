import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import MoreReadComponent from './_children/more-read'
import schemaFilter from './_dependencies/schemaFilter'
import { setDataTest, castingData } from './_dependencies/castingData'
import configFetch from './_dependencies/configFetch'

@Consumer
class MoreRead extends Component {
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
    const { fetched } = this.getContent(source, params, schemaFilter())
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
    return <MoreReadComponent {...params} />
  }
}

MoreRead.propTypes = {
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

export default MoreRead
