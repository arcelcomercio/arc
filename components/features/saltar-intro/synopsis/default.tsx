import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import StoryData from '../../../utilities/story-data'

const classes = {
  container: 'saltar-intro-synopsis',
  box: 'saltar-intro-synopsis__box',
  boxMain: 'saltar-intro-synopsis__box--main',
  boxFull: 'saltar-intro-synopsis__box--full',
  boxLittle: 'saltar-intro-synopsis__box--little',
  boxBorderBottom: 'saltar-intro-synopsis__box--border-bottom',
  title: 'saltar-intro-synopsis__title',
  stars: 'saltar-intro-synopsis__stars',
  starsColor: 'saltar-intro-synopsis__stars--color',
  year: 'saltar-intro-synopsis__year',
  plataform: 'saltar-intro-synopsis__plataform',
  plataformReversing: 'saltar-intro-synopsis__plataform--reversing',
  subhead: 'saltar-intro-synopsis__subhead',
  value: 'saltar-intro-synopsis__value',
}
const SaltarIntroSynopsis: React.FC = (props) => {
  const getStars = (count = 0, max = 5) => {
    const limitCount = count > 5 ? 5 : parseInt(count)
    const starFull = `<span class="${classes.starsColor}">☆</span>`.repeat(
      limitCount
    )
    const star = '☆'.repeat(max - limitCount)
    return `${starFull}${star}`
  }
  const joinListText = (data, attr) => {
    const arrData = data?.filter((e) => e[attr] !== '')
    const arrName = arrData?.map((el) => el[attr])
    return arrName?.join(', ') || ''
  }

  const { globalContent, contextPath } = useFusionContext()
  const { dataSaltarIntro } = new StoryData({
    data: globalContent,
    contextPath,
  })
  const {
    embed: {
      config: {
        cast = [],
        director = [],
        genre = [],
        clasification = '',
        year = '',
        score = 0,
        title = '',
        plataform = '',
        duration = '',
      } = {},
    } = {},
  } = dataSaltarIntro || {}
  return (
    <div className={classes.container}>
      <div className={`${classes.box} ${classes.boxFull}`}>
        <div className={`${classes.boxLittle} ${classes.boxBorderBottom}`}>
          <div className={classes.title}>{title}</div>
          <div
            className={classes.stars}
            dangerouslySetInnerHTML={{ __html: getStars(score) }}
          />
        </div>
        <div className={classes.boxLittle}>
          <div className={classes.year}>{year}</div>
          <div className={classes.plataform}>
            <span className={classes.plataformReversing}>{plataform}</span>
          </div>
        </div>
      </div>
      <div className={classes.boxMain}>
        <div className={classes.box}>
          <div className={classes.subhead}>Director:</div>
          <div className={classes.value}>{joinListText(director, 'name')}</div>
          <div className={classes.subhead}>Actores:</div>
          <div className={classes.value}>{joinListText(cast, 'name')}</div>
        </div>
        <div className={classes.box}>
          <div className={classes.subhead}>Género:</div>
          <div className={classes.value}>{joinListText(genre, 'name')}</div>
          <div className={classes.subhead}>Duración:</div>
          <div className={classes.value}>{duration}</div>
          <div className={classes.subhead}>Clasificación:</div>
          <div className={classes.value}>{clasification}</div>
        </div>
      </div>
    </div>
  )
}

SaltarIntroSynopsis.label = 'Sinopsis - Saltar Intro'
SaltarIntroSynopsis.static = true

export default SaltarIntroSynopsis
