import styled from 'styled-components';
import { devices } from '../../_dependencies/devices'



const Form = Component => {
  return styled(Component)`
  display:flex;
  width: 100%;
  padding: 4em 2em;
  flex-direction: row;

  @media (${devices.mobile}) {
      width: 100%;
      padding: 2.5em;
  }   
  `
}

const FormContactUsContainter = styled.section`
  width:100%;
  max-width:1100px;
  height:auto;
  background-color: #fff;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
  margin: 4em auto;
  display:flex;
  flex-direction:row;
  @media(${devices.mobile}){
      box-shadow:none;
  }
`

const FormPicture = styled.picture`
  // width:40%;
  width:400px;
  @media(${devices.mobile}){
      display:none;
  }  
`

const FormImg = styled.img`
  width:100%;
`

const WrapField = styled.div`
  min-width: 250px;
  // max-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
    max-width: 100%;
  }
`

const ContentRow = styled.div`
    width: 50%;
    height: auto;
    padding: 0px 10px;
    @media (${devices.mobile}) {
        width: 100%;
    }
    @media (${devices.tablet}) {
        width: 100%;
    }       
`

export {
  Form,
  FormContactUsContainter,
  FormPicture,
  FormImg,
  WrapField,
  ContentRow
}
