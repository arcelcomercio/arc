import styled, { css } from 'styled-components'

export const Colors = {
  BLACK: '#444444',
  CARMINE: '#8f071f',
  LIGHT_PINK: '#fff6f0',
}

export const DialogContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 820px;
  height: 530px;
  border-radius: 4px;
  background-color: #fefefe;
  position: relative;
`

export const ContentWrapper = styled.div`
  border-radius: 4px;
  width: 310px;
  padding: 40px;
  background-color: ${Colors.LIGHT_PINK};
`

export const Title = styled.div`
  font-family: Open Sans;
  font-size: 26px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.CARMINE};
`

export const Subtitle = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.14;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.CARMINE};
`

export const Paragraph = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.BLACK};
`

export const LongMail = styled.span`
  ${({ theme }) => css`
    ${theme.breakpoints.down('xs')} {
      font-size: 12px;
    }
  `}
`
