import styled, { css } from 'styled-components'

import Panel from '../../../_children/panel'

export const WizardPayment = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => css`
    ${theme.breakpoints.down('sm')} {
      flex-direction: column-reverse;
      align-items: center;
    }
  `}
`

export const PanelPayment = styled(Panel)`
  padding: 40px 50px;
  box-sizing: border-box;
  ${({ theme }) => css`
    ${theme.breakpoints.down('md')} {
      padding: 40px 30px;
    }
    ${theme.breakpoints.down('xs')} {
      max-width: 100vw;
    }
    ${theme.breakpoints.down('sm')} {
      margin-top: 30px;
      padding: 18px 30px;
      box-sizing: border-box;
    }
  `}
`
