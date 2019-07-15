import styled, { css } from 'styled-components'

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`

const Footer = styled.div`
  box-sizing: border-box;
  background-color: #444;
  flex: 1;
  color: #fff;
  padding: 30px 25px;
`

const Content = styled.div`
  padding: 30px;
`

const Expand = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 20px;
  font-size: ${({ size }) => `${size || 12}px`};
  ${({ discount }) =>
    discount &&
    css`
      color: #a98e7c;
      font-weight: 700;
    `}
`

const WrapTitle = styled.div`
  font-weight: 700;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const NamePlan = styled.span`
  font-size: 26px;
  font-family: var(--font-secondary);
  margin-bottom: 30px;
`

const SummaryTitle = styled.span`
  font-size: 12px;
  font-weight: 300;
`

export { Expand, Content, Footer, Summary, WrapTitle, NamePlan, SummaryTitle }
