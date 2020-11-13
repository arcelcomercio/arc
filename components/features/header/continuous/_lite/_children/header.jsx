import React from 'react'

const HeaderContinuousChild = ({ siteDomain, mainImage, title, isSomos }) => {
  return (
    <header
      className={`h-basic f f-center pos-rel ${
        isSomos ? 'h-basic--somos' : ''
      }`}
      id="h-basic">
      <a
        itemProp="url"
        href="/"
        className="h-basic__img-link"
        title={siteDomain}>
        <img
          className="h-basic__img"
          src={mainImage}
          alt={title}
          title={title}
        />
      </a>
    </header>
  )
}

export default HeaderContinuousChild
