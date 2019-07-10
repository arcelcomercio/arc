import styled, { css } from 'styled-components'
import { devices } from '../../_dependencies/devices'

const Panel = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  flex: 1;
  margin: ${({ margin }) => margin || 'initial'};
  ${({ valing }) =>
    valing &&
    css`
      justify-content: center;
    `};
  ${({ type }) => {
    switch (type) {
      case 'content':
        return css`
          max-width: 740px;
        `
      case 'summary':
        return css`
          max-width: 360px;
          @media (${devices.mobile}) {
            max-width: calc(100% - 40px);
            align-items: center;
          }
        `
      case 'card-price':
        return css`
          max-width: 265px;
          @media (${devices.mobile}) {
            max-width: calc(50% - 10px);
          }
        `
      default:
        return css``
    }
  }};
`
export { Panel }
