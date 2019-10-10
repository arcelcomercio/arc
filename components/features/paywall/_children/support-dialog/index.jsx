import React from 'react'
import { withTheme } from 'styled-components'
import Markdown from '../markdown'

import Modal from '../modal'
import * as S from './styled'
import { useStrings } from '../contexts'

const SupportDialog = props => {
  const { site, theme } = props
  const { lighten } = theme.palette
  const msgs = useStrings()
  return (
    <Modal scrollable {...props}>
      <S.DialogContent
        backgroundColor={
          site === 'elcomercio'
            ? theme.palette.background.paper
            : lighten(theme.palette.primary.main, 0.9)
        }
        titleColor={site !== 'elcomercio' && theme.palette.primary.main}>
        <S.ImageWrapper>
          <picture>
            <source
              media={theme.breakpoints.down('xs')}
              srcSet={theme.images.pixel}
            />
            <source srcSet={theme.images.support_webp} type="image/webp" />
            <img src={theme.images.support} alt="support" />
          </picture>
        </S.ImageWrapper>
        <S.ContentWrapper>
          <S.Title>{msgs.supportTitle}</S.Title>
          <br />
          <S.Subtitle>{msgs.supportSubtitle}</S.Subtitle>
          <br />
          <S.Paragraph>
            <Markdown source={msgs.supportContent} />
          </S.Paragraph>
        </S.ContentWrapper>
      </S.DialogContent>
    </Modal>
  )
}

const ThemedSupportDialog = withTheme(SupportDialog)
export default ThemedSupportDialog
