import React from 'react'
import Markdown from 'react-markdown/with-html'
import { useContent } from 'fusion:content'

const VallaHtml = () => {
  const {
    name = 'Nombre Plan',
    summary: { feature = [] } = {},
    plans = [],
    printAttributes = [],
  } =
    useContent({
      source: 'paywall-campaing',
    }) || {}

  const getPLanSelected = plans.reduce((prev, plan) => {
    return plan.description.checked ? plan : prev
  }, null)

  const {
    amount = '-',
    description: { title = 'periodo', description = 'duración' } = {},
  } = getPLanSelected || {}

  const style = `.active-signwall{position:fixed;top:0}.panel{display:flex;justify-content:center;position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.size-medium{position:relative;background:#fff}.position-middle{max-height:100%;overflow-y:auto;align-self:center;width:600px;overflow-x:hidden;overflow-y:hidden}@media screen and (min-width:1024px){.position-middle{width:864px;max-height:100%}}.hzhIjB{display:inline}@media screen and (min-width:1024px){.hzhIjB{display:table;width:100%;height:100%}}.btn-close{position:absolute;top:200px;right:10px;cursor:pointer;z-index:1;padding:10px}@media screen and (min-width:1024px){.btn-close{top:10px}}.gnsiwo{width:100%;display:block;position:relative;overflow:hidden;background:#232323}@media screen and (min-width:1024px){.gnsiwo{width:50%;display:table-cell;background:url(https://elcomercio.pe/pf/resources/dist/elcomercio/images/paywall_bg.jpg) center center/cover no-repeat;background-repeat:no-repeat;background-position:center center;height:100%}}.plan-digital{font-size:30px;color:#fff;text-align:center;font-weight:600;font-family:Noto Serif SC}@media screen and (min-width:1024px){.plan-digital{font-size:58px}}.iiXQqj p{width:100%;color:#fff;text-align:center;line-height:32px;font-size:18px}.content{vertical-align:top;width:100%;display:table-cell}.iiXQqj{position:relative;width:100%;min-height:170px!important;padding:12px 20px}@media screen and (min-width:1024px){.iiXQqj{text-align:center;position:relative;margin-top:25%;padding:40px}}.iiXQqj img{margin-top:25px;min-height:25px;width:auto}@media screen and (min-width:1024px){.iiXQqj img{margin-top:40px}}.planes{width:100%;height:45px;font-size:14px;border-width:1px;border-style:solid;border-radius:4px;font-weight:700;color:#fff;cursor:pointer;background:#0179af}.content{padding:20px 50px}.cont-price-detail{margin-top:30px;display:flex}.cont-price-detail h3{font-size:54px;text-align:center;font-weight:700;font-family:inherit;padding-top:20px}.price-free h3 {font-size: 42px;padding-top: 15px;}@media screen and (min-width: 640px) {.price-free h3 {font-size: 50px;padding-top: 10px;}}.detail-price-middle{width:50%}.detail-price-middle p{margin:0}.beneficio{font-weight:700;font-size:14px;position:relative;text-align:center;margin-top:20px;margin-bottom:10px;text-transform:uppercase}.beneficio::before{content:"";display:block;width:100%;height:2px;position:absolute;top:50%;z-index:0;border-top:1px solid #a98e7c!important}.beneficio span{position:relative;z-index:1;background:#fff;padding:0 10px}.price-middle{width:50%;height:24px}.bClsPl{font-family:"Open Sans",Arial,Helvetica,sans-serif;color:#444;line-height:20px;position:relative}@media screen and (min-width:640px){.content{padding:50px 35px}}@media screen and (min-width:1024px){.content{padding:20px 50px}}.note-premium{padding:0 34px;font-size:15px;line-height:18px;text-align:center}.suscrito{margin-top:20px;margin-bottom:10px;font-size:15px;line-height:18px;text-align:center}.list-benefits{font-size:14px;line-height:24px;margin-bottom:20px;list-style:none;padding:0}.list-benefits li{padding-left:30px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAYNJREFUOBGFUsFxgzAQBEEDqSDgBuIOogH/43QQXnmGdOBUELsC55mn/Qcjd0AaICqBArDJrgeIkB3nZsSduN3T3kmuY5mUMvB9/wW/Jda0S5fw2yzLFt1+cP4QIYjjeOm6LslO27ZfiLfwNXyAtTGxfez2AcglQHfYb5umSZVSus/ZPoqiJ2Dv8zxPTgWMk98uyTQLkCyEWFPh4XCQbtfzN0DscW6C7dgmQ2UtPM9LCaRsm2DuL5GZF1iScvqeZ7OZZMK0v8jECA4OS3PDduAKzGTNPe0amfnRNVIFCAmHhCK8yr05MPZMEg1KN3APgvIR3PInbbfbfRyPxwSqRtM2ycSBF5DLGSisaScf4W8RAnhVNplYtg6oGq4R4A0exuOpwj+fXj5uLvS01nUYhjeUPJlMnKqq9tf4IC+Qf8aBq6IoPs+eMpVA9itkawAHo2y8mXccNMfP4dENBYg0njS3JYppBiAFcFMsDm+FVlPGtFEB/uhOIkB2gyKJN6WgbGkr+wHP1//N8PmHWQAAAABJRU5ErkJggg==);margin-bottom:10px;background-repeat:no-repeat;background-position:0 4px}`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }}></style>
      <div id="signwall-app" className="signwall-app">
        <div className="panel open">
          <div className="size-medium position-middle">
            <div className="hzhIjB">
              <button
                type="button"
                className="btn-close"
                id="btn-close-paywall">
                <svg width="14" height="14">
                  <g>
                    <path d="M11.63.4l-9.91 9.92 8.6-8.6-9.91 9.91a1.39 1.39 0 0 0 1.96 1.96l9.91-9.91-8.6 8.6 9.92-9.9A1.39 1.39 0 0 0 11.64.4z"></path>
                    <path d="M13.6 11.63L3.67 1.72l8.6 8.6L2.37.41A1.39 1.39 0 0 0 .4 2.37l9.91 9.91-8.6-8.6 9.9 9.91a1.39 1.39 0 0 0 1.97-1.96z"></path>
                  </g>
                </svg>
              </button>
              <div className="gnsiwo">
                <div className="iiXQqj">
                  <p>
                    Has alcanzado el límite de noticias. <br /> Para continuar
                    leyendo, adquiere el
                  </p>
                  <div className="plan-digital">{name}</div>
                  <center>
                    <img
                      alt="Logo"
                      src="https://elcomercio.pe/pf/resources/dist/elcomercio/images/logo_elcomercio.png?d=408"
                    />
                  </center>
                </div>
              </div>
              <div className="content">
                <div className="bClsPl">
                  <div
                    className={`cont-price-detail ${
                      amount === 0 ? 'price-free' : ''
                    }`}>
                    <div className="price-middle">
                      <h3 itemProp="name">
                        {amount === 0 ? 'Gratis' : `s/ ${amount}`}
                      </h3>
                    </div>
                    <div className="detail-price-middle">
                      {amount !== 0 && <p>al mes</p>}
                      <p>
                        <strong>{title}</strong>
                      </p>
                      <p>{description}</p>
                    </div>
                  </div>
                  <h3 itemProp="name" className="beneficio mt-30 mb-20">
                    <span>Beneficios</span>
                  </h3>
                  <ul className="list-benefits">
                    {feature.map((item, i) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <li key={`lista-${i}`}>{item}</li>
                    })}
                  </ul>
                </div>
                <button
                  type="button"
                  className="sc-bxivhb planes"
                  id="btn-ver-planes">
                  VER PLANES
                </button>
                <p className="suscrito">
                  {printAttributes.map(item => {
                    if (item.name === 'subscriber_title_popup') {
                      return item.value
                    }
                    return null
                  })}
                </p>

                {printAttributes.map(item => {
                  if (item.name === 'subscriber_detail_popup') {
                    return (
                      <div className="note-premium">
                        <Markdown
                          source={item.value}
                          escapeHtml={false}
                          unwrapDisallowed
                          disallowedTypes={['paragraph']}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VallaHtml
