import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Recaptcha from 'react-recaptcha'

const Border = styled.div`
  ${props =>
    props.error &&
    css`
      position: relative;
      border: solid 1px #db0000;
      border-radius: 4px;
      & p {
        color: #db0000;
        margin-top: 5px;
        display: block;
        position: absolute;
        bottom: -32px;
      }
    `}
`

const Captcha = props => {
  const {
    dataSitekey,
    onChange,
    field: { onChange: fieldOnChange, onBlur, name, value },
    form,
    meta,
    error,
    ...restProps
  } = props

  const recaptchaRef = React.useRef()

  const combinedOnChange = response => {
    onChange && onChange(response)
    fieldOnChange && fieldOnChange(response)
  }

  return (
    <Border error={error}>
      <Recaptcha
        ref={recaptchaRef}
        sitekey={dataSitekey || '6LfEGMcUAAAAAEBWDI6qyRGEc0_KG0XTNBNeeCjv'}
        size="normal"
        verifyCallback={combinedOnChange}
        expiredCallback={combinedOnChange}
        errorCallback={combinedOnChange}
        {...restProps}
      />
      {error && <p>{error}</p>}
    </Border>
  )
}

export default Captcha
