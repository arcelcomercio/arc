import React from 'react'

import StoryData from '../../../../utilities/story-data'

export default props => {
  const { data, section, arcSite, contextPath, deployment } = props

  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const classes = {
    listadoSeeMore: 'flex justify-center mt-20 uppercase',
  }

  const seeMorePath = `/archivo/${section.split('/')[1]}/`

  const formaZeroDate = (numb = 0) => {
    return numb < 10 ? `0${numb}` : numb
  }

  const formateDate = (fecha = '') => {
    const date = fecha.toString()
    const _date = new Date(date.slice(0, date.indexOf('GMT') - 1))
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
                <div className="stories-l-tabloid__item">
                  <a
                    className="stories-l-tabloid__image-link"
                    href={Story.websiteLink}>
                    <img
                      className="stories-l-tabloid__image"
                      src={Story.multimediaLandscapeMD}
                      alt={Story.primarySection}
                      title={Story.title}
                    />
                  </a>
                  <a
                    href={Story.websiteLink}
                    className="stories-l-tabloid__date">
                    {formateDate(Story.publishDate)}
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
        <a href={seeMorePath} tabIndex="0" role="button">
          Ver más
        </a>
      </div>
    </>
  )
}
