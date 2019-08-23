import React from 'react'

export default () => {
  return (
    <div className="stories-l-tabloid">
      <div className="stories-l-tabloid__item">
        <a className="stories-l-tabloid__image-link" href="/">
          <picture>
            <source
              srcSet="https://picsum.photos/260/300"
              media="(max-width: 640px)"
            />
            <img
              className="stories-l-tabloid__image"
              src="https://picsum.photos/260/300"
              alt=""
            />
          </picture>
        </a>
        <a href="/" className="stories-l-tabloid__date">
          10/01/2019
        </a>
        <p className="stories-l-tabloid__section">El otoron</p>
      </div>
    </div>
  )
}
