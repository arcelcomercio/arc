import React from 'react'

const classes = {
  item: 'opinion-card__item',
  seccion: 'opinion-card__seccion',
  icono: 'opinion-card__icono',
  nombreSeccion: 'opinion-card__nombreseccion',
  titleNew: 'opinion-card__titleNew',
  orange: 'text_orange',
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
      <div className={classes.seccion}>
        <h3 className={classes.nombreSeccion}>
          <a href={urlSection}>{sectionName}</a>
        </h3>
        <div className={`${classes.titleNew} ${numberLine}`}>
          <h2>
            <a href={urlNew}>{titulo}</a>
          </h2>
        </div>
      </div>
      <div className={classes.icono}>
        <img data-type="src" src={urlImg} data-src={urlImg} alt="" />
      </div>
    </div>
  )
}

export default OpinionChildItem
