import React from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import * as S from './styled'
import { AddIdentity } from '../_dependencies/Identity'

@Consumer
class Head extends React.PureComponent {
  componentDidMount() {
    AddIdentity(this.props).then(() => {
      console.log('cargo head')
    })
  }

  render() {
    const { siteProperties, contextPath, deployment } = this.props

    const { assets, colorPrimary } = siteProperties

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
              <S.Username>Hola Jorge</S.Username>
            </S.WrapLogin>
          </S.Content>
        </S.Head>
      </S.ThemeProvider>
    )
  }
}

export default Head
