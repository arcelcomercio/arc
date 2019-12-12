import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'

const Captcha = props => {
  const {
    className,
    dataSitekey,
    field: { onChange, onBlur, name, value },
    form,
    meta,
    error,
    ...restProps
  } = props

  const captchaResponse = React.useRef(value)
  useEffect(() => {
    window.__gcaptchaResponseCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
    window.__gcaptchaExpiredCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
    window.__gcaptchaErrorCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
  }, [])

  return (
    <div className={className}>
      <div
        className="g-recaptcha"
        data-sitekey={dataSitekey || '6LfEGMcUAAAAAEBWDI6qyRGEc0_KG0XTNBNeeCjv'}
        data-callback="__gcaptchaResponseCallback"
        data-expired-callback="__gcaptchaExpiredCallback"
        data-error-callback="__gcaptchaErrorCallback"
        {...restProps}></div>
      {error && <p>{error}</p>}
    </div>
  )
}

const StyledCaptcha = styled(Captcha)`
  ${props =>
    props.error &&
    css`
      position: relative;
      border: solid 1px #db0000;
      & p {
        color: #db0000;
        margin-top: 5px;
        display: block;
        position: absolute;
        bottom: -32px;
      }
    `}
`

export default StyledCaptcha
