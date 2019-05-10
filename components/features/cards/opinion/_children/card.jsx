import React from 'react'

const classes = {
  opinion: 'opinion-card',
  head: 'opinion-card__head',
  title: 'opinion-card__title',
  oneline: 'opinion-card__oneline',
  twoline: 'opinion-card__twoline',
  threeline: 'opinion-card__threeline',
  body: 'opinion-card__body',
  item: 'opinion-card__item',
  seccion: 'opinion-card__seccion',
  icono: 'opinion-card__icono',
  nombreSeccion: 'opinion-card__nombreseccion',
  titleNew: 'opinion-card__titleNew',
  orange: 'text_orange',
}

const OpinionItem = ({
  title,
  urlImg,
  urlNew,
  sectionName,
  urlSection,
  linesNumber,
}) => {
  return (
    <div className={classes.item}>
      <div className={classes.seccion}>
        <h3 className={classes.nombreSeccion}>
          <a href={urlSection}>{sectionName}</a>
        </h3>
        <div className={`${classes.titleNew} ${linesNumber}`}>
          <h2>
            <a href={urlNew}>{title}</a>
          </h2>
        </div>
      </div>
      <div className={classes.icono}>
        <img data-type="src" src={urlImg} data-src={urlImg} alt="" />
      </div>
    </div>
  )
}

const OpinionChildCard = ({ titleOpinion, dataList, arcSite }) => {
  let linesNumber = ''
  switch (arcSite) {
    case 'elcomercio':
      linesNumber = classes.twoline
      break
    case 'depor':
      linesNumber = classes.threeline
      break
    default:
      linesNumber = classes.twoline
      break
  }

  const keysList = [
    'item001',
    'item0023',
    'item043',
    'item061',
    'item254',
    'item346',
  ]
  const arrayprint = [
    dataList.data1,
    dataList.data2,
    dataList.data3,
    dataList.data4,
  ]
  return (
    <div className={classes.opinion}>
      <div className={classes.head}>
        <h3 className={classes.title}>{titleOpinion}</h3>
      </div>
      <div className={classes.body}>
        {arrayprint.map((data, index) =>
          data ? (
            <OpinionItem
              key={keysList[index]}
              title={data.title}
              linesNumber={linesNumber}
              urlImg={data.urlImg}
              urlNew={data.urlNew}
              sectionName={data.sectionName}
              urlSection={data.urlSection}
            />
          ) : null
        )}
      </div>
    </div>
  )
}

export default OpinionChildCard
