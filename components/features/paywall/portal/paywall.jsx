import React from 'react'
import Consumer from 'fusion:consumer'
import { devices } from '../_dependencies/devices'
import Card from './_children/card'
import './paywall.css'

const serviceData = [
  {
    title: 'Digital',
    price: { amount: 29, currency: 'S/' },
    detail: {
      frequency: 'MES',
      duration: 'POR 6 MESES',
      aditional: 'LUEGO S/ 20 CADA MES',
    },
    features: [
      'Acceso a contenido exclusivo en gestion.pe y navegación ilimitada desde todos tus dispositivos',
    ],
  },
  {
    title: 'Digital + Impreso',
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
  },
]

@Consumer
class Portal extends React.PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      deployment,
      siteProperties: { assets },
    } = props
    const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)
    this.background = `url(${fullAssets('backgroundx1')})`

    this.state = { background: this.background }
  }

  componentDidMount() {
    const mq = window.matchMedia(`(${devices.mobile})`)
    if (mq.matches) {
      this.setState({ background: `#e4dccf` })
    } else {
      this.setState({ background: this.background })
    }
  }

  render() {
    const { background } = this.state
    return (
      <div className="portal" style={{ background }}>
        <div className="portal__content">
          {serviceData.map(item => (
            <Card item={item} key={item.title} />
          ))}
        </div>
        <div className="portal__footer">
          <a href="/" className="link link--corporate">
            SUSCRIPCIONES CORPORATIVAS
          </a>
        </div>
      </div>
    )
  }
}

export default Portal
