import React from 'react'
import Context from 'fusion:context'
import styled, { css } from 'styled-components'
import { LoadingGes, LoadingEco, LoadingP21 } from './iconos'
import { device } from '../_dependencies/breakpoints'

export const WrapperLoading = styled.div`
  background: transparent;
  position: relative;

  ${props =>
    props.typeBg === 'block' &&
    css`
      position: absolute;
      width: 100%;
      background: rgba(255, 255, 255, 0.5);
      z-index: 20;
    `};

  & > .cont-loader {
    width: 200px;
    height: 50px;
    margin: 50% auto;
    text-align: center;
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
    @media ${device.desktop} {
      margin: 20% auto;
    }

    & > .cont-default {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      margin: 0 auto;
      display: block;
      position: relative;
      img {
        width: auto;
        max-width: 80px;
        max-height: 30px;
        animation: identifier 700ms infinite linear;
        margin-top: 35%;
      }
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

const Loading = ({ arcSite, typeBg }) => {
  const sitesLoad = ['gestion', 'elcomercio', 'peru21']
  return (
    <WrapperLoading typeBg={typeBg}>
      <div className="cont-loader">
        {sitesLoad.includes(arcSite) ? (
          <>
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
          </>
        ) : (
          <>
            <Context>
              {({ siteProperties, contextPath, deployment }) => (
                <div
                  className="cont-default"
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
      </div>
    </WrapperLoading>
  )
}

export default Loading
