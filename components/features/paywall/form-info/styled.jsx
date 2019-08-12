// import styled from 'styled-components'
// import Panel from '../_children/panel'
// import Panel from '../../../_children/panel'
// import { devices } from '../../../_dependencies/devices'

// const WizardUserProfile = styled.div`
//   display: flex;
//   justify-content: space-between;
//   @media (${devices.mobile}) {
//     flex-direction: column-reverse;
//     align-items: center;
//   }
//   @media ${devices.tablet} {
//     flex-direction: column-reverse;
//     align-items: center;
//   }
// `

// const PanelUserProfile = styled(Panel)`
//   @media (${devices.mobile}) {
//     margin-top: 30px;
//   }
//   @media ${devices.tablet} {
//     margin-top: 30px;
//     padding: 30px;
//   }
// `








// const FormPanel = styled.picture`
//   display: flex;
//   width: 100%;
//   max-width: 1000px;
//   height: auto;
//   margin: 50px auto;
//   background-color: #fff;
//   flex-wrap: unwrap;
//   box-shadow: 1px 2px 4px 1px rgba(0,0,0,0.1)
// `

// const FormPicture = styled.div`
//   width: 35%;
//   height: auto;
// `

// const FormFormulario = styled.div`
//   width: 65%;
//   height: auto;
//   padding: 4.5em 4em;   
// `

// const FormContentWrap = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// export { 
//   FormPanel,
//   FormPicture,
//   FormFormulario,
//   FormContentWrap
// }

// export { WizardUserProfile, PanelUserProfile }


import styled from 'styled-components';
import { devices } from '../_dependencies/devices'

const FormContactUs = styled.section`
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
  width:40%;
  @media(${devices.mobile}){
      display:none;
  }  
`

const FormImg = styled.img`
  width:100%;
`

export {
  FormContactUs,
  FormPicture,
  FormImg
}