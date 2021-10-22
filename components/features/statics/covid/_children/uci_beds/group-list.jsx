import React from 'react'

export default function GroupList({ list = [] }) {
  return (
    <div>
      <div className="uci-home__group">
        <div className="uci-home__item">
          <div className="uci-home__item-link">
            <span>{list[0]?.grupo || ''}</span>
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <g clipPath="url(#clip0)">
                <path d="M4 6L0 0L8 0L4 6Z" fill="#707071" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="8" height="6" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="uci-home__row header">
          <div>Nombre</div>
          <div>Total UCI</div>
          <div>Disponible</div>
        </div>
        <div className="uci-home__body-list">
          {list.map(
            ({
              nombre = '',
              total_UCI: totalUci = 0,
              disponible = 0,
              nombre_slug: nombreSlug = '',
            }) => (
              <a
                href={`${nombreSlug}/`}
                className="uci-home__row"
                style={{ color: disponible === 0 ? '#F00' : '#55AC0A' }}>
                <div>{nombre}</div>
                <div>{totalUci}</div>
                <div>{disponible}</div>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  )
}
