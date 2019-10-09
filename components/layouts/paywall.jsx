import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

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
  return (
    <StyledThemeProvider theme={theme}>
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

export default withTheme(paywallThemes)(DefaultLayout)
