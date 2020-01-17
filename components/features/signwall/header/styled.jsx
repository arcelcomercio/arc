import styled from 'styled-components'
import { device } from '../_dependencies/breakpoints'

export const HeaderWrapper = styled.div`
  background: ${props => props.cbg || 'gray'};
  color: ${props => props.ctx || 'white'};
  position: relative;
  width: 100%;
`

export const BackLoading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  background: #ffffff;
  z-index: 20;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  box-sizing: border-box;
`

export const ButtonBack = styled.button`
  background: transparent;
  border: 0px;
  color: ${props => props.ctx || 'white'};
  width: 25%;
  cursor: pointer;
  height: 50px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
  padding: 0 0 0 15px;
  margin: 0;
  text-align: left;
  @media screen and (min-width: 1025px) {
    padding: 0;
  }
  & > span {
    text-decoration: underline;
    margin-left: 20px;
    font-size: 14px;
    display: none;
    @media ${device.tablet} {
      display: inline-block;
    }
  }
`

export const ButtonClose = styled.button`
  color: #eeeeee;
  width: 35px;
  cursor: pointer;
  height: 35px;
  line-height: 20px;
  vertical-align: top;
  float: right;
  margin: 10px 10px 0px 0px;
`

export const ContLogo = styled.div`
  width: 50%;
  display: inline-block;
  text-align: center;
  height: 50px;
  line-height: 65px;
  @media ${device.desktop} {
    width: 50%;
  }

  & > .cont {
    height: 50px;
    padding: 5px 10px;
    margin: 0 auto;
    & > img {
      max-width: 160px;
      height: auto;
    }
  }

  & > .cont_depor {
    background-color: #d5d745;
    -webkit-transform: skew(-13deg);
    transform: skew(-13deg);
    max-width: 120px;
    & > img {
      -webkit-transform: skew(13deg);
      transform: skew(13deg);
    }
  }

  & > .cont_elcomercio {
    display: inline;
  }

  & > .cont_gestion {
    display: inline;
    & > img {
      max-width: 140px;
    }
  }

  & > .cont_trome {
    padding: 0px 0px;
    & > img {
      max-width: 180px;
    }
  }

  & > .cont_elbocon {
    padding: 0px 0px;
    & > img {
      max-width: 138px;
    }
  }

  & > .cont_peru21 {
    display: inline;
    & > img {
      max-width: 120px;
    }
  }

  & > .cont_peru21g21 {
    & > img {
      max-width: 58px;
    }
  }

  & > .cont_diariocorreo {
    padding: 0px 0px;
    & > img {
      max-width: 43px;
    }
  }

  & > .cont_elcomerciomag {
    & > img {
      max-width: 86px;
    }
  }

  & > .cont_ojo {
    display: inline;
    & > img {
      max-width: 68px;
    }
  }
`
