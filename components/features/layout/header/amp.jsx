/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header full-width',
  wrap: 'amp-header__wrap',
  logo: 'amp-header__logo',
  ultimate: 'amp-header__ultimate',
  ampImg:
    'amp-header__amp-img i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
  img:
    'i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
}

@Consumer
class LayoutAmpHeader extends PureComponent {
  render() {
    const { contextPath, arcSite, deployment } = this.props
    const img =
      deployment(`${contextPath}/resources/dist/${arcSite}/images/logo.png`) ||
      ''
    return (
      <>
        <header className={classes.header}>
          <section className={classes.wrap}>
            <div className={classes.logo}>
              <a href="http://elcomercio.pe">
                <amp-img
                  src={img}
                  alt="elcomercio.pe"
                  width="156"
                  height="25"
                />
              </a>
            </div>
            <div className={classes.ultimate}>
              <a href={img}>Últimas noticias</a>
            </div>
          </section>
        </header>
      </>
    )
  }
}

LayoutAmpHeader.label = 'Cabecera de Página'

export default LayoutAmpHeader
