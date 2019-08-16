import React, { useState, useEffect } from 'react'

const arr = ['21Noticias', 'La voz del 21', 'Entrevistas 21']

const MenuTV = ({ toggleMenu }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
  })
  const [closeClass, setCloseClass] = useState('')
  const closeModal = () => {
    setCloseClass('close')
    setTimeout(() => toggleMenu(), 300)
    document.body.classList.remove('overflow-hidden')
  }
  return (
    <>
      <div
        className={`video-modal__gradient ${closeClass}`}
        role="button"
        tabIndex="0"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            closeModal()
          }
        }}
        onClick={() => closeModal()}
      />
      <div className={`tv-menu ${closeClass}`}>
        <div className="tv-menu__header">
          <p className="tv-menu__title">Portada</p>
          <button type="button" onClick={() => closeModal()}>
            <span className="tv-menu__icon icon-close" />
          </button>
        </div>
        <ul className="tv-menu__list">
          {arr &&
            arr.map(el => {
              return (
                <li className="tv-menu__item">
                  <a className="tv-menu__link" href="/">
                    {el}
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export default MenuTV
