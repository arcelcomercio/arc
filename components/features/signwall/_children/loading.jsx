import React from 'react'
import Context from 'fusion:context'
import styled, { css } from 'styled-components'
import { LoadingGes, LoadingEco, LoadingP21 } from './iconos'
import { device } from '../_dependencies/breakpoints'

export const WrapperLoading = styled.div`
  width: 100%;
  text-align: center;

  ${props =>
    props.typeBg === 'wait' &&
    css`
      position: relative;
      background: transparent;
      padding: 50% 0%;
      @media ${device.desktop} {
        padding: 20% 0%;
      }
    `};

  ${props =>
    props.typeBg === 'block' &&
    css`
      position: absolute;
      background: rgba(255, 255, 255, 0.5);
      padding: 20% 0%;
      z-index: 20;
    `};

  ${props =>
    props.typeDialog === 'premium' &&
    css`
      padding: 20% 0% !important;
    `};

  .cont-loader-logo {
    svg {
      margin: 0px 5px;
    }
    svg:nth-child(1) {
      animation: identifier 700ms infinite linear;
    }
    svg:nth-child(2) {
      animation: identifier 700ms infinite linear;
      animation-delay: calc(350ms);
    }
    svg:nth-child(3) {
      animation: identifier 700ms infinite linear;
      animation-delay: calc(350ms * 2);
    }
  }

  @keyframes identifier {
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`

const Loading = ({ arcSite, typeBg, typeDialog }) => {
  const sitesLoad = ['gestion', 'elcomercio', 'peru21']
  return (
    <WrapperLoading typeBg={typeBg} typeDialog={typeDialog}>
      {sitesLoad.includes(arcSite) ? (
        <div className="cont-loader-logo">
          {
            {
              gestion: (
                <>
                  <LoadingGes />
                  <LoadingGes />
                  <LoadingGes />
                </>
              ),
              elcomercio: (
                <>
                  <LoadingEco />
                  <LoadingEco />
                  <LoadingEco />
                </>
              ),
              peru21: (
                <>
                  <LoadingP21 />
                  <LoadingP21 />
                  <LoadingP21 />
                </>
              ),
            }[arcSite]
          }
        </div>
      ) : (
        <>
          <Context>
            {({ siteProperties, contextPath, deployment }) => (
              <div
                className="cont-loader-default"
                style={{
                  background: siteProperties.signwall.mainColorBg || 'gray',
                }}>
                <img
                  alt={`Logo ${arcSite}`}
                  src={deployment(
                    `${contextPath}/resources/dist/${arcSite}/images/${siteProperties.assets.header.logo}`
                  )}
                />
              </div>
            )}
          </Context>
        </>
      )}
    </WrapperLoading>
  )
}

export default Loading
