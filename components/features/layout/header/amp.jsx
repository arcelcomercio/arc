/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header full-width',
  noticia: 'amp-header__noticia',
  viral: 'amp-header__viral',
}

@Consumer
class LayoutAmpHeader extends PureComponent {
  render() {
    const { contextPath, requestUri } = this.props
    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    return (
      <header className={classes.header}>
        <div className={classes.noticia}>
          <a href={`${contextPath || ''}/archivo${queryString}`}>Noticias</a>
        </div>
        <div className={classes.viral}>
          <a href="https://mag.elcomercio.pe">Viral</a>
        </div>
      </header>
    )
  }
}

LayoutAmpHeader.label = 'Cabecera de Página'

export default LayoutAmpHeader
