import {ORIGIN_SUSCRIPCIONES} from 'fusion:environment'

const resolve = () => {
  return `${ORIGIN_SUSCRIPCIONES}/api/subscriber/validation/gestion/`
}

// https://api-sandbox.gestion.pe
// paywall-gestion-sandbox
// gprint-july-19

const HARD_CAMPAIGNS = [{
  title: 'Digital + Impreso',
  url : '',
  recommended: true,
  price: { amount: 49, currency: 'S/' },
  detail: {
    frequency: 'MES',
    duration: 'POR 6 MESES',
    aditional: 'LUEGO S/ 20 CADA MES',
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
  url : '',
  price: { amount: 49, currency: 'S/' },
  detail: {
    frequency: 'MES',
    duration: '',
    aditional: '',
  },
  features: [
    'Diario impreso de Lunes a Viernes',
    'Acceso a la versión impresa en formato digital: PDF',
    'Descuentos ilimitados del club de beneficios',
    'Revista G',
  ],
}]

const DURATION = {
  month: {
    singular: 'MES',
    plural: 'MESES'
  },
  year: {
    singular: 'AÑO',
    plural: 'AÑOS'
  }
}

export default {
  resolve,
  transform(data) {
    
    const { name, attributes, pricingStrategies } = data.products[0]
    
    const [planMonth] = pricingStrategies;
    const {rates} = planMonth;
    const [NOW, AFTER] = rates;
    const { amount = 0, durationCount, duration } = NOW;
    const { amount: amountAf,  billingFrequency : billingFrequencyAf } = AFTER;
    const _duration = duration.toLowerCase();
    const _billingFrequencyAf = billingFrequencyAf.toLowerCase();

    const price =  {
      amount: parseInt(amount, 10),
      currency: 'S/'
    }

    const detail = {
      frequency: DURATION[_duration].singular,
      duration: `POR ${durationCount} ${DURATION[_duration].plural}`,
      aditional: `LUEGO S/ ${parseInt(amountAf, 10)} CADA ${DURATION[_billingFrequencyAf].singular}`,
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
    const {title, feature: features} = summary;
    const url = ''

    return [Object.assign({ name, url, title, features, price, detail }), ...HARD_CAMPAIGNS]
  },
}
