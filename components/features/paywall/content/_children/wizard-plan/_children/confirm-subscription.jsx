/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled, { css } from 'styled-components'

import Modal from '../../../../_children/modal'
import { useStrings } from '../../../../_children/contexts'
import Markdown from '../../../../_children/markdown'

export default ({
  onConfirm = i => i,
  onCancel = i => i,
  title,
  content,
  linkText,
  question,
  footer,
  linkProfile,
  ...restProps
}) => {
  const msgs = useStrings()

  return (
    <Modal onClose={onCancel} allowEsc={false} {...restProps}>
      <Panel>
        {title && <Title>{title}</Title>}
        {content && (
          <>
            <Content>
              <Markdown escapeHtml={false}>{content}</Markdown>
              <Link
                href="#"
                onClick={e => {
                  e.preventDefault()
                  window.open(linkProfile)
                }}>
                {linkText}
              </Link>
            </Content>

            <Content>{question}</Content>
          </>
        )}
        <ActionPane>
          <ActionButton primary onClick={onCancel}>
            {msgs.cancel}
          </ActionButton>
          <ActionButton outline onClick={onConfirm}>
            {msgs.yes}
          </ActionButton>
        </ActionPane>
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </Modal>
  )
}

const Panel = styled.div`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100%;
    min-height: 250px;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    color: #444;
    box-shadow: 0rem 0rem 0.5rem #949494;
    transition: opacity 0.25s;
    animation: vDialog-enter 0.5s;

    ${theme.breakpoints.up('sm')} {
      width: 70%;
      margin: 0 auto;
      padding: 40px 74px;
    }

    ${theme.breakpoints.up('md')} {
      width: 500px;
      padding: 40px 60px;
    }

    @-webkit-keyframes vDialog-enter {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes vDialog-enter {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}
`

const Title = styled.h1`
  align-content: center;
  margin-top: 0px;
  line-height: 40px;
`

const Content = styled.p`
  ${({ theme }) => css`
    flex: 1;
    margin: 0%;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 24px;
    a {
      color: ${theme.palette.secondary.main};
    }
  `}
`

const Link = styled.a`
  ${({ theme }) => css`
    font-family: Open Sans;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 24px;
    color: ${theme.palette.secondary.main};
  `}
`

const Footer = styled(Markdown)`
  margin-bottom: 0;
  font-family: Open Sans;
  font-size: 13px;
  text-align: center;
  line-height: 20px;
  a {
    font-weight: bold;
    color: gray;
  }
`

const ActionPane = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px 30px 0px;
  flex: calc(1 / 6);
`

export const ActionButton = styled.button`
  ${({ theme, outline }) => css`
    width: 140px;
    margin: 0 20px;
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
    transition: all 0.5s ease 0s;
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
      margin: 0 10px;
    }
    ${outline &&
      css`
        border: 1px solid ${theme.palette.secondary.main};
        background-color: white;
        color: ${theme.palette.secondary.main};
      `}
  `}
`
