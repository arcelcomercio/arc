import React from 'react'

const classes = {
  opinion: 'opiniontrome',
  head: 'opiniontrome__head',
  title: 'opiniontrome__title',
  oneline: 'opiniontrome__oneline',
  twoline: 'opiniontrome__twoline',
  threeline: 'opiniontrome__threeline',
  body: 'opiniontrome__body',
  item: 'opiniontrome__item',
  seccion: 'opiniontrome__seccion',
  icono: 'opiniontrome__icono',
  nombreSeccion: 'opiniontrome__nombreseccion',
  titleNew: 'opiniontrome__titleNew',
  orange: 'text_orange',
}

const OpinionItem = ({
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

const OpinionComponent = ({ titleOpinion, dataList, arcSite }) => {
  let numberLine = ''
  switch (arcSite) {
    case 'elcomercio':
      numberLine = classes.twoline
      break
    case 'depor':
      numberLine = classes.threeline
      break
    default:
      numberLine = classes.twoline
      break
  }
  
  const keysList = ['item001', 'item0023', 'item043', 'item061','item254','item346',]
  const arrayprint = [dataList.data1,dataList.data2,dataList.data3,dataList.data4 ]
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
              titulo={data.title}
              numberLine={numberLine}
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

export default OpinionComponent
