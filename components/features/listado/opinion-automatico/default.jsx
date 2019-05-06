import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import CardAutor from './_children/author-card'
import EditorialCard from './_children/editorial-card'
import AuthorListItem from './_children/author-list-item'
import CustomTitle from '../../global/custom-title/default'

// TODO: Refactorizar classes a estándar
@Consumer
class OpinionAutomatica extends Component {
  render() {
    const { globalContent, arcSite } = this.props
    const { content_elements: contentElements } = globalContent || {}

    const params = {
      data: contentElements || [],
      arcSite,
    }
    console.log('testttt', this.props)
    return (
      <div>
        <div className="grid-opinion--title">
          <CustomTitle />
        </div>
        <div className="grid-opinion">
          {params.data.slice(0, 12).map((el, index) => {
            const { taxonomy: { primary_section: { name } = '' } = {} } =
              el || {}
            const section = name ? name.toUpperCase() : ''
            return section && section === 'EDITORIAL' ? (
              <EditorialCard key={index} data={el} arcSite={params.arcSite} />
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
            <AuthorListItem key={index} data={el} arcSite={params.arcSite} />
          ))}
          <div className="grid-opinion__box-more">
            <a href="/archivo/opinion">Ver Mas</a>
          </div>
        </div>
      </div>
    )
  }
}

export default OpinionAutomatica
