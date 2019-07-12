import React from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import * as S from './styled'
import { AddIdentity, userProfile } from '../_dependencies/Identity'

@Consumer
class Head extends React.PureComponent {

  state = {
    firstName: 'cargando..'
  }

  componentDidMount() {
    AddIdentity(this.props).then((Identity) => {
      userProfile()
        .then(({ firstName }) => {
          this.setState({ firstName })
        })
    })
  }

  render() {
    const { siteProperties, contextPath, deployment } = this.props

    const { assets, colorPrimary } = siteProperties
    const { firstName } = this.state;

    return (
      <S.ThemeProvider theme={{ colorPrimary }}>
        <S.Head>
          <S.Background>
            <S.Left></S.Left>
            <S.Right></S.Right>
          </S.Background>
          <S.Content>
            <img
              src={deployment(`${contextPath}${assets.paywall()}`)}
              alt="Logo el comercio"
            />
            <S.WrapLogin>
              <S.Username>Hola {firstName}</S.Username>
            </S.WrapLogin>
          </S.Content>
        </S.Head>
      </S.ThemeProvider>
    )
  }
}

export default Head
