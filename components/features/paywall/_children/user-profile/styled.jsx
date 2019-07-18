import styled from 'styled-components'
import { devices } from '../../_dependencies/devices'

const Select = styled.select`
  background-color: #fff;
  border: 0;
`

const Wrap = styled.div`
  flex-wrap: wrap;
  width: 530px;
  display: flex;
  justify-content: space-between;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

const Title = styled.span`
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
`

const WrapTitle = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 30px;
  justify-content: flex-start;
  width: 100%;
`

const Form = Component => {
  return styled(Component)`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (${devices.mobile}) {
      padding: 30px;
    }
  `
}

export const WrapField = styled.div`
  min-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

export { Select, Wrap, Form, Title, WrapTitle }
