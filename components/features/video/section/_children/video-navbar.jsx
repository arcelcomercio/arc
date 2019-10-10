
import React from 'react'

export default props => {
  
  const { sections = [] } = props;
  const videolist = sections.length > 0 ? 'video-navbar__list' : 'video-navbar__list-none';
  
  return (
    <div className="video-navbar hidden md:block">
      <ul className={videolist}>
        {sections &&
          sections.map(section => {
            return (
              <li className="video-navbar__item">
                <a href={section.url} className="video-navbar__link">
                  {section.name}
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}







