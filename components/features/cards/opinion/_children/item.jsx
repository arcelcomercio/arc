import React from 'react'

const classes = {
  item: 'opinion-card__item grid',
  section: 'opinion-card__section grid item-center',
  imageContainer:
    'opinion-card__image-container grid item-center justify-center',
  image: 'opinion-card__image',
  name: 'opinion-card__section-name',
  nameLink: 'opinion-card__name-link',
  storyTitle: 'opinion-card__story-title text-left overflow-hidden',
  orange: 'text_orange',
  titleLink: 'opinion-card__title-link',
}

const OpinionChildItem = ({
  titulo,
  urlImg,
  urlNew,
  sectionName,
  urlSection,
  numberLine,
}) => {
  return (
    <div className={classes.item}>
      <div className={classes.section}>
        <h3 className={classes.name}>
          <a className={classes.nameLink} href={urlSection}>
            {sectionName}
          </a>
        </h3>
        <div className={`${classes.storyTitle} ${numberLine}`}>
          <h2>
            <a className={classes.titleLink} href={urlNew}>
              {titulo}
            </a>
          </h2>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={urlImg} alt=""  />
      </div>
    </div>
  )
}

export default OpinionChildItem
