import React from 'react'

export default props => {
  const { sections = [] } = props
  return (
    <div className="video-navbar hidden md:block">
      <ul className="video-navbar__list">
        {sections &&
          sections.map(section => {
            return (
              <li className="video-navbar__item">
                <a href={section.url} className="video-navbar__link">
                  {section.name}
                </a>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
