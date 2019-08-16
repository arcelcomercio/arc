import styled from 'styled-components'

import _CheckImage from './check-img'

export const Thanks = styled.div`
  width: 100%;
  height: auto;
  min-height: 540px;
  max-width: 230px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ThanksImg = styled(_CheckImage)`
  width: 26%;
  height: auto;
  background: white;
  border-radius: 50%;
  padding: 1em;
  border: 0.4em solid #7ac043;
  margin: 0 auto 2em;
`
export const ThanksTitle = styled.h3`
  margin: 0;
  font-size: 2em;
  font-weight: 300;
`
export const ThanksContent = styled.p`
  font-size: 1.1em;
  line-height: 1.4em;
`
export const ThanksBtn = styled.a`
  color: white;
  font-size: 0.9em;
  border-radius: 2px;
  background-color: #2768b2;
  text-transform: uppercase;
  padding: 1em 5em;
  font-weight: 600;
  box-shadow: 0px 1px 2px 1px #2768b261;
  cursor: pointer;
  text-decoration: none;
`
