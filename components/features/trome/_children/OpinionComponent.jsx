import React from 'react'

const clasess = {
  opinion: 'opiniontrome',
  head: 'opiniontrome__head',
  title: 'opiniontrome__title',
  oneline: 'opiniontrome__oneline',
  twoline: 'opiniontrome__twoline',
  body: 'opiniontrome__body',
  item: 'opiniontrome__item',
  seccion: 'opiniontrome__seccion',
  icono: 'opiniontrome__icono',
  nombreSeccion: 'opiniontrome__nombreseccion',
  titleNew: 'opiniontrome__titleNew',
  orange: 'text_orange',
}

const OpinionItem = ({ titulo, urlImg, urlNew, sectionName, urlSection }) => {
  return (
    <div className={clasess.item}>
      <div className={clasess.seccion}>
        <h3 className={clasess.nombreSeccion}>
          <a href={urlSection}>{sectionName}</a>
        </h3>
        <div className={clasess.titleNew}>
          <h2>
            <a href={urlNew}>{titulo}</a>
          </h2>
        </div>
      </div>
      <div className={clasess.icono}>
        <img data-type="src" src={urlImg} data-src={urlImg} alt="" />
      </div>
    </div>
  )
}

const OpinionComponent = ({ titleOpinion, dataList, numLineTitle }) => {
  let numberLine = ''
  switch (numLineTitle) {
    case 2:
      numberLine = clasess.twoline
      break
    default:
      numberLine = clasess.oneline
      break
  }

  return (
    <div className={clasess.opinion}>
      <div className={clasess.head}>
        <h3 className={`${clasess.title} ${numberLine}`}>{titleOpinion}</h3>
      </div>
      <div className={clasess.body}>
        {dataList.map(data =>
          data ? (
            <OpinionItem
              titulo={data.title}
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
