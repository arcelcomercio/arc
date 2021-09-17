import React from 'react'

export default function HospitalDetail({
  data: { nombre, direccion, horario, telefono } = {},
  backLink = '',
}) {
  return (
    <div className="uci-hospital">
      <div className="uci-hospital__bg"></div>
      <div className="uci-hospital__body">
        <h1 className="uci-hospital__title">{nombre}</h1>
        <div className="uci-hospital__dir">{direccion}</div>
        <div className="uci-hospital__at">
          <span>Horario de atención:</span>
          <span>{horario}</span>
        </div>
        <div className="uci-hospital__nu">
          <span>Teléfono de Atención</span>
          <span>{telefono}</span>
        </div>
        <a className="uci-home__close-link" href={backLink}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <g clipPath="url(#clip0)">
              <path d="M0.353027 0.353027L13.625 13.625" stroke="#707070" />
              <path d="M13.625 0.353027L0.353027 13.625" stroke="#707070" />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="13.979" height="13.979" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
    </div>
  )
}
