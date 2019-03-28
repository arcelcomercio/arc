import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../../resources/components/listado-noticias'
import Ads from '../../../../resources/components/ads'
import ListadoLeidas from '../../../../resources/components/listado-leidas'

/**
 *  TODO: Al momento de separar este feature, las clases deben ser preparadas
 *  correctamente
 */

const classes = {
  col1: 'col-1',
  col2: 'col-2',
  col3: 'col-3',
  base: 'content-grid-base',
  container: 'container1',
  contentRight: 'content__right',
  title: 'container1__title text-uppercase',
  listCard: 'container1__listCardNotice',
  flex: 'flex',
  flexJustifyCenter: 'flex--justify-center',
  marginTop: 'margin-top',
}
@Consumer
class Default extends Component {
  render() {
    const {
      globalContent: { content_elements: contentElements = [] } = {},
      arcSite,
      contextPath,
      globalContentConfig: {
        query: {
          section_name: sectionName = 'Nombre de Sección',
          section = '',
        } = {},
      } = {},
    } = this.props

    const params = {
      data: contentElements,
      arcSite,
    }

    return (
      <Fragment>
        <div
          className={`${classes.container}  ${classes.base} ${classes.col2}`}>
          <h1 className={classes.title}>{sectionName}</h1>
          <div>
            {params.data.map((el, index) => (
              <CardNotice
                key={index}
                formato="row"
                data={el}
                arcSite={params.arcSite}
              />
            ))}
          </div>
          <div
            className={`${classes.flex} ${classes.flexJustifyCenter} ${
              classes.marginTop
            }`}>
            <a href={`${contextPath}/archivo${section}?_website=${arcSite}`}>
              Ver más
            </a>
          </div>
        </div>
        <div className={`${classes.col1} ${classes.contentRight}`}>
          <div className={classes.col3}>
            <Ads adElement="isright1" isDesktop isMobile />
          </div>
          <div className={classes.col3}>
            <ListadoLeidas numNotes={5} viewImage />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Default
