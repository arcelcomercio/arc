import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import CardNotice from '../../../global-components/stories-list'

const classes = {
  listado: 'full-width',
  listadoSeeMore: 'flex flex--justify-center margin-top text-uppercase',
}
@Consumer
class SimpleList extends PureComponent {
  render() {
    const {
      globalContent,
      arcSite,
      contextPath,
      globalContentConfig,
      customFields,
    } = this.props

    const { storiesQty = 50 } = customFields || {}
    let { initialStory = 1 } = customFields || {}
    initialStory -= 1 // Resta uno al initialStory. Para el editor 0 = 1

    const { query: { section = '' } = {} } = globalContentConfig || {}
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements || []

    const seeMorePath = `${contextPath}/archivo${section}?_website=${arcSite}`

    return (
      <div className={classes.listado}>
        <div>
          {stories &&
            stories
              .slice(initialStory, initialStory + storiesQty)
              .map(el => (
                <CardNotice
                  key={`SimpleList${el._id}`}
                  formato="row"
                  data={el}
                  arcSite={arcSite}
                />
              ))}
        </div>
        <div className={classes.listadoSeeMore}>
          <a href={seeMorePath} tabIndex="0">
            Ver más
          </a>
        </div>
      </div>
    )
  }
}

SimpleList.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Cantidad de historias',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 50,
      description: 'Indique el número de historias que deben ser listadas.',
    }),
  }),
}

SimpleList.label = 'Listado de Sección'

export default SimpleList
