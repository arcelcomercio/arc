import styled, { css } from 'styled-components'

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`
const Wrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 30px;
  color: #444;
`

const Separate = styled.div`
  ${({ backgroundColor, theme }) => css`
    background-color: ${backgroundColor || theme.palette.primary.light};
    height: 4px;
    margin: 20px 0;
    opacity: 0.2;
  `}
`

const WrapFeature = styled.div`
  font-size: 14px;
  margin-top: 10px;
`

const WrapTitle = styled.div`
  font-family: var(--font-primary);
  font-weight: 700;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const NamePlan = styled.span`
  font-size: 34px;
  font-family: Judson;
`

const SummaryTitle = styled.span`
  font-size: 16px;
`
export { Head, Wrap, Separate, WrapFeature, WrapTitle, SummaryTitle }
