import * as React from 'react'

const classes = {
  container: 'saltar-intro-ranking__container-card',
  title: 'saltar-intro-ranking__title',
  figure: 'saltar-intro-ranking__figure',
  image: 'saltar-intro-ranking__image',
  list: 'saltar-intro-ranking__list',
  number: 'saltar-intro-ranking__number',
  numberTop: 'saltar-intro-ranking__number--top',
  rankTitle: 'saltar-intro-ranking__rank-title',
  rankPlatform: 'saltar-intro-ranking__rank-platform',
  box: 'saltar-intro-ranking__box flex',
  boxData: 'saltar-intro-ranking__box-data',
}
const SaltarIntroRankingChildRank: React.FC = (props) => {
  const { title, image, ranking = [], isAdmin = false, lazyImage } = props
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <figure className={classes.figure}>
        <img
          src={isAdmin ? image : lazyImage}
          data-src={image}
          alt={title}
          className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
        />
      </figure>
      <div className={classes.list}>
        {ranking.map((el, ind) => {
          const number = ind + 1
          return (
            <div className={classes.box} key={number}>
              <div className={classes.number}>{number}</div>
              <div className={classes.boxData}>
                <div className={classes.rankTitle}>{el?.title}</div>
                <div className={classes.rankPlatform}>{el?.platform}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SaltarIntroRankingChildRank
