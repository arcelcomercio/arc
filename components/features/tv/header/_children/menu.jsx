import React, { useState, useEffect } from 'react'

const MenuTV = ({ toggleMenu, menuSections }) => {
  useEffect(() => {
    
  })
  const [closeClass, setCloseClass] = useState('')
  const closeModal = () => {
    setCloseClass('close')
    setTimeout(() => {
      document.body.classList.remove('overflow-hidden')
      toggleMenu()
    }, 300)
  }
  return (
    <>
      <div className={`tv-menu ${closeClass}`}>
        <div className="tv-menu__header">
          <p className="tv-menu__title">Portada</p>
          <button type="button" onClick={() => closeModal()}>
            <span className="tv-menu__icon icon-close" />
          </button>
        </div>
        <ul className="tv-menu__list">
          {menuSections &&
            menuSections.map(el => {
              return (
                <li className="tv-menu__item" key={el.url}>
                  <a className="tv-menu__link" href={el.url}>
                    {el.name}
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
