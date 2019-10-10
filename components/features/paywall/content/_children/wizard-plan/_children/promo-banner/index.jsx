import React from 'react'
import { withTheme } from 'styled-components'

import * as S from './styled'
import Icon from '../../../../../_children/icon'

const PromoBanner = props => {
  const {
    theme,
    backgroundColor,
    fullWidth,
    width,
    text1,
    text2,
    invertTextSizes,
    image,
    onClick,
    ...restProps
  } = props
  return (
    <S.Subscribed
      fullWidth={fullWidth}
      width={width}
      onClick={onClick}
      {...restProps}>
      {image && (
        <div>
          <S.Picture>
            <source srcSet={image} />
            <source
              media={theme.breakpoints.down('830px', false)}
              srcSet={theme.images.pixel}
            />
            <S.Img src={image} alt="lector" />
          </S.Picture>
        </div>
      )}
      <S.SubscribedContent
        backgroundColor={backgroundColor}
        color={theme.palette.getContrastText(backgroundColor)}
        minPadding={image}>
        <S.SubscribedText>
          {invertTextSizes ? (
            <>
              <S.Small>{text1}</S.Small>
              <span>{text2}</span>
            </>
          ) : (
            <>
              <span>{text1}</span>
              <S.Small>{text2}</S.Small>
            </>
          )}
        </S.SubscribedText>
        <div>
          <Icon type={theme.icon.arrowRight} />
        </div>
      </S.SubscribedContent>
      <S.Shadow />
    </S.Subscribed>
  )
}

export default withTheme(PromoBanner)
