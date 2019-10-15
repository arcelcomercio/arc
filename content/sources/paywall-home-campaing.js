/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import getProperties from 'fusion:properties'
import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

const fetch = (key = {}) => {
  const site = key['arc-site']
  const {
    paywall: { urls },
  } = getProperties(site)

  const originSubscriptions = interpolateUrl(urls.originSubscriptions)
  const originSubsDigitalPrinted = interpolateUrl(urls.originSubsDigitalPrinted)
  const digitalSubscriptionsHome = interpolateUrl(urls.digitalSubscriptionsHome)
  const originSubsPrinted = interpolateUrl(urls.originSubsPrinted)

  let HARD_CAMPAIGNS = []

  switch (site) {
    case 'elcomercio':
      HARD_CAMPAIGNS = [
        {
          title: 'Digital + Impreso (3 días)',
          url: originSubsDigitalPrinted,
          recommended: true,
          price: { amount: 35, currency: 'S/' },
          detail: {
            frequency: 'AL MES',
            duration: 'POR 3 MESES',
            aditional: 'LUEGO S/ 45 CADA MES',
          },
          aditional: '',
          features: [
            'Acceso ilimitado a elcomercio.pe desde todos tus dispositivos',
            'Contenido desarrollado especialmente para la web.',
            'Diario impreso 3 días/semana (Vie, Sab y Dom) ',
            'Descuentos ilimitados en establecimientos afiliados al Club El Comercio.',
            'Versión impresa en formato PDF',
          ],
        },
        {
          title: 'Digital + Impreso (7 días)',
          url: originSubsPrinted,
          price: { amount: 65, currency: 'S/' },
          detail: {
            frequency: 'AL MES',
            duration: '',
            aditional: '',
          },
          features: [
            'Acceso ilimitado a elcomercio.pe desde todos tus dispositivos',
            'Contenido desarrollado especialmente para la web.',
            'Diario impreso TODOS LOS DÍAS',
            'Descuentos ilimitados en establecimientos afiliados al Club El Comercio.',
            'Versión impresa en formato PDF',
          ],
        },
      ]
      break
    case 'gestion':
      HARD_CAMPAIGNS = [
        {
          title: 'Digital + Impreso',
          url: originSubsDigitalPrinted,
          recommended: true,
          price: { amount: 49, currency: 'S/' },
          detail: {
            frequency: 'AL MES',
            duration: 'POR 3 MESES',
            aditional: 'LUEGO S/ 68 CADA MES',
          },
          aditional: '',
          features: [
            'Acceso a contenido exclusivo en gestion.pe y navegación ilimitada desde todos tus dispositivos',
            'Diario impreso de Lunes a Viernes',
            'Acceso a la versión impresa en formato digital: PDF',
            'Descuentos ilimitados del club de beneficios',
            'Revista G',
          ],
        },
        {
          title: 'Impreso',
          url: originSubsPrinted,
          price: { amount: 49, currency: 'S/' },
          detail: {
            frequency: 'AL MES',
            duration: '',
            aditional: '',
          },
          features: [
            'Diario impreso de Lunes a Viernes',
            'Acceso a la versión impresa en formato digital: PDF',
            'Descuentos ilimitados del club de beneficios',
            'Revista G',
          ],
        },
      ]
      break
    default:
      HARD_CAMPAIGNS = []
  } 

  const DURATION = {
    month: {
      singular: 'MES',
      plural: 'MESES',
    },
    year: {
      singular: 'AÑO',
      plural: 'AÑOS',
    },
  }

  return request({
    uri: originSubscriptions,
    json: true,
  }).then(({ products: [product] }) => {
    const { name, attributes, pricingStrategies } = product
    const [planMonth] = pricingStrategies
    const { rates } = planMonth
    const [NOW, AFTER] = rates
    const { amount = 0, durationCount, duration } = NOW
    const { amount: amountAf, billingFrequency: billingFrequencyAf } = AFTER
    const _duration = duration.toLowerCase()
    const _billingFrequencyAf = billingFrequencyAf.toLowerCase()

    const price = {
      amount: parseInt(amount, 10),
      currency: 'S/',
    }

    const detail = {
      frequency: `AL ${DURATION[_duration].singular}`,
      duration: `POR ${durationCount} ${DURATION[_duration].plural}`,
      aditional: `LUEGO S/ ${parseInt(amountAf, 10)} CADA ${
        DURATION[_billingFrequencyAf].singular
      }`,
    }

    const summary = attributes.reduce(
      (prev, { name: _name, value }) => {
        const prez = prev
        const _value = value.replace(/<p>|<\/p>/g, '')
        if (_name === 'feature') {
          prez[_name].push(_value)
        } else {
          prez[_name] = _value
        }
        return prez
      },
      { feature: [] }
    )
    const { title, feature: features } = summary

    return [
      {
        name,
        url: digitalSubscriptionsHome,
        title,
        features,
        price,
        detail,
      },
      ...HARD_CAMPAIGNS,
    ]
  })
}

export default { fetch }
