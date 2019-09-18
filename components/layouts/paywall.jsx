import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import { withTheme } from '../themes/utils'
import paywallThemes from '../themes/paywall'

const Layout = styled.div`
  display: flex;
  justify-content: 'center';
`
const contentContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: 'column';
  background: ${props => props.theme.palette.background.default};
`

const DefaultLayout = ({ children = [], theme }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <contentContainer>
            {children[0] /* Cabecera de página */}
            <div role="main">{children[1] /* Contenido */}</div>
            {children[2] /* Pie de página */}
          </contentContainer>
        </Layout>
      </MuiThemeProvider>
    </StyledThemeProvider>
  )
}

const ThemedLayout = withTheme(paywallThemes)(DefaultLayout)

ThemedLayout.sections = ['Cabecera de página', 'Contenido', 'Pie de página']
ThemedLayout.propTypes = {
  children: PropTypes.node,
}

export default ThemedLayout
