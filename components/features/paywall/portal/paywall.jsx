import React from 'react'
import Consumer from 'fusion:consumer'
import { devices } from '../_dependencies/devices'
import getDomain from '../_dependencies/domains'
import Card from './_children/card'
import './paywall.css'

// const serviceData = [
//   {
//     title: 'Digital',
//     price: { amount: 29, currency: 'S/' },
//     detail: {
//       frequency: 'MES',
//       duration: 'POR 6 MESES',
//       aditional: 'LUEGO S/ 20 CADA MES',
//     },
//     features: [
//       'Acceso a contenido exclusivo en gestion.pe y navegación ilimitada desde todos tus dispositivos',
//     ],
//   },
//   {
//     title: 'Digital + Impreso',
//     recommended: true,
//     price: { amount: 49, currency: 'S/' },
//     detail: {
//       frequency: 'MES',
//       duration: 'POR 6 MESES',
//       aditional: 'LUEGO S/ 20 CADA MES',
//     },
//     aditional: '',
//     features: [
//       'Acceso a contenido exclusivo en gestion.pe y navegación ilimitada desde todos tus dispositivos',
//       'Diario impreso de Lunes a Viernes',
//       'Acceso a la versión impresa en formato digital: PDF',
//       'Descuentos ilimitados del club de beneficios',
//       'Revista G',
//     ],
//   },
//   {
//     title: 'Impreso',
//     price: { amount: 49, currency: 'S/' },
//     detail: {
//       frequency: 'MES',
//       duration: '',
//       aditional: '',
//     },
//     features: [
//       'Diario impreso de Lunes a Viernes',
//       'Acceso a la versión impresa en formato digital: PDF',
//       'Descuentos ilimitados del club de beneficios',
//       'Revista G',
//     ],
//   },
// ]

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
    this.BACKGROUND = `url(${fullAssets('backgroundx1')})`
    this.fetchContent({
      serviceData: {
        source: 'paywall-home-campaing',
      },
    })
  }

  componentDidMount() {
    const mqt = window.matchMedia(`${devices.tablet}`)
    const mqm = window.matchMedia(`(${devices.mobile})`)
    mqt.addListener(() => this.backgroundMediaQuery(mqt, mqm))
    mqm.addListener(() => this.backgroundMediaQuery(mqt, mqm))
    this.backgroundMediaQuery(mqt, mqm)
  }

  backgroundMediaQuery = (mqt, mqm) => {
    const background = mqt.matches || mqm.matches ? '#e4dccf' : this.BACKGROUND
    this.setState({ background })
  }

  render() {
    const { background, serviceData = [] } = this.state

    return (
      <div className="portal" style={{ background }}>
        <div className="portal__content">
          {serviceData.map(item => (
            <Card item={item} key={item.title} />
          ))}
        </div>
        <div className="portal__footer">
          <a href={getDomain('URL_CORPORATE')} className="link link--corporate">
            SUSCRIPCIONES CORPORATIVAS
          </a>
        </div>
      </div>
    )
  }
}

export default Portal
