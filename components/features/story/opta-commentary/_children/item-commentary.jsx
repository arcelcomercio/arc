import React from 'react'

const classes = {
  li: 'direct__item flex justify-between',
  ads: 'direct__publicity',
  time: 'direct__time',
  icon: 'direct__icon',
  commentary: 'direct__details',
}

const ItemCommentary = ({ time, type, comment }) => {
  return (
    <li className={classes.li}>
      <div className={classes.ads}>
        <img src="" alt="Imagen de publicidad" />
      </div>
      <p className={classes.time}>{time}</p>
      <i className={classes.icon}>{type}</i>
      <div className={classes.commentary}>{comment}</div>
    </li>
  )
}

export default ItemCommentary
