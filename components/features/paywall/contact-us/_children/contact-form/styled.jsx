import styled, { css } from 'styled-components'
import { Form } from 'formik'

import { devices } from '../../../_dependencies/devices'

const WrapField = styled.div`
  min-width: 250px;
  // max-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
    max-width: 100%;
  }
`

const Description = styled.div`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
  padding: 2em 2em;
  flex-direction: column;
  align-self: center;
  @media ${devices.tablet} {
    padding: 2em 7em;
  }
`

const Message = styled.div`
  padding: 30px 10px;
  padding-top: 15px;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 639px) {
    flex-direction: column;
  }
`

const ContentRow = styled.div`
  width: 50%;
  height: auto;
  padding: 0px 10px;
  box-sizing: border-box;
  @media (max-width: 639px) {
    width: 100%;
  }
`

export { StyledForm, WrapField, Description, Message, Content, ContentRow }
