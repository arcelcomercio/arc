import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import ShareButtons from '../../../global-components/lite/share/index'
import { originByEnv } from '../../../utilities/arc/env'

const classes = {
  container: 'metro w-full h-full flex flex-col justify-center',
  title: 'metro-title',
  subtitle: 'metro-subtitle',
  subtitleBold: 'metro-subtitle-bold',
  grid: 'metro-grid',
  footer: 'metro-footer',
  // download: 'metro-download',
  // share: 'metro-share',
  coupon: 'coupon position-relative',
  couponBgImage: 'coupon-bgimage',
  couponHead: 'coupon-head',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  couponText: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponDiscountTitle: 'coupon-discount-title',
  couponCode: 'coupon-code',
  couponLegal: 'coupon-legal',

  // cambios de Pol
  minicontainer: 'flex flex-col items-center position-absolute w-full h-full',
  logo: 'mt-25',
  imagen:
    'position-absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover',
}

interface StaticsPromoMetroProps {
  customFields?: {
    couponsJson?: string
    titleToShare?: string
    textToShare?: string
    pathToShare?: string
    logo?: string
    title?: string
    subtitle?: string
    subtitleBold?: string
    disableDownload?: boolean
    disableShareByEmail?: boolean
    disableShareBySocialNetwork?: boolean
  }
}

enum DiscountType {
  Percentage = '%',
  Amount = 'S/',
}

interface Coupon {
  code: string
  image?: string
  discount: number
  discountType: DiscountType
  title: string
  legal: string
}

/**
 * Componente pensado, por ahora, únicamente para Trome,
 * en el marco del acuerdo anual con Metro, desde diciembre del 2021.
 *
 * Revisar clases globales disponibles para outputType default en:
 * `src/general-styles/framework/classes.md`
 *
 * Si las clases globales no satisfacen las necesidades de este componente,
 * se pueden agregar estilos personalizados, únicamente para este componente,
 * en cierta marca. Por ahora se ha creado sólo esta hoja de estilos para Trome:
 * `src/websites/trome/scss/components/statics/promo-metro/promo-metro.scss
 */

const StaticsPromoMetro: FC<StaticsPromoMetroProps> = ({ customFields }) => {
  const {
    couponsJson,
    titleToShare = '',
    textToShare = '',
    pathToShare = '',
    // logo = 'logo-de-metro.jpg',
    title = '¡Bienvenido!',
    subtitleBold = '¡Gracias por ser un trome!',
    subtitle = 'Ahora como buen Trome, disfruta de estos descuentazos en cualquier tienda Metro',
    disableDownload = false,
    disableShareByEmail = false,
    disableShareBySocialNetwork = false,
  } = customFields || {}

  const { arcSite } = useAppContext()

  const [socialTitle, setSocialTitle] = React.useState(titleToShare)
  const [activeDefaultShare, setActiveDefaultShare] = React.useState(false)

  // Esto es un ejemplo. Se debe usar couponsJson
  // const coupons = couponsJson && JSON.parse(couponsJson)
  const coupons: Coupon[] = (couponsJson && JSON.parse(couponsJson)) || [
    {
      code: '0101010101',
      image:
        'https://www.metro.com.co/wp-content/uploads/2020/01/promo-metro-0101010101.png',
      discount: 10, // number
      discountType: DiscountType.Percentage, // DiscountType
      title: 'PIQUEOS',
      legal: 'Válido hasta el jueves',
    },
  ]

  const origin = originByEnv(arcSite)
  const urlToShare = `${origin}${pathToShare}`

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if ('share' in navigator) {
      navigator.share({
        title: socialTitle,
        text: textToShare,
        url: urlToShare,
      })
    } else {
      setActiveDefaultShare(!activeDefaultShare)
    }
  }

  React.useEffect(() => {
    if (!socialTitle) setSocialTitle(window.document.title || '')
  }, [])

  // para girar la carta
  function rotateCard(code: string) {
    document.getElementById(code)?.classList.toggle('do-flip')
  }

  return (
    <div className={classes.container}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <img
          src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/metrologo.png?v=1637254479"
          alt="logo"
          loading="lazy"
          style={{
            width: '70px',
          }}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0449/4229/5199/files/logo_club_trome.png?v=1638286446"
          alt="logo"
          loading="lazy"
          style={{
            height: '50px',
          }}
        />
      </div>

      <h1 className={classes.title}>{title}</h1>
      <h1 className={classes.subtitleBold}>{subtitleBold}</h1>
      <h2 className={classes.subtitle}>{subtitle}</h2>
      <ul className={classes.grid}>
        {coupons &&
          coupons.map((coupon) => (
            <li
              id={`flip-card-${coupon.code}`}
              className={`${classes.coupon} flip-card`}
              key={coupon.code}>
              <div className="flip-card-front">
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: 'auto', width: '47%' }}>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/imagenes-4f708.appspot.com/o/Arroz-removebg-preview.png?alt=media&token=27b3ca10-eb09-4338-b155-94fb9e7960f4"
                      alt="logo"
                      loading="lazy"
                      style={{
                        width: '100%',
                        margin: '0 auto auto',
                        paddingTop: '10px',
                      }}
                    />
                    <h3 className={classes.couponTitle}>{coupon.title}</h3>
                  </div>
                  <div
                    style={{
                      width: '2%',
                      borderLeft: '1px #E46E23 solid',
                      marginTop: 'auto',
                      height: '135px',
                      marginBottom: 'auto',
                    }}>
                    &nbsp;
                  </div>
                  <div
                    style={{
                      // margin: 'auto',
                      width: '47%',
                      paddingTop: '15px',
                      textAlign: 'start',
                    }}>
                    <strong className={classes.couponHead}>
                      <span className={classes.couponAmount}>
                        {coupon.discount}
                      </span>
                      <span className={classes.couponType}>
                        {coupon.discountType}
                      </span>
                    </strong>
                    <strong>
                      <p className={classes.couponText}>&nbsp;de descuento</p>
                    </strong>
                    <p className={classes.couponCode}>{coupon.code}</p>
                    <p className={classes.couponDiscountTitle}>
                      Código de promoción
                    </p>
                    <button
                      style={{
                        background: '#E46E23',
                        marginLeft: '50%',
                        marginRight: 'auto',
                        color: 'white',
                        padding: '5px 10px 5px 10px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 0.5rem #555',
                      }}
                      type="button"
                      onClick={() => rotateCard(`flip-card-${coupon.code}`)}>
                      Ver más
                    </button>
                  </div>
                </div>

                {/* <img
                  src={coupon.image}
                  alt="logo"
                  loading="lazy"
                  className={`${classes.imagen} ${classes.couponBgImage}`}
                />
               <div className={classes.minicontainer}>
                  <strong className={classes.couponHead}>
                    <span className={classes.couponAmount}>
                      {coupon.discount}
                    </span>
                    <span className={classes.couponType}>
                      &nbsp;{coupon.discountType}
                    </span>
                  </strong>
                  <strong>
                    <p className={classes.couponText}>&nbsp;de descuento</p>
                  </strong>
                  <h3 className={classes.couponTitle}>{coupon.title}</h3>
                  <span className={classes.couponCode}>{coupon.code}</span>
                  <button
                    type="button"
                    onClick={() => rotateCard(`flip-card-${coupon.code}`)}>
                    Girar
                  </button>
                </div> */}
              </div>
              <div className="flip-card-back">
                <div className={`${classes.coupon}`}>
                  <div className={`${classes.couponLegal}`}>
                    Legal
                    <button
                      type="button"
                      onClick={() => rotateCard(`flip-card-${coupon.code}`)}>
                      Girar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className={classes.footer}>
        {disableShareByEmail ? null : (
          <button type="button">Enviar al email</button>
        )}
        {disableDownload ? null : <button type="button">Descargar</button>}
        {disableShareBySocialNetwork ? null : (
          <>
            <button type="button" onClick={handleShare}>
              Compartir
            </button>
            <div
              className={`metro-footer__social ${
                activeDefaultShare ? 'flex' : 'hidden'
              }`}>
              <ShareButtons
                activeCopyLink
                activeLinkedin={false}
                path={urlToShare}
                title={socialTitle}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

StaticsPromoMetro.label = 'Promo Metro'
StaticsPromoMetro.lazy = true

StaticsPromoMetro.propTypes = {
  customFields: PropTypes.shape({
    couponsJson: PropTypes.json.tag({
      name: 'JSON de cupones',
      description:
        'Inserte en formato JSON, el listado de cupones a renderizar',
    }),
    titleToShare: PropTypes.string.tag({
      name: 'Título para compartir',
      description: 'Título para compartir en redes sociales',
      group: 'redes sociales',
    }),
    textToShare: PropTypes.string.tag({
      name: 'Texto para compartir',
      description: 'Texto para compartir en redes sociales',
      group: 'redes sociales',
    }),
    pathToShare: PropTypes.string.tag({
      name: 'URI para compartir en redes sociales',
      description: 'Ejemplo: /cuponera-trome',
      group: 'redes sociales',
    }),
    logo: PropTypes.string.tag({
      name: 'Logo de Metro',
      description:
        'Por defecto ya existe logo, esto es en caso de que quieran modificar el logo por alguna fecha particular',
      group: 'configuración',
    }),
    title: PropTypes.string.tag({
      name: 'Título',
      description: 'Título de la landing',
      group: 'configuración',
    }),
    subtitle: PropTypes.string.tag({
      name: 'Subtítulo',
      description: 'Subtítulo de la landing',
      group: 'configuración',
    }),
    disableDownload: PropTypes.bool.tag({
      name: 'Desactivar botón para descargar cuponera',
      defaultValue: false,
      group: 'configuración',
    }),
    disableShareByEmail: PropTypes.bool.tag({
      name: 'Desactivar botón de compartir por email',
      defaultValue: false,
      group: 'configuración',
    }),
    disableShareBySocialNetwork: PropTypes.bool.tag({
      name: 'Desactivar botón de compartir por redes sociales y portapapeles',
      defaultValue: false,
      group: 'configuración',
    }),
  }),
}

export default StaticsPromoMetro
