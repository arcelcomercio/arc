import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const size = {
  tablet: '640px',
  desktop: '1024px',
}

export const device = {
  tablet: `screen and (min-width: ${size.tablet})`,
  desktop: `screen and (min-width: ${size.desktop})`,
}

export const PanelWrapper = styled.div`
  background: #eee;
  position: relative;
  width: 100%;
  min-height: calc(100vh);
  height: 100%;
`

export const PanelContent = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 10px 0 0 0;
  @media ${device.tablet} {
    padding: 20px 0;
  }
  & .panel-left,
  & .panel-right {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  & .panel-left {
    width: 100%;
    @media ${device.tablet} {
      width: 30%;
    }
    @media ${device.desktop} {
      width: 22%;
    }
  }
  & .panel-right {
    width: 100%;
    @media ${device.tablet} {
      width: 70%;
    }
    @media ${device.desktop} {
      width: 78%;
    }
  }
`

const SignwallLayout = ({ children = [] }) => {
  return (
    <PanelWrapper id="profile-signwall">
      <div className="header">{children[0]}</div>
      <PanelContent role="main">
        {children[1]}
        <div className="panel-left">{children[2]}</div>
        <div className="panel-right">{children[3]}</div>
      </PanelContent>
      <div className="footer">{children[4]}</div>
    </PanelWrapper>
  )
}

SignwallLayout.propTypes = {
  children: PropTypes.node,
}

SignwallLayout.sections = [
  'Cabecera de página',
  'Contenedor Principal',
  'Panel Izquierdo',
  'Panel Derecho',
  'Pie de página',
]

export default SignwallLayout
