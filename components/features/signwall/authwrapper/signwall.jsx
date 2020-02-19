import React from 'react'
import Consumer from 'fusion:consumer'
import * as S from './styled'
import { Generic } from '../main/_main/generic'

const _AuthWrapper = props => {
  return (
    <S.AuthBox>
      <Generic
        arcSite="gestion"
        typeDialog="hard"
        onClose={() => {
          console.log('Pressed')
        }}
      />
    </S.AuthBox>
  )
}

@Consumer
class AuthWrapper extends React.PureComponent {
  render() {
    return <_AuthWrapper {...this.props} />
  }
}

export default AuthWrapper