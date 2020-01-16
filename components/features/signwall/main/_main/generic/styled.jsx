import styled from 'styled-components'
import { device } from '../../../_dependencies/breakpoints'

export const ContMiddle = styled.div`
  display: block;
  height: calc(100% - 50px);
  min-height: 490px;
`

export const Base = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const FirstMiddle = styled(Base)`
  width: 58%;
  height: 100%;
  display: none;
  background-color: #f4f4f4;
  @media ${device.desktop} {
    display: inline-block;
  }
`

export const SecondMiddle = styled(Base)`
  width: 100%;
  @media ${device.desktop} {
    width: ${props => (props.full ? '100' : '42')}%;
  }
`
