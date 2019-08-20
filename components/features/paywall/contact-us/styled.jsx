import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const WrapContent = styled.div`
  width: 100%;
  max-width: 1100px;
  height: auto;
  background-color: #fff;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  margin: 4em auto;
  display: flex;
  & textarea {
    height: 107px;
    width: 100%;
  }
  @media (max-width: 639px) {
    box-shadow: none;
  }
`

export const Picture = styled.picture`
  line-height: 0px;
`
