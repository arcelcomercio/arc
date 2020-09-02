/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../utilities/constants'

import NavBarAmp from '../../navbar/standard/_children/amp'
import Formatter from '../../layout/navbar/_dependencies/formatter'

// TODO: Separar Feature de Componente.

const classes = {
  header: 'amp-header w-full position-absolute mx-auto',
  wrap:
    'amp-header__wrap bg-primary mx-auto flex items-center justify-between pl-20 pr-20',
  logo: 'amp-header__logo',
  linkContainer:
    'amp-header__link-container border-1 border-solid border-white text-sm rounded-sm line-h-xs flex items-center justify-center p-10',
  link: 'amp-header__link secondary-font',
  ampImg:
    'amp-header__amp-img i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
  img:
    'i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-layout',
}

const LayoutAmpHeader = props => {
  const { customFields } = props
  const { contextPath, arcSite, deployment } = useFusionContext()
  const { hideMenu } = customFields || {}

  const { siteDomain, assets: { nav } = {} } = getProperties(arcSite)

  const formater = new Formatter(
    {
      deployment,
      contextPath,
      siteDomain,
      nav,
      arcSite,
    },
    customFields
  )

  const { params = {}, source = '' } =
    formater.main.fetch !== false ? formater.main.fetch.config : {}
  /** Solicita la data a la API y setea los resultados en "state.data" */

  const imgLogo = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/logo-amp.png?d=1`

  const data =
    useContent(
      params && source
        ? {
            source,
            query: params,
            filter: formater.getSchema(),
          }
        : {}
    ) || {}

  return (
    <>
      <NavBarAmp
        data={data}
        {...formater.main.initParams}
        hideMenu={hideMenu}
      />
      <header className={classes.header}>
        <section className={classes.wrap}>
          <div className={classes.logo}>
            <a href="/">
              <amp-img
                src={imgLogo}
                alt={arcSite}
                width="156"
                height="25"
                tabIndex="0"
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

LayoutAmpHeader.label = 'Cabecera de Página'
LayoutAmpHeader.static = true

export default LayoutAmpHeader
