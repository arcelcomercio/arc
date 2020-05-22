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
        <Icon>
          <div className="f-modal-icon f-modal-warning scaleWarning">
            <span className="f-modal-body pulseWarningIns"></span>
            <span className="f-modal-dot pulseWarningIns"></span>
          </div>
        </Icon>
        {title && <Title>{title}</Title>}
        {content && (
          <>
            <Content>
              {content}
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
    padding: 20px 50px 40px 50px;
    display: flex;
    flex-direction: column;
    color: #444;
    box-shadow: 0rem 0rem 0.5rem #949494;
    transition: opacity 0.25s;
    animation: vDialog-enter 0.5s;

    ${theme.breakpoints.up('sm')} {
      width: 70%;
      margin: 0 auto;
      padding: 20px 74px 40px 74px;
    }

    ${theme.breakpoints.up('md')} {
      width: 500px;
      padding: 20px 60px 40px 60px;
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

const Icon = styled.div`
  .f-modal-icon {
    border-radius: 50%;
    border: 4px solid gray;
    box-sizing: content-box;
    height: 80px;
    margin: 20px auto;
    padding: 0;
    position: relative;
    width: 80px;

    &.f-modal-warning {
      border-color: #f8bb86;

      &:before {
        animation: pulseWarning 2s linear infinite;
        background-color: #fff;
        border-radius: 50%;
        content: '';
        display: inline-block;
        height: 100%;
        opacity: 0;
        position: absolute;
        width: 100%;
      }

      &:after {
        background-color: #fff;
        border-radius: 50%;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        width: 100%;
        z-index: 1;
      }
    }

    &.f-modal-warning .f-modal-body {
      background-color: #f8bb86;
      border-radius: 2px;
      height: 47px;
      left: 50%;
      margin-left: -2px;
      position: absolute;
      top: 10px;
      width: 5px;
      z-index: 2;
    }

    &.f-modal-warning .f-modal-dot {
      background-color: #f8bb86;
      border-radius: 50%;
      bottom: 10px;
      height: 7px;
      left: 50%;
      margin-left: -3px;
      position: absolute;
      width: 7px;
      z-index: 2;
    }
  }

  .pulseWarningIns {
    animation: pulseWarningIns 0.75s infinite alternate;
  }

  @keyframes pulseWarning {
    0% {
      background-color: #fff;
      transform: scale(1);
      opacity: 0.5;
    }

    30% {
      background-color: #fff;
      transform: scale(1);
      opacity: 0.5;
    }

    100% {
      background-color: #f8bb86;
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulseWarningIns {
    0% {
      background-color: #f8d486;
    }

    100% {
      background-color: #f8bb86;
    }
  }
`
