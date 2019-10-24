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
    padding: 40px 50px;
    box-sizing: border-box;
    ${theme.breakpoints.down('md')} {
      padding: 40px 30px;
    }
    ${theme.breakpoints.down('sm')} {
      margin-top: 30px;
    }
    ${theme.breakpoints.only('xs')} {
      padding: 0px;
    }
  `}
`
export { WizardUserProfile, PanelUserProfile }
