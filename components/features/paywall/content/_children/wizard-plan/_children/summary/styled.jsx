import styled from 'styled-components'

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
  background-color: #ffebdd;
  height: 4px;
  margin: 20px 0;
`

const WrapFeature = styled.div`
  font-size: 14px;
  margin-top: 10px;
`

const Feature = styled.div`
  display: flex;
  font-weight: 300;
  margin-bottom: 20px;
`

const WrapIcon = styled.div`
  margin-right: 15px;
  padding: 5px 0;
`

const WrapTitle = styled.div`
  font-family: 'Noto Serif', serif;
  font-weight: 700;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const NamePlan = styled.span`
  font-size: 28px;
`

const SummaryTitle = styled.span`
  font-size: 16px;
`
export {
  Head,
  Wrap,
  Separate,
  WrapFeature,
  Feature,
  WrapIcon,
  WrapTitle,
  NamePlan,
  SummaryTitle,
}
