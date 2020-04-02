import React from 'react'

const classes = {
  li:
    'direct__item flex items-center flex-wrap border-t-1 border-solid pt-15 md:pt-20 pb-15 md:pb-20',
  ads: 'direct__publicity hidden w-full mb-10',
  box: 'direct__box mr-20 flex flex-col items-center md:flex-row',
  time:
    'direct__time text-center md:text-left mb-10 md:mb-0 md:mr-20 secondary-font',
  timeSub: 'direct__time-sub',
  imgWrapper: 'direct__img',
  img: 'w-full h-full object-cover',
  commentary: 'direct__details secondary-font',
  adsgoal: ' direct__item--publicity',
}

const ItemCommentary = ({
  mainTime,
  addTime,
  icon,
  comment,
  type,
  adsMatch,
}) => {
  return (
    <li className={classes.li + (type === 'goal' && classes.adsgoal)}>
      {type === 'goal' && <div className={classes.ads}>{adsMatch}</div>}
      <div className={classes.box}>
        <p className={classes.time}>
          {mainTime}
          {addTime && <sub className={classes.timeSub}>{addTime}</sub>}
        </p>
        {/*    <i className={classes.img}>{type}</i> */}
        <div className={classes.imgWrapper}>
          {icon && (
            <img
              src={`https://cdna.depor.com/resources/assets/minute-by-minute/${icon}`}
              alt="Icono"
              className={classes.img}
            />
          )}
        </div>
      </div>
      <div className={classes.commentary}>{comment}</div>
    </li>
  )
}

export default ItemCommentary
