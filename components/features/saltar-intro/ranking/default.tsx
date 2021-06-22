import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import Rank from './_children/rank'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'saltar-intro-ranking__container',
  titleBox: 'saltar-intro-ranking__title-box',
  rankBox: 'saltar-intro-ranking__rank-box',
  title: 'saltar-intro-ranking__title-main',
  boxSeeMore: 'saltar-intro-ranking__box-see-more',
  seeMore: 'saltar-intro-ranking__see-more',
}
const SaltarIntroRanking: React.FC = (props) => {
  const { arcSite, contextPath, isAdmin } = useFusionContext()
  const {
    customFields: {
      seeMoreLink = '',
      titleOne,
      imageOne,
      rankOneTitle1,
      rankOnePlatform1,
      rankOneTitle2,
      rankOnePlatform2,
      rankOneTitle3,
      rankOnePlatform3,
      titleTwo,
      imageTwo,
      rankTwoTitle1,
      rankTwoPlatform1,
      rankTwoTitle2,
      rankTwoPlatform2,
      rankTwoTitle3,
      rankTwoPlatform3,
    },
  } = props
  const rankingOne = [
    { title: rankOneTitle1, platform: rankOnePlatform1 },
    { title: rankOneTitle2, platform: rankOnePlatform2 },
    { title: rankOneTitle3, platform: rankOnePlatform3 },
  ]
  const rankingTwo = [
    { title: rankTwoTitle1, platform: rankTwoPlatform1 },
    { title: rankTwoTitle2, platform: rankTwoPlatform2 },
    { title: rankTwoTitle3, platform: rankTwoPlatform3 },
  ]
  const lazyImage = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/default-md.png?d=2`
  return (
    <div className={classes.container}>
      <div className={classes.titleBox}>
        <span className={classes.title}>El Ranking</span>
      </div>
      <div className={classes.rankBox}>
        <Rank
          title={titleOne}
          image={imageOne}
          ranking={rankingOne}
          lazyImage={lazyImage}
          isAdmin={isAdmin}
        />
        <Rank
          title={titleTwo}
          image={imageTwo}
          ranking={rankingTwo}
          lazyImage={lazyImage}
          isAdmin={isAdmin}
        />
      </div>
      <div className={classes.boxSeeMore}>
        <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
          Ver más
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 28.44 26.27">
            <path
              d="M24.79,14.26c0,5.59-4.55,10.09-10.09,10.09c-5.59,0-10.09-4.49-10.09-10.09c0-5.54,4.49-10.03,10.09-10.03
  C20.24,4.23,24.79,8.72,24.79,14.26z M22.18,14.26l-5.59-5.56c-0.61-0.61-1.51-0.61-2.14,0c-0.29,0.26-0.41,0.67-0.41,1.04
  c0,0.41,0.12,0.78,0.41,1.1c0,0,0.96,0.96,1.94,1.94H8.7c-0.81,0-1.51,0.64-1.51,1.48c0,0.84,0.7,1.51,1.51,1.51h7.68
  c-0.99,1.04-1.94,1.94-1.94,1.94c-0.29,0.32-0.41,0.72-0.41,1.1c0,0.41,0.12,0.75,0.41,1.07c0.64,0.61,1.54,0.61,2.14,0L22.18,14.26
  z"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

SaltarIntroRanking.propTypes = {
  customFields,
}

SaltarIntroRanking.label = 'Ranking - Saltar Intro'
SaltarIntroRanking.static = true
export default SaltarIntroRanking
