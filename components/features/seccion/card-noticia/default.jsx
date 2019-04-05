import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import DataStory from '../../../../resources/components/utils/data-story'
import CardNotice from '../../../../resources/components/listado-noticias'

@Consumer
class GrillaListadoNoticia extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    const {
      globalContent,
      arcSite,
      customFields: { initialStory = 1, storiesQty = 50 } = {},
      globalContentConfig,
      contextPath,
    } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const { query: { section = '' } = {} } = globalContentConfig || {}

    const params = {
      data: contentElements || [],
      arcSite,
    }

    /** TODO: Debería estar tomando el display name de la sección */
    const element = new DataStory(contentElements[0], arcSite)
    const title = element.section

    return (
      <Fragment>
        <h1 className="full-width text-center margin-top text-uppercase">{`ÚLTIMAS DE ${title}`}</h1>
        <div>
          {params.data
            .slice(initialStory - 1, initialStory - 1 + storiesQty)
            .map(el => (
              <CardNotice
                key={el.website_url}
                formato="row"
                data={el}
                arcSite={params.arcSite}
              />
            ))}
        </div>
        <div className="flex flex--justify-center margin-top">
          <a href={`${contextPath}/archivo${section}?_website=${arcSite}`}>
            Ver más
          </a>
        </div>
      </Fragment>
    )
  }
}

GrillaListadoNoticia.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Cantidad de historias',
      defaultValue: 50,
      description: 'Indique el número de historias que deben ser listadas.',
    }),
  }),
}

export default GrillaListadoNoticia
