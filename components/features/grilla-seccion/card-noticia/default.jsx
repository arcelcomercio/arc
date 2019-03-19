import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import CardNotice from '../../../../resources/components/listado-noticias'

@Consumer
class ListadoNoticia extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
      customFields: { initialStory, storiesQty },
      globalContentConfig: {
        query: { section },
      },
      contextPath,
    } = this.props
    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data
            .slice(initialStory - 1, initialStory + storiesQty)
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

ListadoNoticia.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la noticia:',
      defaultValue: 1,
      description:
        'Indique el número de la noticia desde la que quiere empezar a imprimir. La primera noticia corresponde al número 0',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Cantidad de noticias',
      defaultValue: 50,
      description: 'Indique el número de noticias que deben ser listadas.',
    }),
  }),
}

export default ListadoNoticia
