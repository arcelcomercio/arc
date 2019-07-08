import React, { useState } from 'react'
import Divider from '../divider'
import * as S from './styled'

const InputFormik = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder,
  prefix,
  ...props
}) => {
  const { value, onBlur, ...rest } = field
  const [hasText, setHasText] = useState(!!value)
  const focus = () => {
    if (!hasText) {
      setHasText('__focus')
    }
  }

  const blur = e => {
    onBlur(e)
    const { value } = e.target
    setHasText(!!value)
  }

  const hasError = touched[field.name] && errors[field.name]

  return (
    <S.FormGroup>
      <S.Label focus={hasText} prefix={prefix}>
        {placeholder}
      </S.Label>
      <S.Wrap>
        {prefix ? [prefix, <Divider key="divider" />] : false}
        <S.Input
          type="text"
          value={value}
          onFocus={focus}
          onBlur={blur}
          {...rest}
          {...props}
        />
      </S.Wrap>
      {hasError && errors[field.name]}
    </S.FormGroup>
  )
}
export default InputFormik
