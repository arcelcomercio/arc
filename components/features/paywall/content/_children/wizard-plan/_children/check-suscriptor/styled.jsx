import styled from 'styled-components'
import Button from '../../../../../_children/button'

export const Continue = styled(Button)`
  max-width: 300px;
  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
  }
`

export const Background = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 4px;
`

export const Panel = styled.div`
  box-sizing: border-box;
  width: 860px;
  height: 300px;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 40px 50px;
  display: flex;
  color: #444;
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    max-width: calc(100vw - 300px);
    padding: 30px 20px;
  }
  @media (max-width: 767px) {
    max-width: calc(100vw - 20px);
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.56px;
  text-align: center;
  margin-bottom: 35px;
  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }
`

export const Wrapbenefit = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Free = styled.span`
  font-size: 40px;
  font-weight: bold;
`

export const Foot = styled.div`
  display: flex;
  flex: 1;
  font-size: 12px;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 1024px) {
    align-items: center;
  }
`

export const FootContent = styled.div`
  max-width: 180px;
  display: contents;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  @media (max-width: 1024px) {
    margin: 0;
    max-width: inherit;
    flex: 1;
    flex-direction: row;
  }
`

export const WrapDocument = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  justify-content: space-around;
  strong {
    font-size: 16px;
    margin-bottom: 30px;
  }
  @media (max-width: 1024px) {
    padding: 20px 0;
    form {
      width: 100%;
    }
  }
`

export const Divider = styled.div`
  border-left: 1px solid #e8e8e8;
  margin: 0 35px;
`

export const SpanFoot = styled.span`
  line-height: 24px;
  text-align: right;
  display: block;
  font-size: ${props => (props.title ? '16px' : '14px')};
  font-weight: ${props => (props.title ? 'bold' : 'normal')};
  @media (max-width: 1024px) {
    text-align: center;
  }
`

export const Icon = styled.i`
  font-size: 20px;
`
export const Select = styled.select`
  background-color: #fff;
  border: 0;
  min-width: 40px;
  user-select: none;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDQuOTV2MTBIMHoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjQxIDQuNjdsMS4wNy0xLjQ5IDEuMDYgMS40OUgxLjQxek0zLjU0IDUuMzNMMi40OCA2LjgyIDEuNDEgNS4zM2gyLjEzeiIvPjwvc3ZnPg==) no-repeat 100% 50%;
  border-radius: 0;
  padding: 5px 10px;
  appearance: none;
  option {
  }
`

export const SpanIcon = styled.span`
  display: flex;
  align-items: flex-start;
  svg {
    margin-right: 1em;
  }
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`
