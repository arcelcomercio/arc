import React from 'react'

import StoryData from '../../../../utilities/story-data'

export default ({
  data,
  seeMoreLink,
  arcSite,
  contextPath,
  deployment,
  columns,
}) => {
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const classes = {
    listadoSeeMore:
      'stories-l-tabloid__btn flex justify-center mt-20 uppercase',
  }

  const formaZeroDate = (numb = 0) => {
    return numb < 10 ? `0${numb}` : numb
  }

  const formateDate = (fecha = '') => {
    const date = fecha.toString()
    const _date = new Date(date)
    _date.setHours(_date.getHours() - 5)
    const day = formaZeroDate(_date.getDate())
    const month = formaZeroDate(_date.getMonth() + 1)
    const year = _date.getFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <>
      <div className="stories-l-tabloid">
        {data &&
          data.map(el => {
            Story.__data = el
            return (() => {
              return (
                <div className={`stories-l-tabloid__item ${columns}`}>
                  <a
                    className="stories-l-tabloid__image-link"
                    href={Story.websiteLink}>
                    <img
                      className="stories-l-tabloid__image"
                      src={Story.multimediaPortraitL}
                      alt={Story.primarySection}                      
                    />
                  </a>
                  <a
                    href={Story.websiteLink}
                    className="stories-l-tabloid__date">
                    {formateDate(Story.displayDate)}
                  </a>
                  <p className="stories-l-tabloid__section">
                    {Story.primarySection}
                  </p>
                </div>
              )
            })()
          })}
      </div>
      <div className={classes.listadoSeeMore}>
        <a
          href={seeMoreLink}
          tabIndex="0"
          /** TODO:
           * Si no me equivoco, los <a> por defecto tienen tabIndex 0,
           * se suele agregar cuando intentas hacer que un elemento
           * no dinamico como un <span> o <div> se comporten
           * como elementos dinamicos.
           */
          role="button"
          /** TODO:
           * En este caso creo que no es necesario el role
           * por que realmente un <a> ya tiene sentido semantico,
           * no veo necesario decir que se debe comportar
           * como boton.
           */
        >
          Ver más
        </a>
      </div>
    </>
  )
}
