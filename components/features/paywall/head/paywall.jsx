import React from 'react'
import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import './paywall.css'

@Consumer
class Head extends React.PureComponent {
  render() {
    const { arcSite, getProperties, contextPath } = this.props

    const { assets } = getProperties(arcSite)

    return (
      <div className="__wrapHead">
        <div className="__backHead">
          <div className="__left"></div>
          <div className="__right"></div>
        </div>
        <div className="__head">
          <img
            src={`${contextPath}${assets.paywall()}`}
            alt="Logo el comercio"
          />
          <div className="__wrapLogin">
            <span className="__username">Hola Jorge</span>
          </div>
        </div>
      </div>
    )
  }
}
// function Head(props) {
//   return (

//   )
// }

export default Head
