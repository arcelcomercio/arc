import styled from 'styled-components'
import { devices } from '../../_dependencies/devices'

const Select = styled.select`
  background-color: #fff;
  border: 0;
`
const Button = styled.button`
  flex: 1;
  min-width: 300px;
  background-color: #0179af;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  line-height: 46px;
  border: 0;
  font-weight: 700;
  outline: 0;
  cursor: pointer;
  @media (${devices.mobile}) {
    width: 100%;
  }
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

export { Select, Button, Wrap, Form, Title, WrapTitle }
