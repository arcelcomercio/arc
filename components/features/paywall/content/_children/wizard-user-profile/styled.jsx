import styled, { css } from 'styled-components'
import Panel from '../../../_children/panel'

const WizardUserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => css`
    ${theme.breakpoints.down('sm')} {
      flex-direction: column-reverse;
      align-items: center;
    }
  `}
`

const PanelUserProfile = styled(Panel)`
  ${({ theme }) => css`
    ${theme.breakpoints.down('sm')} {
      margin-top: 30px;
    }
    ${theme.breakpoints.only('sm')} {
      padding: 30px;
    }
  `}
`
export { WizardUserProfile, PanelUserProfile }
