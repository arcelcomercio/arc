/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'

export const Fecha = (props) => {
  const [fecha, guardarFechaObtenida] = useState('')

  const handleOnChange = (e) => {
    guardarFechaObtenida(e.target.value)
  }

  return (
    <div className="sign-profile_update-form-group">
      <input
        id="date"
        type="date"
        name="fecha"
        value={fecha}
        onChange={(e) => {
          handleOnChange(e)
          props.guardarFecha(e.target.value)
        }}
        className="input"
      />
      <label htmlFor="fecha" className="label">
        Fecha de Nacimiento
      </label>
    </div>
  )
}
