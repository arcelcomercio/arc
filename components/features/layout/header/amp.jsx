/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header w-full position-absolute',
  wrap: 'amp-header__wrap bg-primary text-center',
  logo: 'amp-header__logo',
  linkContainer:
    'amp-header__link-container position-relative mr-35 border-1 border-solid border-white text-sm rounded-sm line-h-xs pt-0 pb-0 pr-10 pl-10 mt-10',
  link: 'amp-header__link i-survey-share',
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
              <a href="/">
                <amp-img
                  src={img}
                  alt="elcomercio.pe"
                  width="156"
                  height="25"
                />
              </a>
            </div>
            <div className={classes.linkContainer}>
              <a className={classes.link} href="/archivo">
                Últimas noticias
              </a>
            </div>
          </section>
        </header>
      </>
    )
  }
}

LayoutAmpHeader.label = 'Cabecera de Página'

export default LayoutAmpHeader
