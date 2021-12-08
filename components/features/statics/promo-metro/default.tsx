import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import ShareIcon from '../../../global-components/icons/share'
import ShareButtons from '../../../global-components/lite/share/index'
import Spinner from '../../../global-components/spinner'
import { isProd, originByEnv } from '../../../utilities/arc/env'
import { getAssetsPath } from '../../../utilities/assets'
import { isMobile } from '../../../utilities/client/navigator'
import { isLoggedIn } from '../../../utilities/subscriptions/identity'
import ECommerceCard from './_children/e-commerce'
import SaleFloorCard from './_children/sale-floor'

const classes = {
  base: 'metro w-full h-full',
  header: 'items-center flex metro-header position-relative',
  headerContainer: 'metro-header-container w-full',
  headerLogoMetro: 'metro-header-logometro',
  headerSecondContainer:
    'metro-header-second-container  w-full position-relative',
  headerSecondMiniContainer:
    'metro-header-second-mini-container  position-absolute justify-center flex w-full',
  headerLogoClubTrome: 'metro-header-logoclubt',
  headerMetroFamily: 'metro-header-family',
  headerExclusiveDescounts: 'metro-header-exclusive',
  container: 'metro__container flex flex-col justify-center',
  loginContainer:
    'metro__login-container flex flex-col items-center text-center w-full mx-auto',
  title: 'metro__title',
  legal: 'metro__legal',
  legalTitle: 'metro__legal-title',
  grid: 'metro-grid',
  footer: 'metro__footer flex items-center justify-between',
  logoTrome: 'metro__footer__logo',
  // download: 'metro-download',
  share: 'metro__footer__share flex items-center',
}

interface StaticsPromoMetroProps {
  customFields?: {
    couponsSaleFloorJson?: string
    couponsECommerceJson?: string
    titleToShare?: string
    textToShare?: string
    pathToShare?: string
    logo?: string
    disableDownload?: boolean
    disableShareByEmail?: boolean
    disableShareBySocialNetwork?: boolean
  }
}

enum DiscountType {
  Percentage = '%',
  Amount = 'S/',
}

interface Bonus {
  price: string
  points: string
}
interface Cencosud {
  code: string
  price: string
}
interface CouponSale {
  code: string
  image?: string
  discount: string
  discountType: DiscountType
  title: string
  cencosud?: Cencosud
  bonus?: Bonus
  restrictions?: []
}

interface CouponECommerce {
  code: string
  discount: string
  reason: string
  limit: string
  local: string
  restrictions?: {
    ususNumber: string | null
    rules: string | null
  }
}
interface ProductsSaleFloor {
  products: CouponSale[]
  legal: string
}

interface ProductsECommerce {
  products: CouponECommerce[]
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

enum UserState {
  Loading = 'loading',
  LoggedIn = 'loggedIn',
  LoggedOut = 'loggedOut',
}

const StaticsPromoMetro: FC<StaticsPromoMetroProps> = ({ customFields }) => {
  const {
    couponsSaleFloorJson,
    couponsECommerceJson,
    titleToShare = '',
    textToShare = '',
    pathToShare = '/promo-metro',
    logo = 'logo-metro.png',
    // disableDownload = false,
    // disableShareByEmail = false,
    disableShareBySocialNetwork = false,
  } = customFields || {}

  const { arcSite, contextPath } = useAppContext()

  const [socialTitle, setSocialTitle] = React.useState(titleToShare)
  const [activeDefaultShare, setActiveDefaultShare] = React.useState(false)
  const [userState, setUserState] = React.useState(UserState.Loading)

  // Esto es un ejemplo. Se debe usar couponsJson
  // const coupons = couponsJson && JSON.parse(couponsJson)
  const productsSaleFloor: ProductsSaleFloor =
    couponsSaleFloorJson && JSON.parse(couponsSaleFloorJson)

  const productsECommerce: ProductsECommerce =
    couponsECommerceJson && JSON.parse(couponsECommerceJson)

  const {
    products: couponsSale = [],
    legal: legalSale = '',
  } = productsSaleFloor

  const {
    products: couponsEco = [],
    legal: legalEcommerce = '',
  } = productsECommerce

  const origin = originByEnv(arcSite)
  const urlToShare = `${origin}${pathToShare}`

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if ('share' in navigator && isMobile()) {
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

    // verifica si hay un usuario sesionado
    // en caso haya se muestra la landing, de lo contrario te redirecciona al organic

    if (isLoggedIn()) {
      setUserState(UserState.LoggedIn)
    } else {
      setUserState(UserState.LoggedOut)
    }
  }, [])

  const logoMetro = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${logo || 'logo-metro.png'}?d=1`

  return (
    <div className={classes.base}>
      <header className={classes.header}>
        <img
          className="w-full position-absolute"
          src="/pf/resources/dist/trome/images/productos-fondo.svg?d=1"
          alt="fondo productos"
          loading="eager"
        />
        <img
          className="w-full position-absolute"
          src="/pf/resources/dist/trome/images/header-background-cuponera.png?d=1"
          alt="fondo puntitos"
          loading="eager"
        />
        <div className={classes.headerContainer}>
          <div className="items-start flex justify-between w-full position-relative">
            <img
              className={classes.headerLogoMetro}
              src={logoMetro}
              alt="logo metro"
              loading="eager"
            />

            <img
              className={classes.headerLogoClubTrome}
              src={`${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/logo-club-trome.png?d=1`}
              alt="logo club trome"
              loading="eager"
            />
          </div>

          <div className={classes.headerSecondContainer}>
            <div className={classes.headerSecondMiniContainer}>
              <img
                className={classes.headerMetroFamily}
                src="/pf/resources/dist/trome/images/familia-trome.png?d=1"
                alt="familia Trome"
                loading="eager"
              />
              <img
                className={classes.headerExclusiveDescounts}
                src="/pf/resources/dist/trome/images/mejores-ofertas-metro.png?d=1"
                alt="mejores ofertas"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </header>
      <div className={classes.container}>
        {userState === UserState.LoggedOut ? (
          <div className={classes.loginContainer}>
            <h1 className={classes.title}>
              Para ver los cupones, debes estar registrado
            </h1>
            <a
              className={classes.share}
              href={
                isProd
                  ? '/signwall/?outputType=subscriptions&promoMetro=1'
                  : `/signwall/?outputType=subscriptions&promoMetro=1&_website=${arcSite}`
              }>
              Quiero registrarme
            </a>
          </div>
        ) : null}
        <ul className={classes.grid}>
          {userState === UserState.Loading ? <Spinner /> : null}
          {userState === UserState.LoggedIn ? (
            <>
              {couponsSale &&
                couponsSale.map((coupon: CouponSale) => (
                  <SaleFloorCard
                    key={coupon.code}
                    code={coupon.code}
                    image={coupon.image}
                    defaultImage={logoMetro}
                    discount={coupon.discount}
                    discountType={coupon.discountType}
                    title={coupon.title}
                    cencosud={coupon.cencosud || undefined}
                    bonus={coupon.bonus || undefined}
                    restrictions={coupon.restrictions || []}
                    contextPath={contextPath}
                    arcSite={arcSite}
                  />
                ))}
              {couponsEco &&
                couponsEco.map((coupon: CouponECommerce) => (
                  <ECommerceCard
                    key={coupon.code}
                    code={coupon.code}
                    discount={coupon.discount}
                    reason={coupon.reason}
                    limit={coupon.limit}
                    local={coupon.local}
                    restrictions={coupon.restrictions || undefined}
                    contextPath={contextPath}
                    arcSite={arcSite}
                  />
                ))}
            </>
          ) : null}
        </ul>

        {legalSale ? (
          <>
            <h3 className={classes.legalTitle}>
              Restricción general para piso de venta:
            </h3>
            <p className={classes.legal}>{legalSale}</p>
          </>
        ) : null}
        {legalEcommerce ? (
          <>
            <h3 className={classes.legalTitle}>
              Restricción general para ecommerce:
            </h3>
            <p className={classes.legal}>{legalEcommerce}</p>
          </>
        ) : null}
        <div className={classes.footer}>
          <img
            className={classes.logoTrome}
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/alternate-logo.png?d=1`}
            alt="logo trome"
            loading="lazy"
          />
          {disableShareBySocialNetwork ? null : (
            <div className="flex">
              <button
                className={classes.share}
                type="button"
                onClick={handleShare}>
                Compartir <ShareIcon fill="#EE7325" width={16} height={16} />
              </button>
              <div
                className={`metro__footer__social flex position-absolute right-0 ${
                  activeDefaultShare ? 'in' : 'out'
                }`}>
                <ShareButtons
                  activeCopyLink
                  activeLinkedin={false}
                  path={pathToShare}
                  title={socialTitle}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

StaticsPromoMetro.label = 'Promo Metro  '
StaticsPromoMetro.lazy = true

StaticsPromoMetro.propTypes = {
  customFields: PropTypes.shape({
    couponsSaleFloorJson: PropTypes.json.tag({
      name: 'JSON de cupones de piso de venta',
      description:
        'Inserte en formato JSON, el listado de cupones a renderizar',
    }),
    couponsECommerceJson: PropTypes.json.tag({
      name: 'JSON de cupones de ecommerce',
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
