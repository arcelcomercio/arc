import styled, { css } from 'styled-components'
import { Form } from 'formik'

const WrapField = styled.div`
  ${({ theme }) => css`
    min-width: 250px;
    // max-width: 250px;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
      max-width: 100%;
    }
  `}
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
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    padding: 2em 2em;
    flex-direction: column;
    align-self: center;
    ${theme.breakpoints.only('sm')} {
      padding: 2em 7em;
    }
  `}
`

const Message = styled.div`
  padding: 30px 10px;
  padding-top: 15px;
`

const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
`

const ContentRow = styled.div`
  ${({ theme }) => css`
    width: 50%;
    height: auto;
    padding: 0px 10px;
    box-sizing: border-box;
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`

export { StyledForm, WrapField, Description, Message, Content, ContentRow }
