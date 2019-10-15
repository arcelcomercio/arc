/* eslint-disable no-use-before-define */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import templayed from 'templayed'
import { useFusionContext } from 'fusion:context'

import { PaywallContextProvider } from '../features/paywall/_children/contexts'
import { withTheme } from '../themes/utils'
import paywallThemes from '../themes/paywall'

const Layout = styled.div`
  display: flex;
  justify-content: center;
`
const ContentContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  background: ${props => props.theme.palette.background.default};
`

const DefaultLayout = ({ children = [], theme }) => {
  const fusionContext = useFusionContext()
  const themeWithImages = React.useRef(() => addImageUrls(fusionContext)(theme))
    .current

  return (
    <StyledThemeProvider theme={themeWithImages}>
      {/* <MuiThemeProvider theme={theme}> */}
      <PaywallContextProvider>
        <Layout>
          <ContentContainer>
            {children[0] /* Cabecera de página */}
            <div role="main">{children[1] /* Contenido */}</div>
            {children[2] /* Pie de página */}
          </ContentContainer>
        </Layout>
      </PaywallContextProvider>
      {/* </MuiThemeProvider> */}
    </StyledThemeProvider>
  )
}

DefaultLayout.sections = ['Cabecera de página', 'Contenido', 'Pie de página']
DefaultLayout.propTypes = {
  children: PropTypes.node,
}

/**
 * Añade al tema las urls ya resueltas (deployment) de las imagenes
 *
 * @param {} fusionContext Contexto de fusion
 * @param {} theme El tema
 */
const addImageUrls = fusionContext => theme => {
  const {
    contextPath,
    deployment,
    siteProperties: {
      paywall: { images },
    },
  } = fusionContext
  const resolvedImages = Object.keys(images).reduce(
    (prev, key) => ({
      ...prev,
      [key]: deployment(
        templayed(images[key])({ contextPath, ext: '{{ext}}' })
      ),
    }),
    {}
  )
  return { ...theme, images: resolvedImages }
}

export default withTheme(paywallThemes)(DefaultLayout)
