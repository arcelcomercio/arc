import React from 'react'
import Context from 'fusion:context'
import styled, { css } from 'styled-components'
import { LoadingGes, LoadingEco, LoadingP21 } from './iconos'
import { device } from '../_dependencies/breakpoints'

export const WrapperLoading = styled.div`
  ${props =>
    props.typeBg === 'wait' &&
    css`
      position: relative;
      width: 100%;
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
      width: 100%;
      background: rgba(255, 255, 255, 0.5);
      padding: 20% 0%;
      z-index: 20;
    `};
`

const Loading = ({ arcSite, typeBg }) => {
  const sitesLoad = ['gestion', 'elcomercio', 'peru21']
  return (
    <WrapperLoading typeBg={typeBg}>
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
