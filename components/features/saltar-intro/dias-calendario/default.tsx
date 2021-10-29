import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import Image from '../../../global-components/image'
import { loadDateFromYYYYMMDD } from '../../../utilities/date-time/dates'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'saltar-intro-dias-calendario__container flex',
  boxDay: 'saltar-intro-dias-calendario__box-day',
  dayNum: 'saltar-intro-dias-calendario__day-num',
  dayName: 'saltar-intro-dias-calendario__day-name',
  triangle: 'saltar-intro-dias-calendario__triangle',
  boxLine: 'saltar-intro-dias-calendario__box-line',
  line: 'saltar-intro-dias-calendario__line',
  boxSeeMore: 'saltar-intro-dias-calendario__box-see-more',
  seeMore: 'saltar-intro-dias-calendario__see-more',
  containerCard: 'saltar-intro-card-calendario__container',
  list: 'saltar-intro-card-calendario__list',
  item: 'saltar-intro-card-calendario__item',
  title: 'saltar-intro-card-calendario__title',
  plataform: 'saltar-intro-card-calendario__plataform',
  temporada: 'saltar-intro-card-calendario__temporada',
  estreno: 'saltar-intro-card-calendario__estreno',
  image: 'saltar-intro-card-calendario__image',
}

const SaltarIntroDiasCalendario: React.FC = (props) => {
  const { globalContent } = useFusionContext()
  const {
    customFields: { seeMoreLink = '' },
  } = props
  const { data = {} } = globalContent
  const dateFormat = (date: string) => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ]
    const d = loadDateFromYYYYMMDD(date)
    return { dayName: days[d.getDay()], day: d?.getDate() }
  }

  const dataKeysDate = Object.keys(data).sort()
  return (
    <>
      {dataKeysDate.map((key: string) => {
        const { dayName = '', day = '' } = dateFormat(key)
        return (
          <>
            <div className={classes.container}>
              <div className={classes.boxDay}>
                <h2 className={classes.dayNum}>{day}</h2>
                <h3 className={classes.dayName}>{dayName}</h3>
              </div>
              <div className={classes.boxLine}>
                <div className={classes.triangle} />
                <div className={classes.line} />
                <div className={classes.line} />
                <div className={classes.line} />
                <div className={classes.line} />
                <div className={classes.line} />
              </div>
            </div>
            <div className={classes.containerCard}>
              <div className={classes.list}>
                {data[key].map((el) => {
                  const {
                    embed: {
                      config: {
                        title = '',
                        chapter = '',
                        premiere_image: premiereImage = null,
                        plataform = '',
                        is_premiere: isPremiere = 0,
                      } = {},
                    } = {},
                  } = el.content_elements.find((obj) =>
                    Object.hasOwnProperty.call(obj.embed.config, 'title')
                  )
                  const {
                    promo_items: {
                      basic: {
                        resized_urls: { landscape_s: landscapeS = '' } = {},
                      } = {},
                      basic_gallery: {
                        promo_items: {
                          basic: {
                            resized_urls: {
                              landscape_s: landscapeSS = '',
                            } = {},
                          } = {},
                        } = {},
                      } = {},
                    } = {},
                  } = el || {}
                  const {
                    website_url: websiteLink = '',
                  } = el.websites.elcomercio
                  return (
                    <div className={classes.item}>
                      <a itemProp="url" href={websiteLink}>
                        <Image
                          src={premiereImage || landscapeS || landscapeSS}
                          data-src={premiereImage || landscapeS || landscapeSS}
                          width={219}
                          height={117}
                          alt={title}
                          className={classes.image}
                          loading="lazy"
                        />
                      </a>
                      <a href={websiteLink} className={classes.title}>
                        {title || '-'}
                      </a>
                      <div className={classes.plataform}>
                        <span>{plataform || '-'}</span>
                      </div>
                      <span className={classes.temporada}>
                        {chapter || '-'}
                      </span>
                      <span className={classes.estreno}>
                        {isPremiere ? 'estreno' : ' '}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )
      })}
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
    </>
  )
}

SaltarIntroDiasCalendario.propTypes = {
  customFields,
}
SaltarIntroDiasCalendario.label = 'Dias calendario - Saltar Intro'
SaltarIntroDiasCalendario.static = true

export default SaltarIntroDiasCalendario