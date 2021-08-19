/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'

export const ContMask = (props) => {
  const { error, children, nolabelerror } = props
  const { placeholder, name } = children.props
  return (
    <div className="signwall-inside_forms-cont">
      <div className="signwall-inside_forms-field">
        {children}
        <label htmlFor={name} className={error && 'error'}>
          {nolabelerror ? placeholder : error || placeholder}
        </label>
      </div>
    </div>
  )
}

export const Input = (props) => {
  const { onChange, name, placeholder, clase, error, nolabelerror } = props
  return (
    <div className="signwall-inside_forms-cont">
      <div className="signwall-inside_forms-field">
        <input
          id={name}
          onBlur={onChange}
          className={`${clase || ''} ${error && 'error'}`}
          {...props}
        />
        <label htmlFor={name} className={error && 'error'}>
          {nolabelerror ? placeholder : error || placeholder}
        </label>
      </div>
    </div>
  )
}

export const Select = (props) => {
  const {
    clase,
    width,
    onChange,
    name,
    placeholder,
    error,
    children,
    nolabel,
  } = props
  return (
    <div
      className="signwall-inside_forms-cont"
      style={{
        width: `${width}%`,
      }}>
      <div className="signwall-inside_forms-field">
        <select
          id={name}
          onFocus={onChange}
          className={`${clase} ${error && 'error'}`}
          {...props}>
          {children}
        </select>
        {!nolabel && (
          <label htmlFor={name} className={error && 'error'}>
            {error || placeholder}
          </label>
        )}
      </div>
    </div>
  )
}
