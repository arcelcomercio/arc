import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import CardMostReadList from './_children/list'

import schemaFilter from './_dependencies/schema-filter'
import { getEmptyCard, dataCasting } from './_dependencies/data-casting'
import fetchConfig from './_dependencies/fetch-config'

@Consumer
class CardMostRead extends PureComponent {
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
    const {
      globalContent,
      globalContentConfig,
      deployment,
      contextPath,
      arcSite,
    } = this.props
    const { storiesQty } = this.state
    const { source, params } = fetchConfig(
      globalContent,
      globalContentConfig,
      storiesQty
    )
    const { fetched } = this.getContent(source, params, schemaFilter)
    fetched
      .then(response => {
        const { content_elements: contentElements } = response || {}
        const stories = contentElements || []

        if (stories.length > 0) {
          
          this.setState({
            stories: dataCasting({
              data: stories,
              deployment,
              contextPath,
              arcSite,
            }),
          })
        } else {
          this.setState({
            stories: getEmptyCard(),
          })
        }
      })
      .catch(() => {
        this.setState({
          stories: getEmptyCard(),
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
    return <CardMostReadList {...params} />
  }
}

CardMostRead.propTypes = {
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

CardMostRead.label = 'Noticias Más Leídas'

export default CardMostRead
