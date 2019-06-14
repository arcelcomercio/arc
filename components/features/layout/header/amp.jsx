/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AmpImage from '@arc-core-components/element_image'

// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header w-full position-absolute',
  wrap: 'amp-header__wrap text-center',
  logo: 'amp-header__logo',
  linkContainer:
    'amp-header__link-container position-relative mr-35 border-1 border-solid text-sm rounded-sm',
  link: 'amp-header__link',
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
            <div className={classes.linkContainer}>
              <a className={classes.link} href={img}>
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
