import React from 'react'

const classes = {
  titulo: 'independent-title w-full text-white text-center pt-10 pb-10',
  link: 'independent-title__link primary-font title-xs font-bold uppercase',
}

const IndependentTitle = ({ title, link, bgColor, fontColor }) => (
  <div className={`${classes.titulo} ${bgColor}`}>
    <a href={link} className={`${classes.link} ${fontColor}`}>
      {title}
    </a>
  </div>
)

export default IndependentTitle
