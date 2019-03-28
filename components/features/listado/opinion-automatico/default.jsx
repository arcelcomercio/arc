import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import CardAutor from '../../../../resources/components/option-autor'
import CardEditorial from '../../../../resources/components/option-editorial'
import BarraAutor from '../../../../resources/components/option-mas'
import ListTitle from '../../global/título-de-seccion/default'

@Consumer
class OpinionAutomatica extends Component {
  constructor(...props) {
    super(...props)
  }

  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
    } = this.props

    const params = {
      data: contentElements || [],
      arcSite,
    }
    return (
      <div>
        <div className="grid-opinion--title">
          <ListTitle />
        </div>
        <div className="grid-opinion">
          {params.data.slice(0, 12).map((el, index) => {
            /** TODO: La sección principal ya viene de taxonomy.sections.primary_section */
            const section = el.websites[
              arcSite
            ].website_section.name.toUpperCase()
            return section && section === 'EDITORIAL' ? (
              <CardEditorial key={index} data={el} arcSite={params.arcSite} />
            ) : (
              <CardAutor key={index} data={el} arcSite={params.arcSite} />
            )
          })}
        </div>
        <div className="grid-opinion--list">
          <div className="grid-opinion__box-title">
            <p className="grid-opinion__title">ÚLTIMAS NOTICIAS</p>
          </div>
          {params.data.slice(12).map((el, index) => (
            <BarraAutor key={index} data={el} arcSite={params.arcSite} />
          ))}
          <div className="grid-opinion__box-more">
            <a href={`/archivo/opinion`}>Ver Mas</a>
          </div>
        </div>
      </div>
    )
  }
}

export default OpinionAutomatica
