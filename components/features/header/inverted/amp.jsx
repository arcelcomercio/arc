import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import NavBarAmp from '../../navbar/standard/_children/amp'
import HeaderAmp from './_children/header-amp'

import Formatter from '../../layout/navbar/_dependencies/formatter'
import { getAssetsPath } from '../../../utilities/assets'

const LayoutNavbar = props => {
  const { customFields } = props
  const { hideMenu } = customFields || {}
  const { contextPath, arcSite, deployment } = useFusionContext()

  const {
    siteDomain,
    assets: { nav, seo: { widthAmp = '', heightAmp = '' } = {} } = {},
  } = getProperties(arcSite)

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

  const imgLogo = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/logo-amp.png?d=1`

  const headerParams = {
    imgLogo,
    widthAmp,
    heightAmp,
    arcSite,
  }

  return (
    <>
      <NavBarAmp
        data={data}
        {...formater.main.initParams}
        hideMenu={hideMenu}
      />
      <HeaderAmp {...headerParams} />
    </>
  )
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    hideMenu: PropTypes.bool.tag({
      name: 'Ocultar menu',
      defaultValue: true,
    }),
    showInDesktop: PropTypes.bool.tag({
      name: 'Mostrar en desktop',
      defaultValue: true,
    }),
    showInTablet: PropTypes.bool.tag({
      name: 'Mostrar en tablet',
      defaultValue: true,
    }),
    showInMobile: PropTypes.bool.tag({
      name: 'Mostrar en móviles ',
      defaultValue: true,
    }),
  }),
}

export default LayoutNavbar
