import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildVideo = props => {
  const {
    siteProperties: { urlPreroll },
    globalContent,
    arcSite,
    metaValue,
  } = useFusionContext()

  const {
    promo_items: {
      basic_video: {
        additional_properties: video = {},
        promo_items: { basic: { url: urlImage = '' } = {} } = {},
        headlines: { basic = false } = {},
      } = {},
    } = {},
  } = globalContent || {}

  const videoData = video || ''
  const {
    data = {},
    description = '',
    promo_items: { basic: { url: urlImageContent = '' } = {} } = {},
    headlines: { basic: basicContent = '' } = {},
    url: imagenMigrate = '',
    contentElemtent=false
  } = props
  const imageUrl = contentElemtent ? urlImageContent: urlImage
  const { large } =
    getResizedUrl({
      url: imageUrl || imagenMigrate,
      presets: 'large:680x400',
      arcSite,
    }) || {}

  const urlVideo = data

    .replace(
      /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    )
    .replace(
      /https:\/\/trome.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.trome.pe$1'
    )
    .replace(
      /https:\/\/gestion.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.gestion.pe$1'
    ) // .replace(
  // 'class="powa"',
  // 'class="powa" data-stream="https://d2yh8l41rvc5n9.cloudfront.net/wp-elcomercio/2020/03/06/5e6294fd46e0fb0001de95c7/t_e8328ba7d48b470db2106d7de53b3e4a_name_DANI_ALVES/hlsv4_master.m3u8"'
  // )

  const getSectionSlug = (sectionId = '') => {
    return sectionId.split('/')[1] || ''
  }

  const getParametroPublicidad = () => {
    const {
      taxonomy: {
        primary_section: {
          path: primarySection,
          additional_properties: {
            original: { _admin: { alias_ids: aliasId = [] } = {} } = {},
          } = {},
        } = {},
      } = {},
    } = globalContent || {}
    if (aliasId && aliasId[0]) {
      return aliasId[0]
    }

    if (
      arcSite === 'publimetro' ||
      arcSite === 'depor' ||
      arcSite === 'elcomercio' ||
      arcSite === 'elcomerciomag' ||
      arcSite === 'peru21' ||
      arcSite === 'gestion' ||
      arcSite === 'peru21g21' ||
      arcSite === 'diariocorreo' ||
      arcSite === 'ojo' ||
      arcSite === 'elbocon' ||
      arcSite === 'trome'
    ) {
      const arcSiteNew = arcSite === 'peru21g21' ? 'peru21' : arcSite
      let webSite = ''
      switch (arcSite) {
        case 'publimetro':
          webSite = 'publimetro.pe'
          break
        case 'depor':
          webSite = 'depor.com'
          break
        case 'elcomercio':
          webSite = 'elcomercio.pe'
          break
        case 'elcomerciomag':
          webSite = 'mag.elcomercio.pe'
          break
        case 'peru21':
          webSite = 'peru21.pe'
          break
        case 'gestion':
          webSite = 'gestion.pe'
          break
        case 'peru21g21':
          webSite = 'peru21.pe'
          break
        case 'diariocorreo':
          webSite = 'diariocorreo.pe'
          break
        case 'ojo':
          webSite = 'ojo.pe'
          break
        case 'elbocon':
          webSite = 'elbocon.pe'
          break
        case 'trome':
          webSite = 'trome.pe'
          break
        default:
          webSite = ''
          break
      }

      let tipoplantilla = ''
      switch (metaValue('id')) {
        case 'meta_section':
          tipoplantilla = 'sect'
          break
        case 'meta_story':
          tipoplantilla = 'post'
          break
        default:
          tipoplantilla = 'post'
          break
      }

      const sectionSlug = getSectionSlug(primarySection)

      return `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${arcSiteNew}/web/post/${sectionSlug
        .split('-')
        .join(
          ''
        )}/preroll&description_url=https%3A%2F%2F${webSite}%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSiteNew}%26seccion%3D${sectionSlug
        .split('-')
        .join(
          ''
        )}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`
    }
    return urlPreroll
  }

  const powa = `
      (function(){
        window.addEventListener('powaReady', ({ detail: { element } }) => {element.setAttribute('data-sticky', 'true')})
               window.addEventListener('load',
          function(){ setTimeout(function(){
            if (window.powaBoot) window.powaBoot()
            if (window.PoWaSettings) {
              window.preroll = '${getParametroPublicidad()}'
              window.PoWaSettings.advertising = {
                adBar: false,
                adTag: '${
                  videoData.advertising &&
                  videoData.advertising.playAds === true
                    ? getParametroPublicidad()
                    : ''
                }'
              }
            }
          }, 0)} 
        )
       })()
      window.PoWaSettings.promo = {
        size: 'medium',
               template: function (data) {
            function _pad2(n) {
              return n < 10 ? '0' + n : n;
            }
                   let template = '<div class=" powa-shot-image " style="background-image: url(${large})"><div class="powa-shot-title ">${basic ||
    basicContent}</div><div class="powa-shot-play-btn  "><i class="m-icon icon-video featured-story__icon powa-play-btn"> </div></div></div>';
              return template.trim();
          }
        }  
      `
  const stylePwa = `
   .powa-shot-title {
        font-size: x-large;
        text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);
        position: absolute;
        top: 15px;
        left: 15px;
   }
   .powa-shot-image {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
   }
   .powa-shot-play-btn {
    position: absolute;
    bottom: 30px;
    left: 30px;
   }  
   .powa-play-btn {
    transform: inherit;
}`

  return (
    <>
      {urlVideo && (
        <div
          dangerouslySetInnerHTML={{
            __html: urlVideo.replace('[goldfish_publicidad]', ''),
          }}></div>
      )}
      <figcaption className={classes.caption}>{description} </figcaption>
      <script
        dangerouslySetInnerHTML={{
          __html: powa,
        }}></script>
      <style
        dangerouslySetInnerHTML={{
          __html: stylePwa,
        }}></style>
    </>
  )
}

export default StoryContentChildVideo
