import React from 'react'

const classes = {
  titulo: 'independent-title w-full text-white pt-10 pb-10',
  link:
    'independent-title__link primary-font flex justify-center title-xs font-bold uppercase',
}

const IndependentTitle = ({ title, link, bgColor, fontColor }) => (
  <div className={`${classes.titulo} ${bgColor}`}>
    <a href={link} className={`${classes.link} ${fontColor}`}>
      {title}
    </a>
  </div>
)

export default IndependentTitle
