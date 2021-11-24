// import { useAppContext } from 'fusion:context'
// import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'metro-container w-full h-full flex flex-col justify-center',
  title: 'metro-title',
  subtitle: 'metro-subtitle',
  grid: 'metro-coupons',
  footer: 'metro-footer',
  // download: 'metro-download',
  // share: 'metro-share',
  coupon: 'coupon',
  couponHead: 'coupon-head',
  couponAmount: 'coupon-amount',
  couponType: 'coupon-type',
  couponText: 'coupon-discount',
  couponTitle: 'coupon-title',
  couponCode: 'coupon-code',
  // couponLegal: 'coupon-legal',
}

interface StaticsPromoMetroProps {
  customFields?: {
    couponsJson?: string
    logo?: string
    title?: string
    subtitle?: string
    disableDownload?: boolean
    disableShareByEmail?: boolean
  }
}

enum DiscountType {
  Percentage = '%',
  Amount = '$',
}

interface Coupon {
  code: string
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

/**
 * @todo verificar si `couponsJson` viene como JSON o string
 * @todo definir estructura de JSON en base a datos que necesitamos / recibimos
 */

const StaticsPromoMetro: FC<StaticsPromoMetroProps> = ({ customFields }) => {
  const {
    // couponsJson,
    // logo = 'logo-de-metro.jpg',
    title = '¡Bienvenido!¡Gracias por ser un trome!',
    subtitle = 'Ahora como buen Trome, disfruta de estos descuentazos en cualquier tienda Metro',
    disableDownload = false,
    disableShareByEmail = false,
  } = customFields || {}

  // Esto es un ejemplo. Se debe usar couponsJson
  // const coupons = couponsJson && JSON.parse(couponsJson)
  const coupons: Coupon[] = [
    {
      code: '0101010101',
      discount: 10, // number
      discountType: DiscountType.Percentage, // DiscountType
      title: 'PIQUEOS',
      legal: 'Válido hasta el jueves',
    },
  ]

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <h2 className={classes.subtitle}>{subtitle}</h2>
      <ul className={classes.grid}>
        {coupons &&
          coupons.map((coupon) => (
            <li className={classes.coupon} key={coupon.code}>
              <strong className={classes.couponHead}>
                <span className={classes.couponAmount}>{coupon.discount}</span>
                <span className={classes.couponType}>
                  {coupon.discountType}
                </span>
                <span className={classes.couponText}>de descuento</span>
              </strong>
              <h3 className={classes.couponTitle}>{coupon.title}</h3>
              <span className={classes.couponCode}>{coupon.code}</span>
            </li>
          ))}
      </ul>
      <div className={classes.footer}>
        {disableShareByEmail ? null : (
          <button type="button">Enviar al email</button>
        )}
        {disableDownload ? null : <button type="button">Descargar</button>}
      </div>
    </div>
  )
}

StaticsPromoMetro.static = true
StaticsPromoMetro.label = 'Promo Metro'

StaticsPromoMetro.propTypes = {
  customFields: PropTypes.shape({
    couponsJson: PropTypes.json.tag({
      name: 'JSON de cupones',
      description:
        'Inserte en formato JSON, el listado de cupones a renderizar',
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
  }),
}

export default StaticsPromoMetro
