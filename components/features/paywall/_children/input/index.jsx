import React, { useState } from 'react'
import Divider from '../divider'
import c from '../../_dependencies/tools'
import './input.css'

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
    <div className="__formGroup">
      <label
        htmlFor="Hola"
        className={c(['__label', ['__focus', hasText], ['__prefix', prefix]])}>
        {placeholder}
      </label>
      <div className="__wrapInput">
        {prefix ? [prefix, <Divider key="divider" />] : false}
        <input
          type="text"
          value={value}
          onFocus={focus}
          onBlur={blur}
          className="__input"
          {...rest}
          {...props}
        />
      </div>
      {hasError && errors[field.name]}
    </div>
  )
}
export default InputFormik
