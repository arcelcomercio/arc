import React from 'react'
import Consumer from 'fusion:consumer'
import { devices } from '../_dependencies/devices'
import getDomain from '../_dependencies/domains'
import Card from './_children/card'
import './paywall.css'
import ClickToCall from '../_children/click-to-call'

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
    const { paywall: { clickToCall }} = this.props

    return (
      <div className="portal" style={{ background }}>
        <div className="portal__content">
          {serviceData.map(item => (
            <Card item={item} key={item.title} />
          ))}
        </div>
        <div className="portal__footer">
          <div className="footer__content">
            <a
              href={getDomain('URL_CORPORATE')}
              className="link link--corporate">
              SUSCRIPCIONES CORPORATIVAS
            </a>
            <div className="wrap__click-to-call">
              <ClickToCall href={clickToCall} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Portal
