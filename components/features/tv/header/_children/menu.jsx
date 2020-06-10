import React, { useEffect } from 'react'

const MenuTV = ({ menuSections }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
  })

  return (
    <>
      <div className="tv-menu">
        <div className="tv-menu__header">
          <p className="tv-menu__title">Portada</p>
        </div>
        <ul className="tv-menu__list">
          {menuSections &&
            menuSections.map(el => {
              return (
                <li className="tv-menu__item" key={el.url}>
                  <a itemProp="url" className="tv-menu__link" href={el.url}>
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
