import React from 'react'
import {
  Thanks,
  ThanksImg,
  ThanksTitle,
  ThanksContent,
  ThanksBtn
} from '../_dependencies/styled'


export default props => {
  return (
    <Thanks>
      <ThanksImg src="./imagen/check2.png" alt="check"/>
      <ThanksTitle>Gracias</ThanksTitle>
      <ThanksContent>tu mensaje ha sido enviado, nos pondremos en contacto con usted.</ThanksContent>
      <ThanksBtn>volver a gestión</ThanksBtn>
    </Thanks>
  )
}
