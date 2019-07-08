import styled from 'styled-components'
import { devices } from '../../_dependencies/devices'

const Select = styled.select`
  background-color: #fff;
  border: 0;
`
const Button = styled.button`
  flex: 1;
  background-color: #008eff;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  line-height: 46px;
  border: 0;
  font-weight: 700;
  outline: 0;
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

export { Select, Button, Wrap }
