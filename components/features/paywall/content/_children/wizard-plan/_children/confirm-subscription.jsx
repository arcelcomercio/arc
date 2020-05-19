import React from 'react'
import styled, { css } from 'styled-components'

import Modal from '../../../../_children/modal'
import { useStrings } from '../../../../_children/contexts'

export default ({
  onConfirm = i => i,
  onCancel = i => i,
  title,
  content,
  footer,
  ...restProps
}) => {
  const msgs = useStrings()
  return (
    <Modal onClose={onCancel} allowEsc={false} {...restProps}>
      <Panel>
        {title && <Title>{title}</Title>}
        {content && <Content>{content}</Content>}
        <ActionPane>
          <ActionButton onClick={onConfirm}>{msgs.yes}</ActionButton>
          <div
            style={{
              margin: '20px',
            }}
          />
          <ActionButton onClick={onCancel}>{msgs.cancel}</ActionButton>
        </ActionPane>
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </Modal>
  )
}

const Panel = styled.div`
  box-sizing: border-box;
  width: 500px;
  height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  color: #444;
`

const Title = styled.h1`
  align-content: center;
  background-color: red;
  margin-top: 0px;
  line-height: 40px;
`

const Content = styled.p`
  flex: 1;
  margin: 0%;
  font-family: Open Sans;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`

const Footer = styled.p`
  margin-bottom: 0;
  font-family: Open Sans;
  font-size: 12px;
  text-align: center;
`

const ActionPane = styled.div`
  display: flex;
  justify-content: center;
  flex: calc(1 / 6);
`

export const ActionButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    ${({ maxWidth }) =>
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `}
    justify-content: center;
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrastText};
    border-radius: 5px;
    font-size: 14px;
    line-height: 46px;
    border: 0;
    font-weight: 700;
    outline: 0;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: ${theme.palette.darken(
        theme.palette.secondary.main,
        theme.palette.tonalOffset
      )};
      color: ${theme.palette.secondary.contrastText};
    }
    &:disabled {
      background-color: ${theme.palette.fade(
        theme.palette.action.disabled,
        theme.palette.tonalOffset / 2
      )};
      color: ${theme.palette.action.disabled};
      cursor: initial;
    }
    ${theme.breakpoints.down('xs')} {
      width: 100%;
    }
  `}
`
